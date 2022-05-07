import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import { asColor, asTransparency, multiplyTransparency } from "store/themes";
import { lerp } from "utils/number-util";
import { useClient } from "hooks/use-client";
import { usePageOpen } from "hooks/use-page-open";
import { useTheme } from "hooks/use-theme";

const HEIGHT = 50;
const OFFSET = 230;

function ProfileName() {
	const client = useClient();

	const style = useTheme((theme) => theme.profile);
	const visible = usePageOpen("Home");

	const [visibility, setGoal] = useSingleMotor(visible ? 1 : 0);
	useDelayedEffect(
		() => {
			setGoal(new Spring(visible ? 1 : 0, { frequency: 5 }));
		},
		visible ? 270 : 200,
		[visible],
	);

	return (
		<>
			{/* Display name */}
			<textlabel
				Text={client.DisplayName}
				Font="GothamBlack"
				TextSize={19}
				TextXAlignment="Center"
				TextYAlignment="Top"
				TextColor3={asColor(style.foreground)}
				TextTransparency={visibility.map((n) => multiplyTransparency(asTransparency(style.foreground), 1 - n))}
				Size={new UDim2(1, 0, 0, HEIGHT)}
				Position={visibility.map((n) => new UDim2(0, 0, 0, math.ceil(lerp(OFFSET - 15, OFFSET, n))))}
				BackgroundTransparency={1}
			/>

			{/* Username */}
			<textlabel
				Text={`@${client.Name}`}
				Font="GothamBold"
				TextSize={15}
				TextXAlignment="Center"
				TextYAlignment="Bottom"
				TextColor3={asColor(style.foreground)}
				TextTransparency={visibility.map((n) =>
					multiplyTransparency(asTransparency(style.foreground), 0.7, 1 - n),
				)}
				Size={new UDim2(1, 0, 0, HEIGHT)}
				Position={visibility.map((n) => new UDim2(0, 0, 0, math.ceil(lerp(OFFSET - 30, OFFSET, n))))}
				BackgroundTransparency={1}
			/>
		</>
	);
}

export default pure(ProfileName);
