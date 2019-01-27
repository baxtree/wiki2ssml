/* eslint-disable */
{
    /* eslint-enable */
    function toString(matches) {
        for (var i = 0; i < matches.length; i++) {
            matches[i] = matches[i][1];
        }
        return matches.join("");
    }
    /* eslint-disable */
}
BEGIN
  = text_and_statement:TextAndStatement* text:Text
    {
      return text_and_statement.join("") + text;
    }

TextAndStatement
  = text:Text statement:Statement
    {
      return text + statement;
    }

Text
  = text:(!"[[" .)*
    {
      return toString(text);
    }

Statement
  = Prosody 
    / Emphasis 
    / Silence 
    / Substitute 
    / Audio 
    / Lang 
    / Paragraph 
    / Sentence
    / Phoneme
    / Type
    / Voice
    / PartOfSpeech

Prosody
  = VolumeSpeed / SpeedVolume / Volume / Speed

Volume
  = "[[" ("volume"i / "vol"i) ":" volume:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody volume="' + toString(volume) + '">' + toString(text) + '</prosody>';
    }

Speed
  = "[[" ("speed"i / "spe"i) ":" speed:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toString(speed) + '">' + toString(text) + '</prosody>';
    }

VolumeSpeed
  = "[[" ("volume"i / "vol"i) ":" volume:(!"," .)+ "," ("speed"i / "spe"i) ":" speed:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toString(speed) + '" ' + 'volume="' + toString(volume) + '">' + toString(text) + '</prosody>';
    }

SpeedVolume
  = "[[" ("speed"i / "spe"i) ":" speed:(!"," .)+ "," ("volume"i / "vol"i) ":" volume:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toString(speed) + '" ' + 'volume="' + toString(volume) + '">' + toString(text) + '</prosody>';
    }

Emphasis
  = "[[" ("emphasis"i / "emp"i) ":" level:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<emphasis level="' + toString(level) + '">' + toString(text) + '</emphasis>';
    }

Silence
  = "[[" ("silence"i / "sil"i) ":" duration:(!"]]" .)+ "]]"
    {
      return '<break time="' + toString(duration) + '"/>';
    }

Substitute
  = "[[" ("substitute"i / "sub"i) ":" substitute:(!"|" .)+ "|" original:(!"]]" .)* "]]"
    {
      return '<sub alias="' + toString(substitute)+ '">' + toString(original) + '</sub>';
    }

Audio
  = "[[" ("audio"i / "aud"i) ":" uri:(!"]]" .)* "]]"
    {
      return '<audio src="' + toString(uri) + '"/>'
    }

Lang
  = "[[" ("lang"i / "lan"i) ":" lang:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<lang xml:lang="' + toString(lang) + '">' + toString(text) + '</lang>'
    }

Paragraph
  = "[[" ("paragraph"i / "par"i) "|" text:(!"]]" .)+ "]]"
    {
      return '<p>' + toString(text) + '</p>'
    }

Sentence
  = "[[" ("sentence"i / "sen"i) "|" text:(!"]]" .)+ "]]"
    {
      return '<s>' + toString(text) + '</s>'
    }

Phoneme
  = AlphabetPronunciation / PronunciationAlphabet

Type
  = "[[" ("type"i / "typ"i) ":" interpret:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + toString(interpret) + '">' + toString(text) + '</say-as>';
    }

Voice
  = "[[" ("voice"i / "voi"i) ":" name:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<voice name="' + toString(name) + '">' + toString(text) + '</voice>';
    }

PartOfSpeech
  = "[[" ("pos"i) ":" role:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<w role="' + toString(role) + '">' + toString(text) + "</w>"
    }

AlphabetPronunciation
  = "[[" ("alphabet"i / "alp"i) ":" alphabet:(!"," .)+ "," ("pronunciation"i / "pro"i) ":" pronunciation:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<phoneme alphabet="' + toString(alphabet) + '" ph="' + toString(pronunciation) + '">' + toString(text) + '</phoneme>';
    }

PronunciationAlphabet
  = "[[" ("pronunciation"i / "pro"i) ":" pronunciation:(!"," .)+ "," ("alphabet"i / "alp"i) ":" alphabet:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<phoneme alphabet="' + toString(alphabet) + '" ph="' + toString(pronunciation) + '">' + toString(text) + '</phoneme>';
    }

_ "whitespace"
  = [\t\n\r]*