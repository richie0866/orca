import { HttpService, Players } from "@rbxts/services";
import { getStore } from "jobs/helpers/job-store";
import { RootState } from "store/store";
import { setInterval } from "utils/timeout";

if (makefolder && !isfolder("_orca")) {
	makefolder("_orca");
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

export function persistentState<T extends object>(name: string, selector: (state: RootState) => T, defaultValue: T): T {
	try {
		const serializedState = read(`_orca/${name}.json`);

		if (serializedState === undefined) {
			write(`_orca/${name}.json`, HttpService.JSONEncode(defaultValue));
			return defaultValue;
		}
		const value = HttpService.JSONDecode(serializedState) as T;

		autosave(name, selector).catch(() => {
			warn("Autosave failed");
		});

		return value;
	} catch (err) {
		warn(`Failed to load ${name}.json: ${err}`);
		return defaultValue;
	}
}

async function autosave(name: string, selector: (state: RootState) => object) {
	const store = await getStore();

	function save() {
		const state = selector(store.getState());
		write(`_orca/${name}.json`, HttpService.JSONEncode(state));
	}

	setInterval(() => save, 60000);

	Players.PlayerRemoving.Connect((player) => {
		if (player === Players.LocalPlayer) {
			save();
		}
	});
}
