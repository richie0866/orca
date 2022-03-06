let clock = os.clock();
let clockName = "clock";

const debugCounter: Record<string, number> = {};

export function startTimer(name: string) {
	debugCounter[name] = (debugCounter[name] ?? 0) + 1;
	clockName = name;
	clock = os.clock();
}

export function endTimer() {
	const diff = os.clock() - clock;
	const count = debugCounter[clockName] ?? 0;
	print(`\n[${clockName} ${count}]\n${diff * 1000} ms\n\n`);
}
