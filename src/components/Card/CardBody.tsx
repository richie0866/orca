import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";

import Dropshadow, { DropshadowBlur } from "components/Dropshadow";
import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { CardStyle, asColor, asTransparency } from "reducers/themes";

interface Props extends Roact.PropsWithChildren {
	style: CardStyle;
}

function CardBody({ style, [Roact.Children]: children }: Props) {
	return (
		<>
			{/* Dropshadow */}
			<Dropshadow
				blur={DropshadowBlur.Large}
				scale={1.1}
				color={asColor(style.dropshadow)}
				transparency={asTransparency(style.dropshadow)}
				size={new UDim2(1, 100, 1, 80)}
				position={new UDim2(0.5, 0, 1, 70)}
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

			{/* Content */}
			<>{children}</>

			{/* Stroke */}
			{style.stroke && <InnerStroke color={style.stroke} radius={style.cornerRadius} />}
		</>
	);
}

export default hooked(CardBody);
