import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Card from "components/Card";
import { IS_DEV } from "constants";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px } from "utils/udim2";
import ServerAction from "views/Pages/Home/Server/ServerAction";
import StatusLabel from "./StatusLabel";

function Server() {
	const theme = useTheme("home").server;

	return (
		<Card
			index={2}
			page={DashboardPage.Home}
			theme={theme}
			size={px(326, 184)}
			position={new UDim2(0, 374, 1, -416 - 48)}
		>
			<textlabel
				Text="Server"
				Font="GothamBlack"
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24, 24)}
				BackgroundTransparency={1}
			/>

			{/* Server status */}
			<StatusLabel
				index={0}
				offset={69}
				units="players"
				getValue={() => `${Players.GetPlayers().size()} / ${Players.MaxPlayers}`}
			/>
			<StatusLabel
				index={1}
				offset={108}
				units="elapsed"
				getValue={() => {
					const uptime = IS_DEV ? os.clock() : time();
					const days = math.floor(uptime / 86400);
					const hours = math.floor((uptime - days * 86400) / 3600);
					const minutes = math.floor((uptime - days * 86400 - hours * 3600) / 60);
					const seconds = math.floor(uptime - days * 86400 - hours * 3600 - minutes * 60);
					return days > 0
						? `${days} days`
						: hours > 0
						? `${hours} hours`
						: minutes > 0
						? `${minutes} minutes`
						: `${seconds} seconds`;
				}}
			/>
			<StatusLabel
				index={2}
				offset={147}
				units="ping"
				getValue={() => `${math.round(Players.LocalPlayer.GetNetworkPing() * 1000)} ms`}
			/>

			{/* Server actions */}
			<ServerAction
				action="switchServer"
				hint="<font face='GothamBlack'>Switch</font> to a different server"
				icon="rbxassetid://8992259774"
				size={px(66, 50)}
				position={new UDim2(1, -66 - 24, 1, -100 - 16 - 12)}
			/>
			<ServerAction
				action="rejoinServer"
				hint="<font face='GothamBlack'>Rejoin</font> this server"
				icon="rbxassetid://8992259894"
				size={px(66, 50)}
				position={new UDim2(1, -66 - 24, 1, -50 - 16)}
			/>
		</Card>
	);
}

export default hooked(Server);
