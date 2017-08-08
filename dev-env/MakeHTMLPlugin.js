const path = require('path');
const fs = require('fs-extra');
const log = require('./log');
const paths = require('./paths');

class MakeHTMLPluginClass{
	constructor(opts){
		this.opts = opts
	}

	bundleEnd(context){
		const isProduction = process.env.NODE_ENV === 'development';
		const scriptFilePath = `${this.opts.bundle}.js`;
		const scriptUrl = isProduction ? `/${scriptFilePath}` : path.join('http://localhost:4444', scriptFilePath);
		const script = `<script src="${scriptUrl}" async defer></script>`;
		const htmlFilePath = path.join(paths.build, `${this.opts.bundle}.html`);
		log.pending(`Making html '${htmlFilePath}'`);
		const html = MakeHTMLLayout({
			script: script
		});
		fs.ensureFileSync(htmlFilePath);
		fs.writeFileSync(htmlFilePath, html);
		log.done();
	}
}

const MakeHTMLLayout = ({script}) => {
	return (
		`<!DOCTYPE html>
<html>
  <head>
    <meta charSet="utf-8" />
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
  </head>
  <body>   
    ${script}
  </body>
</html>`
	)
}

const MakeHTMLPlugin = (opts) => {
	return new MakeHTMLPluginClass(opts || {})
}

module.exports = MakeHTMLPlugin