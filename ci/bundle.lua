local PARAMS = {...}

local function getFlag(flag)
	for _, v in ipairs(PARAMS) do
		if v == flag then
			return true
		end
	end
	return false
end

local OUTPUT_PATH = assert(PARAMS[1], "No output path specified")
local VERSION = assert(PARAMS[2], "No version specified")
local DEBUG_MODE = getFlag("debug")
local VERBOSE = getFlag("verbose")
local MINIFY = getFlag("minify")

local ROJO_INPUT = "Orca.rbxm"
local RUNTIME_FILE = "ci/runtime.lua"
local BUNDLE_TEMP = "ci/bundle.tmp"

---Convert some specific snippets to work in luamin.
---@param source string
---@return string
local function transformInput(source)
	-- Capture (var) (+-/*%^..)= (value)
	-- Substitute %1 = %1 %2 %3
	source = string.gsub(source, "([%w_]+)%s*([%+%-%*/%%^%.]%.?)=%s*", "%1 = %1 %2")

	-- Capture whole word 'continue'
	-- Substitute __CONTINUE__()
	source = string.gsub(source, "(%s+)continue(%s+)", "%1__CONTINUE__()%2")

	return source
end

---@param source string
---@return string
local function transformOutput(source)
	-- Substitute ...: with (...):
	-- For a luamin bug caused by calling varargs
	source = string.gsub(source, "%.%.%.:", "(...):")

	-- Capture __CONTINUE__()
	-- Substitute continue
	source = string.gsub(source, "__CONTINUE__%(%)", "continue;")

	return source
end

---@param source string
---@return string
local function minify(source)
	remodel.writeFile(BUNDLE_TEMP, transformInput(source))

	os.execute("node ci/minify.js")
	local output = remodel.readFile(BUNDLE_TEMP)

	os.remove(BUNDLE_TEMP)

	return transformOutput(output)
end

---@param object LocalScript | ModuleScript
---@param output table<number, string>
local function writeModule(object, output)
	local id = object:GetFullName()
	local source = remodel.getRawProperty(object, "Source")

	local path = string.format("%q", id)
	local parent = object.Parent and string.format("%q", object.Parent:GetFullName()) or "nil"
	local name = string.format("%q", object.Name)
	local className = string.format("%q", object.ClassName)

	if DEBUG_MODE then
		local def = table.concat({
			"newModule(" .. name .. ", " .. className .. ", " .. path .. ", " .. parent .. ", function ()",
			"local fn = assert(loadstring(" .. string.format("%q", source) .. ", '@'.." .. path .. "))",
			"setfenv(fn, newEnv(" .. path .. "))",
			"return fn()",
			"end)",
		}, " ")
		table.insert(output, def)
	else
		local def = table.concat({
			"newModule(" .. name .. ", " .. className .. ", " .. path .. ", " .. parent .. ", function ()",
			"return setfenv(function()",
			source,
			"end, newEnv(" .. path .. "))()",
			"end)",
		}, " ")
		table.insert(output, def)
	end
end

---@param object Instance
---@param output table<number, string>
local function writeInstance(object, output)
	local id = object:GetFullName()

	local path = string.format("%q", id)
	local parent = object.Parent and string.format("%q", object.Parent:GetFullName()) or "nil"
	local name = string.format("%q", object.Name)
	local className = string.format("%q", object.ClassName)

	local def = table.concat({
		"newInstance(" .. name .. ", " .. className .. ", " .. path .. ", " .. parent .. ")",
	}, "\n")
	table.insert(output, def)
end

---@param object LocalScript | ModuleScript
---@param output table<number, string>
local function writeInstanceTree(object, output)
	if object.ClassName == "LocalScript" or object.ClassName == "ModuleScript" then
		writeModule(object, output)
	else
		writeInstance(object, output)
	end

	for _, child in ipairs(object:GetChildren()) do
		writeInstanceTree(child, output)
	end
end

local function main()
	local output = {}
	local model = remodel.readModelFile(ROJO_INPUT)[1]

	-- Add instances
	writeInstanceTree(model, output)

	-- Minify current output
	if MINIFY then
		output = { minify(table.concat(output, "\n")) }
	end

	-- Core runtime
	local runtime = string.gsub(remodel.readFile(RUNTIME_FILE), "__VERSION__", string.format("%q", VERSION))
	table.insert(output, 1, runtime)
	table.insert(output, "init()")

	if VERBOSE then
		table.insert(output, 2, "local START_TIME = os.clock()")
		table.insert(output, "print(\"[CI " .. VERSION .. "] Orca run in \" .. (os.clock() - START_TIME) * 1000 .. \" ms\")")
	end

	-- Write to file
	remodel.createDirAll(string.match(OUTPUT_PATH, "^(.*)[/\\]"))
	remodel.writeFile(OUTPUT_PATH, table.concat(output, "\n\n"))

	print("[CI " .. VERSION .. "] Bundle written to " .. OUTPUT_PATH)
end

main()
