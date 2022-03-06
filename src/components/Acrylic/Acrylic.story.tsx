import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";
import Acrylic from "components/Acrylic/Acrylic";
import { DashboardPage } from "store/models/dashboard.model";
import { configureStore } from "store/store";
import { hex } from "utils/color3";
import { px, scale } from "utils/udim2";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider
			store={configureStore({
				dashboard: {
					isOpen: true,
					page: DashboardPage.Apps,
					hint: undefined,
					apps: {},
				},
			})}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={scale(0.3, 0.7)}
				Size={px(250, 350)}
				BackgroundColor3={hex("#000000")}
				BackgroundTransparency={0.5}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 64)} />
				<Acrylic radius={52} />
			</frame>
		</Provider>,
		target,
		"Acrylic",
	);

	return () => Roact.unmount(handle);
};
