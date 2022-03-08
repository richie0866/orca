import Make from "@rbxts/make";
import { Lighting } from "@rbxts/services";
import { getStore } from "jobs/helpers/job-store";
import { setTimeout, Timeout } from "utils/timeout";

const baseEffect = Make("DepthOfFieldEffect", {
	FarIntensity: 0,
	InFocusRadius: 0.1,
	NearIntensity: 1,
});
const depthOfFieldDefaults = new Map<DepthOfFieldEffect, { enabled: boolean }>();

function enableAcrylic() {
	for (const [effect] of depthOfFieldDefaults) {
		effect.Enabled = false;
	}
	baseEffect.Parent = Lighting;
}

function disableAcrylic() {
	for (const [effect, defaults] of depthOfFieldDefaults) {
		effect.Enabled = defaults.enabled;
	}
	baseEffect.Parent = undefined;
}

async function main() {
	const store = await getStore();

	for (const effect of Lighting.GetChildren()) {
		if (effect.IsA("DepthOfFieldEffect")) {
			depthOfFieldDefaults.set(effect, { enabled: effect.Enabled });
		}
	}

	let timeout: Timeout | undefined;

	store.changed.connect((newState) => {
		timeout?.clear();
		timeout = undefined;

		if (!newState.dashboard.isOpen) {
			timeout = setTimeout(disableAcrylic, 500);
			return;
		}

		if (newState.options.config.acrylicBlur) {
			enableAcrylic();
		} else {
			disableAcrylic();
		}
	});
}

main().catch((err) => {
	warn(`[acrylic-worker] ${err}`);
});
