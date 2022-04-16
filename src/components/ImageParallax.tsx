import Roact from "@rbxts/roact";
import { mapBinding } from "@rbxts/roact-hooked-plus";

interface Props extends Roact.PropsWithChildren {
	image: string;
	imageSize: Vector2;
	padding: Vector2;
	offset: Roact.Binding<Vector2> | Vector2; // { -1, -1 } - { 1, 1 }
}

export default function ImageParallax({ image, imageSize, offset, padding, [Roact.Children]: children }: Props) {
	return (
		<imagelabel
			Image={image}
			ImageRectSize={imageSize.sub(padding.mul(2))}
			ImageRectOffset={mapBinding(offset, (o) => padding.add(o.mul(padding)))}
			ScaleType="Crop"
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundTransparency={1}
		>
			{children}
		</imagelabel>
	);
}
