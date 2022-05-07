import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Dropshadow, { DropshadowBlur } from "components/Dropshadow";
import Gradient from "components/Gradient";
import InnerStroke from "components/InnerStroke";
import { CARD_INNER_MARGIN } from "constants";
import { GameActivity } from "hooks/use-friends";
import { GamesPage, setCurrentGame, setCurrentGamePage } from "store/games";
import { asColor, asTransparency } from "store/themes";
import { usePageOpen } from "hooks/use-page-open";
import { useRootDispatch } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

export const PADDING = 24;
export const WIDTH = 282;
export const HEIGHT = 158;

interface Props {
	info: GameActivity;
	order: number;
}

function GameCard({ info, order }: Props) {
	const dispatch = useRootDispatch();
	const style = useTheme((theme) => theme.games.gameCard);
	const visible = usePageOpen("Home");

	const [hovered, setHovered] = useSingleMotor(0);
	const [visibility, setVisibility] = useSingleMotor(0);

	useDelayedEffect(() => setVisibility(new Spring(visible ? 1 : 0)), visible ? 300 + order * 25 : 300, [visible]);

	return (
		<frame
			Size={new UDim2(0, WIDTH, 0, HEIGHT)}
			Position={visibility.map((n) => new UDim2(-1 + n, CARD_INNER_MARGIN, 0, order * (PADDING + HEIGHT)))}
			BackgroundTransparency={1}
		>
			<Dropshadow
				blur={DropshadowBlur.Medium}
				scale={1}
				color={asColor(style.dropshadow)}
				transparency={asTransparency(style.dropshadow)}
				size={new UDim2(1, 48, 1, 40)}
				position={new UDim2(0.5, 0, 1, 30)}
			>
				<Gradient color={style.dropshadow} />
			</Dropshadow>

			<imagebutton
				Event={{
					Activated: () => {
						dispatch(setCurrentGamePage(GamesPage.GamePreview));
						dispatch(setCurrentGame(info));
					},
					MouseEnter: () => setHovered(new Spring(1, {})),
					MouseLeave: () => setHovered(new Spring(0, {})),
				}}
				Image={info.thumbnail}
				ScaleType="Crop"
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
			>
				{style.cornerRadius && <uicorner CornerRadius={style.cornerRadius} />}
				{style.stroke && <InnerStroke color={style.stroke} radius={style.cornerRadius} />}
			</imagebutton>

			<frame
				BackgroundTransparency={hovered.map((n) => 1 - n / 10)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 1, 0)}
			>
				{style.cornerRadius && <uicorner CornerRadius={style.cornerRadius} />}
			</frame>

			<imagelabel
				Image="rbxassetid://9563253118"
				ImageTransparency={hovered.map((n) => 1 - n)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={hovered.map((n) => new UDim2(0, 70, 0, 70).Lerp(new UDim2(0, 100, 0, 100), n))}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				BackgroundTransparency={1}
			/>
		</frame>
	);
}

export default pure(GameCard);
