import Roact from "@rbxts/roact";
import { Spring } from "@rbxts/flipper";
import { pure } from "@rbxts/roact-hooked";
import { useDelayedEffect, useSingleMotor } from "@rbxts/roact-hooked-plus";

import { PROFILE_NAME_OFFSET } from "./constants";
import { Page } from "store/pages";
import { asColor, asTransparency, multiplyTransparency } from "store/themes";
import { lerp } from "utils/number-util";
import { useClient } from "hooks/use-client";
import { useRootSelector } from "hooks/use-root-store";
import { useTheme } from "hooks/use-theme";

function ProfileName() {
	const client = useClient();
	const style = useTheme((theme) => theme.profile);

	const visible = useRootSelector((state) => state.pages.visible && state.pages.currentPage === Page.Home);

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
				TextSize={20}
				TextXAlignment="Center"
				TextYAlignment="Top"
				TextColor3={asColor(style.foreground)}
				TextTransparency={visibility.map((n) => multiplyTransparency(asTransparency(style.foreground), 1 - n))}
				Size={new UDim2(1, 0, 0, 49)}
				Position={visibility.map(
					(n) => new UDim2(0, 0, 0, math.ceil(lerp(PROFILE_NAME_OFFSET - 15, PROFILE_NAME_OFFSET, n))),
				)}
				BackgroundTransparency={1}
			/>

			{/* Username */}
			<textlabel
				Text={`@${client.Name}`}
				Font="GothamBold"
				TextSize={16}
				TextXAlignment="Center"
				TextYAlignment="Bottom"
				TextColor3={asColor(style.foreground)}
				TextTransparency={visibility.map((n) =>
					multiplyTransparency(asTransparency(style.foreground), 0.7, 1 - n),
				)}
				Size={new UDim2(1, 0, 0, 49)}
				Position={visibility.map(
					(n) => new UDim2(0, 0, 0, math.ceil(lerp(PROFILE_NAME_OFFSET - 30, PROFILE_NAME_OFFSET, n))),
				)}
				BackgroundTransparency={1}
			/>
		</>
	);
}

export default pure(ProfileName);
