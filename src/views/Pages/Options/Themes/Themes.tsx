import Roact from "@rbxts/roact";
import { hooked, useMemo } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { getThemes } from "themes";
import { arrayToMap } from "utils/array-util";
import { px, scale } from "utils/udim2";
import ThemeItem, { ENTRY_HEIGHT, PADDING } from "./ThemeItem";

function Themes() {
	const theme = useTheme("options").themes;
	const themes = useMemo(getThemes, []);

	return (
		<Card
			index={2}
			page={DashboardPage.Options}
			theme={theme}
			size={px(326, 416)}
			position={new UDim2(0, 374, 1, 0)}
		>
			<textlabel
				Text="Themes"
				Font="GothamBlack"
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24, 24)}
				BackgroundTransparency={1}
			/>

			<Canvas size={px(326, 348)} position={px(0, 68)} padding={{ left: 24, right: 24, top: 8 }} clipsDescendants>
				<scrollingframe
					Size={scale(1, 1)}
					CanvasSize={px(0, themes.size() * (ENTRY_HEIGHT + PADDING) + PADDING)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ClipsDescendants={false}
				>
					{arrayToMap(themes, (theme, index) => [theme.name, <ThemeItem theme={theme} index={index} />])}
				</scrollingframe>
			</Canvas>
		</Card>
	);
}

export default hooked(Themes);
