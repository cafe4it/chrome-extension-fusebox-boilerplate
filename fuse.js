const { FuseBox, CSSPlugin, WebIndexPlugin, QuantumPlugin, Sparky, BabelPlugin } = require("fuse-box");

let fuse, app, vendor, isProduction = false;

Sparky.task("config", () => {
	fuse = FuseBox.init({
		homeDir: "src",
		output: "dist/$name.js",
		experimentalFeatures: true,
		hash: isProduction,
		sourceMaps: !isProduction,
		plugins: [
			CSSPlugin(),
			WebIndexPlugin(),
			BabelPlugin({
				presets: ["es2015"]
			}),
			isProduction && QuantumPlugin({
				uglify: true
			}),
		]
	});

	// out main bundle
	app = fuse.bundle("app")
		.split("background/**", "index > background/index.ts")
		.split("content/**", "index > content/index.ts")
		.instructions("> [**/**.ts]")

	if (!isProduction) {
		fuse.dev();
	}
});

// development task "node fuse""
Sparky.task("default", ["config"], () => {
	app.watch();
	return fuse.run();
});

// Dist task "node fuse dist"
Sparky.task("dist", ["set-production", "config"], () => {
	fuse.dev();
	return fuse.run();
});

Sparky.task("set-production", () => {
	isProduction = true;
	return Sparky.src("dist/").clean("dist/");
});

Sparky.task("test", ["config"], () => {
	return app.test();
});
