import Provider from "components/Provider";
import Roact from "@rbxts/roact";

import Navbar from "./Navbar";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider>
			<Navbar />
		</Provider>,
		target,
		"Navbar",
	);

	return () => {
		Roact.unmount(handle);
	};
};
