import Roact from "@rbxts/roact";
import { Instant, Spring } from "@rbxts/flipper";
import { TextService } from "@rbxts/services";
import { pure, useEffect, useRef, useState } from "@rbxts/roact-hooked";
import { useSingleMotor } from "@rbxts/roact-hooked-plus";

import Dropshadow, { DropshadowBlur } from "components/Dropshadow";
import Gradient from "components/Gradient";
import { ButtonStyle, asColor, asTransparency } from "reducers/themes";

interface Props {
	caption: string;
	style: Pick<ButtonStyle, "$active" | "background" | "foreground" | "cornerRadius" | "dropshadow">;
	alignment?: "left" | "right" | "center";
}

const MIN_WIDTH = 40;
const MAX_WIDTH = 220;
const MIN_HEIGHT = 20;
const TAIL_HEIGHT = 8;

const MARGIN = 10;
const OFFSET = 16;

function Tooltip({ caption, style, alignment = "center" }: Props) {
	const { background, foreground, dropshadow, cornerRadius } = { ...style, ...style.$active };

	const ref = useRef<Frame>();
	const [hovered, setHovered] = useState(false);
	const [animation, setGoal] = useSingleMotor(0);

	const frameSize = TextService.GetTextSize(caption, 15, "GothamBold", new Vector2(MAX_WIDTH + 1, 300));
	const frameWidth = math.max(frameSize.X, MIN_WIDTH) + MARGIN * 2;
	const frameHeight = math.max(frameSize.Y, MIN_HEIGHT) + MARGIN * 2;

	const frameAlignment = alignment === "center" ? 0.5 : alignment === "left" ? -0.1 : 1.1;

	useEffect(() => {
		const parent = ref.getValue()?.Parent;

		if (parent && parent.IsA("GuiObject")) {
			const mouseEnter = parent.MouseEnter.Connect(() => setHovered(true));
			const mouseLeave = parent.MouseLeave.Connect(() => setHovered(false));

			return () => {
				mouseEnter.Disconnect();
				mouseLeave.Disconnect();
			};
		} else {
			warn("Tooltip parent is not a GuiObject");
		}
	}, []);

	useEffect(() => {
		if (hovered) {
			const handle = task.delay(0.7, () => {
				task.defer(setGoal, new Spring(1, { frequency: 6 }));
			});
			return () => task.cancel(handle);
		} else {
			setGoal(new Instant(0));
		}
	}, [hovered]);

	return (
		<>
			{/* Tail, centered separately */}
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={UDim2.fromOffset(TAIL_HEIGHT ^ 2, TAIL_HEIGHT ^ 2)}
				Position={animation.map((n) => new UDim2(0.5, 0, 0, -OFFSET - math.floor(((1 - n) * TAIL_HEIGHT) / 2)))}
				Rotation={45}
				BackgroundColor3={asColor(background)}
				BorderSizePixel={0}
				Visible={animation.map((n) => n !== 0)}
			/>

			{/* Tooltip */}
			<frame
				Ref={ref}
				AnchorPoint={new Vector2(alignment === "center" ? 0.5 : alignment === "left" ? 0 : 1, 1)}
				Size={animation.map((n) =>
					UDim2.fromOffset(MIN_WIDTH, MIN_HEIGHT).Lerp(UDim2.fromOffset(frameWidth, frameHeight), n),
				)}
				Position={animation.map(
					(n) => new UDim2(frameAlignment, 0, 0, -OFFSET + math.floor((1 - n) * TAIL_HEIGHT * 2)),
				)}
				BackgroundTransparency={1}
				Visible={animation.map((n) => n !== 0)}
			>
				<Dropshadow
					blur={DropshadowBlur.Medium}
					scale={0.75}
					size={new UDim2(1, 32, 1, 30)}
					position={new UDim2(0.5, 0, 1, 20)}
					color={asColor(dropshadow)}
					transparency={asTransparency(dropshadow)}
				>
					<Gradient color={dropshadow} />
				</Dropshadow>

				{/* Caption */}
				<frame
					ClipsDescendants
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundColor3={asColor(background)}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={cornerRadius} />
					<Gradient color={background} />

					<textlabel
						Text={caption}
						Font="GothamBold"
						TextSize={15}
						TextXAlignment="Center"
						TextYAlignment="Center"
						TextWrapped
						TextColor3={asColor(foreground)}
						TextTransparency={asTransparency(foreground)}
						AnchorPoint={new Vector2(0.5, 1)}
						Size={UDim2.fromOffset(frameWidth - MARGIN * 2, frameHeight - MARGIN * 2)}
						Position={new UDim2(0.5, 0, 1, -MARGIN)}
						BackgroundTransparency={1}
					>
						<Gradient color={foreground} />
					</textlabel>
				</frame>
			</frame>
		</>
	);
}

export default pure(Tooltip);
