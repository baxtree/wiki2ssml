"use strict";

var peg = require("pegjs");
var fs = require("fs");
var prettifyXml = require("prettify-xml");

module.exports = (() => {

    try {
        var _parser = peg.generate(fs.readFileSync(__dirname + "/wikivoice.pegjs").toString());
    }
    catch (e) {
        throw new SyntaxError(e.message);
    }

    var _getSsmlHead = (language, version) => {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><speak version=\"" + version + "\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
              "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
              "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
              "xml:lang=\"" + language + "\">";
    };

    var _getSsmlTail = () => {
        return "</speak>";
    };

    var _getSsmlAsString = (ssmlBody, language, options) => {
        var ssml = _getSsmlHead(language, options.version) + ssmlBody + _getSsmlTail();
        if (options.pretty) {
            return prettifyXml(ssml, {indent: 2, newline: "\n"});
        }
        return ssml;
    };

    var _parseToSsml = (input, languageCode, options) => {
        if (!input || input.length === 0) {
            throw new ArgumentError("Input is missing when calling parseToSsml");
        }
        if (!languageCode) {
            throw new ArgumentError("Language code is missing when calling parseToSsml");
        }
        options = (typeof(options) === "undefined") ? {} : options;
        if (typeof(options.version) === "undefined") {
            options.version = "1.1";
        }
        if (typeof(options.pretty) === "undefined") {
            options.pretty = false;
        }
        try {
            var parsed = _parser.parse(input);
        }
        catch (e) {
            throw new SyntaxError(e.message);
        }
        return _getSsmlAsString(parsed, languageCode, options);
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

        parseToPlainText: (input) => {
            var parsed = _parseToSsml(input, "ANY");
            return parsed.replace(/(<([^>]+)>)/ig, "");
        },

        hasValidMarkups: (input) => {
            try {
                var ssmlBody = _parser.parse(input);
                return ssmlBody !== input;
            }
            catch (e) {
                return false;
            }
        },

        ArgumentError: ArgumentError,
        SyntaxError: SyntaxError
    };
})();