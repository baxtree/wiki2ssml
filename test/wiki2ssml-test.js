"use strict";

var expect = require("chai").expect;
var xml2js = require("xml2js");

describe("Test wiki2ssml", () => {

    var undertest;
    const HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
                "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
                "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
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
        before(() => {
            undertest = require("../src/wiki2ssml");
        });

        describe("Speed, pitch and volume", () => {
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
                { expression: "[[pitch:medium,speed:medium,volume:+6dB|TEXT]]", expected: HEAD + "<prosody rate=\"medium\" pitch=\"medium\" volume=\"+6dB\">TEXT</prosody>" + TAIL }
            ];

            var sad = [
                { expression: "[[speed:unknown|TEXT]]", expected: HEAD + "<prosody rate=\"x-slow\">TEXT</prosody>" + TAIL },
                { expression: "[[pitch:unknown|TEXT]]", expected: HEAD + "<prosody pitch=\"low\">TEXT</prosody>" + TAIL },
                { expression: "[[volume:unknown|TEXT]]", expected: HEAD + "<prosody volume=\"loud\">TEXT</prosody>" + TAIL }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });
    
        describe("Emphasis level", () => {
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
                { expression: "[[emphasis:unknown|TEXT]]", expected: HEAD + "<emphasis level=\"strong\">TEXT</emphasis>" + TAIL }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });
    
        describe("Silence with duration", () => {
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
                { expression: "[[silence:unknown]]", expected: HEAD + "<break time=\"100s\"/>" + TAIL },
                { expression: "[[strength:unknown]]", expected: HEAD + "<break strength=\"none\"/>" + TAIL }
            ];
            
            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Substitution", () => {
            var happy = [
                { expression: "[[substitute:red color|red colour]]", expected: HEAD + "<sub alias=\"red color\">red colour</sub>" + TAIL },
                { expression: "[[substitute:red color|]]", expected: HEAD + "<sub alias=\"red color\"></sub>" + TAIL },
                { expression: "[[sub:red color|red colour]]", expected: HEAD + "<sub alias=\"red color\">red colour</sub>" + TAIL },
                { expression: "[[sub:red color|]]", expected: HEAD + "<sub alias=\"red color\"></sub>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Embedded audio", () => {
            var happy = [
                { expression: "[[audio:https://example.mp3]]", expected: HEAD + "<audio src=\"https://example.mp3\"/>" + TAIL },
                { expression: "[[aud:https://example.mp3]]", expected: HEAD + "<audio src=\"https://example.mp3\"/>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Language code", () => {
            var happy = [
                { expression: "[[lang:en-GB|TEXT]]", expected: HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + TAIL },
                { expression: "[[lan:en-GB|TEXT]]", expected: HEAD + "<lang xml:lang=\"en-GB\">TEXT</lang>" + TAIL }
            ];

            runHappyTests(happy);
        });
    
        describe("Paragraph and senctence", () => {
            var happy = [
                { expression: "[[paragraph|TEXT]]", expected: HEAD + "<p>TEXT</p>" + TAIL },
                { expression: "[[par|TEXT]]", expected: HEAD + "<p>TEXT</p>" + TAIL },
                { expression: "[[sentence|TEXT]]", expected: HEAD + "<s>TEXT</s>" + TAIL },
                { expression: "[[sen|TEXT]]", expected: HEAD + "<s>TEXT</s>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Phoneme with alphabet and pronunciation", () => {
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
                { expression: "[[type:unknown|TEXT]]", expected: HEAD + "<say-as interpret-as=\"cardinal\">TEXT</say-as>" + TAIL },
                { expression: "[[type:date,format:unknown|TEXT]]", expected: HEAD + "<say-as interpret-as=\"date\" format=\"dmy\">TEXT</say-as>" + TAIL },
                { expression: "[[type:time,format:hms24,detail:_|TEXT]]", expected: HEAD + "<say-as interpret-as=\"time\" format=\"hms24\" detail=\"1\">TEXT</say-as>" + TAIL }
            ];

            runHappyTests(happy);
            runSadTests(sad);
        });

        describe("Voice name", () => {
            var happy = [
                { expression: "[[voice:NAME|TEXT]]", expected: HEAD + "<voice name=\"NAME\">TEXT</voice>" + TAIL },
                { expression: "[[voi:NAME|TEXT]]", expected: HEAD + "<voice name=\"NAME\">TEXT</voice>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Part of Speech", () => {
            var happy = [
                { expression: "[[pos:VB|TEXT]]", expected: HEAD + "<w role=\"VB\">TEXT</w>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Mark with name", () => {
            var happy = [
                { expression: "[[mark:NAME|TEXT]]", expected: HEAD + "<mark name=\"NAME\"/>" + TAIL },
                { expression: "[[mar:NAME|TEXT]]", expected: HEAD + "<mark name=\"NAME\"/>" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Default speaking", () => {
            var happy = [
                { expression: "This is a test without markups", expected: HEAD + "This is a test without markups" + TAIL }
            ];

            runHappyTests(happy);
        });

        describe("Vendor extensions", () => {
            var happy = [
                { expression: "[[amzWhispered|TEXT]]", expected: HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[aw|TEXT]]", expected: HEAD + "<amazon:effect name=\"whispered\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzPhonation:soft|TEXT]]", expected: HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[ap:soft|TEXT]]", expected: HEAD + "<amazon:effect phonation=\"soft\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzTimbre:+15%|TEXT]]", expected: HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[at:+15%|TEXT]]", expected: HEAD + "<amazon:effect vocal-tract-length=\"+15%\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzDRC|TEXT]]", expected: HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[adrc|TEXT]]", expected: HEAD + "<amazon:effect name=\"drc\">TEXT</amazon:effect>" + TAIL },
                { expression: "[[amzBreathDuration:medium,amzBreathVolume:x-loud]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[abd:medium,abv:x-loud]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amzBreathVolume:x-loud,amzBreathDuration:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[abv:x-loud,abd:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\" volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amzBreathVolume:x-loud]]", expected: HEAD + "<amazon:breath volume=\"x-loud\"/>" + TAIL },
                { expression: "[[abv:x-loud]]", expected: HEAD + "<amazon:breath volume=\"x-loud\"/>" + TAIL },
                { expression: "[[amzBreathDuration:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\"/>" + TAIL },
                { expression: "[[abd:medium]]", expected: HEAD + "<amazon:breath duration=\"medium\"/>" + TAIL },
                { expression: "[[amzDefaultBreath]]", expected: HEAD + "<amazon:breath/>" + TAIL },
                { expression: "[[adb]]", expected: HEAD + "<amazon:breath/>" + TAIL },
                { expression: "[[ibmExprType:GoodNews|TEXT]]", expected: HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + TAIL },
                { expression: "[[iet:GoodNews|TEXT]]", expected: HEAD + "<express-as type=\"GoodNews\">TEXT</express-as>" + TAIL },
                { expression: "[[ibmTransType:Young,ibmStrength:80%|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itt:Young,ist:80%|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmStrength:80%,ibmTransType:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\" strength=\"80%\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[ibmTransType:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + TAIL },
                { expression: "[[itt:Young|TEXT]]", expected: HEAD + "<voice-transformation type=\"Young\">TEXT</voice-transformation>" + TAIL }
            ];

            runHappyTests(happy);
        });

        it("should ignore whitespaces", () => {
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

        it("should return original input which dose not have markups", () => {
            var text_without_markup = "This is a test without markups";
            var parsed = undertest.parseToSsml(text_without_markup, "en-GB");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal(HEAD + text_without_markup + TAIL);
        });

        it("should use a specific SSML version parsed in", () => {
            var parsed = undertest.parseToSsml("[[volume:+6dB|TEXT]]", "en-GB", "1.0");
            expect(parsed).to.be.a("string");
            expect(parsed).to.have.string("version=\"1.0\"");
        });

        it("should detect and validate markups", () => {
            expect(undertest.hasValidMarkups("[[volume:medium|TEXT]] and [[silence:0.5s]] and [[substitute:substitute|original]] are markups")).to.be.true;
            expect(undertest.hasValidMarkups("This is a test without valid [[markups]]")).to.be.false;
            expect(undertest.hasValidMarkups("This is a test with no markup")).to.be.false;
        });

        it("should strip markups and output plain text", () => {
            var parsed = undertest.parseToPlainText("[[volume:medium|TEXT]] and [[silence:0.5s]] and [[substitute:substitute|original]] are present");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal("TEXT and  and original are present");
        });

        describe("Errors", () => {
            it("should throw SyntaxError on incorrect grammar", () => {
                try {
                    undertest.reloadGrammar("incorrect");
                    expect.fail();
                } catch (e) {
                    expect(e instanceof undertest.SyntaxError).to.be.true;
                    expect(e.message).to.have.string("Expected");
                }
            });
  
            it("should throw ArgumentError on missing language code", () => {
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
                    expect(e instanceof undertest.SyntaxError).to.be.true;
                    expect(e.message).to.have.string("Expected");
                }
            });
        });
    }
});
