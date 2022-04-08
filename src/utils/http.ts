async function get(url: string, requestType?: Enum.HttpRequestType): Promise<[data?: string, code?: number]> {
	const [data, code] = game.HttpGetAsync(url, requestType);
	return [data, code];
}

async function post(
	url: string,
	data: string,
	contentType?: string,
	requestType?: Enum.HttpRequestType,
): Promise<string> {
	return game.HttpPostAsync(url, data, contentType, requestType);
}

export default { get, post };
