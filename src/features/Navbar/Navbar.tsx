import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import { useSpring } from "@rbxts/roact-hooked-plus";

import NavbarBody from "./NavbarBody";
import NavbarShadow from "./NavbarShadow";
import NavbarTabs from "./NavbarTabs";
import Root from "components/Root";

import { HEIGHT, POSITION_CLOSED, POSITION_OPENED, WIDTH } from "./constants";
import { pageNumbers, selectCurrentPage } from "reducers/pages";
import { useMargin } from "hooks/use-margin";
import { usePagesVisible } from "hooks/use-page-open";
import { useRootSelector } from "hooks/use-root-store";
import { useScale } from "hooks/use-scale";
import { useTheme } from "hooks/use-theme";

function Navbar() {
	const style = useTheme((theme) => theme.navbar);
	const currentPage = useRootSelector(selectCurrentPage);
	const visible = usePagesVisible();

	const pageNumber = useSpring(pageNumbers[currentPage], { frequency: 3.9, dampingRatio: 0.76 });
	const navbarVisibility = useSpring(visible ? 1 : 0, {});

	return (
		<Root>
			<frame
				Size={new UDim2(0, WIDTH, 0, HEIGHT)}
				Position={navbarVisibility.map((n) => POSITION_CLOSED.Lerp(POSITION_OPENED, n))}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
			>
				<frame
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
				>
					<NavbarShadow style={style} pageNumber={pageNumber} />
					<NavbarBody style={style} pageNumber={pageNumber} />
					<NavbarTabs style={style} />

					<uiscale Scale={useScale()} />
				</frame>
			</frame>

			<uipadding PaddingBottom={useMargin().map((m) => new UDim(0, m))} />
		</Root>
	);
}

export default pure(Navbar);
