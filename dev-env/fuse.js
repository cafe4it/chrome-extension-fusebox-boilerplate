const { FuseBox, CSSPlugin, Sparky, BabelPlugin, UglifyESPlugin } = require("fuse-box");
const paths = require('./paths');
const MakeHTMLPlugin = require("./MakeHTMLPlugin");

let fuse, isProduction = false;



Sparky.task("build", () => {
	isProduction = process.env.NODE_ENV !== 'development';
	fuse = FuseBox.init({
		homeDir: "../src",
		output: `${paths.build}/$name.js`,
		sourceMaps: !isProduction,
		plugins: [
			CSSPlugin(),
			BabelPlugin({
				presets: ["es2015"]
			}),
			isProduction && UglifyESPlugin({
				compress: true
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
	    .plugin(MakeHTMLPlugin({
		    bundle: 'popup/index'
	    }))
        .hmr()
        .instructions(' > popup/index.ts')

    fuse.bundle('newtab/index')
        .watch('newtab/**')
	    .plugin(MakeHTMLPlugin({
		    bundle: 'newtab/index'
	    }))
        .hmr()
        .instructions(' > newtab/index.ts');

    fuse.bundle('options/index')
        .watch('options/**')
	    .plugin(MakeHTMLPlugin({
		    bundle: 'options/index'
	    }))
        .hmr()
        .instructions(' > options/index.ts');

	if (!isProduction) {
		fuse.dev();
	}

	fuse.run();
});

Sparky.task('default', ['clean-build', 'build'],() => {
	console.log('begin building...');
});

Sparky.task('clean', () => {
	return Sparky.src(`${paths.build}/*`).clean(`${paths.build}/`);
});

