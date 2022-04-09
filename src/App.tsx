import Roact from "@rbxts/roact";

import Navbar from "features/Navbar";
import Provider from "components/Provider";

export default function App() {
	return (
		<Provider>
			<Navbar />
		</Provider>
	);
}
