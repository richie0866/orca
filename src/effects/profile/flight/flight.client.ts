import { Bin } from "@rbxts/bin";
import { GroupMotor, Spring } from "@rbxts/flipper";
import { Players, RunService, Workspace } from "@rbxts/services";

import { getDirection } from "./direction";
import { selectFlightSpeed, selectFlightSpeedValue } from "reducers/profile";
import { storeChanged } from "store";

const player = Players.LocalPlayer;
const bin = new Bin();

let speed: number; // Set on initialization
let rootPart: BasePart;
let target: CFrame;
let targetSpring: GroupMotor<number[]>;

const getCameraRotation = () => Workspace.CurrentCamera!.CFrame.Rotation;
const getCameraRotationMatrix = () => {
	const { XVector, YVector, ZVector } = Workspace.CurrentCamera!.CFrame;
	return [XVector, YVector, ZVector] as const;
};

storeChanged(selectFlightSpeedValue, (value) => {
	speed = value;
});

storeChanged(selectFlightSpeed, (enabled) => {
	if (enabled) {
		start();
	} else {
		stop();
	}
});

function start() {
	const rootPartThread = task.defer(() => {
		if (waitForRootPart()) {
			resetTarget();
		}
	});

	bin.add(() => task.cancel(rootPartThread));

	// Update the target position and the spring every frame. Move rootPart to
	// the spring position.
	bin.add(
		RunService.Heartbeat.Connect((dt: number) => {
			if (rootPart) {
				stepTarget(dt);
				rootPart.CFrame = getCameraRotation().add(new Vector3(...targetSpring.getValue()));
				rootPart.AssemblyLinearVelocity = Vector3.zero;
			}
		}),
	);

	// Update root part CFrame with the Camera's current direction. Avoids the
	// jittery root part rotation caused by Heartbeat.
	bin.add(
		RunService.RenderStepped.Connect(() => {
			if (rootPart) {
				rootPart.CFrame = getCameraRotation().add(rootPart.CFrame.Position);
			}
		}),
	);

	bin.add(
		player.CharacterAdded.Connect(() => {
			if (waitForRootPart()) {
				resetTarget();
			}
		}),
	);
}

function stop() {
	bin.destroy();
}

function resetTarget() {
	target = CFrame.fromMatrix(rootPart.Position, ...getCameraRotationMatrix());
	targetSpring = new GroupMotor([target.X, target.Y, target.Z], false);
}

function stepTarget(dt: number) {
	const { X, Y, Z } = getDirection().mul(speed * dt);

	target = CFrame.fromMatrix(target.Position, ...getCameraRotationMatrix()).mul(new CFrame(X, Y, Z));

	targetSpring.setGoal([new Spring(target.X), new Spring(target.Y), new Spring(target.Z)]);
	targetSpring.step(dt);
}

function waitForRootPart() {
	const object = player.Character?.WaitForChild("HumanoidRootPart", 3);

	if (object?.IsA("BasePart")) {
		return (rootPart = object);
	}
}
