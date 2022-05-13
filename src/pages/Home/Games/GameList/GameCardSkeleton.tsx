import Roact from "@rbxts/roact";
import { RunService } from "@rbxts/services";
import { pure, useBinding, useEffect } from "@rbxts/roact-hooked";

import InnerStroke from "components/InnerStroke";
import { CARD_INNER_MARGIN } from "constants/app";
import { HEIGHT, PADDING, WIDTH } from "./GameCard";
import { IS_RUNNING } from "constants/env";
import { asColor, asTransparency } from "reducers/themes";
import { lerp, mapStrict } from "utils/number-util";
import { useTheme } from "hooks/use-theme";

interface Props {
	order: number;
}

const getBlink = (order: number) =>
	mapStrict(math.sin((IS_RUNNING ? time() : elapsedTime()) * 4 - order / 2), -1, 1, 0, 1);

function GameCardSkeleton({ order }: Props) {
	const style = useTheme((theme) => theme.games.gameCard);

	const [percent, setPercent] = useBinding(getBlink(order));

	useEffect(() => {
		const heartbeat = RunService.Heartbeat.Connect(() => {
			setPercent(getBlink(order));
		});
		return () => heartbeat.Disconnect();
	}, []);

	return (
		<frame
			BackgroundColor3={percent.map((n) => asColor(style.skeleton.from).Lerp(asColor(style.skeleton.to), n))}
			BackgroundTransparency={percent.map((n) =>
				lerp(asTransparency(style.skeleton.from), asTransparency(style.skeleton.to), n),
			)}
			Size={new UDim2(0, WIDTH, 0, HEIGHT)}
			Position={new UDim2(0, CARD_INNER_MARGIN, 0, order * (PADDING + HEIGHT))}
			BorderSizePixel={0}
		>
			{style.cornerRadius && <uicorner CornerRadius={style.cornerRadius} />}
			{style.stroke && <InnerStroke color={style.stroke} radius={style.cornerRadius} />}
		</frame>
	);
}

export default pure(GameCardSkeleton);
