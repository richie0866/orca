import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import { useScale } from "hooks/use-scale";
import { scale } from "utils/udim2";
import ServerCard from "views/Pages/Home/ServerCard/ServerCard";
import FriendActivityCard from "./FriendActivityCard";
import ProfileCard from "./ProfileCard";
import TitleCard from "./TitleCard";

function Home() {
	const scaleFactor = useScale();

	return (
		<Canvas position={scale(0, 1)} anchor={new Vector2(0, 1)}>
			<uiscale Scale={scaleFactor} />

			<TitleCard />
			<ServerCard />
			<FriendActivityCard />
			<ProfileCard />
		</Canvas>
	);
}

export default pure(Home);
