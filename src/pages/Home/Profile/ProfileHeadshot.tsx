import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import Gradient from "components/Gradient";
import { asColor, asTransparency } from "store/themes";
import { lerp } from "utils/number-util";

import { useClient } from "hooks/use-client";
import { usePageOpen } from "hooks/use-page-open";
import { useScale } from "hooks/use-scale";
import { useTheme } from "hooks/use-theme";

const AVATAR_SIZE = 150;
const AVATAR_STROKE_THICKNESS = 4;
const AVATAR_URL = `https://www.roblox.com/headshot-thumbnail/image?userId=%d&width=150&height=150&format=png`;

function ProfileHeadshot() {
	const client = useClient();
	const scale = useScale();

	const style = useTheme((theme) => theme.profile.headshot);
	const visible = usePageOpen("Home");

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
			Position={new UDim2(0.5, 0, 0, 42)}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundColor3={asColor(style.background)}
			BackgroundTransparency={asTransparency(style.background)}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={style.cornerRadius} />
			<Gradient color={style.background} />

			{style.stroke && (
				<frame
					Size={visibility.map((n) => UDim2.fromOffset((AVATAR_SIZE + 28) * n, (AVATAR_SIZE + 28) * n))}
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
