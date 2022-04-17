import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { AVATAR_MARGIN, AVATAR_SIZE, AVATAR_STROKE_THICKNESS, AVATAR_URL } from "./constants";
import { CARD_INNER_MARGIN } from "constants";
import { Page } from "store/pages";
import { asColor, asTransparency } from "store/themes";
import { lerp } from "utils/number-util";

import { useClient } from "hooks/use-client";
import { useRootSelector } from "hooks/use-root-store";
import { useScale } from "hooks/use-scale";
import { useTheme } from "hooks/use-theme";

function ProfileHeadshot() {
	const client = useClient();
	const scale = useScale();
	const style = useTheme((theme) => theme.profile.headshot);

	const visible = useRootSelector((state) => state.pages.visible && state.pages.currentPage === Page.Home);

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 4 }));
		},
		visible ? 275 : 200,
		[visible],
	);

	return (
		<imagelabel
			Image={AVATAR_URL.format(client.UserId)}
			Size={new UDim2(0, AVATAR_SIZE, 0, AVATAR_SIZE)}
			Position={new UDim2(0.5, 0, 0, CARD_INNER_MARGIN + AVATAR_MARGIN)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundColor3={asColor(style.background)}
			BackgroundTransparency={asTransparency(style.background)}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={style.cornerRadius} />
			<Gradient color={style.background} />

			{style.stroke && (
				<frame
					Size={visibility.map((n) =>
						UDim2.fromOffset(
							(AVATAR_SIZE + AVATAR_MARGIN * 2 - AVATAR_STROKE_THICKNESS * 2) * n,
							(AVATAR_SIZE + AVATAR_MARGIN * 2 - AVATAR_STROKE_THICKNESS * 2) * n,
						),
					)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
				>
					<uistroke
						Color={asColor(style.stroke)}
						Transparency={asTransparency(style.stroke)}
						Thickness={Roact.joinBindings([visibility, scale]).map(
							([v, s]) => lerp(AVATAR_SIZE / 2 + 2, AVATAR_STROKE_THICKNESS, v) * s,
						)}
					>
						<Gradient color={style.stroke} />
					</uistroke>

					<uicorner CornerRadius={style.cornerRadius} />
				</frame>
			)}
		</imagelabel>
	);
}

export default pure(ProfileHeadshot);
