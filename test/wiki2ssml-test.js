"use strict";

var expect = require("chai").expect;
var xml2js = require("xml2js");
var helper = require("./helper");

describe("Test wiki2ssml", () => {

    var undertest;

    describe("Test grammar", () => {
        it("should have no grammar errors", () => {
            try {
                undertest = require("../src/wiki2ssml");
            } catch (e) {
                expect.fail();
            }
        });
    });

    describe("Test parser", () => {
        describe("Speed, pitch and volume", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[speed:x-slow|TEXT]]", expected: helper.HEAD + "<prosody rate=\"x-slow\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:slow|TEXT]]", expected: helper.HEAD + "<prosody rate=\"slow\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:fast|TEXT]]", expected: helper.HEAD + "<prosody rate=\"fast\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:x-fast|TEXT]]", expected: helper.HEAD + "<prosody rate=\"x-fast\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:default|TEXT]]", expected: helper.HEAD + "<prosody rate=\"default\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:5%|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:x-slow|TEXT]]", expected: helper.HEAD + "<prosody rate=\"x-slow\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:slow|TEXT]]", expected: helper.HEAD + "<prosody rate=\"slow\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:fast|TEXT]]", expected: helper.HEAD + "<prosody rate=\"fast\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:x-fast|TEXT]]", expected: helper.HEAD + "<prosody rate=\"x-fast\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:default|TEXT]]", expected: helper.HEAD + "<prosody rate=\"default\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:5%|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:x-low|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"x-low\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:low|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"low\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:medium|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:high|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"high\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:x-high|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"x-high\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:default|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"default\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:+5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:-5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"-5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:x-low|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"x-low\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:low|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"low\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:medium|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:high|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"high\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:x-high|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"x-high\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:default|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"default\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:+5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:-5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"-5%\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:+5Hz|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+5Hz\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:+5Hz|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+5Hz\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:+12st|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+12st\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:+12st|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+12st\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:silent|TEXT]]", expected: helper.HEAD + "<prosody volume=\"silent\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:x-soft|TEXT]]", expected: helper.HEAD + "<prosody volume=\"x-soft\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:soft|TEXT]]", expected: helper.HEAD + "<prosody volume=\"soft\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:medium|TEXT]]", expected: helper.HEAD + "<prosody volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:loud|TEXT]]", expected: helper.HEAD + "<prosody volume=\"loud\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:x-loud|TEXT]]", expected: helper.HEAD + "<prosody volume=\"x-loud\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:+6dB|TEXT]]", expected: helper.HEAD + "<prosody volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:-6dB|TEXT]]", expected: helper.HEAD + "<prosody volume=\"-6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:silent|TEXT]]", expected: helper.HEAD + "<prosody volume=\"silent\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:x-soft|TEXT]]", expected: helper.HEAD + "<prosody volume=\"x-soft\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:soft|TEXT]]", expected: helper.HEAD + "<prosody volume=\"soft\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:medium|TEXT]]", expected: helper.HEAD + "<prosody volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:loud|TEXT]]", expected: helper.HEAD + "<prosody volume=\"loud\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:x-loud|TEXT]]", expected: helper.HEAD + "<prosody volume=\"x-loud\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:default|TEXT]]", expected: helper.HEAD + "<prosody volume=\"default\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:+6dB|TEXT]]", expected: helper.HEAD + "<prosody volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:-6dB|TEXT]]", expected: helper.HEAD + "<prosody volume=\"-6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:medium,speed:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[vol:+6dB,spe:5%|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:medium,volume:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:5%,vol:+6dB|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:medium,pitch:+5%|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+5%\" volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pit:+5%,vol:+6dB|TEXT]]", expected: helper.HEAD + "<prosody pitch=\"+5%\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[spe:medium,pit:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" pitch=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:medium,speed:5%|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\" pitch=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[speed:medium,volume:+6dB,pitch:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:medium,speed:5%,pitch:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\" pitch=\"medium\" volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[volume:+6dB,pitch:medium,speed:medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:medium,volume:medium,speed:5%|TEXT]]", expected: helper.HEAD + "<prosody rate=\"5%\" pitch=\"medium\" volume=\"medium\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "no markups", expected: helper.HEAD + "no markups" + helper.TAIL }
            ];

            var sad = [
                { expression: "[[speed:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[pitch:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[volume:unknown|TEXT]]", expected: undertest.SyntaxError }
            ];

            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });

        describe("Time containers", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "*[[pitch:medium,speed:medium,volume:+6dB|TEXT]]*", expected: helper.HEAD + "<par><prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody></par>" + helper.TAIL },
                { expression: "#[[pitch:medium,speed:medium,volume:+6dB|TEXT]][[pitch:medium,speed:medium,volume:+6dB|TEXT]]#", expected: helper.HEAD + "<seq><prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody><prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody></seq>" + helper.TAIL }
            ];

            var sad = [
                { expression: "*[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: undertest.SyntaxError },
                { expression: "#[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: undertest.SyntaxError },
                { expression: "*[[pitch:medium,speed:medium,volume:+6dB|TEXT]]#", expected: undertest.SyntaxError },
                { expression: "#[[pitch:medium,speed:medium,volume:+6dB|TEXT]]*", expected: undertest.SyntaxError }
            ];

            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });
    
        describe("Emphasis level", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[emphasis:strong|TEXT]]", expected: helper.HEAD + "<emphasis level=\"strong\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emphasis:moderate|TEXT]]", expected: helper.HEAD + "<emphasis level=\"moderate\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emphasis:none|TEXT]]", expected: helper.HEAD + "<emphasis level=\"none\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emphasis:reduced|TEXT]]", expected: helper.HEAD + "<emphasis level=\"reduced\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emp:strong|TEXT]]", expected: helper.HEAD + "<emphasis level=\"strong\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emp:moderate|TEXT]]", expected: helper.HEAD + "<emphasis level=\"moderate\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emp:none|TEXT]]", expected: helper.HEAD + "<emphasis level=\"none\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[emp:reduced|TEXT]]", expected: helper.HEAD + "<emphasis level=\"reduced\">TEXT</emphasis>" + helper.TAIL },
            ];

            var sad = [
                { expression: "[[emphasis:unknown|TEXT]]", expected: undertest.SyntaxError }
            ];

            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });
    
        describe("Silence with duration", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[strength:none]]", expected: helper.HEAD + "<break strength=\"none\"/>" + helper.TAIL },
                { expression: "[[strength:x-weak]]", expected: helper.HEAD + "<break strength=\"x-weak\"/>" + helper.TAIL },
                { expression: "[[strength:weak]]", expected: helper.HEAD + "<break strength=\"weak\"/>" + helper.TAIL },
                { expression: "[[strength:medium]]", expected: helper.HEAD + "<break strength=\"medium\"/>" + helper.TAIL },
                { expression: "[[strength:strong]]", expected: helper.HEAD + "<break strength=\"strong\"/>" + helper.TAIL },
                { expression: "[[strength:x-strong]]", expected: helper.HEAD + "<break strength=\"x-strong\"/>" + helper.TAIL },
                { expression: "[[str:none]]", expected: helper.HEAD + "<break strength=\"none\"/>" + helper.TAIL },
                { expression: "[[str:x-weak]]", expected: helper.HEAD + "<break strength=\"x-weak\"/>" + helper.TAIL },
                { expression: "[[str:weak]]", expected: helper.HEAD + "<break strength=\"weak\"/>" + helper.TAIL },
                { expression: "[[str:medium]]", expected: helper.HEAD + "<break strength=\"medium\"/>" + helper.TAIL },
                { expression: "[[str:strong]]", expected: helper.HEAD + "<break strength=\"strong\"/>" + helper.TAIL },
                { expression: "[[str:x-strong]]", expected: helper.HEAD + "<break strength=\"x-strong\"/>" + helper.TAIL },
                { expression: "[[silence:100s]]", expected: helper.HEAD + "<break time=\"100s\"/>" + helper.TAIL },
                { expression: "[[silence:100ms]]", expected: helper.HEAD + "<break time=\"100ms\"/>" + helper.TAIL },
                { expression: "[[sil:100s]]", expected: helper.HEAD + "<break time=\"100s\"/>" + helper.TAIL },
                { expression: "[[sil:100ms]]", expected: helper.HEAD + "<break time=\"100ms\"/>" + helper.TAIL },
                { expression: "[[silence:150ms,strength:medium]]", expected: helper.HEAD + "<break strength=\"medium\" time=\"150ms\"/>" + helper.TAIL },
                { expression: "[[strength:medium,silence:0.5s]]", expected: helper.HEAD + "<break strength=\"medium\" time=\"0.5s\"/>" + helper.TAIL }
            ];

            var sad = [
                { expression: "[[silence:unknown]]", expected: undertest.SyntaxError },
                { expression: "[[strength:unknown]]", expected: undertest.SyntaxError }
            ];
            
            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });

        describe("Substitution", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[substitute:red color|red colour]]", expected: helper.HEAD + "<sub alias=\"red color\">red colour</sub>" + helper.TAIL },
                { expression: "[[substitute:red color|]]", expected: helper.HEAD + "<sub alias=\"red color\"></sub>" + helper.TAIL },
                { expression: "[[sub:red color|red colour]]", expected: helper.HEAD + "<sub alias=\"red color\">red colour</sub>" + helper.TAIL },
                { expression: "[[sub:red color|]]", expected: helper.HEAD + "<sub alias=\"red color\"></sub>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Embedded audio", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[audio:https://example.mp3]]", expected: helper.HEAD + "<audio src=\"https://example.mp3\"/>" + helper.TAIL },
                { expression: "[[aud:https://example.mp3]]", expected: helper.HEAD + "<audio src=\"https://example.mp3\"/>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Language code", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[lang:en-GB|TEXT]]", expected: helper.HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + helper.TAIL },
                { expression: "[[lan:en-GB|TEXT]]", expected: helper.HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });
    
        describe("Paragraph and senctence", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[paragraph|TEXT]]", expected: helper.HEAD + "<p>TEXT</p>" + helper.TAIL },
                { expression: "[[par|TEXT]]", expected: helper.HEAD + "<p>TEXT</p>" + helper.TAIL },
                { expression: "[[sentence|TEXT]]", expected: helper.HEAD + "<s>TEXT</s>" + helper.TAIL },
                { expression: "[[sen|TEXT]]", expected: helper.HEAD + "<s>TEXT</s>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Phoneme with alphabet and pronunciation", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[pronunciation:təˈmɑːtəʊ|tomato]]", expected: helper.HEAD + "<phoneme ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + helper.TAIL },
                { expression: "[[pro:təˈmɑːtəʊ|tomato]]", expected: helper.HEAD + "<phoneme ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + helper.TAIL },
                { expression: "[[alphabet:ipa,pronunciation:təˈmɑːtəʊ|tomato]]", expected: helper.HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + helper.TAIL },
                { expression: "[[alp:ipa,pronunciation:təˈmɑːtəʊ|tomato]]", expected: helper.HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + helper.TAIL },
                { expression: "[[pronunciation:təˈmɑːtəʊ,alphabet:ipa|tomato]]", expected: helper.HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Type for interpretation", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[type:cardinal|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"cardinal\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:number|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"number\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:ordinal|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"ordinal\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:characters|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"characters\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:digits|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"digits\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:fraction|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"fraction\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:expletive|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"expletive\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:bleep|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"bleep\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:interjection|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"interjection\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:unit|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"unit\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:verbatim|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"verbatim\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:spell-out|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"spell-out\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:telephone|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"telephone\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:address|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"address\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:cardinal|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"cardinal\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:number|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"number\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:ordinal|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"ordinal\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:characters|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"characters\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:digits|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"digits\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:fraction|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"fraction\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:expletive|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"expletive\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:bleep|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"bleep\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:interjection|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"interjection\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:unit|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"unit\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:verbatim|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"verbatim\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:spell-out|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"spell-out\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:telephone|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"telephone\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[typ:address|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"address\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,format:hms24|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,format:hms12|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms12\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:mdy|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"mdy\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:dmy|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:ymd|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"ymd\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:md|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"md\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:dm|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"dm\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:ym|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"ym\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:my|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"my\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:d|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"d\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:m|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"m\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,format:y|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"y\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,for:hms24|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,for:hms12|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms12\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:mdy|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"mdy\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:dmy|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:ymd|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"ymd\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:md|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"md\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:dm|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"dm\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:ym|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"ym\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:my|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"my\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:d|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"d\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:m|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"m\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:date,for:y|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"y\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:hms24,type:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:hms12,type:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms12\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:mdy,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"mdy\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:dmy,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:ymd,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"ymd\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:md,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"md\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:dm,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"dm\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:ym,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"ym\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:my,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"my\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:d,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"d\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:m,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"m\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:y,type:date|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"date\" format=\"y\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,format:hms24,detail:1|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,format:hms24,det:1|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[type:time,detail:1,format:hms24|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:hms24,type:time,detail:1|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[format:hms24,detail:1,type:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[detail:1,type:time,format:hms24|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[detail:1,format:hms24,type:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[detail:punctuation,format:hms24,type:time|TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"punctuation\">TEXT</say-as>" + helper.TAIL }
            ];

            var sad = [
                { expression: "[[type:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[type:date,format:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[type:time,format:hms24,detail:_|TEXT]]", expected: undertest.SyntaxError }
            ];

            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });

        describe("Voice name", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[voice:NAME|TEXT]]", expected: helper.HEAD + "<voice name=\"NAME\">TEXT</voice>" + helper.TAIL },
                { expression: "[[voi:NAME|TEXT]]", expected: helper.HEAD + "<voice name=\"NAME\">TEXT</voice>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Part of Speech", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[pos:VB|TEXT]]", expected: helper.HEAD + "<w role=\"VB\">TEXT</w>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Mark with name", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[mark:NAME]]", expected: helper.HEAD + "<mark name=\"NAME\"/>" + helper.TAIL },
                { expression: "[[mar:NAME]]", expected: helper.HEAD + "<mark name=\"NAME\"/>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Default speaking", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "This is a test without markups", expected: helper.HEAD + "This is a test without markups" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Combined markups", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "start [[volume:medium|TEXT]] middle [[silence:0.5s]] end", expected: helper.HEAD + "start <prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/> end" + helper.TAIL },
                { expression: "[[volume:medium|TEXT]] middle [[silence:0.5s]] end", expected: helper.HEAD + "<prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/> end" + helper.TAIL },
                { expression: "start [[volume:medium|TEXT]] middle [[silence:0.5s]]", expected: helper.HEAD + "start <prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/>" + helper.TAIL },
                { expression: "[[volume:medium|TEXT]] middle [[silence:0.5s]]", expected: helper.HEAD + "<prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/>" + helper.TAIL },
                { expression: "TEXT[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]TEXT", expected: helper.HEAD + "TEXT<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>TEXT" + helper.TAIL },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]TEXT", expected: helper.HEAD + "<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>TEXT" + helper.TAIL },
                { expression: "TEXT[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]", expected: helper.HEAD + "TEXT<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>" + helper.TAIL },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]", expected: helper.HEAD + "<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>" + helper.TAIL },
                { expression: "[[voice:NAME|[[lang:en-GB|TEXT]]TEXT]]", expected: helper.HEAD + "<voice name=\"NAME\"><lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>" + helper.TAIL },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]]]", expected: helper.HEAD + "<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang></voice>" + helper.TAIL },
                { expression: "[[speed:medium,volume:+6dB,pitch:medium|TEXT[[type:time,format:hms24,detail:1|TEXT]]]]", expected: helper.HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as></prosody>" + helper.TAIL }
            ];

            var sad = [
                { expression: "start [volume:medium|TEXT]] middle [[silence:0.5s]] end", expected: undertest.SyntaxError },
                { expression: "[[volume:medium|TEXT] middle [[silence:0.5s]] end", expected: undertest.SyntaxError },
                { expression: "start [[volume:medium|TEXT]] middle [silence:0.5s]]", expected: undertest.SyntaxError },
                { expression: "[[volume:medium|TEXT]] middle [[silence:0.5s]", expected: undertest.SyntaxError },
                { expression: "TEXT[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]TEXT", expected: undertest.SyntaxError },
                { expression: "[[voice:NAME|TEXT[lang:en-GB|TEXT]]TEXT]]TEXT", expected: undertest.SyntaxError },
                { expression: "TEXT[[voice:NAME|TEXT[[lang:en-GB|TEXT]TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]", expected: undertest.SyntaxError }
            ];

            helper.runHappyTests(happy, undertest);
            helper.runSadTests(sad, undertest);
        });

        describe("Meta content", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[seeAlso:http://example.com/metadata.xml]]", expected: helper.HEAD + "<meta name=\"seeAlso\" content=\"http://example.com/metadata.xml\"/>" + helper.TAIL },
                { expression: "[[see-also:http://example.com/metadata.xml]]", expected: helper.HEAD + "<meta name=\"seeAlso\" content=\"http://example.com/metadata.xml\"/>" + helper.TAIL },
                { expression: "[[see:http://example.com/metadata.xml]]", expected: helper.HEAD + "<meta name=\"seeAlso\" content=\"http://example.com/metadata.xml\"/>" + helper.TAIL },
                { expression: "[[cacheControl:no-cache]]", expected: helper.HEAD + "<meta http-equiv=\"Cache-Control\" content=\"no-cache\"/>" + helper.TAIL },
                { expression: "[[cache-control:no-cache]]", expected: helper.HEAD + "<meta http-equiv=\"Cache-Control\" content=\"no-cache\"/>" + helper.TAIL },
                { expression: "[[cac:no-cache]]", expected: helper.HEAD + "<meta http-equiv=\"Cache-Control\" content=\"no-cache\"/>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        describe("Lexicon", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[lexicon:http://example.com/lexicon.pls]]", expected: helper.HEAD + "<lexicon uri=\"http://example.com/lexicon.pls\"/>" + helper.TAIL },
                { expression: "[[lex:http://example.com/lexicon.pls]]", expected: helper.HEAD + "<lexicon uri=\"http://example.com/lexicon.pls\"/>" + helper.TAIL },
                { expression: "[[lexicon:http://example.com/lexicon.pls,type:media-type]]", expected: helper.HEAD + "<lexicon uri=\"http://example.com/lexicon.pls\" type=\"media-type\"/>" + helper.TAIL },
                { expression: "[[typ:media-type,lex:http://example.com/lexicon.pls]]", expected: helper.HEAD + "<lexicon uri=\"http://example.com/lexicon.pls\" type=\"media-type\"/>" + helper.TAIL }
            ];

            helper.runHappyTests(happy, undertest);
        });

        it("should ignore whitespaces", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[ speed: medium ,volume: +6dB,pitch: medium|TEXT]]", expected: helper.HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + helper.TAIL },
                { expression: "[[emphasis :none|TEXT]]", expected: helper.HEAD + "<emphasis level=\"none\">TEXT</emphasis>" + helper.TAIL },
                { expression: "[[strength: medium,  silence :  0.5s]]", expected: helper.HEAD + "<break strength=\"medium\" time=\"0.5s\"/>" + helper.TAIL },
                { expression: "[[ substitute: red color | red colour ]]", expected: helper.HEAD + "<sub alias=\" red color \"> red colour </sub>" + helper.TAIL },
                { expression: "[[audio  :https://example.mp3]]", expected: helper.HEAD + "<audio src=\"https://example.mp3\"/>" + helper.TAIL },
                { expression: "[[lang  :en-GB|TEXT]]", expected: helper.HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + helper.TAIL },
                { expression: "[[paragraph |TEXT]]", expected: helper.HEAD + "<p>TEXT</p>" + helper.TAIL },
                { expression: "[[   sentence |TEXT]]", expected: helper.HEAD + "<s>TEXT</s>" + helper.TAIL },
                { expression: "[[pronunciation :təˈmɑːtəʊ,  alphabet:ipa|tomato]]", expected: helper.HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + helper.TAIL },
                { expression: "[[ type:time  ,   detail:1, format:hms24 |TEXT]]", expected: helper.HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + helper.TAIL },
                { expression: "[[voice: NAME|TEXT]]", expected: helper.HEAD + "<voice name=\"NAME\">TEXT</voice>" + helper.TAIL },
                { expression: "[[pos:   VB|TEXT]]", expected: helper.HEAD + "<w role=\"VB\">TEXT</w>" + helper.TAIL }
            ];

            happy.forEach((test) => {
                var parsed = undertest.parseToSsml(test.expression, "en-GB");
                expect(parsed).to.be.have.string("<speak ");
                expect(parsed).to.equal(test.expected);
                xml2js.parseString(parsed, (err) => { expect(err).to.be.null; });
            });
        });

        it("should escape control characters", () => {
            undertest = require("../src/wiki2ssml");
            var parsed = undertest.parseToSsml("[[volume:+6dB|\"a\" + 'b' & c <> d]]", "en-GB");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal(helper.HEAD + "<prosody volume=\"+6dB\">&quot;a&quot; + &apos;b&apos; &amp; c &lt;&gt; d</prosody>" + helper.TAIL);
        });

        it("should output the original input which dose not have markups in SSML", () => {
            undertest = require("../src/wiki2ssml");
            var textWithoutMarkup = "This is a test without markups";
            var parsed = undertest.parseToSsml(textWithoutMarkup, "en-GB");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal(helper.HEAD + textWithoutMarkup + helper.TAIL);
        });

        it("should use a specific SSML version parsed in", () => {
            undertest = require("../src/wiki2ssml");
            var parsed = undertest.parseToSsml("[[volume:+6dB|TEXT]]", "en-GB", {version: "1.0"});
            expect(parsed).to.be.a("string");
            expect(parsed).to.have.string("version=\"1.0\"");
        });

        it("should prettify SSML when configured", () => {
            undertest = require("../src/wiki2ssml");
            var parsed = undertest.parseToSsml("[[volume:+6dB|TEXT]]", "en-GB", {pretty: true});
            var expected = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
                "<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" xml:lang=\"en-GB\">",
                "  <prosody volume=\"+6dB\">TEXT</prosody>",
                "</speak>"].join("\n");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal(expected);
        });

        it("should detect and validate markups", () => {
            undertest = require("../src/wiki2ssml");
            expect(undertest.hasValidMarkups("[[volume:medium|TEXT]] and [[silence:0.5s]] and [[substitute:substitute|original]] are markups")).to.be.true;
            expect(undertest.hasValidMarkups("This is a test without valid [[markups]]")).to.be.false;
            expect(undertest.hasValidMarkups("This is a test with no markup")).to.be.false;
        });

        it("should strip markups and output plain text", () => {
            undertest = require("../src/wiki2ssml");
            var parsed = undertest.parseToPlainText("[[volume:medium|TEXT]] and [[silence:0.5s]] and [[substitute:substitute|original]] are present");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal("TEXT and  and original are present");
        });

        describe("Errors", () => {
            it("should throw SyntaxError on incorrect grammar", () => {
                undertest = require("../src/wiki2ssml");
                try {
                    undertest.reloadGrammar("incorrect");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof undertest.SyntaxError).to.be.true;
                    expect(e.message).to.have.string("Expected");
                }
            });

            describe("should throw ArgumentError on", () => {
                [
                    { input: null, expected: undertest.ArgumentError },
                    { input: undefined, expected: undertest.ArgumentError },
                    { input: "", expected: undertest.ArgumentError }
                ].forEach((test) => {
                    it((test.input == "" ? "empty" : test.input) + " input", () => {
                        try {
                            undertest.parseToSsml(test.input, "en-GB");
                            expect.fail();
                        } catch (e) {
                            expect(e instanceof test.expected).to.be.true;
                            expect(e.message).to.equal("Input is missing when calling parseToSsml");
                        }
                    });
                });
            });

            it("should throw ArgumentError on null input", () => {
                undertest = require("../src/wiki2ssml");
                try {
                    undertest.parseToSsml(null, "en-GB");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof undertest.ArgumentError).to.be.true;
                    expect(e.message).to.equal("Input is missing when calling parseToSsml");
                }
            });

            it("should throw ArgumentError on undefined input", () => {
                undertest = require("../src/wiki2ssml");
                try {
                    undertest.parseToSsml(undefined, "en-GB");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof undertest.ArgumentError).to.be.true;
                    expect(e.message).to.equal("Input is missing when calling parseToSsml");
                }
            });

            it("should throw ArgumentError on empty input", () => {
                undertest = require("../src/wiki2ssml");
                try {
                    undertest.parseToSsml("", "en-GB");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof undertest.ArgumentError).to.be.true;
                    expect(e.message).to.equal("Input is missing when calling parseToSsml");
                }
            });
  
            it("should throw ArgumentError on missing language code", () => {
                undertest = require("../src/wiki2ssml");
                try {
                    undertest.parseToSsml("[[volume:+6dB|TEXT]]");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof undertest.ArgumentError).to.be.true;
                    expect(e.message).to.equal("Language code is missing when calling parseToSsml");
                }
            });
        });
    });
});