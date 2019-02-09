/* eslint-disable */
{
    /* eslint-enable */
    function toText(matches) {
        for (var i = 0; i < matches.length; i++) {
            matches[i] = matches[i][1];
        }
        return matches.join("");
    }

    function toTime(matches) {
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

    function toRate(matches) {
        if (matches[matches.length - 1] === "%") {
            return matches[0].join("") + "%";
        }
        return matches;
    }

    function toPitch(matches) {
        if (matches[matches.length - 1] === "%") {
            return matches[0].join("") + "%";
        }
        else if (matches[matches.length - 1] === "Hz") {
            return matches[0].join("") + "Hz";
        }
        else if (matches[matches.length - 1] === "st") {
            return matches[0].join("") + "st";
        }
        return matches;
    }

    function toDetail(matches) {
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
      return toText(text);
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
    / Mark
    / VendorExtension

Prosody
  = SpeedPitchVolume / SpeedVolumePitch / PitchSpeedVolume / PitchVolumeSpeed / VolumeSpeedPitch / VolumePitchSpeed
    / SpeedPitch / SpeedVolume / PitchSpeed / PitchVolume / VolumeSpeed / VolumePitch
    / Speed / Pitch / Volume

SpeedPitchVolume
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

SpeedVolumePitch
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

PitchSpeedVolume
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

PitchVolumeSpeed
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

VolumeSpeedPitch
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

VolumePitchSpeed
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

SpeedPitch
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '">' + toText(text) + '</prosody>';
    }

SpeedVolume
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

PitchSpeed
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '">' + toText(text) + '</prosody>';
    }

PitchVolume
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

VolumeSpeed
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

VolumePitch
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

Speed
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _"|" text:(!"]]" .)+ "]]"
    {
      return '<prosody rate="' + toRate(speed) + '">' + toText(text) + '</prosody>';
    }

Pitch
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody pitch="' + toPitch(pitch) + '">' + toText(text) + '</prosody>';
    }

Volume
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" text:(!"]]" .)+ "]]"
    {
      return '<prosody volume="' + toVolume(volume) + '">' + toText(text) + '</prosody>';
    }

Emphasis
  = "[[" _ ("emphasis"i / "emp"i) _ ":" _ level:LEVEL _ "|" text:(!"]]" .)+ "]]"
    {
      return '<emphasis level="' + level + '">' + toText(text) + '</emphasis>';
    }

Silence
  = TimeStrength / StrengthTime / Time / Strength

TimeStrength
  = "[[" _ ("silence"i / "sil"i) _ ":" _ time:TIME _ "," _ ("strength"i / "str"i) _ ":" _ strength:STRENTH _ "]]"
    {
      return '<break strength="' + strength + '" time="' + toTime(time) + '"/>';
    }

StrengthTime
  = "[[" _ ("strength"i / "str"i) _ ":" _ strength:STRENTH _ "," _ ("silence"i / "sil"i) _ ":" _ time:TIME _ "]]"
    {
      return '<break strength="' + strength + '" time="' + toTime(time) + '"/>';
    }

Time
  = "[[" _ ("silence"i / "sil"i) _ ":" _ time:TIME _ "]]"
    {
      return '<break time="' + toTime(time) + '"/>';
    }

Strength
  = "[[" _ ("strength"i / "str"i) _ ":" _ strength:STRENTH _ "]]"
    {
      return '<break strength="' + strength + '"/>';
    }

Substitute
  = "[[" _ ("substitute"i / "sub"i) _ ":" substitute:(!"|" .)+ "|" original:(!"]]" .)* "]]"
    {
      return '<sub alias="' + toText(substitute)+ '">' + toText(original) + '</sub>';
    }

Audio
  = "[[" _ ("audio"i / "aud"i) _ ":" uri:(!"]]" .)* "]]"
    {
      return '<audio src="' + toText(uri) + '"/>'
    }

Lang
  = "[[" _ ("lang"i / "lan"i) _ ":" lang:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<lang xml:lang="' + toText(lang) + '">' + toText(text) + '</lang>'
    }

Paragraph
  = "[[" _ ("paragraph"i / "par"i) _ "|" text:(!"]]" .)+ "]]"
    {
      return '<p>' + toText(text) + '</p>'
    }

Sentence
  = "[[" _ ("sentence"i / "sen"i) _ "|" text:(!"]]" .)+ "]]"
    {
      return '<s>' + toText(text) + '</s>'
    }

