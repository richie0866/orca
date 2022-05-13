export interface ProfileState {
	sliders: {
		flightspeed: { value: number; enabled: boolean };
		walkspeed: { value: number; enabled: boolean };
		jumpheight: { value: number; enabled: boolean };
	};

	switches: {
		respawn: { enabled: boolean };
		ghostmode: { enabled: boolean };
		godmode: { enabled: boolean };
		freecam: { enabled: boolean };
	};
}
