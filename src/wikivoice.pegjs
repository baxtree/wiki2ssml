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

    function toDigits(matches) {
        return matches.toString().split(",").join("");
    }
    /* eslint-disable */
}
BEGIN
  = text_and_statement:TextAndStatements* text:Text
    {
      return text_and_statement.join("") + text;
    }

TextAndStatements
  = TextParallelStatements / TextSequentialStatements / TextStatement

TextParallelStatements
  = text:Text statements:ParallelStatements
    {
      return text + statements;
    }

TextSequentialStatements
  = text:Text statements:SequentialStatements
    {
      return text + statements;
    }

TextStatement
  = text:Text statement:Statement
    {
      return text + statement;
    }

Text
  = text:(!("[[" / "]]" / "*[[" / "]]*" / "#[[" / "]]#") .)*
    {
      return toText(text);
    }

Target
  = text_left:Text statement:Statement* text_right:Text
    {
      return text_left + statement + text_right;
    }

ParallelStatements
  = "*" statements:Statement+ "*"
    {
      return "<par>" + statements.join("") + "</par>";
    }

SequentialStatements
  = "#" statements:Statement+ "#"
    {
      return "<seq>" + statements.join("") + "</seq>";
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
  = "[[" _ ("audio"i / "aud"i) _ ":" uri:(!"]]" .)+ "]]"
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
  = "[[" _ ("see-also"i / "seeAlso"i / "see"i) _ ":" uri:(!"]]" .)+ "]]"
    {
      return '<meta name="seeAlso" content="' + toText(uri) + '"/>'
    }

CacheControl
  = "[[" _ ("cache-control" / "cacheControl"i / "cac"i) _ ":" content:(!"]]" .)* "]]"
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
  = [0-9]+(.[0-9]+)?"h" / [0-9]+(.[0-9]+)?"min"/ [0-9]+(.[0-9]+)?"s" / [0-9]+(.[0-9]+)?"ms"

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
  = AmazonWhispered / AmazonPhonation / AmazonTimbre / AmazonDynamicRangeCompression
    / AmazonBreathSound / AmazonAutoBreathSound / AmazonSpeakingStyle / AmazonEmotionIntensity / AmazonIntensityEmotion
    / GoogleMediaContainer
    / IBMExpressiveness / IBMVoiceTransformation / IBMVoiceCustomTransformation
    / MicrosoftSpeakingStyle / MicrosoftBackground

AmazonWhispered
  = "[[" _ ("amz-whispered"i / "amz-whi"i / "amzWhispered"i / "aws"i) _ "|" target:Target "]]"
    {
      return '<amazon:effect name="whispered">' + target + '</amazon:effect>';
    }

AmazonPhonation
  = "[[" _ ("amz-phonation"i / "amz-pho"i / "amzPhonation"i / "aph"i) _ ":" _ phonation:AMAZON_PHONATION _ "|" target:Target "]]"
    {
      return '<amazon:effect phonation="' + phonation + '">' + target + '</amazon:effect>';
    }

AmazonTimbre
  = "[[" _ ("amz-timbre"i / "amz-tim"i / "amzTimbre"i / "ati"i) _ ":" _ timbre:PERCENTAGE _ "|" target:Target "]]"
    {
      return '<amazon:effect vocal-tract-length="' + toRate(timbre) + '">' + target + '</amazon:effect>';
    }

AmazonDynamicRangeCompression
  = "[[" _ ("amz-drc"i / "amzDRC"i / "adr"i) _ "|" target:Target "]]"
    {
      return '<amazon:effect name="drc">' + target + '</amazon:effect>';
    }

AmazonBreathSound
  = AmazonBreathDurationVolume / AmazonBreathVolumeDuration
    / AmazonBreathDuration / AmazonBreathVolume
    / AmazonBreath

AmazonBreathDurationVolume
  = "[[" _ ("amz-breath-duration"i / "amz-bre-dur"i / "amzBreathDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-breath-volume"i / "amz-bre-vol"i / "amzBreathVolume"i / "abv"i) _ ":" _ volume:VOLUME _ "]]"
    {
      return '<amazon:breath duration="' + duration + '" ' + 'volume="' + toVolume(volume) + '"/>';
    }

AmazonBreathVolumeDuration
  = "[[" _ ("amz-breath-volume"i / "amz-bre-vol"i / "amzBreathVolume"i / "abv"i) _ ":" _ volume:VOLUME _ "," _ ("amz-breath-duration"i / "amz-bre-dur"i / "amzBreathDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "]]"
    {
      return '<amazon:breath duration="' + duration + '" ' + 'volume="' + toVolume(volume) + '"/>';
    }

