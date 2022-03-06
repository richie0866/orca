import { RunService } from "@rbxts/services";

export class Timeout {
	public running = true;

	constructor(callback: Callback, milliseconds: number, ...args: unknown[]) {
		task.delay(milliseconds / 1000, () => {
			if (this.running) {
				callback(...args);
			}
		});
	}

	public clear() {
		this.running = false;
	}
}

export function setTimeout(callback: Callback, milliseconds: number, ...args: unknown[]) {
	return new Timeout(callback, milliseconds, ...args);
}

export function clearTimeout(timeout: Timeout) {
	timeout.clear();
}

export class Interval {
	public running = true;

	constructor(callback: Callback, milliseconds: number, ...args: unknown[]) {
		task.defer(() => {
			let clock = 0;
			const hb = RunService.Heartbeat.Connect((step) => {
				clock += step;
				if (!this.running) {
					hb.Disconnect();
				} else if (clock >= milliseconds / 1000) {
					clock -= milliseconds / 1000;
					callback(...args);
				}
			});
		});
	}

	public clear() {
		this.running = false;
	}
}

export function setInterval(callback: Callback, milliseconds: number, ...args: unknown[]) {
	return new Interval(callback, milliseconds, ...args);
}

export function clearInterval(interval: Interval) {
	interval.clear();
}
