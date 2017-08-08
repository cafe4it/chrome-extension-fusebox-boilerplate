const path = require('path');

const root = path.normalize(path.join(__dirname, '..'));
const packageJson = path.normalize(path.join(root, 'package.json'));
const src = path.normalize(path.join(root, 'src'));
const build = process.env.NODE_ENV === "development"
	? path.normalize(path.join(root, "build"))
	: path.normalize(path.join(root, "dist"));
const manifest = process.env.NODE_ENV === 'development'
	? path.normalize(path.join(src, "manifest.dev.json"))
	: path.normalize(path.join(src, "manifest.json"));

module.exports = {
	root,
	packageJson,
	src,
	build,
	manifest
}