AmazonBreathDuration
  = "[[" _ ("amz-breath-duration"i / "amz-bre-dur"i / "amzBreathDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "]]"
    {
      return '<amazon:breath duration="' + duration + '"/>';
    }

AmazonBreathVolume
  = "[[" _ ("amz-breath-volume"i / "amz-bre-vol"i / "amzBreathVolume"i / "abv"i) _ ":" _ volume:VOLUME _ "]]"
    {
      return '<amazon:breath volume="' + toVolume(volume) + '"/>';
    }

AmazonBreath
  = "[[" _ ("amz-default-breath"i / "amz-def-bre"i / "amzDefaultBreath"i / "adb"i) _ "]]"
    {
      return '<amazon:breath/>';
    }

AmazonAutoBreathSound
  = AmazonAutoBreathsVolumeFrequencyDuration / AmazonAutoBreathsVolumeDurationFrequency / AmazonAutoBreathsDurationFrequencyVolume
  / AmazonAutoBreathsDurationVolumeFrequency / AmazonAutoBreathsFrequencyDurationVolume / AmazonAutoBreathsFrequencyVolumeDuration
  / AmazonAutoBreathsVolumeDuration / AmazonAutoBreathsDurationVolume
  / AmazonAutoBreathsVolumeFrequency / AmazonAutoBreathsFrequencyVolume
  / AmazonAutoBreathsFrequencyDuration / AmazonAutoBreathsDurationFrequency
  / AmazonAutoBreathsVolume / AmazonAutoBreathsFrequency / AmazonAutoBreathsDuration
  / AmazonAutoBreaths

AmazonAutoBreathsVolumeFrequencyDuration
  = "[[" _ ("amz-auto-breaths-volume"i / "amz-aut-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amz-auto-breaths-frequency"i / "amz-auto-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolumeDurationFrequency
  = "[[" _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDurationFrequencyVolume
  = "[[" _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDurationVolumeFrequency
  = "[[" _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyDurationVolume
  = "[[" _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyVolumeDuration
  = "[[" _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolumeFrequency
  = "[[" _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyVolume
  = "[[" _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'frequency="' + frequency + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolumeDuration
  = "[[" _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "," _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDurationVolume
  = "[[" _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequencyDuration
  = "[[" _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "," _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }


AmazonAutoBreathsDurationFrequency
  = "[[" _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "," _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths frequency="' + frequency + '" ' + 'duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsVolume
  = "[[" _ ("amz-auto-breaths-volume"i / "amz-auto-bre-vol"i / "amzAutoBreathsVolume"i / "abv"i) _ ":" _ volume:AMAZON_VOLUME _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths volume="' + volume + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsFrequency
  = "[[" _ ("amz-auto-breaths-frequency"i / "amz-aut-bre-fre"i / "amzAutoBreathsFrequency"i / "abf"i) _ ":" _ frequency:AMAZON_FREQUENCY _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths frequency="' + frequency + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreathsDuration
  = "[[" _ ("amz-auto-breaths-duration"i / "amz-aut-bre-dur"i / "amzAutoBreathsDuration"i / "abd"i) _ ":" _ duration:AMAZON_DURATION _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths duration="' + duration + '">' + target + '</amazon:auto-breaths>';
    }

AmazonAutoBreaths
  = "[[" _ ("amz-default-auto-breaths"i / "amz-aut-bre"i / "amzDefaultAutoBreaths"i / "adb"i) _ "|" target:Target "]]"
    {
      return '<amazon:auto-breaths>' + target + '</amazon:auto-breaths>';
    }

