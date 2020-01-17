"use strict";

var expect = require("chai").expect;
var xml2js = require("xml2js");

describe("Test wiki2ssml", () => {

    var undertest;
    const HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
                "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
                "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
                "xml:lang=\"en-GB\">";
    const EXTENDED_HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
                "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
                "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
                "xmlns:mstts=\"http://www.w3.org/2001/mstts\" " +
                "xml:lang=\"en-GB\">";
    const TAIL = "</speak>";

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
                { expression: "[[speed:x-slow|TEXT]]", expected: HEAD + "<prosody rate=\"x-slow\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:slow|TEXT]]", expected: HEAD + "<prosody rate=\"slow\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:fast|TEXT]]", expected: HEAD + "<prosody rate=\"fast\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:x-fast|TEXT]]", expected: HEAD + "<prosody rate=\"x-fast\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:default|TEXT]]", expected: HEAD + "<prosody rate=\"default\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:5%|TEXT]]", expected: HEAD + "<prosody rate=\"5%\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:x-slow|TEXT]]", expected: HEAD + "<prosody rate=\"x-slow\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:slow|TEXT]]", expected: HEAD + "<prosody rate=\"slow\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:fast|TEXT]]", expected: HEAD + "<prosody rate=\"fast\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:x-fast|TEXT]]", expected: HEAD + "<prosody rate=\"x-fast\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:default|TEXT]]", expected: HEAD + "<prosody rate=\"default\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:5%|TEXT]]", expected: HEAD + "<prosody rate=\"5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:x-low|TEXT]]", expected: HEAD + "<prosody pitch=\"x-low\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:low|TEXT]]", expected: HEAD + "<prosody pitch=\"low\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:medium|TEXT]]", expected: HEAD + "<prosody pitch=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:high|TEXT]]", expected: HEAD + "<prosody pitch=\"high\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:x-high|TEXT]]", expected: HEAD + "<prosody pitch=\"x-high\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:default|TEXT]]", expected: HEAD + "<prosody pitch=\"default\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:5%|TEXT]]", expected: HEAD + "<prosody pitch=\"5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:+5%|TEXT]]", expected: HEAD + "<prosody pitch=\"+5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:-5%|TEXT]]", expected: HEAD + "<prosody pitch=\"-5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:x-low|TEXT]]", expected: HEAD + "<prosody pitch=\"x-low\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:low|TEXT]]", expected: HEAD + "<prosody pitch=\"low\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:medium|TEXT]]", expected: HEAD + "<prosody pitch=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:high|TEXT]]", expected: HEAD + "<prosody pitch=\"high\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:x-high|TEXT]]", expected: HEAD + "<prosody pitch=\"x-high\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:default|TEXT]]", expected: HEAD + "<prosody pitch=\"default\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:5%|TEXT]]", expected: HEAD + "<prosody pitch=\"5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:+5%|TEXT]]", expected: HEAD + "<prosody pitch=\"+5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:-5%|TEXT]]", expected: HEAD + "<prosody pitch=\"-5%\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:+5Hz|TEXT]]", expected: HEAD + "<prosody pitch=\"+5Hz\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:+5Hz|TEXT]]", expected: HEAD + "<prosody pitch=\"+5Hz\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:+12st|TEXT]]", expected: HEAD + "<prosody pitch=\"+12st\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:+12st|TEXT]]", expected: HEAD + "<prosody pitch=\"+12st\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:silent|TEXT]]", expected: HEAD + "<prosody volume=\"silent\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:x-soft|TEXT]]", expected: HEAD + "<prosody volume=\"x-soft\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:soft|TEXT]]", expected: HEAD + "<prosody volume=\"soft\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:medium|TEXT]]", expected: HEAD + "<prosody volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:loud|TEXT]]", expected: HEAD + "<prosody volume=\"loud\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:x-loud|TEXT]]", expected: HEAD + "<prosody volume=\"x-loud\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:+6dB|TEXT]]", expected: HEAD + "<prosody volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:-6dB|TEXT]]", expected: HEAD + "<prosody volume=\"-6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:silent|TEXT]]", expected: HEAD + "<prosody volume=\"silent\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:x-soft|TEXT]]", expected: HEAD + "<prosody volume=\"x-soft\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:soft|TEXT]]", expected: HEAD + "<prosody volume=\"soft\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:medium|TEXT]]", expected: HEAD + "<prosody volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:loud|TEXT]]", expected: HEAD + "<prosody volume=\"loud\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:x-loud|TEXT]]", expected: HEAD + "<prosody volume=\"x-loud\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:default|TEXT]]", expected: HEAD + "<prosody volume=\"default\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:+6dB|TEXT]]", expected: HEAD + "<prosody volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:-6dB|TEXT]]", expected: HEAD + "<prosody volume=\"-6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:medium,speed:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[vol:+6dB,spe:5%|TEXT]]", expected: HEAD + "<prosody rate=\"5%\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:medium,volume:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:5%,vol:+6dB|TEXT]]", expected: HEAD + "<prosody rate=\"5%\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:medium,pitch:+5%|TEXT]]", expected: HEAD + "<prosody pitch=\"+5%\" volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[pit:+5%,vol:+6dB|TEXT]]", expected: HEAD + "<prosody pitch=\"+5%\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[spe:medium,pit:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:medium,speed:5%|TEXT]]", expected: HEAD + "<prosody rate=\"5%\" pitch=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[speed:medium,volume:+6dB,pitch:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:medium,speed:5%,pitch:medium|TEXT]]", expected: HEAD + "<prosody rate=\"5%\" pitch=\"medium\" volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:+6dB,pitch:medium,speed:medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:medium,volume:medium,speed:5%|TEXT]]", expected: HEAD + "<prosody rate=\"5%\" pitch=\"medium\" volume=\"medium\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "no markups", expected: HEAD + "no markups" + TAIL }
            ];

            var sad = [
                { expression: "[[speed:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[pitch:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[volume:unknown|TEXT]]", expected: undertest.SyntaxError }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Time containers", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "*[[pitch:medium,speed:medium,volume:+6dB|TEXT]]*", expected: HEAD + "<par><prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody></par>" + TAIL },
                { expression: "#[[pitch:medium,speed:medium,volume:+6dB|TEXT]][[pitch:medium,speed:medium,volume:+6dB|TEXT]]#", expected: HEAD + "<seq><prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody><prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody></seq>" + TAIL }
            ];

            var sad = [
                { expression: "*[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: undertest.SyntaxError },
                { expression: "#[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: undertest.SyntaxError },
                { expression: "*[[pitch:medium,speed:medium,volume:+6dB|TEXT]]#", expected: undertest.SyntaxError },
                { expression: "#[[pitch:medium,speed:medium,volume:+6dB|TEXT]]*", expected: undertest.SyntaxError }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });
    
        describe("Emphasis level", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[emphasis:strong|TEXT]]", expected: HEAD + "<emphasis level=\"strong\">TEXT</emphasis>" + TAIL },
                { expression: "[[emphasis:moderate|TEXT]]", expected: HEAD + "<emphasis level=\"moderate\">TEXT</emphasis>" + TAIL },
                { expression: "[[emphasis:none|TEXT]]", expected: HEAD + "<emphasis level=\"none\">TEXT</emphasis>" + TAIL },
                { expression: "[[emphasis:reduced|TEXT]]", expected: HEAD + "<emphasis level=\"reduced\">TEXT</emphasis>" + TAIL },
                { expression: "[[emp:strong|TEXT]]", expected: HEAD + "<emphasis level=\"strong\">TEXT</emphasis>" + TAIL },
                { expression: "[[emp:moderate|TEXT]]", expected: HEAD + "<emphasis level=\"moderate\">TEXT</emphasis>" + TAIL },
                { expression: "[[emp:none|TEXT]]", expected: HEAD + "<emphasis level=\"none\">TEXT</emphasis>" + TAIL },
                { expression: "[[emp:reduced|TEXT]]", expected: HEAD + "<emphasis level=\"reduced\">TEXT</emphasis>" + TAIL },
            ];

            var sad = [
                { expression: "[[emphasis:unknown|TEXT]]", expected: undertest.SyntaxError }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });
    
        describe("Silence with duration", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[strength:none]]", expected: HEAD + "<break strength=\"none\"/>" + TAIL },
                { expression: "[[strength:x-weak]]", expected: HEAD + "<break strength=\"x-weak\"/>" + TAIL },
                { expression: "[[strength:weak]]", expected: HEAD + "<break strength=\"weak\"/>" + TAIL },
                { expression: "[[strength:medium]]", expected: HEAD + "<break strength=\"medium\"/>" + TAIL },
                { expression: "[[strength:strong]]", expected: HEAD + "<break strength=\"strong\"/>" + TAIL },
                { expression: "[[strength:x-strong]]", expected: HEAD + "<break strength=\"x-strong\"/>" + TAIL },
                { expression: "[[str:none]]", expected: HEAD + "<break strength=\"none\"/>" + TAIL },
                { expression: "[[str:x-weak]]", expected: HEAD + "<break strength=\"x-weak\"/>" + TAIL },
                { expression: "[[str:weak]]", expected: HEAD + "<break strength=\"weak\"/>" + TAIL },
                { expression: "[[str:medium]]", expected: HEAD + "<break strength=\"medium\"/>" + TAIL },
                { expression: "[[str:strong]]", expected: HEAD + "<break strength=\"strong\"/>" + TAIL },
                { expression: "[[str:x-strong]]", expected: HEAD + "<break strength=\"x-strong\"/>" + TAIL },
                { expression: "[[silence:100s]]", expected: HEAD + "<break time=\"100s\"/>" + TAIL },
                { expression: "[[silence:100ms]]", expected: HEAD + "<break time=\"100ms\"/>" + TAIL },
                { expression: "[[sil:100s]]", expected: HEAD + "<break time=\"100s\"/>" + TAIL },
                { expression: "[[sil:100ms]]", expected: HEAD + "<break time=\"100ms\"/>" + TAIL },
                { expression: "[[silence:150ms,strength:medium]]", expected: HEAD + "<break strength=\"medium\" time=\"150ms\"/>" + TAIL },
                { expression: "[[strength:medium,silence:0.5s]]", expected: HEAD + "<break strength=\"medium\" time=\"0.5s\"/>" + TAIL }
            ];

            var sad = [
                { expression: "[[silence:unknown]]", expected: undertest.SyntaxError },
                { expression: "[[strength:unknown]]", expected: undertest.SyntaxError }
            ];
            
            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Substitution", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[substitute:red color|red colour]]", expected: HEAD + "<sub alias=\"red color\">red colour</sub>" + TAIL },
                { expression: "[[substitute:red color|]]", expected: HEAD + "<sub alias=\"red color\"></sub>" + TAIL },
                { expression: "[[sub:red color|red colour]]", expected: HEAD + "<sub alias=\"red color\">red colour</sub>" + TAIL },
                { expression: "[[sub:red color|]]", expected: HEAD + "<sub alias=\"red color\"></sub>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Embedded audio", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[audio:https://example.mp3]]", expected: HEAD + "<audio src=\"https://example.mp3\"/>" + TAIL },
                { expression: "[[aud:https://example.mp3]]", expected: HEAD + "<audio src=\"https://example.mp3\"/>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Language code", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[lang:en-GB|TEXT]]", expected: HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + TAIL },
                { expression: "[[lan:en-GB|TEXT]]", expected: HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + TAIL }
            ];

            runHappyTests(happy);
        });
    
        describe("Paragraph and senctence", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[paragraph|TEXT]]", expected: HEAD + "<p>TEXT</p>" + TAIL },
                { expression: "[[par|TEXT]]", expected: HEAD + "<p>TEXT</p>" + TAIL },
                { expression: "[[sentence|TEXT]]", expected: HEAD + "<s>TEXT</s>" + TAIL },
                { expression: "[[sen|TEXT]]", expected: HEAD + "<s>TEXT</s>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Phoneme with alphabet and pronunciation", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[pronunciation:təˈmɑːtəʊ|tomato]]", expected: HEAD + "<phoneme ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + TAIL },
                { expression: "[[pro:təˈmɑːtəʊ|tomato]]", expected: HEAD + "<phoneme ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + TAIL },
                { expression: "[[alphabet:ipa,pronunciation:təˈmɑːtəʊ|tomato]]", expected: HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + TAIL },
                { expression: "[[alp:ipa,pronunciation:təˈmɑːtəʊ|tomato]]", expected: HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + TAIL },
                { expression: "[[pronunciation:təˈmɑːtəʊ,alphabet:ipa|tomato]]", expected: HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Type for interpretation", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[type:cardinal|TEXT]]", expected: HEAD + "<say-as interpret-as=\"cardinal\">TEXT</say-as>" + TAIL },
                { expression: "[[type:number|TEXT]]", expected: HEAD + "<say-as interpret-as=\"number\">TEXT</say-as>" + TAIL },
                { expression: "[[type:ordinal|TEXT]]", expected: HEAD + "<say-as interpret-as=\"ordinal\">TEXT</say-as>" + TAIL },
                { expression: "[[type:characters|TEXT]]", expected: HEAD + "<say-as interpret-as=\"characters\">TEXT</say-as>" + TAIL },
                { expression: "[[type:digits|TEXT]]", expected: HEAD + "<say-as interpret-as=\"digits\">TEXT</say-as>" + TAIL },
                { expression: "[[type:fraction|TEXT]]", expected: HEAD + "<say-as interpret-as=\"fraction\">TEXT</say-as>" + TAIL },
                { expression: "[[type:expletive|TEXT]]", expected: HEAD + "<say-as interpret-as=\"expletive\">TEXT</say-as>" + TAIL },
                { expression: "[[type:bleep|TEXT]]", expected: HEAD + "<say-as interpret-as=\"bleep\">TEXT</say-as>" + TAIL },
                { expression: "[[type:interjection|TEXT]]", expected: HEAD + "<say-as interpret-as=\"interjection\">TEXT</say-as>" + TAIL },
                { expression: "[[type:unit|TEXT]]", expected: HEAD + "<say-as interpret-as=\"unit\">TEXT</say-as>" + TAIL },
                { expression: "[[type:verbatim|TEXT]]", expected: HEAD + "<say-as interpret-as=\"verbatim\">TEXT</say-as>" + TAIL },
                { expression: "[[type:spell-out|TEXT]]", expected: HEAD + "<say-as interpret-as=\"spell-out\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\">TEXT</say-as>" + TAIL },
                { expression: "[[type:telephone|TEXT]]", expected: HEAD + "<say-as interpret-as=\"telephone\">TEXT</say-as>" + TAIL },
                { expression: "[[type:address|TEXT]]", expected: HEAD + "<say-as interpret-as=\"address\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:cardinal|TEXT]]", expected: HEAD + "<say-as interpret-as=\"cardinal\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:number|TEXT]]", expected: HEAD + "<say-as interpret-as=\"number\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:ordinal|TEXT]]", expected: HEAD + "<say-as interpret-as=\"ordinal\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:characters|TEXT]]", expected: HEAD + "<say-as interpret-as=\"characters\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:digits|TEXT]]", expected: HEAD + "<say-as interpret-as=\"digits\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:fraction|TEXT]]", expected: HEAD + "<say-as interpret-as=\"fraction\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:expletive|TEXT]]", expected: HEAD + "<say-as interpret-as=\"expletive\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:bleep|TEXT]]", expected: HEAD + "<say-as interpret-as=\"bleep\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:interjection|TEXT]]", expected: HEAD + "<say-as interpret-as=\"interjection\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:unit|TEXT]]", expected: HEAD + "<say-as interpret-as=\"unit\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:verbatim|TEXT]]", expected: HEAD + "<say-as interpret-as=\"verbatim\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:spell-out|TEXT]]", expected: HEAD + "<say-as interpret-as=\"spell-out\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:telephone|TEXT]]", expected: HEAD + "<say-as interpret-as=\"telephone\">TEXT</say-as>" + TAIL },
                { expression: "[[typ:address|TEXT]]", expected: HEAD + "<say-as interpret-as=\"address\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,format:hms24|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,format:hms12|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms12\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:mdy|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"mdy\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:dmy|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:ymd|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"ymd\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:md|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"md\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:dm|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dm\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:ym|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"ym\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:my|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"my\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:d|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"d\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:m|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"m\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:y|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"y\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,for:hms24|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,for:hms12|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms12\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:mdy|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"mdy\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:dmy|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:ymd|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"ymd\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:md|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"md\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:dm|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dm\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:ym|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"ym\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:my|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"my\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:d|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"d\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:m|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"m\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,for:y|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"y\">TEXT</say-as>" + TAIL },
                { expression: "[[format:hms24,type:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\">TEXT</say-as>" + TAIL },
                { expression: "[[format:hms12,type:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms12\">TEXT</say-as>" + TAIL },
                { expression: "[[format:mdy,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"mdy\">TEXT</say-as>" + TAIL },
                { expression: "[[format:dmy,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + TAIL },
                { expression: "[[format:ymd,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"ymd\">TEXT</say-as>" + TAIL },
                { expression: "[[format:md,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"md\">TEXT</say-as>" + TAIL },
                { expression: "[[format:dm,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dm\">TEXT</say-as>" + TAIL },
                { expression: "[[format:ym,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"ym\">TEXT</say-as>" + TAIL },
                { expression: "[[format:my,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"my\">TEXT</say-as>" + TAIL },
                { expression: "[[format:d,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"d\">TEXT</say-as>" + TAIL },
                { expression: "[[format:m,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"m\">TEXT</say-as>" + TAIL },
                { expression: "[[format:y,type:date|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"y\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,format:hms24,detail:1|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,format:hms24,det:1|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,detail:1,format:hms24|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[format:hms24,type:time,detail:1|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[format:hms24,detail:1,type:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[detail:1,type:time,format:hms24|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[detail:1,format:hms24,type:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[detail:punctuation,format:hms24,type:time|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"punctuation\">TEXT</say-as>" + TAIL }
            ];

            var sad = [
                { expression: "[[type:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[type:date,format:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[type:time,format:hms24,detail:_|TEXT]]", expected: undertest.SyntaxError }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Voice name", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[voice:NAME|TEXT]]", expected: HEAD + "<voice name=\"NAME\">TEXT</voice>" + TAIL },
                { expression: "[[voi:NAME|TEXT]]", expected: HEAD + "<voice name=\"NAME\">TEXT</voice>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Part of Speech", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[pos:VB|TEXT]]", expected: HEAD + "<w role=\"VB\">TEXT</w>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Mark with name", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[mark:NAME]]", expected: HEAD + "<mark name=\"NAME\"/>" + TAIL },
                { expression: "[[mar:NAME]]", expected: HEAD + "<mark name=\"NAME\"/>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Default speaking", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "This is a test without markups", expected: HEAD + "This is a test without markups" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Vendor extensions", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[amzWhispered|TEXT]]", expected: HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amz-whispered|TEXT]]", expected: HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[aws|TEXT]]", expected: HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzPhonation:soft|TEXT]]", expected: HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amz-phonation:soft|TEXT]]", expected: HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[aph:soft|TEXT]]", expected: HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzTimbre:+15%|TEXT]]", expected: HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amz-timbre:+15%|TEXT]]", expected: HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[ati:+15%|TEXT]]", expected: HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzDRC|TEXT]]", expected: HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amz-drc|TEXT]]", expected: HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[adr|TEXT]]", expected: HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzBreathDuration:medium,amzBreathVolume:x-loud]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amz-breath-duration:medium,amz-breath-volume:x-loud]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[abd:medium,abv:x-loud]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amzBreathVolume:x-loud,amzBreathDuration:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amz-breath-volume:x-loud,amz-breath-duration:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[abv:x-loud,abd:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amzBreathVolume:x-loud]]", expected: HEAD + "<amazon:breath volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amz-breath-volume:x-loud]]", expected: HEAD + "<amazon:breath volume=\"x-loud\"/>" + TAIL },
                { expression: "[[abv:x-loud]]", expected: HEAD + "<amazon:breath volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amzBreathDuration:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\"/>" + TAIL },
                { expression: "[[amz-breath-duration:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\"/>" + TAIL },
                { expression: "[[abd:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\"/>" + TAIL },
                { expression: "[[amzDefaultBreath]]", expected: HEAD + "<amazon:breath/>" + TAIL },
                { expression: "[[amz-default-breath]]", expected: HEAD + "<amazon:breath/>" + TAIL },
                { expression: "[[adb]]", expected: HEAD + "<amazon:breath/>" + TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsFrequency:low,amzAutoBreathsDuration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-frequency:low,amz-auto-breaths-duration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abv:medium,abf:low,abd:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsDuration:long,amzAutoBreathsFrequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-duration:long,amz-auto-breaths-frequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abv:medium,abd:long,abf:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsFrequency:low,amzAutoBreathsVolume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-frequency:low,amz-auto-breaths-volume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abd:long,abf:low,abv:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsVolume:medium,amzAutoBreathsFrequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-volume:medium,amz-auto-breaths-frequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abd:long,abv:medium,abf:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsVolume:medium,amzAutoBreathsDuration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-volume:medium,amz-auto-breaths-duration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abf:low,abv:medium,abd:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsDuration:long,amzAutoBreathsVolume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-duration:long,amz-auto-breaths-volume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abf:low,abd:long,abv:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsFrequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-frequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abv:medium,abf:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsVolume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-volume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abf:low,abv:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsVolume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-volume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abd:long,abv:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsVolume:medium,amzAutoBreathsDuration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-volume:medium,amz-auto-breaths-duration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abv:medium,abd:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsFrequency:low,amzAutoBreathsDuration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-frequency:low,amz-auto-breaths-duration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abf:low,abd:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsDuration:long,amzAutoBreathsFrequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-duration:long,amz-auto-breaths-frequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abd:long,abf:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\" duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsVolume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-volume:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abv:medium|TEXT]]", expected: HEAD + "<amazon:auto-breaths volume=\"medium\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsFrequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-frequency:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abf:low|TEXT]]", expected: HEAD + "<amazon:auto-breaths frequency=\"low\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzAutoBreathsDuration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-auto-breaths-duration:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[abd:long|TEXT]]", expected: HEAD + "<amazon:auto-breaths duration=\"long\">TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzDefaultAutoBreaths|TEXT]]", expected: HEAD + "<amazon:auto-breaths>TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amz-default-auto-breaths|TEXT]]", expected: HEAD + "<amazon:auto-breaths>TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[adb|TEXT]]", expected: HEAD + "<amazon:auto-breaths>TEXT</amazon:auto-breaths>" + TAIL },
                { expression: "[[amzSpeakingStyle:music|TEXT]]", expected: HEAD + "<amazon:domain name=\"music\">TEXT</amazon:domain>" + TAIL },
                { expression: "[[amz-speaking-style:music|TEXT]]", expected: HEAD + "<amazon:domain name=\"music\">TEXT</amazon:domain>" + TAIL },
                { expression: "[[ass:music|TEXT]]", expected: HEAD + "<amazon:domain name=\"music\">TEXT</amazon:domain>" + TAIL },
                { expression: "[[amzSpeakingStyle:news|TEXT]]", expected: HEAD + "<amazon:domain name=\"news\">TEXT</amazon:domain>" + TAIL },
                { expression: "[[amz-speaking-style:news|TEXT]]", expected: HEAD + "<amazon:domain name=\"news\">TEXT</amazon:domain>" + TAIL },
                { expression: "[[ass:news|TEXT]]", expected: HEAD + "<amazon:domain name=\"news\">TEXT</amazon:domain>" + TAIL },
                { expression: "[[amzEmotion:excited,amzIntensity:low|TEXT]]", expected: HEAD + "<amazon:emotion name=\"excited\" intensity=\"low\">TEXT</amazon:emotion>" + TAIL },
                { expression: "[[amz-emotion:excited,amz-intensity:low|TEXT]]", expected: HEAD + "<amazon:emotion name=\"excited\" intensity=\"low\">TEXT</amazon:emotion>" + TAIL },
                { expression: "[[aem:excited,ain:low|TEXT]]", expected: HEAD + "<amazon:emotion name=\"excited\" intensity=\"low\">TEXT</amazon:emotion>" + TAIL },
                { expression: "[[amzIntensity:low,amzEmotion:excited|TEXT]]", expected: HEAD + "<amazon:emotion intensity=\"low\" name=\"excited\">TEXT</amazon:emotion>" + TAIL },
                { expression: "[[amz-intensity:low,amz-emotion:excited|TEXT]]", expected: HEAD + "<amazon:emotion intensity=\"low\" name=\"excited\">TEXT</amazon:emotion>" + TAIL },
                { expression: "[[ain:low,aem:excited|TEXT]]", expected: HEAD + "<amazon:emotion intensity=\"low\" name=\"excited\">TEXT</amazon:emotion>" + TAIL },
                { expression: "[[gglMediaSpeak|TEXT]]", expected: HEAD + "<media><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[ggl-media-speak|TEXT]]", expected: HEAD + "<media><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[gms|TEXT]]", expected: HEAD + "<media><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[gglMediaSpeakEnd:10s|TEXT]]", expected: HEAD + "<media end=\"10s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[ggl-media-speak-end:10s|TEXT]]", expected: HEAD + "<media end=\"10s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[gmse:10s|TEXT]]", expected: HEAD + "<media end=\"10s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[gglMediaSpeakFadeIn:1s,gglMediaSpeakFadeOut:2s|TEXT]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[ggl-media-speak-fade-in:1s,ggl-media-speak-fade-out:2s|TEXT]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[gglMediaSpeakFadeOut:2s,gglMediaSpeakFadeIn:1s|TEXT]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[ggl-media-speak-fade-out:2s,ggl-media-speak-fade-in:1s|TEXT]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><speak>TEXT</speak></media>" + TAIL },
                { expression: "[[gglMediaAudio:https://example.mp3]]", expected: HEAD + "<media><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio:https://example.mp3]]", expected: HEAD + "<media><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gma:https://example.mp3]]", expected: HEAD + "<media><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gglMediaAudioFadeIn:1ms,gglMediaAudioFadeOut:2ms,gglMediaAudio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio-fade-in:1ms,ggl-media-audio-fade-out:2ms,ggl-media-audio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gglMediaAudio:https://example.mp3,gglMediaAudioFadeIn:1ms,gglMediaAudioFadeOut:2ms]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio:https://example.mp3,gglMediaAudioFadeIn:1ms,gglMediaAudioFadeOut:2ms]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gglMediaAudio:https://example.mp3,gglMediaAudioFadeOut:2s,gglMediaAudioFadeIn:1s]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio:https://example.mp3,gglMediaAudioFadeOut:2s,gglMediaAudioFadeIn:1s]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gglMediaAudioFadeIn:1ms,gglMediaAudio:https://example.mp3,gglMediaAudioFadeOut:2ms]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio-fade-in:1ms,ggl-media-audio:https://example.mp3,ggl-media-audio-fade-out:2ms]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gglMediaAudioFadeOut:2s,gglMediaAudio:https://example.mp3,gglMediaAudioFadeIn:1s]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio-fade-out:2s,ggl-media-audio:https://example.mp3,gglMediaAudioFadeIn:1s]]", expected: HEAD + "<media fadeInDur=\"1s\" fadeOutDur=\"2s\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gfi:1ms,gfo:2ms,gglMediaAudio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gfi:1ms,gfo:2ms,ggl-media-audio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gglMediaAudioFadeOut:2ms,gglMediaAudioFadeIn:1ms,gglMediaAudio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ggl-media-audio-fade-out:2ms,ggl-media-audio-fade-in:1ms,ggl-media-audio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gfo:2ms,gfi:1ms,gglMediaAudio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[gfo:2ms,gfi:1ms,ggl-media-audio:https://example.mp3]]", expected: HEAD + "<media fadeInDur=\"1ms\" fadeOutDur=\"2ms\"><audio src=\"https://example.mp3\"/></media>" + TAIL },
                { expression: "[[ibmExprType:GoodNews|TEXT]]", expected: HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + TAIL },
                { expression: "[[ibm-expr-type:GoodNews|TEXT]]", expected: HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + TAIL },
                { expression: "[[iet:GoodNews|TEXT]]", expected: HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + TAIL },
                { expression: "[[ibmTransType:Young,ibmTransStrength:80%|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-type:Young,ibm-trans-strength:80%|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itt:Young,its:80%|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransStrength:80%,ibmTransType:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-strength:80%,ibm-trans-type:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransType:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-type:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itt:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransBreathiness:high,ibmTransPitchRange:wide,ibmTransTimbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-breathiness:high,ibm-trans-pitch-range:wide,ibm-trans-timbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itb:high,itp:wide,itm:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransBreathiness:high,ibmTransTimbre:Sunrise,ibmTransPitchRange:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-breathiness:high,ibm-trans-timbre:Sunrise,ibm-trans-pitch-range:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itb:high,itm:Sunrise,itp:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransPitchRange:wide,ibmTransTimbre:Sunrise,ibmTransBreathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itp:wide,itm:Sunrise,itb:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransPitchRange:wide,ibmTransBreathiness:high,ibmTransTimbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-pitch-range:wide,ibm-trans-breathiness:high,ibm-trans-timbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itp:wide,itb:high,itm:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransTimbre:Sunrise,ibmTransBreathiness:high,ibmTransPitchRange:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-breathiness:high,ibm-trans-pitch-range:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itm:Sunrise,itp:wide,itb:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransTimbre:Sunrise,ibmTransPitchRange:wide,ibmTransBreathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-pitch-range:wide,ibm-trans-breathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itm:Sunrise,itp:wide,itb:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransBreathiness:high,ibmTransPitchRange:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-breathiness:high,ibm-trans-pitch-range:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itb:high,itp:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransBreathiness:high,ibmTransTimbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-breathiness:high,ibm-trans-timbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itb:high,itm:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransPitchRange:wide,ibmTransTimbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-pitch-range:wide,ibm-trans-timbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itp:wide,itm:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransPitchRange:wide,ibmTransBreathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-pitch-range:wide,ibm-trans-breathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itp:wide,itb:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransTimbre:Sunrise,ibmTransBreathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-breathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itm:Sunrise,itb:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransTimbre:Sunrise,ibmTransPitchRange:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-timbre:Sunrise,ibm-trans-pitch-range:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itm:Sunrise,itp:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransBreathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-breathiness:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itb:high|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" breathiness=\"high\">TEXT</voice-transformation>" + TAIL },  
                { expression: "[[ibmTransPitchRange:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-pitch-range:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itp:wide|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" pitch_range=\"wide\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransTimbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibm-trans-timbre:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itm:Sunrise|TEXT]]", expected: HEAD + "<voice-transformation type=\"Custom\" timbre=\"Sunrise\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[voice:NAME|[[mstExprType:cheerful|TEXT]]]]", expected: EXTENDED_HEAD + "<voice name=\"NAME\"><mstts:express-as type=\"cheerful\">TEXT</mstts:express-as></voice>" + TAIL },
                { expression: "[[voice:NAME|[[met:cheerful|TEXT]]]]", expected: EXTENDED_HEAD + "<voice name=\"NAME\"><mstts:express-as type=\"cheerful\">TEXT</mstts:express-as></voice>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\"/>" + TAIL },
                { expression: "[[mba:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioVolume:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mstBackgroundAudioVolume:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + TAIL },
                { expression: "[[mba:https://example.mp3,mbv:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + TAIL },
                { expression: "[[mba:https://example.mp3,mbv:50]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"50\"/>" + TAIL },
                { expression: "[[mba:https://example.mp3,mbv:100]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"100\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioVolume:0,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + TAIL },
                { expression: "[[mst-background-audio-volume:0,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + TAIL },
                { expression: "[[mbv:0,mba:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" volume=\"0\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mstBackgroundAudioFadeIn:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10000]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-in:10000]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeIn:0,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-in:0,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"0\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeIn:10000,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-in:10000,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + TAIL },
                { expression: "[[mba:https://example.mp3,mfi:10000]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10000\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-out:0]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:10000]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-out:10000]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeOut:0,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-out:0,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"0\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeOut:10000,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-out:10000,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + TAIL },
                { expression: "[[mba:https://example.mp3,mfo:10000]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadeout=\"10000\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10,mstBackgroundAudioFadeOut:20]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-in:10,mst-background-audio-fade-out:20]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:20,mstBackgroundAudioFadeIn:10]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mst-background-audio:https://example.mp3,mst-background-audio-fade-out:20,mst-background-audio-fade-in:10]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeIn:10,mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:20]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-in:10,mst-background-audio:https://example.mp3,mst-background-audio-fade-out:20]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeIn:10,mstBackgroundAudioFadeOut:20,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-in:10,mst-background-audio-fade-out:20,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeOut:20,mstBackgroundAudioFadeIn:10,mstBackgroundAudio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-out:20,mst-background-audio-fade-in:10,mst-background-audio:https://example.mp3]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mstBackgroundAudioFadeOut:20,mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL },
                { expression: "[[mst-background-audio-fade-out:20,mst-background-audio:https://example.mp3,mst-background-audio-fade-in:10]]", expected: EXTENDED_HEAD + "<mstts:backgroundaudio src=\"https://example.mp3\" fadein=\"10\" fadeout=\"20\"/>" + TAIL }
            ];

            var sad = [
                { expression: "[[amzPhonation:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzTimbre:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzBreathVolume:unknown]]", expected: undertest.SyntaxError },
                { expression: "[[amzBreathDuration:unknown]]", expected: undertest.SyntaxError },
                { expression: "[[amzAutoBreathsVolume:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzAutoBreathsFrequency:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzAutoBreathsDuration:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzSpeakingStyle:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzEmotion:unknown,amzIntensity:low|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[amzIntensity:unknown, amzEmotion:excited|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[gglMediaSpeakEnd:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[gglMediaAudioFadeOut:unknown,gglMediaAudioFadeIn:1ms,gglMediaAudio:https://example.mp3]]", expected: undertest.SyntaxError },
                { expression: "[[gglMediaAudioFadeOut:2s,gglMediaAudioFadeIn:unknown,gglMediaAudio:https://example.mp3]]", expected: undertest.SyntaxError },
                { expression: "[[ibmExprType:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[ibmTransType:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[ibmTransStrength:unknown,ibmTransType:Young|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[ibmTransBreathiness:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[ibmTransPitchRange:unknown|TEXT]]", expected: undertest.SyntaxError },
                { expression: "[[ibmTransTimbre:unknown|TEXT]]",expected: undertest.SyntaxError },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioVolume:101]]", expected: undertest.SyntaxError },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioVolume:-1]]", expected: undertest.SyntaxError },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:10001]]", expected: undertest.SyntaxError },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeIn:-1]]", expected: undertest.SyntaxError },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:10001]]", expected: undertest.SyntaxError },
                { expression: "[[mstBackgroundAudio:https://example.mp3,mstBackgroundAudioFadeOut:-1]]", expected: undertest.SyntaxError }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Combined markups", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "start [[volume:medium|TEXT]] middle [[silence:0.5s]] end", expected: HEAD + "start <prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/> end" + TAIL },
                { expression: "[[volume:medium|TEXT]] middle [[silence:0.5s]] end", expected: HEAD + "<prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/> end" + TAIL },
                { expression: "start [[volume:medium|TEXT]] middle [[silence:0.5s]]", expected: HEAD + "start <prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/>" + TAIL },
                { expression: "[[volume:medium|TEXT]] middle [[silence:0.5s]]", expected: HEAD + "<prosody volume=\"medium\">TEXT</prosody> middle <break time=\"0.5s\"/>" + TAIL },
                { expression: "TEXT[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]TEXT", expected: HEAD + "TEXT<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>TEXT" + TAIL },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]TEXT", expected: HEAD + "<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>TEXT" + TAIL },
                { expression: "TEXT[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]", expected: HEAD + "TEXT<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>" + TAIL },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]TEXT]]", expected: HEAD + "<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>" + TAIL },
                { expression: "[[voice:NAME|[[lang:en-GB|TEXT]]TEXT]]", expected: HEAD + "<voice name=\"NAME\"><lang xml:lang=\"en-GB\">TEXT</lang>TEXT</voice>" + TAIL },
                { expression: "[[voice:NAME|TEXT[[lang:en-GB|TEXT]]]]", expected: HEAD + "<voice name=\"NAME\">TEXT<lang xml:lang=\"en-GB\">TEXT</lang></voice>" + TAIL },
                { expression: "[[speed:medium,volume:+6dB,pitch:medium|TEXT[[type:time,format:hms24,detail:1|TEXT]]]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as></prosody>" + TAIL }
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

            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Meta content", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[seeAlso:http://example.com/metadata.xml]]", expected: HEAD + "<meta name=\"seeAlso\" content=\"http://example.com/metadata.xml\"/>" + TAIL },
                { expression: "[[see-also:http://example.com/metadata.xml]]", expected: HEAD + "<meta name=\"seeAlso\" content=\"http://example.com/metadata.xml\"/>" + TAIL },
                { expression: "[[see:http://example.com/metadata.xml]]", expected: HEAD + "<meta name=\"seeAlso\" content=\"http://example.com/metadata.xml\"/>" + TAIL },
                { expression: "[[cacheControl:no-cache]]", expected: HEAD + "<meta http-equiv=\"Cache-Control\" content=\"no-cache\"/>" + TAIL },
                { expression: "[[cache-control:no-cache]]", expected: HEAD + "<meta http-equiv=\"Cache-Control\" content=\"no-cache\"/>" + TAIL },
                { expression: "[[cac:no-cache]]", expected: HEAD + "<meta http-equiv=\"Cache-Control\" content=\"no-cache\"/>" + TAIL }
            ];

            runHappyTests(happy);
        });

        it("should ignore whitespaces", () => {
            undertest = require("../src/wiki2ssml");
            var happy = [
                { expression: "[[ speed: medium ,volume: +6dB,pitch: medium|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + TAIL },
                { expression: "[[emphasis :none|TEXT]]", expected: HEAD + "<emphasis level=\"none\">TEXT</emphasis>" + TAIL },
                { expression: "[[strength: medium,  silence :  0.5s]]", expected: HEAD + "<break strength=\"medium\" time=\"0.5s\"/>" + TAIL },
                { expression: "[[ substitute: red color | red colour ]]", expected: HEAD + "<sub alias=\" red color \"> red colour </sub>" + TAIL },
                { expression: "[[audio  :https://example.mp3]]", expected: HEAD + "<audio src=\"https://example.mp3\"/>" + TAIL },
                { expression: "[[lang  :en-GB|TEXT]]", expected: HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + TAIL },
                { expression: "[[paragraph |TEXT]]", expected: HEAD + "<p>TEXT</p>" + TAIL },
                { expression: "[[   sentence |TEXT]]", expected: HEAD + "<s>TEXT</s>" + TAIL },
                { expression: "[[pronunciation :təˈmɑːtəʊ,  alphabet:ipa|tomato]]", expected: HEAD + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + TAIL },
                { expression: "[[ type:time  ,   detail:1, format:hms24 |TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL },
                { expression: "[[voice: NAME|TEXT]]", expected: HEAD + "<voice name=\"NAME\">TEXT</voice>" + TAIL },
                { expression: "[[pos:   VB|TEXT]]", expected: HEAD + "<w role=\"VB\">TEXT</w>" + TAIL }
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
            expect(parsed).to.equal(HEAD + "<prosody volume=\"+6dB\">&quot;a&quot; + &apos;b&apos; &amp; c &lt;&gt; d</prosody>" + TAIL);
        });

        it("should output the original input which dose not have markups in SSML", () => {
            undertest = require("../src/wiki2ssml");
            var textWithoutMarkup = "This is a test without markups";
            var parsed = undertest.parseToSsml(textWithoutMarkup, "en-GB");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal(HEAD + textWithoutMarkup + TAIL);
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

    function runHappyTests(tests) {
        tests.forEach((test) => {
            it("should parse " + test.expression + " and output SSML string", () => {
                var parsed = undertest.parseToSsml(test.expression, "en-GB");
                expect(parsed).to.be.have.string("<speak ");
                expect(parsed).to.equal(test.expected);
                xml2js.parseString(parsed, (err) => { expect(err).to.be.null; });
            });
        });
    }

    function runSadTests(tests) {
        tests.forEach((test) => {
            it("should fail on parsing " + test.expression, () => {
                try {
                    undertest.parseToSsml(test.expression, "en-GB");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof test.expected).to.be.true;
                    expect(e.message).to.have.string("Expected");
                }
            });
        });
    }
});