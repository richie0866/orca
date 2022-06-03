import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import Card from "components/Card";
import { useAppDispatch, useAppStore } from "hooks/common/rodux-hooks";
import { useTheme } from "hooks/use-theme";
import { toggleDashboard } from "store/actions/dashboard.action";
import { setJobActive } from "store/actions/jobs.action";
import { DashboardPage } from "store/models/dashboard.model";
import { px, scale } from "utils/udim2";
import ShortcutItem, { ENTRY_HEIGHT, PADDING } from "./ShortcutItem";

const ENTRY_COUNT = 6; // Hardcoded for now

function Shortcuts() {
	const store = useAppStore();
	const dispatch = useAppDispatch();
	const theme = useTheme("options").shortcuts;

	const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

	return (
		<Card index={1} page={DashboardPage.Options} theme={theme} size={px(326, 416)} position={new UDim2(0, 0, 1, 0)}>
			<textlabel
				Text="Shortcuts"
				Font="GothamBlack"
				TextSize={20}
				TextColor3={theme.foreground}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24, 24)}
				BackgroundTransparency={1}
			/>
			<Canvas size={px(326, 348)} position={px(0, 68)} padding={{ left: 24, right: 24, top: 8 }} clipsDescendants>
				<scrollingframe
					Size={scale(1, 1)}
					CanvasSize={px(0, ENTRY_COUNT * (ENTRY_HEIGHT + PADDING) + PADDING)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ScrollBarImageTransparency={1}
					ScrollBarThickness={0}
					ClipsDescendants={false}
				>
					<ShortcutItem
						onActivate={() => {
							dispatch(toggleDashboard());
						}}
						onSelect={setSelectedItem}
						selectedItem={selectedItem}
						action="toggleDashboard"
						description="Open Orca"
						index={0}
					/>
					<ShortcutItem
						onActivate={() => {
							dispatch(setJobActive("flight", !store.getState().jobs.flight.active));
						}}
						onSelect={setSelectedItem}
						selectedItem={selectedItem}
						action="toggleFlight"
						description="Toggle flight"
						index={1}
					/>
					<ShortcutItem
						onActivate={() => {
							dispatch(setJobActive("freecam", !store.getState().jobs.freecam.active));
						}}
						onSelect={setSelectedItem}
						selectedItem={selectedItem}
						action="setFreecam"
						description="Set freecam"
						index={2}
					/>
					<ShortcutItem
						onActivate={() => {
							dispatch(setJobActive("ghost", !store.getState().jobs.ghost.active));
						}}
						onSelect={setSelectedItem}
						selectedItem={selectedItem}
						action="setGhost"
						description="Set ghost mode"
						index={3}
					/>
					<ShortcutItem
						onActivate={() => {
							dispatch(setJobActive("walkSpeed", !store.getState().jobs.walkSpeed.active));
						}}
						onSelect={setSelectedItem}
						selectedItem={selectedItem}
						action="setSpeed"
						description="Set walk speed"
						index={4}
					/>
					<ShortcutItem
						onActivate={() => {
							dispatch(setJobActive("jumpHeight", !store.getState().jobs.jumpHeight.active));
						}}
						onSelect={setSelectedItem}
						selectedItem={selectedItem}
						action="setJumpHeight"
						description="Set jump height"
						index={5}
					/>
				</scrollingframe>
			</Canvas>
		</Card>
	);
}

export default hooked(Shortcuts);
