export async function httpGet(
	url: string,
	requestType?: Enum.HttpRequestType,
): Promise<[data?: string, code?: number]> {
	const [data, code] = game.HttpGetAsync(url, requestType);
	return [data, code];
}
