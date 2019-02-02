"use strict";

var peg = require("pegjs");
var fs = require("fs");

module.exports = (() => {

    try {
        var _parser = peg.generate(fs.readFileSync(__dirname + "/wikivoice.pegjs").toString());
    }
    catch (e) {
        throw new SyntaxError(e.message);
    }

    var _getSsmlHead = (language) => {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
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
        try {
            var parsed = _parser.parse(ssmlStr);
        }
        catch (e) {
            throw new SyntaxError(e.message);
        }
        return _getSsmlAsString(parsed, languageCode);
    };

    class ArgumentError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, this.constructor);
            } else { 
                this.stack = (new Error(message)).stack; 
            }
        }
    }  
    
    class SyntaxError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, this.constructor);
            } else { 
                this.stack = (new Error(message)).stack; 
            }
        }
    }    

    return {

        parseToSsml: _parseToSsml,

        reloadGrammar: (grammar) => {
            try {
                _parser = peg.generate(grammar);
            }
            catch (e) {
                throw new SyntaxError(e.message);
            }
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

        ArgumentError: ArgumentError,
        SyntaxError: SyntaxError
    };
})();