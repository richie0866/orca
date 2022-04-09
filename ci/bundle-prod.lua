local bundler = loadfile("ci/bundler.lua")()

bundler({
	output = ...,
	version = select(2, ...),
	debug = false,
	verbose = false,
	minify = true,
})
