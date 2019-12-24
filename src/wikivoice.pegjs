/* eslint-disable */
{
    /* eslint-enable */
    function toText(matches) {
        for (var i = 0; i < matches.length; i++) {
            matches[i] = matches[i][1];
        }
        return matches.join("").replace(/["'&<>]/g, (char) => {
            switch (char) {
                case "\"": return "&quot;";
                case "'": return "&apos;";
                case "&": return "&amp;";
                case "<": return "&lt;";
                case ">": return "&gt;";
            }
      });
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
  = text:(!("[[" / "]]") .)*
    {
      return toText(text);
    }

Target
  = text_left:Text statement:Statement* text_right:Text
    {
      return text_left + statement + text_right;
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
    / SeeAlso
    / CacheControl
    / VendorExtension

Prosody
  = SpeedPitchVolume / SpeedVolumePitch / PitchSpeedVolume / PitchVolumeSpeed / VolumeSpeedPitch / VolumePitchSpeed
    / SpeedPitch / SpeedVolume / PitchSpeed / PitchVolume / VolumeSpeed / VolumePitch
    / Speed / Pitch / Volume

SpeedPitchVolume
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

SpeedVolumePitch
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

PitchSpeedVolume
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

PitchVolumeSpeed
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

VolumeSpeedPitch
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

VolumePitchSpeed
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

SpeedPitch
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '">' + target + '</prosody>';
    }

SpeedVolume
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

PitchSpeed
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'pitch="' + toPitch(pitch) + '">' + target + '</prosody>';
    }

PitchVolume
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "," _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" target:Target "]]"
    {
      return '<prosody pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

VolumeSpeed
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("speed"i / "spe"i) _ ":" _ speed:RATE _ "|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

VolumePitch
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "," _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" target:Target "]]"
    {
      return '<prosody pitch="' + toPitch(pitch) + '" ' + 'volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

Speed
  = "[[" _ ("speed"i / "spe"i) _ ":" _ speed:RATE _"|" target:Target "]]"
    {
      return '<prosody rate="' + toRate(speed) + '">' + target + '</prosody>';
    }

Pitch
  = "[[" _ ("pitch"i / "pit"i) _ ":" _ pitch:PITCH _ "|" target:Target "]]"
    {
      return '<prosody pitch="' + toPitch(pitch) + '">' + target + '</prosody>';
    }

Volume
  = "[[" _ ("volume"i / "vol"i) _ ":" _ volume:VOLUME _ "|" target:Target "]]"
    {
      return '<prosody volume="' + toVolume(volume) + '">' + target + '</prosody>';
    }

Emphasis
  = "[[" _ ("emphasis"i / "emp"i) _ ":" _ level:LEVEL _ "|" target:Target "]]"
    {
      return '<emphasis level="' + level + '">' + target + '</emphasis>';
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
  = "[[" _ ("lang"i / "lan"i) _ ":" lang:(!"|" .)+ "|" target:Target "]]"
    {
      return '<lang xml:lang="' + toText(lang) + '">' + target + '</lang>'
    }

Paragraph
  = "[[" _ ("paragraph"i / "par"i) _ "|" target:Target "]]"
    {
      return '<p>' + target + '</p>'
    }

Sentence
  = "[[" _ ("sentence"i / "sen"i) _ "|" target:Target "]]"
    {
      return '<s>' + target + '</s>'
    }

Type
  = InterpretFormatDetail / InterpretDetailFormat / FormatInterpretDetail / FormatDetailInterpret / DetailFormatInterpret / DetailInterpretFormat
    / InterpretFormat / FormatInterpret / Interpret

InterpretFormatDetail
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + target + '</say-as>';
    }

InterpretDetailFormat
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + target + '</say-as>';
    }

FormatInterpretDetail
  = "[[" _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + target + '</say-as>';
    }

FormatDetailInterpret
  = "[[" _  ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + target + '</say-as>';
    }

DetailFormatInterpret
  = "[[" _ ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("type"i / "typ"i) _":" _ interpret:INTERPRET _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + target + '</say-as>';
    }

DetailInterpretFormat
  = "[[" _  ("detail"i / "det"i) _ ":" _ detail:DETAIL _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '" detail="' + toDetail(detail) + '">' + target + '</say-as>';
    }

FormatInterpret
  = "[[" _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "," _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '">' + target + '</say-as>';
    }

InterpretFormat
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "," _ ("format"i / "for"i) _ ":" _ format:FORMAT _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '" format="' + format + '">' + target + '</say-as>';
    }