AmazonSpeakingStyle
  = "[[" _ ("amz-speaking-style"i / "amz-spe-sty"i / "amzSpeakingStyle"i / "ass"i) _ ":" _ style:AMAZON_STYLE _ "|" target:Target "]]"
    {
      return '<amazon:domain name="' + style + '">' + target + '</amazon:domain>';
    }

AmazonEmotionIntensity
  = "[[" _ ("amz-emotion"i / "amz-emo"i / "amzEmotion"i / "aem"i) _ ":" _ emotion:AMAZON_EMOTION _ "," _ ("amz-intensity"i / "amz-int"i / "amzIntensity"i / "ain"i) _ ":" _ intensity:AMAZON_INTENSITY _ "|" target:Target "]]"
    {
      return '<amazon:emotion name="' + emotion + '" ' + 'intensity="' + intensity + '">' + target + '</amazon:emotion>';
    }

AmazonIntensityEmotion
  = "[[" _ ("amz-intensity"i / "amz-int"i / "amzIntensity"i / "ain"i) _ ":" _ intensity:AMAZON_INTENSITY _ "," _ ("amz-emotion"i / "amz-emo"i / "amzEmotion"i / "aem"i) _ ":" _ emotion:AMAZON_EMOTION _ "|" target:Target "]]"
    {
      return '<amazon:emotion intensity="' + intensity + '" ' + 'name="' + emotion + '">' + target + '</amazon:emotion>';
    }

AMAZON_VOLUME
  = "default" / "x-soft" / "soft" / "medium" / "loud" / "x-loud"

AMAZON_FREQUENCY
  = "default" / "x-low" / "low" / "medium" / "high" / "x-high"

AMAZON_PHONATION
  = "soft"

AMAZON_DURATION
  = "x-short" / "short" / "medium" / "long" / "x-long" / "default"

AMAZON_STYLE
  = "music" / "news"

AMAZON_EMOTION
  = "excited" / "disappointed"

AMAZON_INTENSITY
  = "low" / "medium" / "high"

GoogleMediaContainer
  = GoolgeMediaSpeak / GoolgeMediaSpeakEnd / GoolgeMediaAudio
    / GoolgeMediaSpeakFadeInFadeOut / GoolgeMediaSpeakFadeOutFadeIn
    / GoolgeMediaAudioFadeInFadeOutMedia / GoolgeMediaAudioFadeOutFadeInMedia
    / GoolgeMediaAudioMediaFadeInFadeOut / GoolgeMediaAudioMediaFadeOutFadeIn
    / GoolgeMediaAudioFadeInMediaFadeOut / GoolgeMediaAudioFadeOutMediaFadeIn

GoolgeMediaSpeak
  = "[[" _ ("ggl-media-speak"i / "ggl-med-spe"i / "gglMediaSpeak"i / "gms"i) _ "|" target:Target "]]"
    {
      return '<media><speak>' + target + '</speak></media>';
    }

GoolgeMediaSpeakEnd
  = "[[" _ ("ggl-media-speak-end"i / "ggl-med-spe-end"i / "gglMediaSpeakEnd"i / "gmse"i) _ ":" _ time:TIME _ "|" target:Target "]]"
    {
      return '<media end="' + toTime(time) + '"><speak>' + target + '</speak></media>';
    }

GoolgeMediaSpeakFadeInFadeOut
  = "[[" _ ("ggl-media-speak-fade-in"i / "ggl-medi-spe-fad-in"i / "gglMediaSpeakFadeIn"i / "gsi"i) _ ":" _ fade_in_Duration:TIME _ "," _ ("ggl-media-speak-fade-out"i / "ggl-med-spe-fad-out"i / "gglMediaSpeakFadeOut"i / "gso"i) _ ":" _ fade_out_Duration:TIME _ "|" target:Target "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><speak>' + target + '</speak></media>';
    }

GoolgeMediaSpeakFadeOutFadeIn
  = "[[" _ ("ggl-media-speak-fade-out"i / "ggl-med-spe-fad-out"i / "gglMediaSpeakFadeOut"i / "gso"i) _ ":" _ fade_out_Duration:TIME _ "," _ ("ggl-media-speak-fade-in"i / "ggl-medi-spe-fad-in"i / "gglMediaSpeakFadeIn"i / "gsi"i) _ ":" _ fade_in_Duration:TIME _ "|" target:Target "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><speak>' + target + '</speak></media>';
    }

