import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import { useAppDispatch } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useTheme } from "hooks/use-theme";
import { setDashboardPage } from "store/actions/dashboard.action";
import { DashboardPage, PAGE_TO_ICON, PAGE_TO_INDEX } from "store/models/dashboard.model";
import { px, scale } from "utils/udim2";

interface Props {
	page: DashboardPage;
}

const TAB_SIZE = px(100, 56);

function NavbarTab({ page }: Props) {
	const theme = useTheme("navbar");
	const isActive = useIsPageOpen(page);
	const dispatch = useAppDispatch();
	const [isHovered, setHovered] = useState(false);

	return (
		<textbutton
			Text=""
			AutoButtonColor={false}
			Active={!isActive}
			Size={TAB_SIZE}
			Position={scale(PAGE_TO_INDEX[page] / 4, 0)}
			BackgroundTransparency={1}
			Event={{
				Activated: () => dispatch(setDashboardPage(page)),
				MouseEnter: () => setHovered(true),
				MouseLeave: () => setHovered(false),
			}}
		>
			<imagelabel
				Image={PAGE_TO_ICON[page]}
				ImageColor3={theme.foreground}
				ImageTransparency={useSpring(isActive ? 0 : isHovered ? 0.5 : 0.75, {})}
				Size={px(36, 36)}
				Position={scale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
			/>
		</textbutton>
	);
}

export default hooked(NavbarTab);
