[![Build Status](https://github.com/baxtree/wiki2ssml/actions/workflows/ci-pipeline.yml/badge.svg?branch=master)](https://github.com/baxtree/wiki2ssml/actions/workflows/ci-pipeline.yml?query=branch%3Amaster) ![Codecov](https://img.shields.io/codecov/c/github/baxtree/wiki2ssml) ![Node](https://img.shields.io/static/v1?label=node.js&message=&#8805;16.0.0&color=green) [![GitHub license](https://img.shields.io/github/license/baxtree/wiki2ssml)](https://github.com/baxtree/wiki2ssml/blob/master/LICENSE)


# Wiki2SSML

`wiki2ssml` can transform the `WikiVoice` markups into the W3C SSML widely supported by various text-to-speech services as an interchange format for synthesised voice tuning.

# Install
```sh
$ npm install wiki2ssml
```
or
```sh
$ yarn add wiki2ssml
```

# Introduction
`wiki2ssml` eases the burden of editors preparing scripts in SSML, widely understood by modern speech synthesisers including but not limited to Amazon Polly, Google TTS, IBM Watson TTS and Microsoft Azure TTS. It has been developed in Vanilla JavaScript and powered by `WikiVoice` which provides an unobtrusive solution of blending voice-tuning markups with free texts and creates seamless experiences of editing scripts and voices in one go.
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
| [[lexicon:URI,type:TEXT]] | Location of the lexicon document and its media type |
| &#42;[[...]][[...]]...[[...]]&#42; | &#60;par&#62; time container with one or more markups|
| &#35;[[...]][[...]]...[[...]]&#35; | &#60;seq&#62; time container with one or more markups|

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
| [[amzMaxDuration:DURATION#124;TEXT]] | Maximum Speech duration |
| [[gglMediaSpeak&#124;TEXT]] | Media container for speech |
| [[gglMediaSpeakEnd:DURATION&#124;TEXT]] | Media container for speech with the ending time |
| [[gglMediaSpeakFadeIn:DURATION,gglMediaSpeakFadeOut:DURATION&#124;TEXT]] | Media container for speach with fade |
| [[gglMediaAudio:URI]] | Media container for audio |
| [[gglMediaAudioFadeIn:DURATION,gglMediaAudioFadeOut:DURATION,gglMediaAudio:URI]] | Media container for audio with fade |
| [[ibmExprType:TYPE&#124;TEXT]] | Expressiveness type |
| [[ibmTransType:TYPE,ibmTransStrength:SCALE&#124;TEXT]] | Voice transformation |
| [[ibmTransBreathiness:SCALE,ibmTransPitchRange:SCALE,ibmTransTimbre:SCALE&#124;TEXT]] | Voice custom transformation |
| [[voice:NAME&#124;[[mstExprType:TYPE&#124;TEXT]]]] | Voice-specific speaking style |
| [[mstBackgroundAudio:URI,mstBackgroundAudioVolume:SCALE]] | Background audio and its volume |
| [[mstBackgroundAudio:URI,mstBackgroundAudioFadeIn:SCALE,mstBackgroundAudioFadeOut:SCALE]] | Background audio with fade-in and fade-out |
| [[mstExprStyle:STYLE,mstExprDegree:SCALE&#124;TEXT]] | Speaking style and its intensity |

More details on canonical attribute values can be found at [Speech Synthesis Markup Language (SSML)](https://www.w3.org/TR/speech-synthesis/). For ranges of vendor-specific values please refer to their online documents. Each attribute name in camel case can be rewritten in kebab case (e.g., firstSecondThird <=> first-second-third). Non-vendor-specific attributes can be abbreviated into their first three letters.

# parseToSsml(input, languageCode, options)
- input `<string>` (required)
- languageCode `<string>` (required: [RFC 1766](https://tools.ietf.org/html/rfc1766))
- options `<object>` (optional)
  - version `<string>` (default: "1.1")
  - pretty `<boolean>` (default: false)
  - encoding `<string>` (default: "UTF-8")

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
will print out:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd" xml:lang="en-GB">
  <prosody rate="50%" volume="+2dB">Speak this with the volume increased by 2dB at half the default speech rate.</prosody>
</speak>
```
