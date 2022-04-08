import Roact from "@rbxts/roact";
import { hooked, useMemo, useState } from "@rbxts/roact-hooked";

import { ButtonStyle } from "store/themes";
import { ButtonStyleContext } from "./use-button-style";

interface Props extends Roact.PropsWithChildren {
	onHover?: (hover: boolean) => void;
	onClick?: () => void;

	size?: UDim2 | Roact.Binding<UDim2>;
	position?: UDim2 | Roact.Binding<UDim2>;
	anchorPoint?: Vector2 | Roact.Binding<Vector2>;

	active: boolean;
	style: ButtonStyle;
}

function Style({ onHover, onClick, size, position, anchorPoint, active, style, [Roact.Children]: children }: Props) {
	const [hovered, setHovered] = useState(false);

	const currentStyle = useMemo(() => {
		return {
			...style,
			...(hovered && style.$hover),
			...(active && style.$active),
		};
	}, [style, active, hovered]);

	return (
		<ButtonStyleContext.Provider value={currentStyle}>
			<textbutton
				Event={{
					Activated: onClick,
					MouseEnter: () => {
						setHovered(true);
						onHover?.(true);
					},
					MouseLeave: () => {
						setHovered(false);
						onHover?.(false);
					},
				}}
				Size={size}
				Position={position}
				AnchorPoint={anchorPoint}
				BackgroundTransparency={1}
			>
				{children}
			</textbutton>
		</ButtonStyleContext.Provider>
	);
}

export default hooked(Style);
