import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure, useMemo } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import CardBody from "./CardBody";
import { CardStyle, Theme } from "store/themes";
import { Page } from "store/pages";
import { SCREEN_MARGIN } from "constants";
import { usePageOpen } from "hooks/use-page-open";
import { useTheme } from "hooks/use-theme";

interface Props extends Roact.PropsWithChildren {
	getStyle: (theme: Theme) => CardStyle;
	index: number;
	page: keyof typeof Page;
	align: "left" | "right";
	size: UDim2;
	position: UDim2;
}

function Card({ getStyle, index, page, align, size, position, [Roact.Children]: children }: Props) {
	const style = useTheme(getStyle);
	const visible = usePageOpen(page);

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 2, dampingRatio: 0.8 }));
		},
		index * 30,
		[visible],
	);

	const positionHidden = useMemo(() => {
		return new UDim2(
			align === "left"
				? new UDim()
						.sub(size.X.add(size.X))
						.sub(position.X)
						.sub(new UDim(0, SCREEN_MARGIN * 2))
				: new UDim()
						.add(size.X.add(size.X))
						.add(new UDim(position.X.Scale, -position.X.Offset))
						.add(new UDim(0, SCREEN_MARGIN * 2)),
			position.Y,
		);
	}, [size, position, align]);

	return (
		<frame
			AnchorPoint={align === "left" ? new Vector2(0, 1) : new Vector2(1, 1)}
			Size={size}
			Position={visibility.map((n) => positionHidden.Lerp(position, n))}
			BackgroundTransparency={1}
		>
			<CardBody style={style}>{children}</CardBody>
		</frame>
	);
}

export default pure(Card);
