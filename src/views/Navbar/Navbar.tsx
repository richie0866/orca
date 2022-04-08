import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import Screen from "components/Screen";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

const POSITION_OPENED = new UDim2(0.5, 0, 1, 0);
const POSITION_CLOSED = new UDim2(0.5, 0, 1, 48 + 56 + 20);

function Navbar() {
	const theme = useTheme((theme) => theme.navbar);
	const currentPage = useRootSelector((state) => state.pages.currentPage);
	const visible = useRootSelector((state) => state.pages.visible);

	const pageNumber = useSpring(currentPage, { frequency: 3.9, dampingRatio: 0.76 });
	const pageVisible = useSpring(visible ? 1 : 0, {});

	return (
		<Screen>
			<frame
				Size={new UDim2(0, 400, 0, 56)}
				Position={pageVisible.map((n) => POSITION_CLOSED.Lerp(POSITION_OPENED, n))}
			></frame>
		</Screen>
	);
}

export default pure(Navbar);
