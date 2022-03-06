import Make from "@rbxts/make";

export type AcrylicInstance = Model & {
	Horizontal: Part & { Mesh: SpecialMesh };
	Vertical: Part & { Mesh: SpecialMesh };
	TopLeft: Part & { Mesh: SpecialMesh };
	TopRight: Part & { Mesh: SpecialMesh };
	BottomLeft: Part & { Mesh: SpecialMesh };
	BottomRight: Part & { Mesh: SpecialMesh };
};

const fill = {
	Color: new Color3(0, 0, 0),
	Material: Enum.Material.Glass,
	Size: new Vector3(1, 1, 0),
	Anchored: true,
	CanCollide: false,
	Locked: true,
	CastShadow: false,
	Transparency: 0.999,
};

const corner = {
	Color: new Color3(0, 0, 0),
	Material: Enum.Material.Glass,
	Size: new Vector3(0, 1, 1),
	Anchored: true,
	CanCollide: false,
	Locked: true,
	CastShadow: false,
	Transparency: 0.999,
};

export const acrylicInstance = Make("Model", {
	Children: [
		Make("Part", {
			Name: "Horizontal",
			Children: [
				Make("SpecialMesh", {
					MeshType: Enum.MeshType.Brick,
					Offset: new Vector3(0, 0, -0.000001),
				}),
			],
			...fill,
		}),
		Make("Part", {
			Name: "Vertical",
			Children: [
				Make("SpecialMesh", {
					MeshType: Enum.MeshType.Brick,
					Offset: new Vector3(0, 0, 0.000001),
				}),
			],
			...fill,
		}),
		Make("Part", {
			Name: "TopRight",
			Children: [Make("SpecialMesh", { MeshType: Enum.MeshType.Cylinder })],
			...corner,
		}),
		Make("Part", {
			Name: "TopLeft",
			Children: [Make("SpecialMesh", { MeshType: Enum.MeshType.Cylinder })],
			...corner,
		}),
		Make("Part", {
			Name: "BottomRight",
			Children: [Make("SpecialMesh", { MeshType: Enum.MeshType.Cylinder })],
			...corner,
		}),
		Make("Part", {
			Name: "BottomLeft",
			Children: [Make("SpecialMesh", { MeshType: Enum.MeshType.Cylinder })],
			...corner,
		}),
	],
}) as AcrylicInstance;
