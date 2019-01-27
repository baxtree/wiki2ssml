"use strict";

var peg = require("pegjs");
var fs = require("fs");

module.exports = (() => {

    var _parser = peg.generate(fs.readFileSync(__dirname + "/wikivoice.pegjs").toString());

    var _getSsmlHead = (language) => {
        return "<speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
              "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
              "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
              "xml:lang=\"" + language + "\">";
    };

    var _getSsmlTail = () => {
        return "</speak>";
    };

    var _getSsmlAsString = (ssmlBody, language) => {
        return _getSsmlHead(language) + ssmlBody + _getSsmlTail();
    };

    var _parseToSsml = (ssmlStr, languageCode) => {
        if(!languageCode) {
            throw new ArgumentError("Language code is missing when calling parseToSsml");
        }
        var parsed = _parser.parse(ssmlStr);
        return _getSsmlAsString(parsed, languageCode);
    };

    class ArgumentError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
            this.type = "ArgumentError";
        }
    }

    return {

        parseToSsml: _parseToSsml,

        reloadGrammar: (grammar) => {
            _parser = peg.generate(grammar);
        },

        parseToPlainText: (ssmlStr) => {
            var parsed = _parseToSsml(ssmlStr, "ANY");
            return parsed.replace(/(<([^>]+)>)/ig, "");
        },

        hasValidMarkups: (input) => {
            try {
                var ssml_body = _parser.parse(input);
                return ssml_body !== input;
            }
            catch (e) {
                return false;
            }
        },

        ArgumentError: ArgumentError
    };
})();