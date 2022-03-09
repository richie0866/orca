import Roact from "@rbxts/roact";
import { hooked, useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { Players, TextService } from "@rbxts/services";
import Border from "components/Border";
import Canvas from "components/Canvas";
import Fill from "components/Fill";
import Glow, { GlowRadius } from "components/Glow";
import { IS_DEV } from "constants";
import { useLinear } from "hooks/common/flipper-hooks";
import { useAppDispatch, useAppSelector } from "hooks/common/rodux-hooks";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useTheme } from "hooks/use-theme";
import { playerDeselected, playerSelected } from "store/actions/dashboard.action";
import { DashboardPage } from "store/models/dashboard.model";
import { arrayToMap } from "utils/array-util";
import { lerp } from "utils/number-util";
import { px, scale } from "utils/udim2";

const PADDING = 20;
const ENTRY_HEIGHT = 60;
const ENTRY_WIDTH = 326 - 24 * 2;
const ENTRY_TEXT_PADDING = 60;

const textFadeSequence = new NumberSequence([
	new NumberSequenceKeypoint(0, 1),
	new NumberSequenceKeypoint(0.05, 0),
	new NumberSequenceKeypoint(0.9, 0),
	new NumberSequenceKeypoint(0.95, 1),
	new NumberSequenceKeypoint(1, 1),
]);

function usePlayers() {
	const [players, setPlayers] = useState(Players.GetPlayers());

	useEffect(() => {
		const addedHandle = Players.PlayerAdded.Connect(() => {
			setPlayers(Players.GetPlayers());
		});
		const removingHandle = Players.PlayerRemoving.Connect(() => {
			setPlayers(Players.GetPlayers());
		});
		return () => {
			addedHandle.Disconnect();
			removingHandle.Disconnect();
		};
	}, []);

	return players;
}

function Selection() {
	const dispatch = useAppDispatch();
	const players = usePlayers();
	const playerSelected = useAppSelector((state) => state.dashboard.apps.playerSelected);

	// Sort players by name and move the selected player to the top of the list.
	const sortedPlayers = useMemo(() => {
		const selected = players.find((p) => p.Name === playerSelected);
		const sorted = players
			.filter((p) => p.Name !== playerSelected && (p !== Players.LocalPlayer || IS_DEV))
			.sort((a, b) => a.Name.lower() < b.Name.lower());

		return selected ? [selected, ...sorted] : sorted;
	}, [players, playerSelected]);

	// Deselect the player if they are no longer in the game.
	useEffect(() => {
		if (playerSelected !== undefined && !sortedPlayers.find((player) => player.Name === playerSelected)) {
			dispatch(playerDeselected());
		}
	}, [players, playerSelected]);

	return (
		<Canvas size={px(326, 280)} position={px(0, 368)} padding={{ left: 24, right: 24, top: 8 }} clipsDescendants>
			<scrollingframe
				Size={scale(1, 1)}
				CanvasSize={px(0, sortedPlayers.size() * (ENTRY_HEIGHT + PADDING) + PADDING)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarImageTransparency={1}
				ScrollBarThickness={0}
				ClipsDescendants={false}
			>
				{arrayToMap(sortedPlayers, (player, index) => [
					player.Name,
					<PlayerEntry
						name={player.Name}
						displayName={player.DisplayName}
						userId={player.UserId}
						index={index}
					/>,
				])}
			</scrollingframe>
		</Canvas>
	);
}

export default hooked(Selection);

interface PlayerEntryProps {
	name: string;
	displayName: string;
	userId: number;
	index: number;
}

function PlayerEntryComponent({ name, userId, displayName, index }: PlayerEntryProps) {
	const dispatch = useAppDispatch();
	const theme = useTheme("apps").players.playerButton;

	const isOpen = useIsPageOpen(DashboardPage.Apps);
	const isVisible = useDelayedUpdate(isOpen, isOpen ? 170 + index * 40 : 150);
	const isSelected = useAppSelector((state) => state.dashboard.apps.playerSelected === name);

	const [hovered, setHovered] = useState(false);

	const text = `  ${displayName} (@${name})`;
	const textSize = useMemo(
		() => TextService.GetTextSize(text, 14, Enum.Font.GothamBold, new Vector2(1000, ENTRY_HEIGHT)),
		[text],
	);
	const textScrollOffset = useLinear(hovered ? ENTRY_WIDTH - ENTRY_TEXT_PADDING - 20 - textSize.X : 0, {
		velocity: hovered ? 40 : 150,
	}).map((x) => new UDim(0, math.min(x, 0)));

	const background = useSpring(
		isSelected
			? theme.accent
			: hovered
			? theme.backgroundHovered ?? theme.background.Lerp(theme.accent, 0.1)
			: theme.background,
		{},
	);
	const dropshadow = useSpring(
		isSelected
			? theme.accent
			: hovered
			? theme.backgroundHovered ?? theme.dropshadow.Lerp(theme.accent, 0.5)
			: theme.dropshadow,
		{},
	);
	const foreground = useSpring(isSelected && theme.foregroundAccent ? theme.foregroundAccent : theme.foreground, {});

	return (
		<Canvas
			size={px(ENTRY_WIDTH, ENTRY_HEIGHT)}
			position={useSpring(
				isVisible
					? px(0, (PADDING + ENTRY_HEIGHT) * index)
					: px(-ENTRY_WIDTH - 24, (PADDING + ENTRY_HEIGHT) * index),
				{},
			)}
			zIndex={index}
		>
			{/* Underglow */}
			<Glow
				radius={GlowRadius.Size70}
				color={dropshadow}
				size={new UDim2(1, 36, 1, 36)}
				position={px(-18, 5 - 18)}
				transparency={useSpring(
					isSelected
						? theme.glowTransparency
						: hovered
						? lerp(theme.dropshadowTransparency, theme.glowTransparency, 0.5)
						: theme.dropshadowTransparency,
					{},
				)}
			/>

			{/* Body */}
			<Fill color={background} transparency={useSpring(theme.backgroundTransparency, {})} radius={8} />

			{/* Text */}
			<textlabel
				Text={text}
				Font="GothamBold"
				TextSize={14}
				TextColor3={foreground}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextYAlignment={Enum.TextYAlignment.Center}
				TextTransparency={useSpring(
					isSelected ? 0 : hovered ? theme.foregroundTransparency / 2 : theme.foregroundTransparency,
					{},
				)}
				BackgroundTransparency={1}
				Position={px(ENTRY_TEXT_PADDING, 1)}
				Size={new UDim2(1, -ENTRY_TEXT_PADDING, 1, -1)}
				ClipsDescendants
			>
				<uipadding PaddingLeft={textScrollOffset} />
				<uigradient Transparency={textFadeSequence} />
			</textlabel>

			{/* Avatar */}
			<imagelabel
				Image={`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=60&height=60&format=png`}
				Size={new UDim2(0, ENTRY_HEIGHT, 0, ENTRY_HEIGHT)}
				BackgroundTransparency={1}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />
			</imagelabel>

			{/* Border overlaps content */}
			{theme.outlined && <Border color={foreground} transparency={0.8} radius={8} />}

			{/* Input capture */}
			<textbutton
				Event={{
					Activated: () => {
						const player = Players.FindFirstChild(name);
						if (!isSelected && player?.IsA("Player")) {
							dispatch(playerSelected(player));
						} else {
							dispatch(playerDeselected());
						}
					},
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
				Text=""
				Transparency={1}
				Size={scale(1, 1)}
			/>
		</Canvas>
	);
}

const PlayerEntry = hooked(PlayerEntryComponent);
