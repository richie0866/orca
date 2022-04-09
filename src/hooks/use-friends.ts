import { useClient } from "./use-client";
import { useMemo } from "@rbxts/roact-hooked";
import { usePromise } from "@rbxts/roact-hooked-plus";

export interface GameActivity {
	friends: FriendOnlineInfoGame[];
	placeId: number;
	thumbnail: string;
}

export function useFriends(deps?: unknown[]) {
	const client = useClient();

	return usePromise(async () => client.GetFriendsOnline(), deps);
}

export function useFriendsInGame(deps?: unknown[]) {
	const [friends, err, status] = useFriends(deps);

	const friendsPlaying = friends?.filter(
		(friend): friend is FriendOnlineInfoGame => "PlaceId" in friend && "GameId" in friend,
	);

	return [friendsPlaying, err, status] as const;
}

export function useFriendGameActivity(deps?: unknown[]) {
	const [friends, err, status] = useFriendsInGame(deps);
	const games = useMemo(() => new Array<GameActivity>(), deps);

	// If there are no friends yet, or `games` is not empty (deps didn't change),
	// don't do anything
	if (!friends || games.size() > 0) {
		return [games, err, status] as const;
	}

	for (const friend of friends) {
		const gameActivity = games.find((g) => g.placeId === friend.PlaceId);

		if (gameActivity) {
			gameActivity.friends.push(friend);
			continue;
		}

		games.push({
			friends: [friend],
			placeId: friend.PlaceId,
			thumbnail: `https://www.roblox.com/asset-thumbnail/image?assetId=${friend.PlaceId}&width=768&height=432&format=png`,
		});
	}

	return [games, err, status] as const;
}
