import { Players } from "@rbxts/services";

class MockClient {
	public Name = "Stickmasterluke";
	public DisplayName = "Luke";
	public UserId = 80254;
	public AccountAge = 500;

	public GetNetworkPing(): number {
		return math.random(50, 100) / 1000;
	}

	public GetFriendsOnline(): FriendOnlineInfo[] {
		return [
			{
				VisitorId: 4402987,
				UserName: "AbstractAlex",
				LastOnline: undefined!,
				IsOnline: true,
				LastLocation: "Base Wars!",
				LocationType: LocationType.InGame,
				PlaceId: 18164449,
				GameId: "",
			},
			{
				VisitorId: 123247,
				UserName: "alexnewtron",
				LastOnline: undefined!,
				IsOnline: true,
				LastLocation: "Murder Mystery 2",
				LocationType: LocationType.InGame,
				PlaceId: 142823291,
				GameId: "",
			},
			{
				VisitorId: 323842,
				UserName: "Amura",
				LastOnline: undefined!,
				IsOnline: true,
				LastLocation: "Aimblox BETA",
				LocationType: LocationType.InGame,
				PlaceId: 6808416928,
				GameId: "",
			},
		];
	}
}

const mockClient = new MockClient();

export function useClient() {
	return Players.LocalPlayer || mockClient;
}
