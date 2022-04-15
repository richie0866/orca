import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";

import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { HEIGHT, WIDTH } from "./constants";
import { Theme, asColor, asTransparency } from "store/themes";

interface Props {
	style: Theme["navbar"];
	pageNumber: Roact.Binding<number>;
}

function NavbarBody({ style, pageNumber }: Props) {
	const pagePercent = pageNumber.map((page) => page / 4);

	return (
		<>
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

			{/* Progress indicator */}
			<frame
				Size={new UDim2(0, WIDTH / 4 + 2, 0, HEIGHT)}
				Position={pagePercent.map((n) => new UDim2(0, math.round(WIDTH * n) - 1, 0, 0))}
				ClipsDescendants
				BackgroundTransparency={1}
			>
				<frame
					Size={new UDim2(0, WIDTH + 2, 0, HEIGHT)}
					Position={pagePercent.map((n) => new UDim2(0, math.round(-WIDTH * n), 0, 0))}
					BackgroundColor3={asColor(style.accent)}
					BorderSizePixel={0}
				>
					<Gradient color={style.accent} />
					<uicorner CornerRadius={style.cornerRadius} />
				</frame>
			</frame>

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
		</>
	);
}

export default hooked(NavbarBody);
