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
