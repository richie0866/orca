import Roact from "@rbxts/roact";
import Tooltip from "./Tooltip";

export = (target: Frame) => {
	const handle = Roact.mount(
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(0, 100, 0, 100)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
		>
			<Tooltip
				caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				style={{
					foreground: { color: BrickColor.White().Color },
					background: { color: BrickColor.Blue().Color },
				}}
			/>
		</frame>,
		target,
		"App",
	);

	return () => {
		Roact.unmount(handle);
	};
};