GoolgeMediaAudio
  = "[[" _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<media><audio src="' + toText(uri) + '"/></media>'
    }
GoolgeMediaAudioFadeInFadeOutMedia
  = "[[" _ ("ggl-media-audio-fade-in"i / "ggl-med-aud-fad-in"i / "gglMediaAudioFadeIn"i / "gfi"i) _ ":" _ fade_in_Duration:TIME _ "," _ ("ggl-media-audio-fade-out"i / "ggl-med-aud-fad-out"i / "gglMediaAudioFadeOut"i / "gfo"i) _ ":" _ fade_out_Duration:TIME _ "," _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!"]]" .)+ "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><audio src="' + toText(uri) + '"/></media>'
    }

GoolgeMediaAudioFadeOutFadeInMedia
  = "[[" _ ("ggl-media-audio-fade-out"i / "ggl-med-aud-fad-out"i / "gglMediaAudioFadeOut"i / "gfo"i) _ ":" _ fade_out_Duration:TIME _ "," _ ("ggl-media-audio-fade-in"i / "ggl-med-aud-fad-in"i / "gglMediaAudioFadeIn"i / "gfi"i) _ ":" _ fade_in_Duration:TIME _ "," _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!"]]" .)+ "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><audio src="' + toText(uri) + '"/></media>'
    }
GoolgeMediaAudioMediaFadeInFadeOut
  = "[[" _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!"," .)+ _ "," _ ("ggl-media-audio-fade-in"i / "ggl-med-aud-fad-in"i / "gglMediaAudioFadeIn"i / "gfi"i) _ ":" _ fade_in_Duration:TIME _ "," _ ("ggl-media-audio-fade-out"i / "ggl-med-aud-fad-out"i / "gglMediaAudioFadeOut"i / "gfo"i) _ ":" _ fade_out_Duration:TIME "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><audio src="' + toText(uri) + '"/></media>'
    }

GoolgeMediaAudioMediaFadeOutFadeIn
  = "[[" _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!"," .)+ _ "," _ ("ggl-media-audio-fade-out"i / "ggl-med-aud-fad-out"i / "gglMediaAudioFadeOut"i / "gfo"i) _ ":" _ fade_out_Duration:TIME _ "," _ ("ggl-media-audio-fade-in"i / "ggl-med-aud-fad-in"i / "gglMediaAudioFadeIn"i / "gfi"i) _ ":" _ fade_in_Duration:TIME "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><audio src="' + toText(uri) + '"/></media>'
    }

GoolgeMediaAudioFadeInMediaFadeOut
  = "[[" _ ("ggl-media-audio-fade-in"i / "ggl-med-aud-fad-in"i / "gglMediaAudioFadeIn"i / "gfi"i) _ ":" _ fade_in_Duration:TIME _ "," _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!"," .)+ _ "," _ ("ggl-media-audio-fade-out"i / "ggl-med-aud-fad-out"i / "gglMediaAudioFadeOut"i / "gfo"i) _ ":" _ fade_out_Duration:TIME "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><audio src="' + toText(uri) + '"/></media>'
    }

GoolgeMediaAudioFadeOutMediaFadeIn
  = "[[" _ ("ggl-media-audio-fade-out"i / "ggl-med-aud-fad-out"i / "gglMediaAudioFadeOut"i / "gfo"i) _ ":" _ fade_out_Duration:TIME _ "," _ ("ggl-media-audio"i / "ggl-med-aud"i / "gglMediaAudio"i / "gma"i) _ ":" uri:(!"," .)+ _ "," _ ("ggl-media-audio-fade-in"i / "ggl-med-aud-fad-in"i / "gglMediaAudioFadeIn"i / "gfi"i) _ ":" _ fade_in_Duration:TIME "]]"
    {
      return '<media fadeInDur="' + toTime(fade_in_Duration) + '" fadeOutDur="' + toTime(fade_out_Duration) + '"><audio src="' + toText(uri) + '"/></media>'
    }

