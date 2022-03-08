import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Canvas from "components/Canvas";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useFriends } from "hooks/use-friends";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";

import { px } from "utils/udim2";

function Info() {
	const theme = useTheme("home").profile;
	const isOpen = useIsPageOpen(DashboardPage.Home);

	const [friends = [], , status] = useFriends();
	const friendsOnline = friends.size();
	const friendsJoined = friends.filter((friend) => "PlaceId" in friend && friend.PlaceId === game.PlaceId).size();

	// Transition
	const showJoinDate = useDelayedUpdate(isOpen, 400, (open) => !open);
	const showFriendsJoined = useDelayedUpdate(isOpen && status !== "pending", 500, (open) => !open);
	const showFriendsOnline = useDelayedUpdate(isOpen && status !== "pending", 600, (open) => !open);

	return (
		<Canvas anchor={new Vector2(0.5, 0)} size={px(278, 48)} position={new UDim2(0.5, 0, 0, 300)}>
			{/* Dividers */}
			<frame Size={px(0, 26)} Position={px(90, 11)} BackgroundTransparency={1}>
				<uistroke Thickness={0.5} Color={theme.foreground} Transparency={0.7} />
			</frame>
			<frame Size={px(0, 26)} Position={px(187, 11)} BackgroundTransparency={1}>
				<uistroke Thickness={0.5} Color={theme.foreground} Transparency={0.7} />
			</frame>

			{/* Player info */}
			<textlabel
				Font="GothamBold"
				Text={`Joined\n${
					os.date("%m/%d/%Y", os.time() - Players.LocalPlayer.AccountAge * 24 * 60 * 60) as string | undefined
				}`}
				TextSize={13}
				TextColor3={theme.foreground}
				TextXAlignment="Center"
				TextYAlignment="Center"
				TextTransparency={useSpring(showJoinDate ? 0.2 : 1, {})}
				Size={px(85, 48)}
				Position={useSpring(showJoinDate ? px(0, 0) : px(-20, 0), {})}
				BackgroundTransparency={1}
			/>
			<textlabel
				Font="GothamBold"
				Text={friendsJoined === 1 ? "1 friend\njoined" : `${friendsJoined} friends\njoined`}
				TextSize={13}
				TextColor3={theme.foreground}
				TextXAlignment="Center"
				TextYAlignment="Center"
				TextTransparency={useSpring(showFriendsJoined ? 0.2 : 1, {})}
				Size={px(85, 48)}
				Position={useSpring(showFriendsJoined ? px(97, 0) : px(97 - 20, 0), {})}
				BackgroundTransparency={1}
			/>
			<textlabel
				Font="GothamBold"
				Text={friendsOnline === 1 ? "1 friend\nonline" : `${friendsOnline} friends\nonline`}
				TextSize={13}
				TextColor3={theme.foreground}
				TextXAlignment="Center"
				TextYAlignment="Center"
				TextTransparency={useSpring(showFriendsOnline ? 0.2 : 1, {})}
				Size={px(85, 48)}
				Position={useSpring(showFriendsOnline ? px(193, 0) : px(193 - 20, 0), {})}
				BackgroundTransparency={1}
			/>
		</Canvas>
	);
}

export default hooked(Info);
