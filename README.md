# Wiki2SSML
`wiki2ssml` can transform the `WikiVoice` markups into the W3C SSML widely supported by various text-to-speech services as an interchange format for synthesised voice tuning.

# Introduction
`wiki2ssml` eases the burden of editors preparing scripts later used for speech synthesis. It is powered by `WikiVoice` which provides an unobtrusive solution of blending voice-tuning markups and free texts and a seamless experience of editing scripts and voices in one go. 

# Install
```sh
$ npm install wiki2ssml
```
or 
```sh
$ yarn add wiki2ssml
```
# WikiVoice Format
```
[[attribute:value(,attribute:value)*(|TEXT)*]]
```
# Supported WikiVoice Markups
| Expressions        | Operations|
| ------------- |-------------|
| [[volume:SCALE&#124;TEXT]] | Speaking volume |
| [[speed:SCALE&#124;TEXT]] | Speaking rate |
| [[pitch:SCALE&#124;TEXT]] | Speaking pitch |
| [[silence:DURATION,strength:STRENGTH]] | Pause with duration and strength |
| [[emphasis:LEVEL&#124;TEXT]] | Emphasis with LEVEL |
| [[audio:AUDIO_URI]] | Audio embedded into speech|
| [[lang:LANGUAGE&#124;TEXT]] | Language indicator |
| [[paragraph&#124;TEXT]] | Paragraph indicator |
| [[sentence&#124;TEXT]] | Sentence indicator |
| [[type:TYPE&#124;TEXT]] | Type it should be said as |
| [[voice:NAME&#124;TEXT]] | Voice name it should be said with |
| [[pos:POS&#124;TEXT]] | Part of speech it should be prounouced as |
| [[substitute:TEXT1&#124;TEXT2]] | Replace TEXT2 with TEXT1 as substitution |
| [[alphabet:ALPHABET,pronunciation:PRONUNCIATION&#124;TEXT]] | Phonetic pronunciation |
| [[volume:SCALE,speed:SCALE,pitch:SCALE&#124;TEXT]] | Speaking volume, rate and pitch |
| [[type:TYPE,format:FORMAT,detail:DETAIL&#124;TEXT]] | Type it should be said as |
| [[mark:NAME&#124;TEXT]] | Mark referencing a location |

# Supported Vendor-Specific Markups
| Expressions        | Operations|
| ------------- |-------------|
| [[amzWhispered&#124;TEXT]] | Whispering |
| [[amzPhonation:soft&#124;TEXT]] | Speaking Softly |
| [[amzTimbre:SCALE&#124;TEXT]] | Controlling Timbre |
| [[amzDRC&#124;TEXT]] | Dynamic Range Compression |
| [[amzBreathDuration:SCALE,amzBreathVolume:SCALE]] | Breathing with duration and volume |
| [[amzDefaultBreath]] | Default sound of breathing |
| [[ibmExprType:TYPE&#124;TEXT]] | Expressiveness type |
| [[ibmTransType:TYPE,ibmStrength:SCALE&#124;TEXT]] | Voice transformation |


More details on canonical attribute values can be found at [Speech Synthesis Markup Language (SSML)](https://www.w3.org/TR/speech-synthesis/).

# Example
```js
var parser = require("wiki2ssml");
try {
    var ssml = parser.parseToSsml("[[volume:+2dB,speed:50%|Speak this with the volume increased by 2dB at half the default speech rate.]]", "en-GB");
    console.log(ssml);
} catch (e) {
    if (e instanceof parser.SyntaxError) {
        // WikiVoice markups are invalid
    } else if (e instanceof parser.ArgumentError) {
        // The language code is missing
    } else {
        // Handle any unspecified exceptions
    }
}
```
will output:
```xml
<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd" xml:lang="en-GB">
    <prosody volume="+2dB" rate="50%">
    Speak this with the volume increased by 2dB at half the default speech rate.
    </prosody>
</speak>
```