IBMExpressiveness
  = "[[" _ ("ibm-expr-type"i / "ibm-expr-typ"i / "ibmExprType"i / "iet"i) _ ":" _ expressiveness:IBM_EXPRTYPE _ "|" target:Target "]]"
    {
      return '<express-as type="' + expressiveness + '">' + target + '</express-as>';
    }

IBMVoiceTransformation
  = IBMTransformationTypeStrength / IBMTransformationStrengthType / IBMTransformationType

IBMTransformationTypeStrength
  = "[[" _ ("ibm-trans-type"i / "ibm-tra-typ"i / "ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "," _ ("ibm-trans-strength"i / "ibm-tra-stre"i / "ibmTransStrength"i / "its"i) _ ":" _ strength:PERCENTAGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="' + type + '" strength="' + toRate(strength) + '">' + target + '</voice-transformation>';
    }

IBMTransformationStrengthType
  = "[[" _ ("ibm-trans-strength"i / "ibm-tra-stre"i / "ibmTransStrength"i / "its"i) _ ":" _ strength:PERCENTAGE _ "," _ ("ibm-trans-type"i / "ibm-tra-typ"i / "ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="' + type + '" strength="' + toRate(strength) + '">' + target + '</voice-transformation>';
    }

IBMTransformationType
  = "[[" _ ("ibm-trans-type"i / "ibm-tra-typ"i / "ibmTransType"i / "itt"i) _ ":" _ type:IBM_TRANSTYPE _ "|" target:Target "]]"
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
  = "[[" _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathinessTimbrePitchRange
  = "[[" _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeTimbreBreathiness
  = "[[" _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeBreathinessTimbre
  = "[[" _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbreBreathinessPitchRange
  = "[[" _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbrePitchRangeBreathiness
  = "[[" _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathinessPitchRange
  = "[[" _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeBreathiness
  = "[[" _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibm-trans-breathiness"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'pitch_range="' + pitch_range + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRangeTimbre
  = "[[" _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "," _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbrePitchRange
  = "[[" _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" pitch_range="' + pitch_range + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbreBreathiness
  = "[[" _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "," _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathinessTimbre
  = "[[" _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "," _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '" ' + 'timbre="' + timbre + '">' + target + '</voice-transformation>';
    }

IBMTransformationBreathiness
  = "[[" _ ("ibm-trans-breathiness"i / "ibm-tra-bre"i / "ibmTransBreathiness"i / "itb"i) _ ":" _ breathiness:IBM_BREATHINESS _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" breathiness="' + breathiness + '">' + target + '</voice-transformation>';
    }

IBMTransformationPitchRange
  = "[[" _ ("ibm-trans-pitch-range"i / "ibm-tra-pit-ran"i / "ibmTransPitchRange"i / "itp"i) _ ":" _ pitch_range:IBM_PITCH_RANGE _ "|" target:Target "]]"
    {
      return '<voice-transformation type="Custom" pitch_range="' + pitch_range + '">' + target + '</voice-transformation>';
    }

IBMTransformationTimbre
  = "[[" _ ("ibm-trans-timbre"i / "ibm-tra-tim"i / "ibmTransTimbre"i / "itm"i) _ ":" _ timbre:IBM_TIMBRE _ "|" target:Target "]]"
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

MicrosoftBackground
  = MicrosoftBackgroundAudio
    / MicrosoftBackgroundAudioVolume / MicrosoftBackgroundVolumeAudio
    / MicrosoftBackgroundAudioFadeIn / MicrosoftBackgroundFadeInAudio
    / MicrosoftBackgroundAudioFadeOut / MicrosoftBackgroundFadeOutAudio
    / MicrosoftBackgroundAudioFadeInFadeOut / MicrosoftBackgroundAudioFadeOutFadeIn
    / MicrosoftBackgroundFadeInAudioFadeOut / MicrosoftBackgroundFadeInFadeOutAudio
    / MicrosoftBackgroundFadeOutAudioFadeIn / MicrosoftBackgroundFadeOutFadeInAudio

