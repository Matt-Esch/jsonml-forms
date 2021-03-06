var uuid = require("uuid")
var spaced = require("./lib/spaced.js")

module.exports = tupleInput

function tupleInput(opts) {
    opts = normalize("tupleInput", opts)

    return [".tuple-input.form-elem" + (opts.selector || ""), [
        opts.label ? ["label.label", { "for": opts.id }, [ opts.label ]] : null,
        ["input.input", {
            placeholder: opts.placeholder[0],
            name: opts.name[0],
            id: opts.id,
            value: opts.value[0],
            "data-marker": "form." + opts.marker[0]
        }],
        [".error", {
            "data-marker": "errors." + opts.marker[0]
        }],
        ["input.input", {
            placeholder: opts.placeholder[1],
            name: opts.name[1],
            value: opts.value[1],
            "data-marker": "form." + opts.marker[1]
        }],
        [".error", {
            "data-marker": "errors." + opts.marker[1]
        }]
    ]]
}

function normalize(name, opts) {
    if (!opts.marker) {
        throw new Error(name + "(opts): opts.marker is required " +
            JSON.stringify(opts))
    }

    if (!opts.label) {
        opts.label = spaced(opts.marker[0])
    }

    if (!opts.placeholder) {
        opts.placeholder = opts.marker.map(function (name) {
            "Please enter your " + spaced(name)
        })
    }

    if (!opts.name) {
        opts.name = opts.marker
    }

    if (!opts.id) {
        opts.id = uuid() + "~" + opts.name[0]
    }

    if (!opts.value) {
        opts.value = ["", ""]
    }

    return opts
}
