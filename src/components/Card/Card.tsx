import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure, useMemo } from "@rbxts/roact-hooked";
import { useDelayedUpdate, useSingleMotor } from "@rbxts/roact-hooked-plus";

import CardBody from "./CardBody";
import { CardStyle } from "store/themes";
import { Page } from "store/pages";
import { SCREEN_MARGIN } from "constants";
import { useRootSelector } from "hooks/use-root-store";

interface Props extends Roact.PropsWithChildren {
	index: number;
	style: CardStyle;
	page: Page;
	align: "left" | "right";
	size: UDim2;
	position: UDim2;
}

function Card({ index, style, page, align, size, position, [Roact.Children]: children }: Props) {
	const visible = useRootSelector((state) => state.pages.visible && state.pages.currentPage === page);
	const [visiblePercent, setGoal] = useSingleMotor(visible ? 1 : 0);

	useDelayedUpdate(visible ? 1 : 0, index * 30, (percent) => {
		setGoal(new Spring(percent, { frequency: 2, dampingRatio: 0.8 }));
	});

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
			Position={visiblePercent.map((n) => positionHidden.Lerp(position, n))}
			BackgroundTransparency={1}
		>
			<CardBody style={style}>{children}</CardBody>
		</frame>
	);
}

export default pure(Card);
