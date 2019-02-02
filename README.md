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
| `[[volume:SCALE\|TEXT]]` | Speaking volume |
| `[[speed:SCALE\|TEXT]]` | Speaking rate |
| `[[pitch:SCALE\|TEXT]]` | Speaking pitch |
| `[[silence:TEXT]]` | Pause with duration |
| `[[strength:TEXT]]` | Pause with strength |
| `[[emphasis:LEVEL\|TEXT]]` | Emphasis with LEVEL |
| `[[audio:AUDIO_URI]]` | Audio embedded into speech|
| `[[lang:LANGUAGE\|TEXT]]` | Language indicator |
| `[[paragraph\|TEXT]]` | Paragraph indicator |
| `[[sentence\|TEXT]]` | Sentence indicator |
| `[[type:TYPE\|TEXT]]` | Type it should be said as |
| `[[voice:NAME\|TEXT]]` | Voice name it should be said with |
| `[[pos:POS\|TEXT]]` | Part of speech it should be prounouced as |
| `[[substitute:TEXT1\|TEXT2]]` | Replace TEXT2 with TEXT1 as substitution |
| `[[alphabet:ALP,pronunciation:PRO\|TEXT]]` | Phonetic pronunciation |
| `[[volume:SCALE,speed:SCALE,pitch:SCALE\|TEXT]]` | Speaking volume, rate and pitch |
| `[[type:TYPE,format:FORMAT,detail:DETAIL\|TEXT]]` | Type it should be said as |

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
