import Roact from "@rbxts/roact";
import { TextService } from "@rbxts/services";
import { pure, useBinding, useEffect, useMemo } from "@rbxts/roact-hooked";
import { setInterval, useSpring } from "@rbxts/roact-hooked-plus";

import Dropshadow, { DropshadowBlur } from "components/Dropshadow";
import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import Screen from "components/Screen";
import { SCREEN_MARGIN } from "constants";
import { asColor, asTransparency } from "store/themes";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

const MIN_WIDTH = 56;
const MAX_WIDTH = 200;
const HEIGHT = 56;
const PADDING = 14;

const POSITION_OPENED = new UDim2(0, SCREEN_MARGIN, 1, -SCREEN_MARGIN);
const POSITION_CLOSED = new UDim2(0, SCREEN_MARGIN, 1, -SCREEN_MARGIN - HEIGHT - 36);

const getClock = () => os.date("%I:%M %p").gsub("^0([0-9])", "%1")[0];

function Clock() {
	const style = useTheme((theme) => theme.clock);
	const visible = useRootSelector((state) => state.pages.visible);

	const [clock, setClock] = useBinding(getClock());
	const clockTextSize = useMemo(() => {
		return clock.map((text) => TextService.GetTextSize(text, 20, "GothamBold", new Vector2(MAX_WIDTH, HEIGHT)));
	}, [clock]);

	const navbarVisibility = useSpring(visible ? 1 : 0, {});

	useEffect(() => {
		const interval = setInterval(() => {
			setClock(getClock());
		}, 1000);

		return () => interval.clear();
	}, []);

	return (
		<Screen>
			<frame
				Size={clockTextSize.map((size) => new UDim2(0, size.X + MIN_WIDTH + PADDING, 0, HEIGHT))}
				Position={navbarVisibility.map((n) => POSITION_CLOSED.Lerp(POSITION_OPENED, n))}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={1}
			>
				{/* Clock dropshadow */}
				<Dropshadow
					blur={DropshadowBlur.Large}
					scale={1.1}
					color={asColor(style.dropshadow)}
					transparency={asTransparency(style.dropshadow)}
					size={new UDim2(1, 100, 1, 42)}
					position={new UDim2(0.5, 0, 0.5, 16)}
				>
					<Gradient color={style.dropshadow} />
				</Dropshadow>

				{/* Body */}
				<frame
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundColor3={asColor(style.background)}
					BackgroundTransparency={asTransparency(style.background)}
					BorderSizePixel={0}
				>
					<Gradient color={style.background} />
					<uicorner CornerRadius={style.cornerRadius} />
				</frame>

				{/* Clock icon */}
				<imagelabel
					Image="rbxassetid://8992234911"
					ImageColor3={asColor(style.foreground)}
					ImageTransparency={asTransparency(style.foreground)}
					Size={new UDim2(0, 36, 0, 36)}
					Position={new UDim2(0, 10, 0, 10)}
					BackgroundTransparency={1}
				/>

				{/* Time */}
				<textlabel
					Text={clock}
					Font="GothamBold"
					TextColor3={asColor(style.foreground)}
					TextTransparency={asTransparency(style.foreground)}
					TextSize={20}
					TextXAlignment="Left"
					TextYAlignment="Center"
					Position={new UDim2(0, 51, 0, 27)}
					BackgroundTransparency={1}
				/>

				{/* Stroke */}
				{style.stroke && (
					<InnerStroke
						color={asColor(style.stroke)}
						transparency={asTransparency(style.stroke)}
						size={1}
						radius={style.cornerRadius}
					>
						<Gradient color={style.stroke} />
					</InnerStroke>
				)}
			</frame>
		</Screen>
	);
}

export default pure(Clock);
