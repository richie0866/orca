import Roact from "@rbxts/roact";

import Providers from "components/Providers";

import BackgroundDim from "features/BackgroundDim";
import Clock from "features/Clock";
import Navbar from "features/Navbar";
import Shortcuts from "features/Shortcuts";

import Home from "pages/Home";

export default function App() {
	return (
		<Providers>
			{/* UI state effects */}
			<Shortcuts />

			{/* Background dim */}
			<BackgroundDim />

			{/* Pages */}
			<Home />

			{/* Features */}
			<Navbar />
			<Clock />
		</Providers>
	);
}
