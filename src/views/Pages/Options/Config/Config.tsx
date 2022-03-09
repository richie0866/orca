import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px, scale } from "utils/udim2";
import ConfigItem, { ENTRY_HEIGHT, PADDING } from "./ConfigItem";

const ENTRY_COUNT = 1; // Hardcoded for now

function Config() {
	const theme = useTheme("options").config;

	return (
		<Card
			index={0}
			page={DashboardPage.Options}
			theme={theme}
			size={px(326, 184)}
			position={new UDim2(0, 0, 1, -416 - 48)}
		>
			<textlabel
				Text="Options"
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
					CanvasSize={px(0, ENTRY_COUNT * (ENTRY_HEIGHT + PADDING) + PADDING)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ClipsDescendants={false}
				>
					<ConfigItem
						action="acrylicBlur"
						description="Acrylic background blurring"
						hint="<font face='GothamBlack'>Toggle BG blur</font> in some themes. May be detectable when enabled."
						index={0}
					/>
				</scrollingframe>
			</Canvas>
		</Card>
	);
}

export default hooked(Config);
