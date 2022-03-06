import { HttpService } from "@rbxts/services";
import { IS_DEV } from "constants";

export async function request(requestOptions: RequestAsyncRequest): Promise<RequestAsyncResponse> {
	if (IS_DEV) {
		return HttpService.RequestAsync(requestOptions);
	} else {
		const fn = syn ? syn.request : request;
		if (!fn) {
			throw "request/syn.request is not available";
		}
		return fn(requestOptions);
	}
}

export async function get(url: string, requestType?: Enum.HttpRequestType): Promise<string> {
	return game.HttpGetAsync(url, requestType);
}

export async function post(
	url: string,
	data: string,
	contentType?: string,
	requestType?: Enum.HttpRequestType,
): Promise<string> {
	return game.HttpPostAsync(url, data, contentType, requestType);
}
