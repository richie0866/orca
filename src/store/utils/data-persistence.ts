import { HttpService } from "@rbxts/services";
import { ORCA_PATH } from "constants";
import { RootState } from "store/root.reducer";
import { rootChanged } from "store/root.store";
import { setInterval } from "@rbxts/roact-hooked-plus";

export function persistentData<T extends keyof RootState>(key: T): RootState[T] | undefined {
	try {
		// Create orca state folder
		if (makefolder && !isfolder(ORCA_PATH)) {
			makefolder(ORCA_PATH);
		}

		// Decode save data
		const currentSave = read(`${ORCA_PATH}/${key}.json`);
		const currentData =
			currentSave !== undefined ? (HttpService.JSONDecode(currentSave) as RootState[T]) : undefined;

		let dirty: RootState[T] | undefined;

		rootChanged(
			(state: RootState) => state[key],
			(newData) => (dirty = newData),
		);

		setInterval(() => {
			if (dirty !== undefined) {
				write(`${ORCA_PATH}/${key}.json`, HttpService.JSONEncode(dirty));
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
