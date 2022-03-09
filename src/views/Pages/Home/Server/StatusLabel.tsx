import Roact from "@rbxts/roact";
import { hooked, useMemo, useState } from "@rbxts/roact-hooked";
import { TextService } from "@rbxts/services";
import { useDelayedUpdate } from "hooks/common/use-delayed-update";
import { useInterval } from "hooks/common/use-interval";
import { useSpring } from "hooks/common/use-spring";
import { useIsPageOpen } from "hooks/use-current-page";
import { useTheme } from "hooks/use-theme";
import { DashboardPage } from "store/models/dashboard.model";
import { px } from "utils/udim2";

interface Props {
	offset: number;
	index: number;
	units: string;
	getValue: () => string;
}

function StatusLabel({ offset, index, units, getValue }: Props) {
	const theme = useTheme("home").server;
	const [value, setValue] = useState(getValue);

	const isOpen = useIsPageOpen(DashboardPage.Home);
	const isVisible = useDelayedUpdate(isOpen, isOpen ? 330 + index * 100 : 300);
	const valueLength = useMemo(() => TextService.GetTextSize(value + " ", 16, "GothamBold", new Vector2()).X, [value]);

	useInterval(() => {
		setValue(getValue());
	}, 1000);

	return (
		<>
			<textlabel
				Text={value}
				RichText
				Font="GothamBold"
				TextSize={16}
				TextColor3={theme.foreground}
				TextTransparency={useSpring(isVisible ? 0 : 1, { frequency: 2 })}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={useSpring(isVisible ? px(24, offset) : px(0, offset), {})}
				BackgroundTransparency={1}
			/>
			<textlabel
				Text={units}
				RichText
				Font="GothamBold"
				TextSize={16}
				TextColor3={theme.foreground}
				TextTransparency={useSpring(isVisible ? 0.4 : 1, {})}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={useSpring(isVisible ? px(24 + valueLength, offset) : px(0 + valueLength, offset), {})}
				BackgroundTransparency={1}
			/>
		</>
	);
}

export default hooked(StatusLabel);
