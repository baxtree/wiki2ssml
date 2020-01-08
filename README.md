[![Build Status](https://travis-ci.com/baxtree/wiki2ssml.svg?branch=master)](https://travis-ci.com/baxtree/wiki2ssml) ![Codecov](https://img.shields.io/codecov/c/github/baxtree/wiki2ssml) ![Node](https://img.shields.io/static/v1?label=node.js&message=&#8805;6.4.0&color=green) [![GitHub license](https://img.shields.io/github/license/baxtree/wiki2ssml)](https://github.com/baxtree/wiki2ssml/blob/master/LICENSE)


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
#
<p align="center">
<img src="./figures/wikivoice.png" alt="WikiVoice"/>
</p>

# Format
```
[[attribute(:value)?(,attribute:value)*(|target)?]]
```
# Supported Markups
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
| [[mark:NAME]] | Mark referencing a location |
| [[seeAlso:URI] | URI providing additional information about marked-up content]
| [[cacheControl:no-cache]] | No caching on marked-up content |

# Vendor-Specific Markups
| Expressions        | Operations|
| ------------- |-------------|
| [[amzWhispered&#124;TEXT]] | Whispering |
| [[amzPhonation:PHONATION&#124;TEXT]] | Speaking Softly |
| [[amzTimbre:SCALE&#124;TEXT]] | Controlling Timbre |
| [[amzDRC&#124;TEXT]] | Dynamic Range Compression |
| [[amzBreathDuration:SCALE,amzBreathVolume:SCALE]] | Breathing based on the manual model |
| [[amzDefaultBreath]] | Default breathing based on the manual model |
| [[amzAutoBreathsVolume:SCALE,amzAutoBreathsFrequency:SCALE,amzAutoBreathsDuration:SCALE&#124;TEXT]] | Breathing based on the automated model |
| [[amzDefaultAutoBreaths]] | Default breathing based on the automated model |
| [[amzSpeakingStyle:STYLE&#124;TEXT]] | Speaking style |
| [[amzEmotion:EMOTION,amzIntensity:SCALE&#124;TEXT]] | Speaking emotionally |
| [[ibmExprType:TYPE&#124;TEXT]] | Expressiveness type |
| [[ibmTransType:TYPE,ibmTransStrength:SCALE&#124;TEXT]] | Voice transformation |
| [[ibmTransBreathiness:SCALE,ibmTransPitchRange:SCALE,ibmTransTimbre:SCALE&#124;TEXT]] | Voice custom transformation |

More details on canonical attribute values can be found at [Speech Synthesis Markup Language (SSML)](https://www.w3.org/TR/speech-synthesis/). For ranges of vendor-specific values please refer to their online documents.

# parseToSsml(input, languageCode, options)
- input `<string>` (required)
- languageCode `<string>` (required: [RFC 1766](https://tools.ietf.org/html/rfc1766))
- options `<object>` (optional)
  - version `<string>` (default: "1.1")
  - pretty `<boolean>` (default: false)

# Example
```js
var parser = require("wiki2ssml");
try {
    var input = "[[volume:+2dB,speed:50%|Speak this with the volume increased by 2dB at half the default speech rate.]]";
    var ssml = parser.parseToSsml(input, "en-GB", {pretty: true});
    console.log(ssml);
} catch (e) {
    if (e instanceof parser.SyntaxError) {
        // The input does not have valid WikiVoice markups
    } else if (e instanceof parser.ArgumentError) {
        // Either the input or the language code is missing
    } else {
        // Handle any unspecified exceptions
    }
}
```
will output:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd" xml:lang="en-GB">
  <prosody rate="50%" volume="+2dB">Speak this with the volume increased by 2dB at half the default speech rate.</prosody>
</speak>
```
