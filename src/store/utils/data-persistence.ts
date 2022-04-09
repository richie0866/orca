import { HttpService } from "@rbxts/services";
import { setInterval } from "@rbxts/roact-hooked-plus";

import { ORCA_PATH } from "constants";
import { RootState } from "store/root.reducer";

export function persistentData<T extends keyof RootState>(key: T, getState: () => RootState): RootState[T] | undefined {
	try {
		// Create orca state folder
		if (makefolder && !isfolder(ORCA_PATH)) {
			makefolder(ORCA_PATH);
		}

		// Decode save data
		const currentSave = read(`${ORCA_PATH}/${key}.json`);
		const currentData =
			currentSave !== undefined ? (HttpService.JSONDecode(currentSave) as RootState[T]) : undefined;

		let prevState: RootState[T] | undefined;

		setInterval(() => {
			const newState = getState()[key];

			if (prevState !== newState) {
				prevState = newState;

				write(`${ORCA_PATH}/${key}.json`, HttpService.JSONEncode(newState));
			}
		}, 5000);

		return currentData;
	} catch (e) {
		warn(`Failed to load ${ORCA_PATH}/${key}.json: ${e}`);
		return undefined;
	}
}

function read(file: string) {
	if (readfile) {
		return isfile(file) ? readfile(file) : undefined;
	} else {
		print(`READ   ${file}`);
		return;
	}
}

function write(file: string, content: string) {
	if (writefile) {
		return writefile(file, content);
	} else {
		print(`WRITE  ${file} => \n${content}`);
		return;
	}
}
