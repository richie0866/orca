import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useHotkeys } from "@rbxts/roact-hooked-plus";

import { togglePagesVisible } from "store/pages";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

function Shortcuts() {
	const dispatch = useRootDispatch();
	const shortcuts = useRootSelector((state) => state.shortcuts);

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
