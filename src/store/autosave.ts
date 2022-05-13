import { HttpService } from "@rbxts/services";
import { setInterval } from "@rbxts/roact-hooked-plus";

import { DATA_DIRECTORY } from "constants/env";
import { RootState } from "reducers";

export function autosave<T extends keyof RootState>(key: T, getState: () => RootState): RootState[T] | undefined {
	try {
		// Create orca state folder
		if (makefolder && !isfolder(DATA_DIRECTORY)) {
			makefolder(DATA_DIRECTORY);
		}

		// Decode save data
		const currentSave = read(`${DATA_DIRECTORY}/${key}.json`);
		const currentData =
			currentSave !== undefined ? (HttpService.JSONDecode(currentSave) as RootState[T]) : undefined;

		let prevState: RootState[T] | undefined;

		setInterval(() => {
			const newState = getState()[key];

			if (prevState !== newState) {
				prevState = newState;

				write(`${DATA_DIRECTORY}/${key}.json`, HttpService.JSONEncode(newState));
			}
		}, 5000);

		return currentData;
	} catch (e) {
		warn(`Failed to load ${DATA_DIRECTORY}/${key}.json: ${e}`);
		return undefined;
	}
}

function read(file: string) {
	if (readfile) {
		return isfile(file) ? readfile(file) : undefined;
	}
	print(`READ   ${file}`);
}

function write(file: string, content: string) {
	if (writefile) {
		return writefile(file, content);
	}
	print(`WRITE  ${file} => \n${content}`);
}
