"use strict";

var peggy = require("peggy");
var fs = require("fs");
var prettifyXml = require("prettify-xml");

const _EXTNS = {
    "mstts": "http://www.w3.org/2001/mstts",
    "vxml": "http://www.w3.org/2001/vxml"
};

module.exports = (() => {
    try {
        var _parser = peggy.generate(fs.readFileSync(__dirname + "/wikivoice.pegjs").toString());
    }
    catch (e) {
        throw new SyntaxError(e.message);
    }

    var _getSsmlHead = (language, version, encoding) => {
        return "<?xml version=\"1.0\" encoding=\"" + encoding + "\"?>" +
            (version === "1.0" ? "<!DOCTYPE speak PUBLIC \"-//W3C//DTD SYNTHESIS 1.0//EN\" \"http://www.w3.org/TR/speech-synthesis/synthesis.dtd\">" : "") +
            "<speak version=\"" + version + "\" xmlns=\"http://www.w3.org/2001/10/synthesis\" " +
            "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
            "xsi:schemaLocation=\"http://www.w3.org/2001/10/synthesis http://www.w3.org/TR/speech-synthesis/synthesis.xsd\" " +
            "{{EXTNS_PLACEHOLDER}}" +
            "xml:lang=\"" + language + "\">";
    };

    var _getSsmlTail = () => {
        return "</speak>";
    };

    var _getSsmlAsString = (ssmlBody, language, options) => {
        var ext_ns = "";
        for (var namespace in _EXTNS) {
            if (ssmlBody.indexOf(namespace + ":") > -1) {
                ext_ns += "xmlns:" + namespace + "=\"" + _EXTNS[namespace] + "\" ";
            }
        }
        var ssml = _getSsmlHead(language, options.version, options.encoding).replace("{{EXTNS_PLACEHOLDER}}", ext_ns) + ssmlBody + _getSsmlTail();
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
        if (typeof(options.encoding) === "undefined") {
            options.encoding = "UTF-8";
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
                _parser = peggy.generate(grammar);
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