Type
  = InterpretFormatDetail / InterpretDetailFormat / FormatInterpretDetail / FormatDetailInterpret / DetailFormatInterpret / DetailInterpretFormat
    / InterpretFormat / FormatInterpret / Interpret

InterpretFormatDetail
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + toText(text) + '</say-as>';
    }

InterpretDetailFormat
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + toText(text) + '</say-as>';
    }

FormatInterpretDetail
  = "[[" _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + toText(text) + '</say-as>';
    }

FormatDetailInterpret
  = "[[" _  ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + toText(text) + '</say-as>';
    }

DetailFormatInterpret
  = "[[" _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("type"i / "typ"i) _":" _ interpret:INTERPRET _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + toText(text) + '</say-as>';
    }

DetailInterpretFormat
  = "[[" _  ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + toText(text) + '</say-as>';
    }

FormatInterpret
  = "[[" _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '">' + toText(text) + '</say-as>';
    }

InterpretFormat
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '">' + toText(text) + '</say-as>';
    }

Interpret
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "|" text:(!"]]" .)+ "]]"
    {
      return '<say-as interpret-as="' + interpret + '">' + toText(text) + '</say-as>';
    }

Voice
  = "[[" _ ("voice"i / "voi"i) _ ":" _ name:(!"|" .)+ _ "|" text:(!"]]" .)+ "]]"
    {
      return '<voice name="' + toText(name) + '">' + toText(text) + '</voice>';
    }

PartOfSpeech
  = "[[" _ ("pos"i) _ ":" _ role:(!"|" .)+ _ "|" text:(!"]]" .)+ "]]"
    {
      return '<w role="' + toText(role) + '">' + toText(text) + "</w>"
    }

Phoneme
  = AlphabetPronunciation / PronunciationAlphabet / Pronunciation

AlphabetPronunciation
  = "[[" _ ("alphabet"i / "alp"i) _ ":" _ alphabet:(!"," .)+ "," _ ("pronunciation"i / "pro"i) _ ":" _ pronunciation:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<phoneme alphabet="' + toText(alphabet) + '" ph="' + toText(pronunciation) + '">' + toText(text) + '</phoneme>';
    }

PronunciationAlphabet
  = "[[" _ ("pronunciation"i / "pro"i) _ ":" _ pronunciation:(!"," .)+ "," _ ("alphabet"i / "alp"i) _ ":" _ alphabet:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<phoneme alphabet="' + toText(alphabet) + '" ph="' + toText(pronunciation) + '">' + toText(text) + '</phoneme>';
    }

Pronunciation
  = "[[" _ ("pronunciation"i / "pro"i) _ ":" _ pronunciation:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<phoneme ph="' + toText(pronunciation) + '">' + toText(text) + '</phoneme>';
    }

Mark
  = "[[" _ ("mark"i / "mar"i) _ ":" name:(!"|" .)+ "|" text:(!"]]" .)+ "]]"
    {
      return '<mark name="' + toText(name) + '"/>';
    }

_ "optional whitespace"
  = [ \t\n\r]*

STRENTH
  = "none" / "x-weak" / "weak" / "medium" / "strong" / "x-strong"

LEVEL
  = "strong" / "moderate" / "none" / "reduced"

TIME
  = [0-9]+(.[0-9]+)?"s" / [0-9]+(.[0-9]+)?"ms"

RATE
  = "x-slow" / "slow" / "medium" / "fast" / "x-fast" / "default" / NON_NEGATIVE_PERCENTAGE

PITCH
  = "x-low" / "low" / "medium" / "high" / "x-high" / "default" / PERCENTAGE / [\+\-0-9]+"Hz" / [\+\-0-9]+"st"

VOLUME
  = "silent" / "x-soft" / "soft" / "medium" / "loud" / "x-loud" / "default" / [\+\-0-9]+(.[0-9])*"dB"

INTERPRET
  = "cardinal" / "number" / "ordinal" / "characters" / "digits" / "fraction" / "expletive" / "bleep" / "interjection" / "unit" / "verbatim" / "spell-out" / "date" / "time" / "telephone" / "address"

FORMAT
  = "hms24" / "hms12" / "mdy" / "dmy" / "ymd" / "md" / "dm" / "ym" / "my" / "d" / "m" / "y"

