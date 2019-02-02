/* eslint-disable */
{
    /* eslint-enable */
    function toString(matches) {
        for (var i = 0; i < matches.length; i++) {
            matches[i] = matches[i][1];
        }
        return matches.join("");
    }

    function toDuration(matches) {
        var integral =  matches[0].join("");
        var decimal = matches[1] == undefined ? "" : matches[1][0] + matches[1][1].join("")
        var unit = matches[2];
        return integral + decimal + unit;
    }

    function toVolume(matches) {
        if (matches[matches.length - 1] === "dB") {
            return matches[0].join("") + "dB";
        }
        return matches;
    }

    function toRelativeOrPercentage(matches) {
        if (matches[matches.length - 1] === "%") {
            return matches[0].join("") + "%";
        }
        return matches;
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
  = SpeedPitchVolume / SpeedVolumePitch / PitchSpeedVolume / PitchVolumeSpeed / VolumeSpeedPitch / VolumePitchSpeed
    / SpeedPitch / SpeedVolume / PitchSpeed / PitchVolume / VolumeSpeed / VolumePitch
    / Speed / Pitch / Volume

SpeedPitchVolume
  = "[[" ("speed"i / "spe"i) ":" speed:RATE "," ("pitch"i / "pit"i) ":" pitch:PITCH "," ("volume"i / "vol"i) ":" volume:VOLUME "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

SpeedVolumePitch
  = "[[" ("speed"i / "spe"i) ":" speed:RATE "," ("volume"i / "vol"i) ":" volume:VOLUME "," ("pitch"i / "pit"i) ":" pitch:PITCH "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

PitchSpeedVolume
  = "[[" ("pitch"i / "pit"i) ":" pitch:PITCH "," ("speed"i / "spe"i) ":" speed:RATE "," ("volume"i / "vol"i) ":" volume:VOLUME "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

PitchVolumeSpeed
  = "[[" ("pitch"i / "pit"i) ":" pitch:PITCH+ "," ("volume"i / "vol"i) ":" volume:VOLUME "," ("speed"i / "spe"i) ":" speed:RATE "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

VolumeSpeedPitch
  = "[[" ("volume"i / "vol"i) ":" volume:VOLUME "," ("speed"i / "spe"i) ":" speed:RATE "," ("pitch"i / "pit"i) ":" pitch:PITCH "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

VolumePitchSpeed
  = "[[" ("volume"i / "vol"i) ":" volume:VOLUME "," ("pitch"i / "pit"i) ":" pitch:PITCH "," ("speed"i / "spe"i) ":" speed:RATE "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

SpeedPitch
  = "[[" ("speed"i / "spe"i) ":" speed:RATE "," ("pitch"i / "pit"i) ":" pitch:PITCH "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '">' + toString(text) + '</prosody>';
    }

SpeedVolume
  = "[[" ("speed"i / "spe"i) ":" speed:RATE "," ("volume"i / "vol"i) ":" volume:VOLUME "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

PitchSpeed
  = "[[" ("pitch"i / "pit"i) ":" pitch:PITCH "," ("speed"i / "spe"i) ":" speed:RATE "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'pitch="' + toRelativeOrPercentage(pitch) + '">' + toString(text) + '</prosody>';
    }

PitchVolume
  = "[[" ("pitch"i / "pit"i) ":" pitch:PITCH "," ("volume"i / "vol"i) ":" volume:VOLUME "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

VolumeSpeed
  = "[[" ("volume"i / "vol"i) ":" volume:VOLUME "," ("speed"i / "spe"i) ":" speed:RATE "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

VolumePitch
  = "[[" ("volume"i / "vol"i) ":" volume:VOLUME "," ("pitch"i / "pit"i) ":" pitch:PITCH "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody pitch="' + toRelativeOrPercentage(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

Speed
  = "[[" ("speed"i / "spe"i) ":" speed:RATE "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRelativeOrPercentage(speed) + '">' + toString(text) + '</prosody>';
    }

Pitch
  = "[[" ("pitch"i / "pit"i) ":" pitch:PITCH "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody pitch="' + toRelativeOrPercentage(pitch) + '">' + toString(text) + '</prosody>';
    }

Volume
  = "[[" ("volume"i / "vol"i) ":" volume:VOLUME "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody volume="' + toVolume(volume) + '">' + toString(text) + '</prosody>';
    }

Emphasis
  = "[[" ("emphasis"i / "emp"i) ":" level:LEVEL "|" text:(!"]]" .)+ "]]"
    {
      return '<emphasis level="' + level + '">' + toString(text) + '</emphasis>';
    }

Silence
  = TimeStrength / StrengthTime / Time / Strength

TimeStrength
  = "[[" ("silence"i / "sil"i) ":" time:DURATION "," ("strength"i / "str"i) ":" strength:STRENTH "]]"
    {
      return '<break strength="' + strength + '" time="' + toDuration(time) + '"/>';
    }

