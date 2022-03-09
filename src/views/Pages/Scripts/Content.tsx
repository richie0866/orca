import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import { useScale } from "hooks/use-scale";
import { hex } from "utils/color3";
import { px, scale } from "utils/udim2";

interface Props {
	header: string;
	body?: string;
	footer: string;
}

function Content({ header, body, footer }: Props) {
	const scaleFactor = useScale();

	return (
		<Canvas
			padding={{
				top: scaleFactor.map((s) => s * 48),
				left: scaleFactor.map((s) => s * 48),
				bottom: scaleFactor.map((s) => s * 48),
				right: scaleFactor.map((s) => s * 48),
			}}
		>
			{/* Header, centered when body is undefined */}
			{body === undefined && <HeaderCenter header={header} scaleFactor={scaleFactor} />}
			{body !== undefined && <HeaderTopLeft header={header} scaleFactor={scaleFactor} />}

			{/* Body */}
			{body !== undefined && (
				<textlabel
					Text={body}
					TextColor3={hex("#FFFFFF")}
					Font="GothamBlack"
					TextSize={36}
					TextXAlignment="Left"
					TextYAlignment="Top"
					Size={scale(1, 70 / 416)}
					Position={scaleFactor.map((s) => px(0, 110 * s))}
					BackgroundTransparency={1}
				>
					<uiscale Scale={scaleFactor} />
				</textlabel>
			)}

			{/* Footer */}
			<textlabel
				Text={footer}
				TextColor3={hex("#FFFFFF")}
				Font="GothamBlack"
				TextSize={18}
				TextXAlignment="Center"
				TextYAlignment="Bottom"
				AnchorPoint={new Vector2(0.5, 1)}
				Size={scale(1, 20 / 416)}
				Position={scale(0.5, 1)}
				BackgroundTransparency={1}
			>
				<uiscale Scale={scaleFactor} />
			</textlabel>
		</Canvas>
	);
}

function HeaderTopLeft(props: { header: string; scaleFactor: Roact.Binding<number> }) {
	return (
		<textlabel
			Text={props.header}
			TextColor3={hex("#FFFFFF")}
			Font="GothamBlack"
			TextSize={64}
			TextXAlignment="Left"
			TextYAlignment="Top"
			Size={scale(1, 70 / 416)}
			BackgroundTransparency={1}
		>
			<uiscale Scale={props.scaleFactor} />
		</textlabel>
	);
}

function HeaderCenter(props: { header: string; scaleFactor: Roact.Binding<number> }) {
	return (
		<textlabel
			Text={props.header}
			TextColor3={hex("#FFFFFF")}
			Font="GothamBlack"
			TextSize={48}
			TextXAlignment="Center"
			TextYAlignment="Center"
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={scale(1, 1)}
			Position={scale(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<uiscale Scale={props.scaleFactor} />
		</textlabel>
	);
}

export default hooked(Content);
