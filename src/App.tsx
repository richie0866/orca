import Roact from "@rbxts/roact";

import Navbar from "views/Navbar";
import Provider from "components/Provider";

export default function App() {
	return (
		<Provider>
			<Navbar />
		</Provider>
	);
}