DETAIL
  = [0-9]+ / [a-zA-Z]+

PERCENTAGE
  = [\+\-0-9]+"%"

NON_NEGATIVE_PERCENTAGE
  = [0-9]+"%"

VendorExtension
  = AmazonWhispered / AmazonPhonation / AmazonTimbre / AmazonDynamicRangeCompression / AmazonBreath
    / IBMExpressiveness / IBMVoiceTransformation

AmazonWhispered
  = "[[" _ ("amzWhispered"i / "aw"i) _ "|" text:(!"]]" .)+ "]]"
    {
      return '<amazon:effect name="whispered">' + toText(text) + '</amazon:effect>';
    }

AmazonPhonation
  = "[[" _ ("amzPhonation"i / "ap"i) _ ":" _ phonation:AMAZON_PHONATION _ "|" text:(!"]]" .)+ "]]"
    {
      return '<amazon:effect phonation="' + phonation + '">' + toText(text) + '</amazon:effect>';
    }

AmazonTimbre
  = "[[" _ ("amzTimbre"i / "at"i) _ ":" _ timbre:PERCENTAGE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<amazon:effect vocal-tract-length="' + toRate(timbre) + '">' + toText(text) + '</amazon:effect>';
    }

AmazonDynamicRangeCompression
  = "[[" _ ("amzDRC"i / "adrc"i) _ "|" text:(!"]]" .)+ "]]"
    {
      return '<amazon:effect name="drc">' + toText(text) + '</amazon:effect>';
    }

AmazonBreath
  = AmazonBreathDurationVolume / AmazonBreathVolumeDuration
    / AmazonBreathDuration / AmazonBreathVolume
    / AmazonDefaultBreath

AmazonBreathDurationVolume
  = "[[" _ ("amzBreathDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzBreathVolume"i / "abv"i) _ ":" _ volume:VOLUME _ "]]"
    {
      return '<amazon:breath duration="' + duration + '" ' + 'volume="' + toVolume(volume) + '"/>';
    }

AmazonBreathVolumeDuration
  = "[[" _ ("amzBreathVolume"i / "abv"i) _ ":" _ volume:VOLUME _ "," _ ("amzBreathDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "]]"
    {
      return '<amazon:breath duration="' + duration + '" ' + 'volume="' + toVolume(volume) + '"/>';
    }

AmazonBreathDuration
  = "[[" _ ("amzBreathDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "]]"
    {
      return '<amazon:breath duration="' + duration + '"/>';
    }

AmazonBreathVolume
  = "[[" _ ("amzBreathVolume"i / "abv"i) _ ":" _ volume:VOLUME _ "]]"
    {
      return '<amazon:breath volume="' + toVolume(volume) + '"/>';
    }

AmazonDefaultBreath
  = "[[" _ ("amzDefaultBreath"i / "adb"i) _ "]]"
    {
      return '<amazon:breath/>';
    }

AMAZON_PHONATION
  = "soft"

AMAZON_DURATION
  = "x-short" / "short" / "medium" / "long" / "x-long" / "default"

IBMExpressiveness
  = "[[" _ ("ibmExprType"i / "iet"i) _ ":" _ expressiveness:IBM_EXPRTYPE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<express-as type="' + expressiveness + '">' + toText(text) + '</express-as>';
    }

IBMVoiceTransformation
  = IBMTransformationTypeStrength / IBMTransformationStrengthType / IBMTransformationType

IBMTransformationTypeStrength
  = "[[" _ ("ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "," _ ("ibmStrength"i / "ist"i) _ ":" _ strength:PERCENTAGE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<voice-transformation type="' + type + '" strength="' + toRate(strength) + '">' + toText(text) + '</voice-transformation>';
    }

IBMTransformationStrengthType
  = "[[" _ ("ibmStrength"i / "ist"i) _ ":" _ strength:PERCENTAGE _ "," _ ("ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<voice-transformation type="' + type + '" strength="' + toRate(strength) + '">' + toText(text) + '</voice-transformation>';
    }

IBMTransformationType
  = "[[" _ ("ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "|" text:(!"]]" .)+ "]]"
    {
      return '<voice-transformation type="' + type + '">' + toText(text) + '</voice-transformation>';
    }

IBM_TRANSTYPE
  = "Young" / "Soft"

IBM_EXPRTYPE
  = "GoodNews" / "Apology" / "Uncertainty"