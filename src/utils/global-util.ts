const globals = getgenv ? getgenv() : {};

export function getGlobals() {
	return globals;
}

export function setGlobal(key: string, value: unknown) {
	globals[key] = value;
}

export function hasGlobal(key: string) {
	return key in globals;
}
