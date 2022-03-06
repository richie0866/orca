import Roact from "@rbxts/roact";
import { BindingOrValue, mapBinding } from "utils/binding-util";
import { scale } from "utils/udim2";

interface Props extends Roact.PropsWithChildren {
	image: string;
	imageSize: Vector2;
	padding: Vector2;
	offset: BindingOrValue<Vector2>; // { -1, -1 } - { 1, 1 }
}

function ParallaxImage({ image, imageSize, offset, padding, [Roact.Children]: children }: Props) {
	return (
		<imagelabel
			Image={image}
			ImageRectSize={imageSize.sub(padding.mul(2))}
			ImageRectOffset={mapBinding(offset, (o) => padding.add(o.mul(padding)))}
			ScaleType="Crop"
			Size={scale(1, 1)}
			BackgroundTransparency={1}
		>
			{children}
		</imagelabel>
	);
}

export default ParallaxImage;
