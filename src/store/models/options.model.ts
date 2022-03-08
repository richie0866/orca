export interface OptionsState {
	config: {
		/**
		 * Use a DepthOfField blur with glass near the camera when `acrylic` mode is
		 * enabled in a theme. **May decrease framerate!**
		 */
		acrylicBlur: boolean;
	};

	currentTheme: string;

	shortcuts: Record<string, number | undefined> & {
		toggleDashboard: number;
	};
}