Interpret
  = "[[" _ ("type"i / "typ"i) _ ":" _ interpret:INTERPRET _ "|" target:Target "]]"
    {
      return '<say-as interpret-as="' + interpret + '">' + target + '</say-as>';
    }

Voice
  = "[[" _ ("voice"i / "voi"i) _ ":" _ name:(!"|" .)+ _ "|" target:Target "]]"
    {
        return '<voice name="' + toText(name) + '">' + target + '</voice>';
    }

PartOfSpeech
  = "[[" _ ("pos"i) _ ":" _ role:(!"|" .)+ _ "|" target:Target "]]"
    {
      return '<w role="' + toText(role) + '">' + target + "</w>"
    }

Phoneme
  = AlphabetPronunciation / PronunciationAlphabet / Pronunciation

AlphabetPronunciation
  = "[[" _ ("alphabet"i / "alp"i) _ ":" _ alphabet:(!"," .)+ "," _ ("pronunciation"i / "pro"i) _ ":" _ pronunciation:(!"|" .)+ "|" target:Target "]]"
    {
      return '<phoneme alphabet="' + toText(alphabet) + '" ph="' + toText(pronunciation) + '">' + target + '</phoneme>';
    }

PronunciationAlphabet
  = "[[" _ ("pronunciation"i / "pro"i) _ ":" _ pronunciation:(!"," .)+ "," _ ("alphabet"i / "alp"i) _ ":" _ alphabet:(!"|" .)+ "|" target:Target "]]"
    {
      return '<phoneme alphabet="' + toText(alphabet) + '" ph="' + toText(pronunciation) + '">' + target + '</phoneme>';
    }

Pronunciation
  = "[[" _ ("pronunciation"i / "pro"i) _ ":" _ pronunciation:(!"|" .)+ "|" target:Target "]]"
    {
      return '<phoneme ph="' + toText(pronunciation) + '">' + target + '</phoneme>';
    }

Mark
  = "[[" _ ("mark"i / "mar"i) _ ":" name:(!"]]" .)+ "]]"
    {
      return '<mark name="' + toText(name) + '"/>';
    }

SeeAlso
  = "[[" _ ("seeAlso"i / "see"i) _ ":" uri:(!"]]" .)* "]]"
    {
      return '<meta name="seeAlso" content="' + toText(uri) + '"/>'
    }

