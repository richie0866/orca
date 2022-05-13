import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useHotkeys } from "@rbxts/roact-hooked-plus";

import { selectShortcuts } from "reducers/shortcuts";
import { togglePagesVisible } from "reducers/pages";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

function Shortcuts() {
	const dispatch = useRootDispatch();
	const shortcuts = useRootSelector(selectShortcuts);

	useHotkeys([
		[
			[shortcuts.toggleOrca || "K"],
			() => {
				dispatch(togglePagesVisible());
			},
		],
	]);

	return <></>;
}

export default pure(Shortcuts);
