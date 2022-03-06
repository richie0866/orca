export function getLuminance(color: Color3 | ColorSequence): number {
	if (typeIs(color, "ColorSequence")) {
		color = color.Keypoints[0].Value;
	}
	return color.R * 0.2126 + color.G * 0.7152 + color.B * 0.0722;
}

export function getColorInSequence(sequence: ColorSequence, alpha: number) {
	const index = math.floor(alpha * (sequence.Keypoints.size() - 1));
	const nextIndex = math.min(index + 1, sequence.Keypoints.size() - 1);

	const keypoint = sequence.Keypoints[index] ?? sequence.Keypoints[0];
	const nextKeypoint = sequence.Keypoints[nextIndex] ?? keypoint;

	return keypoint.Value.Lerp(nextKeypoint.Value, alpha * (sequence.Keypoints.size() - 1) - index);
}

const hexStringToInt = (hex: `#${string}`): number => {
	const [newHex] = hex.gsub("#", "0x", 1);
	return tonumber(newHex) ?? 0;
};

const intToColor3 = (i: number): Color3 =>
	Color3.fromRGB(math.floor(i / 65536) % 256, math.floor(i / 256) % 256, i % 256);

export const hex = (hex: `#${string}`): Color3 => intToColor3(hexStringToInt(hex));

export const rgb = (r: number, g: number, b: number): Color3 => Color3.fromRGB(r, g, b);

export const hsv = (h: number, s: number, v: number): Color3 => Color3.fromHSV(h / 360, s / 100, v / 100);

export const hsl = (h: number, s: number, l: number): Color3 => {
	const hsv1 = (s * (l < 50 ? l : 100 - l)) / 100;
	const hsvS = hsv1 === 0 ? 0 : ((2 * hsv1) / (l + hsv1)) * 100;
	const hsvV = l + hsv1;
	return Color3.fromHSV(h / 255, hsvS / 100, hsvV / 100);
};