CacheControl
  = "[[" _ ("cacheControl"i / "cac"i) _ ":" content:(!"]]" .)* "]]"
    {
      return '<meta http-equiv="Cache-Control" content="' + toText(content) + '"/>'
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
  = AmazonWhispered / AmazonPhonation / AmazonTimbre / AmazonDynamicRangeCompression / AmazonBreath / AmazonAutoBreaths
    / IBMExpressiveness / IBMVoiceTransformation / IBMVoiceCustomTransformation

AmazonWhispered
  = "[[" _ ("amzWhispered"i / "aw"i) _ "|" target:Target "]]"
    {
      return '<amazon:effect name="whispered">' + target + '</amazon:effect>';
    }

AmazonPhonation
  = "[[" _ ("amzPhonation"i / "ap"i) _ ":" _ phonation:AMAZON_PHONATION _ "|" target:Target "]]"
    {
      return '<amazon:effect phonation="' + phonation + '">' + target + '</amazon:effect>';
    }

AmazonTimbre
  = "[[" _ ("amzTimbre"i / "at"i) _ ":" _ timbre:PERCENTAGE _ "|" target:Target "]]"
    {
      return '<amazon:effect vocal-tract-length="' + toRate(timbre) + '">' + target + '</amazon:effect>';
    }

AmazonDynamicRangeCompression
  = "[[" _ ("amzDRC"i / "adrc"i) _ "|" target:Target "]]"
    {
      return '<amazon:effect name="drc">' + target + '</amazon:effect>';
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

AmazonAutoBreaths
  = AmazonAutoBreathsVolumeFrequencyDuration / AmazonAutoBreathsVolumeDurationFrequency / AmazonAutoBreathsDurationFrequencyVolume
  / AmazonAutoBreathsDurationVolumeFrequency / AmazonAutoBreathsFrequencyDurationVolume / AmazonAutoBreathsFrequencyVolumeDuration
  / AmazonAutoBreathsVolumeDuration / AmazonAutoBreathsDurationVolume
  / AmazonAutoBreathsVolumeFrequency / AmazonAutoBreathsFrequencyVolume
  / AmazonAutoBreathsFrequencyDuration / AmazonAutoBreathsDurationFrequency
  / AmazonAutoBreathsVolume / AmazonAutoBreathsFrequency / AmazonAutoBreathsDuration
  / AmazonDefaultAutoBreaths

AmazonAutoBreathsVolumeFrequencyDuration
  = "[[" _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolumeDurationFrequency
  = "[[" _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDurationFrequencyVolume
  = "[[" _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDurationVolumeFrequency
  = "[[" _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyDurationVolume
  = "[[" _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyVolumeDuration
  = "[[" _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolumeFrequency
  = "[[" _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyVolume
  = "[[" _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolumeDuration
  = "[[" _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDurationVolume
  = "[[" _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyDuration
  = "[[" _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }


AmazonAutoBreathsDurationFrequency
  = "[[" _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolume
  = "[[" _ ("amzAutoBreathsVolume"i / "aabv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequency
  = "[[" _ ("amzAutoBreathsFrequency"i / "aabf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths frequency="' + frequency + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDuration
  = "[[" _ ("amzAutoBreathsDuration"i / "aabd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonDefaultAutoBreaths
  = "[[" _ ("amzDefaultAutoBreaths"i / "adab"i) _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths>' + target + '</amazon:auto-breaths>';
    }

AMAZON_VOLUME
  = "default" / "x-soft" / "soft" / "medium" / "loud" / "x-loud"

AMAZON_FREQUENCY
  = "default" / "x-low" / "low" / "medium" / "high" / "x-high"

AMAZON_PHONATION
  = "soft"

AMAZON_DURATION
  = "x-short" / "short" / "medium" / "long" / "x-long" / "default"

IBMExpressiveness
  = "[[" _ ("ibmExprType"i / "iet"i) _ ":" _ expressiveness:IBM_EXPRTYPE _ "|" target:Target "]]"
    {
      return '<express-as type="' + expressiveness + '">' + target + '</express-as>';
    }

IBMVoiceTransformation
  = IBMTransformationTypeStrength / IBMTransformationStrengthType / IBMTransformationType

IBMTransformationTypeStrength
  = "[[" _ ("ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "," _ ("ibmTransStrength"i / "its"i) _ ":" _ strength:PERCENTAGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="' + type + '" strength="' + toRate(strength) + '">' + target + '</voice-transformation>';
    }

IBMTransformationStrengthType
  = "[[" _ ("ibmTransStrength"i / "its"i) _ ":" _ strength:PERCENTAGE _ "," _ ("ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="' + type + '" strength="' + toRate(strength) + '">' + target + '</voice-transformation>';
    }

IBMTransformationType
  = "[[" _ ("ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="' + type + '">' + target + '</voice-transformation>';
    }

IBMVoiceCustomTransformation
  = IBMTransformationBreathinessPitchRangeTimbre
    / IBMTransformationBreathinessTimbrePitchRange
    / IBMTransformationPitchRangeTimbreBreathiness
    / IBMTransformationPitchRangeBreathinessTimbre
    / IBMTransformationTimbreBreathinessPitchRange
    / IBMTransformationTimbrePitchRangeBreathiness
    / IBMTransformationBreathinessPitchRange / IBMTransformationPitchRangeBreathiness
    / IBMTransformationPitchRangeTimbre / IBMTransformationTimbrePitchRange
    / IBMTransformationTimbreBreathiness / IBMTransformationBreathinessTimbre
    / IBMTransformationBreathiness / IBMTransformationPitchRange / IBMTransformationTimbre

IBMTransformationBreathinessPitchRangeTimbre
  = "[[" _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathinessTimbrePitchRange
  = "[[" _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeTimbreBreathiness
  = "[[" _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeBreathinessTimbre
  = "[[" _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbreBreathinessPitchRange
  = "[[" _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbrePitchRangeBreathiness
  = "[[" _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathinessPitchRange
  = "[[" _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeBreathiness
  = "[[" _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeTimbre
  = "[[" _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbrePitchRange
  = "[[" _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbreBreathiness
  = "[[" _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathinessTimbre
  = "[[" _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathiness
  = "[[" _ ("ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRange
  = "[[" _ ("ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" pitch_range="' + pitch_range + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbre
  = "[[" _ ("ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBM_BREATHINESS
  = "x-low" / "low" / "default" / "high" / "x-high" / PERCENTAGE

IBM_PITCH_RANGE
  = "x-narrow" / "narrow" / "default" / "wide" / "x-wide" / PERCENTAGE

IBM_TIMBRE
  = "Sunrise" / "Breeze"

IBM_TRANSTYPE
  = "Young" / "Soft"

IBM_EXPRTYPE
  = "GoodNews" / "Apology" / "Uncertainty"