import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Acrylic from "components/Acrylic";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { useAppSelector } from "hooks/common/rodux-hooks";
import { useSpring } from "hooks/common/use-spring";
import { useCurrentPage } from "hooks/use-current-page";
import { useTheme } from "hooks/use-theme";
import { DashboardPage, PAGE_TO_INDEX } from "store/models/dashboard.model";
import { getColorInSequence, hex } from "utils/color3";
import { px, scale } from "utils/udim2";
import NavbarTab from "./NavbarTab";

const NAVBAR_SIZE = px(400, 56);

function Navbar() {
	const theme = useTheme("navbar");
	const page = useCurrentPage();
	const isOpen = useAppSelector((state) => state.dashboard.isOpen);

	const alpha = useSpring(PAGE_TO_INDEX[page] / 4, { frequency: 3.9, dampingRatio: 0.76 });

	return (
		<frame
			Size={NAVBAR_SIZE}
			Position={useSpring(isOpen ? new UDim2(0.5, 0, 1, 0) : new UDim2(0.5, 0, 1, 48 + 56 + 20), {})}
			AnchorPoint={new Vector2(0.5, 1)}
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
			<Underglow
				transparency={theme.glowTransparency}
				position={alpha.map((a) => a + 0.125)}
				sequenceColor={alpha.map((a) => getColorInSequence(theme.accentGradient.color, a + 0.125))}
			/>

			{/* Body */}
			<Fill
				color={theme.background}
				gradient={theme.backgroundGradient}
				radius={8}
				transparency={theme.transparency}
			/>

			{/* Accent */}
			<Canvas
				size={px(100, 56)}
				position={alpha.map((a) => scale(math.round(a * 800) / 800, 0))}
				clipsDescendants
			>
				<frame
					Size={NAVBAR_SIZE}
					Position={alpha.map((a) => scale(-4 * (math.round(a * 800) / 800), 0))}
					BackgroundColor3={hex("#FFFFFF")}
					BorderSizePixel={0}
				>
					<uigradient
						Color={theme.accentGradient.color}
						Transparency={theme.accentGradient.transparency}
						Rotation={theme.accentGradient.rotation}
					/>
					<uicorner CornerRadius={new UDim(0, 8)} />
				</frame>
			</Canvas>

			{/* Overlapping border */}
			{theme.outlined && <Border Key="border" color={theme.foreground} radius={8} transparency={0.8} />}

			{/* Tabs */}
			<NavbarTab page={DashboardPage.Home} />
			<NavbarTab page={DashboardPage.Apps} />
			<NavbarTab page={DashboardPage.Scripts} />
			<NavbarTab page={DashboardPage.Options} />

			{/* Effects */}
			{theme.acrylic && <Acrylic />}
		</frame>
	);
}

export default hooked(Navbar);

function Underglow(props: {
	sequenceColor: Roact.Binding<Color3>;
	position: Roact.Binding<number>;
	transparency: number;
}) {
	return (
		<imagelabel
			Image="rbxassetid://8992238178"
			ImageColor3={props.sequenceColor}
			ImageTransparency={props.transparency}
			Size={px(148, 104)}
			Position={props.position.map((a) => new UDim2(a, 0, 0, -18))}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
		/>
	);
}
