import Roact from "@rbxts/roact";
import { pure, useMemo } from "@rbxts/roact-hooked";

import ProfileInfo from "./components/ProfileInfo";
import { CARD_INNER_MARGIN } from "constants";
import { asColor, asTransparency, multiplyTransparency } from "store/themes";
import { useClient } from "hooks/use-client";
import { useFriends } from "hooks/use-friends";
import { useScale } from "hooks/use-scale";
import { useTheme } from "hooks/use-theme";

function ProfileActivity() {
	const client = useClient();
	const scale = useScale();
	const color = useTheme((theme) => theme.profile.foreground);

	const [friends = [], , status] = useFriends();
	const friendsOnline = friends.size();
	const friendsInGame = friends.filter((friend) => "PlaceId" in friend).size();

	const joinDate = useMemo(() => os.date("%m/%d/%Y", os.time() - client.AccountAge * 24 * 60 * 60) ?? "N/A", []);

	return (
		<>
			{/* First divider */}
			<frame
				Size={new UDim2(0, 1, 0, 26)}
				Position={new UDim2(0, CARD_INNER_MARGIN + 91, 0, 313)}
				BackgroundColor3={asColor(color)}
				BackgroundTransparency={multiplyTransparency(asTransparency(color), 0.9)}
				BorderSizePixel={0}
			>
				<uisizeconstraint MinSize={scale.map((s) => new Vector2(1 / s, 0))} />
			</frame>

			{/* Second divider */}
			<frame
				Size={new UDim2(0, 1, 0, 26)}
				Position={new UDim2(0, CARD_INNER_MARGIN + 190, 0, 313)}
				BackgroundColor3={asColor(color)}
				BackgroundTransparency={multiplyTransparency(asTransparency(color), 0.9)}
				BorderSizePixel={0}
			>
				<uisizeconstraint MinSize={scale.map((s) => new Vector2(1 / s, 0))} />
			</frame>

			{/* Player info */}
			<ProfileInfo
				index={0}
				color={color}
				text={`Joined\n${joinDate}`}
				enabled
				size={new UDim2(0, 86, 0, 48)}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 300)}
			/>
			<ProfileInfo
				index={1}
				color={color}
				text={friendsOnline === 1 ? "1 friend\nonline" : `${friendsOnline} friends\nonline`}
				enabled={status !== "pending"}
				size={new UDim2(0, 86, 0, 48)}
				position={new UDim2(0, CARD_INNER_MARGIN + 98, 0, 300)}
			/>
			<ProfileInfo
				index={2}
				color={color}
				text={friendsInGame === 1 ? "1 friend\nin-game" : `${friendsInGame} friends\nin-game`}
				enabled={status !== "pending"}
				size={new UDim2(0, 86, 0, 48)}
				position={new UDim2(0, CARD_INNER_MARGIN + 196, 0, 300)}
			/>
		</>
	);
}

export default pure(ProfileActivity);
