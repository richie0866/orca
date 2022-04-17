import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";

import ImageParallax from "components/ImageParallax";
import { useParallax } from "hooks/use-parallax";
import { useTheme } from "hooks/use-theme";

function TitleArt() {
	const cornerRadius = useTheme((theme) => theme.title.cornerRadius);
	const offset = useParallax();

	return (
		<>
			{/* Moving orca whale */}
			<ImageParallax
				image="rbxassetid://9049308243"
				imageSize={new Vector2(652, 368)}
				padding={new Vector2(30, 30)}
				offset={offset}
			>
				<uicorner CornerRadius={cornerRadius} />
			</ImageParallax>

			{/* Shine effect */}
			<imagelabel
				Image="rbxassetid://9048947177"
				Size={new UDim2(1, 0, 1, 0)}
				ImageTransparency={0.3}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={cornerRadius} />
			</imagelabel>
		</>
	);
}

export default pure(TitleArt);
