import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import NavbarBody from "./NavbarBody";
import NavbarShadow from "./NavbarShadow";
import NavbarTabs from "./NavbarTabs";
import Screen from "components/Screen";

import { HEIGHT, POSITION_CLOSED, POSITION_OPENED, WIDTH } from "./constants";
import { useMargin } from "hooks/use-margin";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

function Navbar() {
	const style = useTheme((theme) => theme.navbar);
	const currentPage = useRootSelector((state) => state.pages.currentPage);
	const visible = useRootSelector((state) => state.pages.visible);

	const pageNumber = useSpring(currentPage, { frequency: 3.9, dampingRatio: 0.76 });
	const navbarVisibility = useSpring(visible ? 1 : 0, {});

	return (
		<Screen>
			<uipadding PaddingBottom={useMargin().map((m) => new UDim(0, m))} />

			<frame
				Size={new UDim2(0, WIDTH, 0, HEIGHT)}
				Position={navbarVisibility.map((n) => POSITION_CLOSED.Lerp(POSITION_OPENED, n))}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
			>
				<NavbarShadow style={style} pageNumber={pageNumber} />
				<NavbarBody style={style} pageNumber={pageNumber} />
				<NavbarTabs style={style} />
			</frame>
		</Screen>
	);
}

export default pure(Navbar);
