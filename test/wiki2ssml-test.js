"use strict";

var expect = require("chai").expect;

describe("Test wiki2ssml parser", () => {

    var undertest;
    var head, tail;

    describe("Test grammar", () => {
        it("should have no grammar errors", () => {
            try {
                undertest = require("../src/wiki2ssml");
            } catch (e) {
                expect(e).not.to.exist;
            }
        });
    });

    describe("Test parser", () => {
        before(() => {
            head = "<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
                "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
                "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
                "xml:lang=\"en-GB\">";
            tail = "</speak>";
            undertest = require("../src/wiki2ssml");
        });

        describe("Volume and/or speed", () => {
            it("should parse [[volume:100.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[volume:100.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody volume=\"100.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[vol:100.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[vol:100.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody volume=\"100.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[speed:2.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[speed:2.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody rate=\"2.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[spe:2.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[spe:2.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody rate=\"2.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[volume:100.0,speed:2.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[volume:100.0,speed:2.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody rate=\"2.0\" volume=\"100.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[vol:100.0,spe:2.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[vol:100.0,spe:2.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody rate=\"2.0\" volume=\"100.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[speed:2.0,volume:100.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[speed:2.0,volume:100.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody rate=\"2.0\" volume=\"100.0\">TEXT</prosody>" + tail);
            });
  
            it("should parse [[spe:2.0,vol:100.0|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[spe:2.0,vol:100.0|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<prosody rate=\"2.0\" volume=\"100.0\">TEXT</prosody>" + tail);
            });
        });
    
        describe("Emphasis level", () => {
            it("should parse [[emphasis:strong|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[emphasis:strong|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<emphasis level=\"strong\">TEXT</emphasis>" + tail);
            });
  
            it("should parse [[emp:strong|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[emp:strong|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<emphasis level=\"strong\">TEXT</emphasis>" + tail);
            });
        });
    
        describe("Silence with duration", () => {
            it("should parse [[silence:0.5s]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[silence:0.5s]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<break time=\"0.5s\"/>" + tail);
            });
  
            it("should parse [[sil:0.5s]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[sil:0.5s]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<break time=\"0.5s\"/>" + tail);
            });
        });

        describe("Substitution", () => {
            it("should parse [[substitute:substitute|original]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[substitute:red color|red colour]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<sub alias=\"red color\">red colour</sub>" + tail);
            });
  
            it("should parse [[sub:substitute|original]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[sub:red color|red colour]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<sub alias=\"red color\">red colour</sub>" + tail);
            });
  
            it("should add implicit voice with [[substitute:substitute|]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[sub:red color|]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<sub alias=\"red color\"></sub>" + tail);
            });
        });

        describe("Embedded audio", () => {
            it("should parse [[audio:https://example.mp3]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[audio:https://example.mp3]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<audio src=\"https://example.mp3\"/>" + tail);
            });

            it("should parse [[aud:https://example.mp3]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[aud:https://example.mp3]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<audio src=\"https://example.mp3\"/>" + tail);
            });
        });

        describe("Language code", () => {
            it("should parse [[lang:en-GB|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[lang:en-US|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<lang xml:lang=\"en-US\">TEXT</lang>" + tail);
            });
  
            it("should parse [[lan:en-GB|Text]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[lan:en-US|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<lang xml:lang=\"en-US\">TEXT</lang>" + tail);
            });
        });
    
        describe("Paragraph and senctence", () => {
            it("should parse [[paragraph|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[paragraph|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<p>TEXT</p>" + tail);
            });
  
            it("should parse [[par|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[par|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<p>TEXT</p>" + tail);
            });
  
            it("should parse [[sentence|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[sentence|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<s>TEXT</s>" + tail);
            });
  
            it("should parse [[sen|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[sen|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<s>TEXT</s>" + tail);
            });
        });

        describe("Phoneme with alphabet and pronunciation", () => {
            it("should parse [[alphabet:ipa,pronunciation:təˈmɑːtəʊ|tomato]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[alphabet:ipa,pronunciation:təˈmɑːtəʊ|tomato]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + tail);
            });

            it("should parse [[pronunciation:təˈmɑːtəʊ,alphabet:ipa|tomato]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[pronunciation:təˈmɑːtəʊ,alphabet:ipa|tomato]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<phoneme alphabet=\"ipa\" ph=\"təˈmɑːtəʊ\">tomato</phoneme>" + tail);
            });
        });

        describe("Type for interpretation", () => {
            it("should parse [[type:digits|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[type:digits|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<say-as interpret-as=\"digits\">TEXT</say-as>" + tail);
            });
  
            it("should parse [[typ:digits|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[typ:digits|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<say-as interpret-as=\"digits\">TEXT</say-as>" + tail);
            });
        });

        describe("Voice name", () => {
            it("should parse [[voice:NAME|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[voice:NAME|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<voice name=\"NAME\">TEXT</voice>" + tail);
            });
  
            it("should parse [[voi:NAME|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[voi:NAME|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<voice name=\"NAME\">TEXT</voice>" + tail);
            });
        });

        describe("Part of Speech", () => {
            it("should parse [[pos:VB|TEXT]] and output SSML string", () => {
                var parsed = undertest.parseToSsml("[[pos:VB|TEXT]]", "en-GB");
                expect(parsed).to.be.a("string");
                expect(parsed).to.equal(head + "<w role=\"VB\">TEXT</w>" + tail);
            });
        });

        it("should return original input which dose not have markups", () => {
            var text_without_markup = "This is a test without markups";
            var parsed = undertest.parseToSsml(text_without_markup, "en-GB");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal(head + text_without_markup + tail);
        });

        it("should detect and validate markups", () => {
            expect(undertest.hasValidMarkups("[[volume:100.0|TEXT]] and [[silence:0.5s]] and [[substitute:substitute|original]] are markups")).to.be.true;
            expect(undertest.hasValidMarkups("This is a test without markups")).to.be.false;
            expect(undertest.hasValidMarkups("[[volume:100|TEXT]] and [[silence:5s]] and [[substitute:substitute|original]] are markups")).to.be.true;
        });

        it("should strip markups and output plain text", () => {
            var parsed = undertest.parseToPlainText("[[volume:100.0|TEXT]] and [[silence:0.5s]] and [[substitute:substitute|original]] are present");
            expect(parsed).to.be.a("string");
            expect(parsed).to.equal("TEXT and  and original are present");
        });

        describe("Errors", () => {
            it("should throw SyntaxError on incorrect grammar", () => {
                try {
                    undertest.reloadGrammar("incorrect");
                } catch (e) {
                    expect(e.name).to.equal("SyntaxError");
                    expect(e.message).to.be.a("string");
                }
            });
  
            it("should throw ArgumentError on missing language code", () => {
                try {
                    undertest.parseToSsml("[[volume:100.0|TEXT]]");
                } catch (e) {
                    expect(e instanceof undertest.ArgumentError).to.be.true;
                    expect(e.message).to.equal("Language code is missing when calling parseToSsml");
                }
            });
  
            it("should throw SyntaxError on missing language code", () => {
                try {
                    undertest.parseToSsml("[[unknow|TEXT]]", "en-GB");
                } catch (e) {
                    expect(e.name).to.equal("SyntaxError");
                    expect(e.message).to.be.a("string");
                }
            });
        });
    });
});
