import Roact from "@rbxts/roact";
import { hooked, useMemo, useState } from "@rbxts/roact-hooked";
import { TextService } from "@rbxts/services";
import { useInterval } from "hooks/common/use-interval";
import { useTheme } from "hooks/use-theme";
import { px } from "utils/udim2";

interface Props {
	offset: number;
	units: string;
	getValue: () => string;
}

function StatusLabel({ offset, units, getValue }: Props) {
	const theme = useTheme("home").server;
	const [value, setValue] = useState(getValue);

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
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24, offset)}
				BackgroundTransparency={1}
			/>
			<textlabel
				Text={units}
				RichText
				Font="GothamBold"
				TextSize={16}
				TextColor3={theme.foreground}
				TextTransparency={0.4}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={px(24 + valueLength, offset)}
				BackgroundTransparency={1}
			/>
		</>
	);
}

export default hooked(StatusLabel);
