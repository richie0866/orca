import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";

import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { Theme, asColor, asTransparency } from "store/themes";

interface Props {
	style: Theme["navbar"];
	pageNumber: Roact.Binding<number>;
}

function NavbarBody({ style, pageNumber }: Props) {
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
				Size={new UDim2(0, 102, 0, 56)}
				Position={pageNumber.map((n) => new UDim2(n / 4, -1, 0, 0))}
				ClipsDescendants
				BackgroundTransparency={1}
			>
				<frame
					Size={new UDim2(4, 0, 0, 56)}
					Position={pageNumber.map((n) => new UDim2(-n, 0, 0, 0))}
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