MicrosoftSpeakingStyle
  = "[[" _ ("mst-expr-type"i / "mst-exp-typ"i / "mstExprType"i / "met"i) _ ":" _ expressiveness:(!"|" .)+ _ "|" target:Target "]]"
    {
      return '<mstts:express-as type="' + toText(expressiveness) + '">' + target + '</mstts:express-as>';
    }

MicrosoftBackgroundAudio
  = "[[" _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '"/>'
    }

MicrosoftBackgroundAudioVolume
  = "[[" _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-volume"i / "mst-bg-aud-vol"i / "mstBackgroundAudioVolume"i / "mbv"i) _ ":" _ volume:MICROSOFT_VOLUME "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" volume="' + toDigits(volume) + '"/>'
    }

MicrosoftBackgroundVolumeAudio
  = "[[" _ ("mst-background-audio-volume"i / "mst-bg-aud-vol"i / "mstBackgroundAudioVolume"i / "mbv"i) _ ":" _ volume:MICROSOFT_VOLUME _ "," _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" volume="' + toDigits(volume) + '"/>'
    }

MicrosoftBackgroundAudioFadeIn
  = "[[" _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_millis:MICROSOFT_FADE_DURATION "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_millis) + '"/>'
    }

MicrosoftBackgroundFadeInAudio
  = "[[" _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_millis) + '"/>'
    }

MicrosoftBackgroundAudioFadeOut
  = "[[" _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_millis:MICROSOFT_FADE_DURATION "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadeout="' + toDigits(fade_millis) + '"/>'
    }

MicrosoftBackgroundFadeOutAudio
  = "[[" _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadeout="' + toDigits(fade_millis) + '"/>'
    }

MicrosoftBackgroundAudioFadeInFadeOut
  = "[[" _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_in_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_out_millis:MICROSOFT_FADE_DURATION "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_in_millis) + '" fadeout="' + toDigits(fade_out_millis) + '"/>'
    }

MicrosoftBackgroundAudioFadeOutFadeIn
  = "[[" _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_out_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_in_millis:MICROSOFT_FADE_DURATION "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_in_millis) + '" fadeout="' + toDigits(fade_out_millis) + '"/>'
    }

MicrosoftBackgroundFadeInAudioFadeOut
  = "[[" _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_in_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_out_millis:MICROSOFT_FADE_DURATION "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_in_millis) + '" fadeout="' + toDigits(fade_out_millis) + '"/>'
    }

MicrosoftBackgroundFadeInFadeOutAudio
  = "[[" _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_in_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_out_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_in_millis) + '" fadeout="' + toDigits(fade_out_millis) + '"/>'
    }

MicrosoftBackgroundFadeOutAudioFadeIn
  = "[[" _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_out_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio"i / "mst-bg-aud"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!"," .)+ _ "," _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_in_millis:MICROSOFT_FADE_DURATION "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_in_millis) + '" fadeout="' + toDigits(fade_out_millis) + '"/>'
    }

MicrosoftBackgroundFadeOutFadeInAudio
  = "[[" _ ("mst-background-audio-fade-out"i / "mst-bg-aud-fad-out"i / "mstBackgroundAudioFadeOut"i / "mfo"i) _ ":" _ fade_out_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio-fade-in"i / "mst-bg-aud-fad-in"i / "mstBackgroundAudioFadeIn"i / "mfi"i) _ ":" _ fade_in_millis:MICROSOFT_FADE_DURATION _ "," _ ("mst-background-audio"i / "mstBackgroundAudio"i / "mba"i) _ ":" uri:(!("]]" / ",") .)+ "]]"
    {
      return '<mstts:backgroundaudio src="' + toText(uri) + '" fadein="' + toDigits(fade_in_millis) + '" fadeout="' + toDigits(fade_out_millis) + '"/>'
    }

MICROSOFT_VOLUME
  = [1][0][0] / [1-9][0-9] / [0-9]

MICROSOFT_FADE_DURATION
  = [1][0][0][0][0] / [1-9][0-9][0-9][0-9] / [1-9][0-9][0-9] / [1-9][0-9] / [0-9]