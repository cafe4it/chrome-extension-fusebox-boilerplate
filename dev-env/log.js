const clc = require('cli-color');

const pending = function(message) {
	console.log(clc.yellow(message))
}

const success = function(message) {
	console.log(clc.green(message))
}

const error = function(message) {
	console.error(clc.red(message))
}

const done = function() {
	success("Done")
}

module.exports = {pending, success, error, done}
