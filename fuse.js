const { FuseBox, CSSPlugin, WebIndexPlugin, QuantumPlugin, Sparky, BabelPlugin } = require("fuse-box");

let fuse, isProduction = false;



Sparky.task("build", () => {
	fuse = FuseBox.init({
		homeDir: "src",
		output: isProduction ? "dist/$name.js" : "build/$name.js",
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

	fuse.bundle('content/index')
		.watch('content/**')
		.hmr()
		.instructions(' > content/index.ts');

	fuse.bundle('background/index')
		.watch('background/**')
		.hmr()
		.instructions(' > background/index.ts');

    fuse.bundle('popup/index')
        .watch('popup/**')
        .hmr()
        .instructions(' > popup/index.ts')

    fuse.bundle('newtab/index')
        .watch('newtab/**')
        .hmr()
        .instructions(' > newtab/index.ts');

    fuse.bundle('options/index')
        .watch('options/**')
        .hmr()
        .instructions(' > options/index.ts');

	if (!isProduction) {
		fuse.dev();
	}

	fuse.run();
});

Sparky.task('default', ['clean-build', 'build'],() => {
	console.log('build successfully!')
});

Sparky.task('set-production-env', () => {
	isProduction = true;
});

Sparky.task('clean-build', () => {
	return Sparky.src('build/*').clean('build/');
});

Sparky.task('clean-dist', () => {
    return Sparky.src('dist/*').clean('dist/');
});

Sparky.task('dist', ['clean-dist', 'set-production-env', 'build'], () => {
	console.log('product successfully!')
});

