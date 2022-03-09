import Roact from "@rbxts/roact";
import { hooked, useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { TextService } from "@rbxts/services";
import Acrylic from "components/Acrylic";
import Border from "components/Border";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useTheme } from "hooks/use-theme";
import { setInterval } from "utils/timeout";
import { px } from "utils/udim2";

const MIN_CLOCK_SIZE = px(56, 56);
const CLOCK_PADDING = 14;

function getTime() {
	return os.date("%I:%M %p").gsub("^0([0-9])", "%1")[0];
}

function Clock() {
	const isOpen = useAppSelector((state) => state.dashboard.isOpen);
	const theme = useTheme("clock");

	const [currentTime, setTime] = useState(getTime());
	const textWidth = useMemo(
		() => TextService.GetTextSize(currentTime, 20, "GothamBold", new Vector2(200, 56)),
		[currentTime],
	);

	useEffect(() => {
		const interval = setInterval(() => setTime(getTime()), 1000);
		return () => interval.clear();
	}, []);

	return (
		<frame
			Size={MIN_CLOCK_SIZE.add(px(textWidth.X + CLOCK_PADDING, 0))}
			Position={useSpring(isOpen ? new UDim2(0, 0, 1, 0) : new UDim2(0, 0, 1, 48 + 56 + 20), {})}
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={1}
		>
			{/* Shadows */}
			<Glow
				radius={GlowRadius.Size146}
				size={new UDim2(1, 80, 0, 146)}
				position={px(-40, -20)}
				color={theme.dropshadow}
				gradient={theme.dropshadowGradient}
				transparency={theme.transparency}
			/>

			{/* Body */}
			<Fill
				color={theme.background}
				gradient={theme.backgroundGradient}
				transparency={theme.transparency}
				radius={8}
			/>
			{theme.outlined && <Border Key="border" color={theme.foreground} radius={8} transparency={0.8} />}

			{/* Time */}
			<imagelabel
				Image="rbxassetid://8992234911"
				ImageColor3={theme.foreground}
				Size={px(36, 36)}
				Position={px(10, 10)}
				BackgroundTransparency={1}
			/>
			<textlabel
				Text={currentTime}
				Font="GothamBold"
				TextColor3={theme.foreground}
				TextSize={20}
				TextXAlignment="Left"
				TextYAlignment="Center"
				Size={px(0, 0)}
				Position={px(51, 27)}
				BackgroundTransparency={1}
			/>

			{/* Effects */}
			{theme.acrylic && <Acrylic />}
		</frame>
	);
}

export default hooked(Clock);
