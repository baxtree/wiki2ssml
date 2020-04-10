"use strict";

var expect = require("chai").expect;
var xml2js = require("xml2js");

module.exports = (() => {

    const _HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<!DOCTYPE speak PUBLIC \"-//W3C//DTD SYNTHESIS 1.0//EN\" \"http://www.w3.org/TR/speech-synthesis/synthesis.dtd\">" +
        "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
        "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
        "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
        "xml:lang=\"en-GB\">";
    const _EXTENDED_HEAD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<!DOCTYPE speak PUBLIC \"-//W3C//DTD SYNTHESIS 1.0//EN\" \"http://www.w3.org/TR/speech-synthesis/synthesis.dtd\">" +
        "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
        "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
        "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
        "xmlns:mstts=\"http://www.w3.org/2001/mstts\" " +
        "xml:lang=\"en-GB\">";
    const _TAIL = "</speak>";

    function _runHappyTests(tests, undertest) {
        tests.forEach((test) => {
            it("should parse " + test.expression + " and output SSML string", () => {
                var parsed = undertest.parseToSsml(test.expression, "en-GB", {version: "1.0"});
                expect(parsed).to.be.have.string("<speak ");
                expect(parsed).to.equal(test.expected);
                xml2js.parseString(parsed, (err) => { expect(err).to.be.null; });
            });
        });
    }

    function _runSadTests(tests, undertest) {
        tests.forEach((test) => {
            it("should fail on parsing " + test.expression, () => {
                try {
                    undertest.parseToSsml(test.expression, "en-GB", {version: "1.0"});
                    expect.fail();
                } catch (e) {
                    expect(e instanceof test.expected).to.be.true;
                    expect(e.message).to.have.string("Expected");
                }
            });
        });
    }

    return {
        HEAD: _HEAD,
        EXTENDED_HEAD: _EXTENDED_HEAD,
        TAIL: _TAIL,
        runHappyTests: _runHappyTests,
        runSadTests: _runSadTests
    };
})();