StrengthTime
  = "[[" ("strength"i / "str"i) ":" strength:STRENTH "," ("silence"i / "sil"i) ":" time:DURATION "]]"
    {
      return '<break strength="' + strength + '" time="' + toDuration(time) + '"/>';
    }

Time
  = "[[" ("silence"i / "sil"i) ":" time:DURATION "]]"
    {
      return '<break time="' + toDuration(time) + '"/>';
    }

Strength
  = "[[" ("strength"i / "str"i) ":" strength:STRENTH "]]"
    {
      return '<break strength="' + strength + '"/>';
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

Type
  = InterpretFormatDetail / InterpretDetailFormat / FormatInterpretDetail / FormatDetailInterpret / DetailFormatInterpret / DetailInterpretFormat
    / InterpretFormat / FormatInterpret / Interpret

InterpretFormatDetail
  = "[[" ("type"i / "typ"i) ":" interpret:INTERPRET "," ("format"i / "for"i) ":" format:FORMAT "," ("detail"i / "det"i) ":" detail:DETAIL "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + detail + '">' + toString(text) + '</say-as>';
    }

InterpretDetailFormat
  = "[[" ("type"i / "typ"i) ":" interpret:INTERPRET "," ("detail"i / "det"i) ":" detail:DETAIL "," ("format"i / "for"i) ":" format:FORMAT "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + detail + '">' + toString(text) + '</say-as>';
    }

FormatInterpretDetail
  = "[[" ("format"i / "for"i) ":" format:FORMAT "," ("type"i / "typ"i) ":" interpret:INTERPRET "," ("detail"i / "det"i) ":" detail:DETAIL "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + detail + '">' + toString(text) + '</say-as>';
    }

FormatDetailInterpret
  = "[["  ("format"i / "for"i) ":" format:FORMAT "," ("detail"i / "det"i) ":" detail:DETAIL "," ("type"i / "typ"i) ":" interpret:INTERPRET "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + detail + '">' + toString(text) + '</say-as>';
    }

DetailFormatInterpret
  = "[[" ("detail"i / "det"i) ":" detail:DETAIL "," ("format"i / "for"i) ":" format:FORMAT "," ("type"i / "typ"i) ":" interpret:INTERPRET "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + detail + '">' + toString(text) + '</say-as>';
    }

DetailInterpretFormat
  = "[["  ("detail"i / "det"i) ":" detail:DETAIL "," ("type"i / "typ"i) ":" interpret:INTERPRET "," ("format"i / "for"i) ":" format:FORMAT "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + detail + '">' + toString(text) + '</say-as>';
    }

FormatInterpret
  = "[[" ("format"i / "for"i) ":" format:FORMAT "," ("type"i / "typ"i) ":" interpret:INTERPRET "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '">' + toString(text) + '</say-as>';
    }

InterpretFormat
  = "[[" ("type"i / "typ"i) ":" interpret:INTERPRET "," ("format"i / "for"i) ":" format:FORMAT "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '">' + toString(text) + '</say-as>';
    }

Interpret
  = "[[" ("type"i / "typ"i) ":" interpret:INTERPRET "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '">' + toString(text) + '</say-as>';
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

Phoneme
  = AlphabetPronunciation / PronunciationAlphabet / Pronunciation

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

Pronunciation
  = "[[" ("pronunciation"i / "pro"i) ":" pronunciation:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<phoneme ph="' + toString(pronunciation) + '">' + toString(text) + '</phoneme>';
    }

_ "whitespace"
  = [\t\n\r]*

STRENTH
  = "none" / "x-weak" / "weak" / "medium" / "strong" / "x-strong"

LEVEL
  = "strong" / "moderate" / "none" / "reduced"

DURATION
  = [0-9]+(.[0-9]+)?"s" / [0-9]+(.[0-9]+)?"ms"

RATE
  = "x-slow" / "slow" / "medium" / "fast" / "x-fast" / "default" / [\+0-9]+"%"

PITCH
  = "x-low" / "low" / "medium" / "high" / "x-high" / "default" / [\+\-0-9]+"%"

VOLUME
  = "silent" / "x-soft" / "soft" / "medium" / "loud" / "x-loud" / "default" / [\+\-0-9]+(.[0-9])*"dB"

INTERPRET
  = "cardinal" / "number" / "ordinal" / "characters" / "digits" / "fraction" / "expletive" / "bleep" / "interjection" / "unit" / "verbatim" / "spell-out" / "date" / "time" / "telephone" / "address"

FORMAT
  = "hms24" / "hms12" / "mdy" / "dmy" / "ymd" / "md" / "dm" / "ym" / "my" / "d" / "m" / "y"

DETAIL
  = [0-9]+