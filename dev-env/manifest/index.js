const path = require('path');
const fs = require('fs');
const log = require('../log');

class ManifestPluginClass{
	constructor({ manifest, build }){
		this.manifestPath = manifest;
		this.buildPath = build
	}

	prepareBuildDir() {
		// Prepare clear build
		fs.removeSync(this.buildPath);
		fs.mkdirSync(this.buildPath);
	}

	writeManifest(){
		const manifestPath = path.join(this.buildPath, "manifest.json");
		log.pending(`Making 'build/manifest.json'`);
		fs.writeFileSync(manifestPath, JSON.stringify(this.manifest, null, 2), {encoding: 'utf8'});
		log.done();
	}

	loadManifest(){
		return JSON.parse(fs.readFileSync(this.manifestPath), 'utf8');
	}

	processManifest(){
		this.scripts = []
		this.manifest = this.loadManifest()

		console.log(this.manifest);
	}

}

const Manifest = (opts) => {
	return new ManifestPluginClass(opts || {})
}

module.exports = Manifest
