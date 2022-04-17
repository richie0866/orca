import Roact from "@rbxts/roact";
import { pure, useMemo } from "@rbxts/roact-hooked";

import ProfileInfo from "./components/ProfileInfo";
import { CARD_INNER_MARGIN } from "constants";
import { asColor, asTransparency, multiplyTransparency } from "store/themes";
import { useClient } from "hooks/use-client";
import { useFriends } from "hooks/use-friends";
import { useTheme } from "hooks/use-theme";

function ProfileActivity() {
	const client = useClient();
	const color = useTheme((theme) => theme.profile.foreground);

	const [friends = [], , status] = useFriends();
	const friendsOnline = friends.size();
	const friendsInGame = friends.filter((friend) => "PlaceId" in friend).size();

	const joinDate = useMemo(() => os.date("%m/%d/%Y", os.time() - client.AccountAge * 24 * 60 * 60) ?? "N/A", []);

	return (
		<>
			{/* First divider */}
			<frame
				Size={new UDim2(0, 0, 0, 26)}
				Position={new UDim2(0, CARD_INNER_MARGIN + 91, 0, 311)}
				BackgroundTransparency={1}
			>
				<uistroke
					Thickness={0.5}
					Color={asColor(color)}
					Transparency={multiplyTransparency(asTransparency(color), 0.7)}
				/>
			</frame>

			{/* Second divider */}
			<frame
				Size={new UDim2(0, 0, 0, 26)}
				Position={new UDim2(0, CARD_INNER_MARGIN + 187, 0, 311)}
				BackgroundTransparency={1}
			>
				<uistroke
					Thickness={0.5}
					Color={asColor(color)}
					Transparency={multiplyTransparency(asTransparency(color), 0.7)}
				/>
			</frame>

			{/* Player info */}
			<ProfileInfo
				index={0}
				color={color}
				text={`Joined\n${joinDate}`}
				enabled
				size={new UDim2(0, 85, 0, 48)}
				position={new UDim2(0, CARD_INNER_MARGIN, 0, 300)}
			/>
			<ProfileInfo
				index={1}
				color={color}
				text={friendsOnline === 1 ? "1 friend\nonline" : `${friendsOnline} friends\nonline`}
				enabled={status !== "pending"}
				size={new UDim2(0, 85, 0, 48)}
				position={new UDim2(0, CARD_INNER_MARGIN + 97, 0, 300)}
			/>
			<ProfileInfo
				index={2}
				color={color}
				text={friendsInGame === 1 ? "1 friend\nin-game" : `${friendsInGame} friends\nin-game`}
				enabled={status !== "pending"}
				size={new UDim2(0, 85, 0, 48)}
				position={new UDim2(0, CARD_INNER_MARGIN + 193, 0, 300)}
			/>
		</>
	);
}

export default pure(ProfileActivity);
