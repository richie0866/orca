import Roact from "@rbxts/roact";
import Dashboard from "./views/Dashboard";

function App() {
	return (
		<screengui IgnoreGuiInset ResetOnSpawn={false} ZIndexBehavior="Sibling">
			<Dashboard />
		</screengui>
	);
}

export default App;
