import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import NavbarBody from "./NavbarBody";
import NavbarButtons from "./NavbarButtons";
import NavbarShadow from "./NavbarShadow";
import Screen from "components/Screen";
import { SCREEN_MARGIN } from "constants";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

const WIDTH = 400;
const HEIGHT = 56;

const POSITION_OPENED = new UDim2(0.5, 0, 1, -SCREEN_MARGIN);
const POSITION_CLOSED = new UDim2(0.5, 0, 1, -SCREEN_MARGIN - HEIGHT - 36);

function Navbar() {
	const style = useTheme((theme) => theme.navbar);
	const currentPage = useRootSelector((state) => state.pages.currentPage);
	const visible = useRootSelector((state) => state.pages.visible);

	const pageNumber = useSpring(currentPage, { frequency: 3.9, dampingRatio: 0.76 });
	const navbarVisibility = useSpring(visible ? 1 : 0, {});

	return (
		<Screen>
			<frame
				Size={new UDim2(0, WIDTH, 0, HEIGHT)}
				Position={navbarVisibility.map((n) => POSITION_CLOSED.Lerp(POSITION_OPENED, n))}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
			>
				<NavbarShadow style={style} pageNumber={pageNumber} />
				<NavbarBody style={style} pageNumber={pageNumber} />
				<NavbarButtons style={style} />
			</frame>
		</Screen>
	);
}

export default pure(Navbar);
