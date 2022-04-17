import Roact from "@rbxts/roact";

import Providers from "components/Providers";

import BackgroundDim from "features/BackgroundDim";
import Clock from "features/Clock";
import Navbar from "features/Navbar";
import Shortcuts from "features/Shortcuts";

import Apps from "pages/Apps";
import Home from "pages/Home";
import Scripts from "pages/Scripts";
import Settings from "pages/Settings";

export default function App() {
	return (
		<Providers>
			{/* UI state effects */}
			<Shortcuts />

			{/* Background dim */}
			<BackgroundDim />

			{/* Pages */}
			<Home />
			<Apps />
			<Scripts />
			<Settings />

			{/* Features */}
			<Navbar />
			<Clock />
		</Providers>
	);
}
