"use strict";

var helper = require("./helper");

describe("Test wiki2ssml", () => {

    var undertest;

    describe("Vendor extensions", () => {
        describe("Amazon Polly", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[amzWhispered|TEXT]]", expected: helper.HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amz-whispered|TEXT]]", expected: helper.HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[aws|TEXT]]", expected: helper.HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amzPhonation:soft|TEXT]]", expected: helper.HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amz-phonation:soft|TEXT]]", expected: helper.HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[aph:soft|TEXT]]", expected: helper.HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amzTimbre:+15%|TEXT]]", expected: helper.HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amz-timbre:+15%|TEXT]]", expected: helper.HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[ati:+15%|TEXT]]", expected: helper.HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amzDRC|TEXT]]", expected: helper.HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amz-drc|TEXT]]", expected: helper.HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[adr|TEXT]]", expected: helper.HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + helper.TAIL },
                { expression: "[[amz-max-duration:5s|TEXT]]", expected: helper.HEAD + "<prosody amazon:max-duration=\"5s\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[amz-max-dur:5s|TEXT]]", expected: helper.HEAD + "<prosody amazon:max-duration=\"5s\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[amzMaxDuration:5s|TEXT]]", expected: helper.HEAD + "<prosody amazon:max-duration=\"5s\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[amd:5s|TEXT]]", expected: helper.HEAD + "<prosody amazon:max-duration=\"5s\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[amzBreathDuration:medium,amzBreathVolume:x-loud]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[amz-breath-duration:medium,amz-breath-volume:x-loud]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[abd:medium,abv:x-loud]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[amzBreathVolume:x-loud,amzBreathDuration:medium]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[amz-breath-volume:x-loud,amz-breath-duration:medium]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[abv:x-loud,abd:medium]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[amzBreathVolume:x-loud]]", expected: helper.HEAD + "<amazon:breath volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[amz-breath-volume:x-loud]]", expected: helper.HEAD + "<amazon:breath volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[abv:x-loud]]", expected: helper.HEAD + "<amazon:breath volume=\"x-loud\"/>" + helper.TAIL },
                { expression: "[[amzBreathDuration:medium]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\"/>" + helper.TAIL },
                { expression: "[[amz-breath-duration:medium]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\"/>" + helper.TAIL },
                { expression: "[[abd:medium]]", expected: helper.HEAD + "<amazon:breath duration=\"medium\"/>" + helper.TAIL },
                { expression: "[[amzDefaultBreath]]", expected: helper.HEAD + "<amazon:breath/>" + helper.TAIL },
                { expression: "[[amz-default-breath]]", expected: helper.HEAD + "<amazon:breath/>" + helper.TAIL },
                { expression: "[[adb]]", expected: helper.HEAD + "<amazon:breath/>" + helper.TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsFrequency:low,amzAutoBreathsDuration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-frequency:low,amz-auto-breaths-duration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abv:medium,abf:low,abd:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsDuration:long,amzAutoBreathsFrequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-duration:long,amz-auto-breaths-frequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abv:medium,abd:long,abf:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsFrequency:low,amzAutoBreathsVolume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-frequency:low,amz-auto-breaths-volume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abd:long,abf:low,abv:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsVolume:medium,amzAutoBreathsFrequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-volume:medium,amz-auto-breaths-frequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abd:long,abv:medium,abf:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsVolume:medium,amzAutoBreathsDuration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-volume:medium,amz-auto-breaths-duration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abf:low,abv:medium,abd:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsDuration:long,amzAutoBreathsVolume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-duration:long,amz-auto-breaths-volume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abf:low,abd:long,abv:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsFrequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-frequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abv:medium,abf:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsVolume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-volume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abf:low,abv:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsVolume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-volume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abd:long,abv:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsDuration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-duration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abv:medium,abd:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsDuration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-duration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abf:low,abd:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsFrequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-frequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abd:long,abf:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsVolume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-volume:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abv:medium|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths volume=\"medium\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsFrequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-frequency:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abf:low|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths frequency=\"low\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzAutoBreathsDuration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-auto-breaths-duration:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[abd:long|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths duration=\"long\">TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzDefaultAutoBreaths|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths>TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amz-default-auto-breaths|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths>TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[adb|TEXT]]", expected: helper.HEAD + "<amazon:auto-breaths>TEXT</amazon:auto-breaths>" + helper.TAIL },
                { expression: "[[amzSpeakingStyle:music|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"music\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[amz-speaking-style:music|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"music\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[ass:music|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"music\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[amzSpeakingStyle:news|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"news\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[amz-speaking-style:news|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"news\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[ass:news|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"news\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[amzSpeakingStyle:conversational|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"conversational\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[amz-speaking-style:conversational|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"conversational\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[ass:conversational|TEXT]]", expected: helper.HEAD + "<amazon:domain name=\"conversational\">TEXT</amazon:domain>" + helper.TAIL },
                { expression: "[[amzEmotion:excited,amzIntensity:low|TEXT]]", expected: helper.HEAD + "<amazon:emotion name=\"excited\" intensity=\"low\">TEXT</amazon:emotion>" + helper.TAIL },
                { expression: "[[amz-emotion:excited,amz-intensity:low|TEXT]]", expected: helper.HEAD + "<amazon:emotion name=\"excited\" intensity=\"low\">TEXT</amazon:emotion>" + helper.TAIL },
                { expression: "[[aem:excited,ain:low|TEXT]]", expected: helper.HEAD + "<amazon:emotion name=\"excited\" intensity=\"low\">TEXT</amazon:emotion>" + helper.TAIL },
                { expression: "[[amzIntensity:low,amzEmotion:excited|TEXT]]", expected: helper.HEAD + "<amazon:emotion intensity=\"low\" name=\"excited\">TEXT</amazon:emotion>" + helper.TAIL },
                { expression: "[[amz-intensity:low,amz-emotion:excited|TEXT]]", expected: helper.HEAD + "<amazon:emotion intensity=\"low\" name=\"excited\">TEXT</amazon:emotion>" + helper.TAIL },
                { expression: "[[ain:low,aem:excited|TEXT]]", expected: helper.HEAD + "<amazon:emotion intensity=\"low\" name=\"excited\">TEXT</amazon:emotion>" + helper.TAIL }
            ];

            var sad = [
                { expression: "[[amzPhonation:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzTimbre:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amz-max-duration:5m|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amz-max-duration:5h|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzBreathVolume:unknown]]", expected: undertest.SyntaxError },
                { expression: "[[amzBreathDuration:unknown]]", expected: undertest.SyntaxError },
                { expression: "[[amzAutoBreathsVolume:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzAutoBreathsFrequency:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzAutoBreathsDuration:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzSpeakingStyle:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzEmotion:unknown,amzIntensity:low|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzIntensity:unknown, amzEmotion:excited|TEXT]]", expected: undertest.SyntaxError }
            ];

            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });
    });

    describe("Google Text to Speech", () => {
        undertest = require("../src/wiki2ssml");
        var happy = [
            { expression: "[[gglMediaSpeak|TEXT]]", expected: helper.HEAD + "<media><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak|TEXT]]", expected: helper.HEAD + "<media><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gms|TEXT]]", expected: helper.HEAD + "<media><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaSpeakBegin:-10s|TEXT]]", expected: helper.HEAD + "<media begin=\"-10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-begin:10s|TEXT]]", expected: helper.HEAD + "<media begin=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gmsb:10s|TEXT]]", expected: helper.HEAD + "<media begin=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaSpeakEnd:10s|TEXT]]", expected: helper.HEAD + "<media end=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-end:10s|TEXT]]", expected: helper.HEAD + "<media end=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gmse:10s|TEXT]]", expected: helper.HEAD + "<media end=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaSpeakBegin:5s,gglMediaSpeakEnd:10s|TEXT]]", expected: helper.HEAD + "<media begin=\"5s\" end=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaSpeakEnd:10s,gglMediaSpeakBegin:5s|TEXT]]", expected: helper.HEAD + "<media begin=\"5s\" end=\"10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-end:+10s|TEXT]]", expected: helper.HEAD + "<media end=\"+10s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-begin:foo_id.begin+250ms|TEXT]]", expected: helper.HEAD + "<media begin=\"foo_id.begin+250ms\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-end:foo_id.end-250ms|TEXT]]", expected: helper.HEAD + "<media end=\"foo_id.end-250ms\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaSpeakFadeIn:1s,gglMediaSpeakFadeOut:2s|TEXT]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-fade-in:1s,ggl-media-speak-fade-out:2s|TEXT]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaSpeakFadeOut:2s,gglMediaSpeakFadeIn:1s|TEXT]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[ggl-media-speak-fade-out:2s,ggl-media-speak-fade-in:1s|TEXT]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + helper.TAIL },
            { expression: "[[gglMediaAudio:https://example.mp3]]", expected: helper.HEAD + "<media><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio:https://example.mp3]]", expected: helper.HEAD + "<media><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gma:https://example.mp3]]", expected: helper.HEAD + "<media><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gglMediaAudioFadeIn:1ms,gglMediaAudioFadeOut:2ms,gglMediaAudio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio-fade-in:1ms,ggl-media-audio-fade-out:2ms,ggl-media-audio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gglMediaAudio:https://example.mp3,gglMediaAudioFadeIn:1ms,gglMediaAudioFadeOut:2ms]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio:https://example.mp3,gglMediaAudioFadeIn:1ms,gglMediaAudioFadeOut:2ms]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gglMediaAudio:https://example.mp3,gglMediaAudioFadeOut:2s,gglMediaAudioFadeIn:1s]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio:https://example.mp3,gglMediaAudioFadeOut:2s,gglMediaAudioFadeIn:1s]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gglMediaAudioFadeIn:1ms,gglMediaAudio:https://example.mp3,gglMediaAudioFadeOut:2ms]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio-fade-in:1ms,ggl-media-audio:https://example.mp3,ggl-media-audio-fade-out:2ms]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gglMediaAudioFadeOut:2s,gglMediaAudio:https://example.mp3,gglMediaAudioFadeIn:1s]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio-fade-out:2s,ggl-media-audio:https://example.mp3,gglMediaAudioFadeIn:1s]]", expected: helper.HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gfi:1ms,gfo:2ms,gglMediaAudio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gfi:1ms,gfo:2ms,ggl-media-audio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gglMediaAudioFadeOut:2ms,gglMediaAudioFadeIn:1ms,gglMediaAudio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[ggl-media-audio-fade-out:2ms,ggl-media-audio-fade-in:1ms,ggl-media-audio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gfo:2ms,gfi:1ms,gglMediaAudio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL },
            { expression: "[[gfo:2ms,gfi:1ms,ggl-media-audio:https://example.mp3]]", expected: helper.HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + helper.TAIL }
        ];

        var sad = [
            { expression: "[[gglMediaSpeakEnd:unknown|TEXT]]", expected: undertest.SyntaxError },
            { expression: "[[gglMediaAudioFadeOut:unknown,gglMediaAudioFadeIn:1ms,gglMediaAudio:https://example.mp3]]", expected: undertest.SyntaxError },
            { expression: "[[gglMediaAudioFadeOut:2s,gglMediaAudioFadeIn:unknown,gglMediaAudio:https://example.mp3]]", expected: undertest.SyntaxError }
        ];

        helper.runHappyTests(happy, undertest);
        helper.runSadTests(sad, undertest);
    });

    describe("IBM Watson Text to Speech", () => {
        undertest = require("../src/wiki2ssml");
        var happy = [
            { expression: "[[ibmExprType:GoodNews|TEXT]]", expected: helper.HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + helper.TAIL },
            { expression: "[[ibm-expr-type:GoodNews|TEXT]]", expected: helper.HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + helper.TAIL },
            { expression: "[[iet:GoodNews|TEXT]]", expected: helper.HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + helper.TAIL },
            { expression: "[[ibmTransType:Young,ibmTransStrength:80%|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-type:Young,ibm-trans-strength:80%|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itt:Young,its:80%|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransStrength:80%,ibmTransType:Young|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-strength:80%,ibm-trans-type:Young|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransType:Young|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-type:Young|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itt:Young|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransBreathiness:high,ibmTransPitchRange:wide,ibmTransTimbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-breathiness:high,ibm-trans-pitch-range:wide,ibm-trans-timbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itb:high,itp:wide,itm:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransBreathiness:high,ibmTransTimbre:Sunrise,ibmTransPitchRange:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-breathiness:high,ibm-trans-timbre:Sunrise,ibm-trans-pitch-range:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itb:high,itm:Sunrise,itp:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransPitchRange:wide,ibmTransTimbre:Sunrise,ibmTransBreathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itp:wide,itm:Sunrise,itb:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransPitchRange:wide,ibmTransBreathiness:high,ibmTransTimbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-pitch-range:wide,ibm-trans-breathiness:high,ibm-trans-timbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itp:wide,itb:high,itm:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransTimbre:Sunrise,ibmTransBreathiness:high,ibmTransPitchRange:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-breathiness:high,ibm-trans-pitch-range:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itm:Sunrise,itp:wide,itb:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransTimbre:Sunrise,ibmTransPitchRange:wide,ibmTransBreathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-pitch-range:wide,ibm-trans-breathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itm:Sunrise,itp:wide,itb:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransBreathiness:high,ibmTransPitchRange:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-breathiness:high,ibm-trans-pitch-range:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itb:high,itp:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransBreathiness:high,ibmTransTimbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-breathiness:high,ibm-trans-timbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itb:high,itm:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransPitchRange:wide,ibmTransTimbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-pitch-range:wide,ibm-trans-timbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itp:wide,itm:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransPitchRange:wide,ibmTransBreathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-pitch-range:wide,ibm-trans-breathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itp:wide,itb:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransTimbre:Sunrise,ibmTransBreathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-breathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itm:Sunrise,itb:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransTimbre:Sunrise,ibmTransPitchRange:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-pitch-range:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itm:Sunrise,itp:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransBreathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-breathiness:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itb:high|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransPitchRange:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-pitch-range:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itp:wide|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibmTransTimbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[ibm-trans-timbre:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL },
            { expression: "[[itm:Sunrise|TEXT]]", expected: helper.HEAD + "<voice-transformation type=\"Custom\" timbre=\"Sunrise\">TEXT</voice-transformation>" + helper.TAIL }
        ];

        var sad = [
            { expression: "[[ibmExprType:unknown|TEXT]]", expected: undertest.SyntaxError },
            { expression: "[[ibmTransType:unknown|TEXT]]", expected: undertest.SyntaxError },
            { expression: "[[ibmTransStrength:unknown,ibmTransType:Young|TEXT]]", expected: undertest.SyntaxError },
            { expression: "[[ibmTransBreathiness:unknown|TEXT]]", expected: undertest.SyntaxError },
            { expression: "[[ibmTransPitchRange:unknown|TEXT]]", expected: undertest.SyntaxError },
            { expression: "[[ibmTransTimbre:unknown|TEXT]]",expected: undertest.SyntaxError }
        ];

        helper.runHappyTests(happy, undertest);
        helper.runSadTests(sad, undertest);
    });

    describe("Microsoft Cognitive Speech Service", () => {
        undertest = require("../src/wiki2ssml");
        var happy = [
            { expression: "[[mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\"/>" + helper.TAIL },
            { expression: "[[mba:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioVolume:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mstBackgroundAudioVolume:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + helper.TAIL },
            { expression: "[[mba:https://example.mp3,mbv:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + helper.TAIL },
            { expression: "[[mba:https://example.mp3,mbv:50]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"50\"/>" + helper.TAIL },
            { expression: "[[mba:https://example.mp3,mbv:100]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"100\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioVolume:0,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-volume:0,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + helper.TAIL },
            { expression: "[[mbv:0,mba:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mstBackgroundAudioFadeIn:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10000]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-in:10000]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeIn:0,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-in:0,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeIn:10000,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-in:10000,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + helper.TAIL },
            { expression: "[[mba:https://example.mp3,mfi:10000]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-out:0]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:10000]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-out:10000]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeOut:0,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-out:0,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeOut:10000,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-out:10000,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + helper.TAIL },
            { expression: "[[mba:https://example.mp3,mfo:10000]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10,mstBackgroundAudioFadeOut:20]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-in:10,mst-background-audio-fade-out:20]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:20,mstBackgroundAudioFadeIn:10]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-out:20,mst-background-audio-fade-in:10]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeIn:10,mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:20]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-in:10,mst-background-audio:https://example.mp3,mst-background-audio-fade-out:20]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeIn:10,mstBackgroundAudioFadeOut:20,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-in:10,mst-background-audio-fade-out:20,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeOut:20,mstBackgroundAudioFadeIn:10,mstBackgroundAudio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-out:20,mst-background-audio-fade-in:10,mst-background-audio:https://example.mp3]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mstBackgroundAudioFadeOut:20,mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL },
            { expression: "[[mst-background-audio-fade-out:20,mst-background-audio:https://example.mp3,mst-background-audio-fade-in:10]]", expected: helper.EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + helper.TAIL }
        ];

        var sad = [
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioVolume:101]]", expected: undertest.SyntaxError },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioVolume:-1]]", expected: undertest.SyntaxError },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10001]]", expected: undertest.SyntaxError },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:-1]]", expected: undertest.SyntaxError },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:10001]]", expected: undertest.SyntaxError },
            { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:-1]]", expected: undertest.SyntaxError }
        ];

        helper.runHappyTests(happy, undertest);
        helper.runSadTests(sad, undertest);
    });
});
