import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import ParallaxImage from "components/ParallaxImage";
import { VERSION_TAG } from "constants";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useParallaxOffset } from "hooks/use-parallax-offset";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px, scale } from "utils/udim2";

function Title() {
	const theme = useTheme("home").title;
	const offset = useParallaxOffset();

	return (
		<Card
			index={0}
			page={DashboardPage.Home}
			theme={theme}
			size={px(326, 184)}
			position={new UDim2(0, 0, 1, -648 - 48)}
		>
			{/* Whale */}
			<ParallaxImage
				image="rbxassetid://9049308243"
				imageSize={new Vector2(652, 368)}
				padding={new Vector2(30, 30)}
				offset={offset}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />
			</ParallaxImage>

			{/* Shine */}
			<imagelabel
				Image="rbxassetid://9048947177"
				Size={scale(1, 1)}
				ImageTransparency={0.3}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />
			</imagelabel>

			{/* Info */}
			<Canvas padding={{ top: 24, left: 24 }}>
				<Label index={0} text="Orca" font={Enum.Font.GothamBlack} size={20} position={px(0, 0)} />
				<Label index={1} text={VERSION_TAG} position={px(0, 40)} />
				<Label index={2} text="By 0866" position={px(0, 63)} transparency={0.15} />
				<Label index={3} text="Pls star repo" position={px(0, 86)} transparency={0.3} />
				<Label index={4} text="richie0866/orca" position={new UDim2(0, 0, 1, -40)} transparency={0.45} />
			</Canvas>
		</Card>
	);
}

export default hooked(Title);

// Title card info labels
interface LabelProps {
	index: number;
	text: string;
	font?: Enum.Font;
	size?: number;
	position: UDim2;
	transparency?: number;
}

function LabelComponent(props: LabelProps) {
	const { index, text, font = Enum.Font.GothamBold, size = 16, position, transparency = 0 } = props;

	const theme = useTheme("home").title;
	const isOpen = useIsPageOpen(DashboardPage.Home);
	const isActive = useDelayedUpdate(isOpen, index * 100 + 300, (current) => !current);

	return (
		<textlabel
			Text={text}
			Font={font}
			TextColor3={theme.foreground}
			TextSize={size}
			TextTransparency={useSpring(isActive ? transparency : 1, { frequency: 2 })}
			TextXAlignment="Left"
			TextYAlignment="Top"
			Size={px(200, 24)}
			Position={useSpring(isActive ? position : position.sub(px(24, 0)), {})}
			BackgroundTransparency={1}
		/>
	);
}

const Label = hooked(LabelComponent);
