import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import Card from "components/Card";
import ImageParallax from "components/ImageParallax";
import TitleContent from "./TitleContent";
import { CARD_MARGIN, CARD_WIDTH } from "constants";
import { Page } from "store/pages";
import { useParallax } from "hooks/use-parallax";
import { useTheme } from "hooks/use-theme";

function Title() {
	const style = useTheme((theme) => theme.title);

	const offset = useParallax();

	return (
		<Card
			index={0}
			align="left"
			style={style}
			page={Page.Home}
			size={new UDim2(0, CARD_WIDTH, 0, 184)}
			position={new UDim2(0, 0, 1, -648 - CARD_MARGIN)}
		>
			{/* Moving orca whale */}
			<ImageParallax
				image="rbxassetid://9049308243"
				imageSize={new Vector2(652, 368)}
				padding={new Vector2(30, 30)}
				offset={offset}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />
			</ImageParallax>

			{/* Shine effect */}
			<imagelabel
				Image="rbxassetid://9048947177"
				Size={new UDim2(1, 0, 1, 0)}
				ImageTransparency={0.3}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={new UDim(0, 12)} />
			</imagelabel>

			{/* Content */}
			<TitleContent />
		</Card>
	);
}

export default pure(Title);
