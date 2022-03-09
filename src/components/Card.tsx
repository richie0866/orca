import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";

import Acrylic from "components/Acrylic";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";

import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { DashboardPage } from "store/models/dashboard.model";
import { ViewTheme } from "themes/theme.interface";
import { px } from "utils/udim2";

interface Props extends Roact.PropsWithChildren {
	index: number;
	page: DashboardPage;
	theme: ViewTheme;
	size: UDim2;
	position: UDim2;
}

function Card({ index, page, theme, size, position, [Roact.Children]: children }: Props) {
	const isOpen = useIsPageOpen(page);
	const isActive = useDelayedUpdate(isOpen, index * 40);

	const positionWhenHidden = new UDim2(new UDim(), position.Y)
		.sub(px((size.X.Offset + 48) * 2 - position.X.Offset, 0))
		.sub(px(size.X.Offset + 48 * 2, 0));

	return (
		<Canvas
			anchor={new Vector2(0, 1)}
			size={size}
			position={useSpring(isActive ? position : positionWhenHidden, { frequency: 2, dampingRatio: 0.8 })}
		>
			{/* Underglow */}
			<Glow
				radius={GlowRadius.Size198}
				size={new UDim2(1, 100, 1, 96)}
				position={px(-50, -28)}
				color={theme.dropshadow}
				gradient={theme.dropshadowGradient}
				transparency={theme.dropshadowTransparency}
			/>

			{/* Body */}
			<Fill
				color={theme.background}
				gradient={theme.backgroundGradient}
				transparency={theme.transparency}
				radius={16}
			/>

			{children}

			{/* Effects */}
			{theme.acrylic && <Acrylic Key="acrylic" />}

			{/* Border overlaps children */}
			{theme.outlined && <Border color={theme.foreground} radius={16} transparency={0.8} />}
		</Canvas>
	);
}

export default hooked(Card);
