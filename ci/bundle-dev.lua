local bundler = loadfile("ci/bundler.lua")()

bundler({
	output = ...,
	version = select(2, ...),
	debug = true,
	verbose = true,
	minify = false,
})
