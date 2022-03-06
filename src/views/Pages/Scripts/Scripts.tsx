import Roact from "@rbxts/roact";
import { pure } from "@rbxts/roact-hooked";
import Canvas from "components/Canvas";
import * as http from "utils/http";
import { scale } from "utils/udim2";
import { BASE_PADDING, BASE_WINDOW_HEIGHT } from "views/Pages/Scripts/constants";
import Content from "views/Pages/Scripts/Content";
import ScriptCard from "views/Pages/Scripts/ScriptCard";

async function runScriptFromUrl(url: string, src: string) {
	try {
		const content = await http.get(url);
		const [fn, err] = loadstring(content, "@" + src);
		assert(fn, `Failed to call loadstring on Lua script from '${url}': ${err}`);
		task.defer(fn);
	} catch (e) {
		warn(`Failed to run Lua script from '${url}': ${e}`);
		return "";
	}
}

function Scripts() {
	return (
		<Canvas position={scale(0, 1)} anchor={new Vector2(0, 1)}>
			{/* Solaris Hub */}
			<ScriptCard
				onActivate={() => runScriptFromUrl("https://solarishub.dev/script.lua", "Solaris")}
				index={4}
				backgroundImage="rbxassetid://8992292705"
				backgroundImageSize={new Vector2(1023, 682)}
				dropshadow="rbxassetid://8992292536"
				dropshadowSize={new Vector2(1.15, 1.25)}
				dropshadowPosition={new Vector2(0.5, 0.55)}
				anchorPoint={new Vector2(0, 0)}
				size={
					new UDim2(
						1 / 3,
						-BASE_PADDING * (2 / 3),
						(416 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT,
						-BASE_PADDING / 2,
					)
				}
				position={scale(0, 0)}
			>
				<Content header="Solaris" body="A collection\nof your favorite\nscripts." footer="solarishub.dev" />
			</ScriptCard>

			{/* V.G Hub */}
			<ScriptCard
				onActivate={() =>
					runScriptFromUrl("https://raw.githubusercontent.com/1201for/V.G-Hub/main/V.Ghub", "V.G Hub")
				}
				index={1}
				backgroundImage="rbxassetid://8992292381"
				backgroundImageSize={new Vector2(1021, 1023)}
				dropshadow="rbxassetid://8992291993"
				dropshadowSize={new Vector2(1.15, 1.25)}
				dropshadowPosition={new Vector2(0.5, 0.55)}
				anchorPoint={new Vector2(0, 1)}
				size={
					new UDim2(
						1 / 3,
						-BASE_PADDING * (2 / 3),
						(416 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT,
						-BASE_PADDING / 2,
					)
				}
				position={scale(0, 1)}
			>
				<Content header="V.G Hub" body="Featuring over\n100 games." footer="github.com/1201for" />
			</ScriptCard>

			{/* CMD-X */}
			<ScriptCard
				onActivate={() =>
					runScriptFromUrl("https://raw.githubusercontent.com/CMD-X/CMD-X/master/Source", "CMD-X")
				}
				index={5}
				backgroundImage="rbxassetid://8992291779"
				backgroundImageSize={new Vector2(818, 1023)}
				dropshadow="rbxassetid://8992291581"
				dropshadowSize={new Vector2(1.15, 1.4)}
				dropshadowPosition={new Vector2(0.5, 0.6)}
				anchorPoint={new Vector2(0.5, 0)}
				size={
					new UDim2(
						1 / 3,
						-BASE_PADDING * (2 / 3),
						(242 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT,
						-BASE_PADDING / 2,
					)
				}
				position={scale(0.5, 0)}
			>
				<Content header="CMD-X" footer="github.com/CMD-X" />
			</ScriptCard>

			{/* Infinite Yield */}
			<ScriptCard
				onActivate={() =>
					runScriptFromUrl(
						"https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source",
						"Infinite Yield",
					)
				}
				index={3}
				backgroundImage="rbxassetid://8992291444"
				backgroundImageSize={new Vector2(1023, 682)}
				dropshadow="rbxassetid://8992291268"
				dropshadowSize={new Vector2(1.15, 1.4)}
				dropshadowPosition={new Vector2(0.5, 0.6)}
				anchorPoint={new Vector2(0.5, 0)}
				size={
					new UDim2(1 / 3, -BASE_PADDING * (2 / 3), (242 + BASE_PADDING) / BASE_WINDOW_HEIGHT, -BASE_PADDING)
				}
				position={new UDim2(0.5, 0, 1 - (590 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT, BASE_PADDING / 2)}
			>
				<Content header="Infinite Yield" footer="github.com/EdgeIY" />
			</ScriptCard>

			{/* Dex Explorer */}
			<ScriptCard
				onActivate={() => runScriptFromUrl("https://pastebin.com/raw/mMbsHWiQ", "Dex Explorer")}
				index={1}
				backgroundImage="rbxassetid://8992290931"
				backgroundImageSize={new Vector2(818, 1023)}
				dropshadow="rbxassetid://8992291101"
				dropshadowSize={new Vector2(1.15, 1.35)}
				dropshadowPosition={new Vector2(0.5, 0.55)}
				anchorPoint={new Vector2(0.5, 1)}
				size={
					new UDim2(
						1 / 3,
						-BASE_PADDING * (2 / 3),
						(300 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT,
						-BASE_PADDING / 2,
					)
				}
				position={scale(0.5, 1)}
			>
				<Content header="Dex Explorer" footer="github.com/LorekeeperZinnia" />
			</ScriptCard>

			{/* Unnamed ESP */}
			<ScriptCard
				onActivate={() =>
					runScriptFromUrl(
						"https://raw.githubusercontent.com/ic3w0lf22/Unnamed-ESP/master/UnnamedESP.lua",
						"Unnamed ESP",
					)
				}
				index={6}
				backgroundImage="rbxassetid://8992290714"
				backgroundImageSize={new Vector2(1023, 682)}
				dropshadow="rbxassetid://8992290570"
				dropshadowSize={new Vector2(1.15, 1.35)}
				dropshadowPosition={new Vector2(0.5, 0.55)}
				anchorPoint={new Vector2(1, 0)}
				size={
					new UDim2(
						1 / 3,
						-BASE_PADDING * (2 / 3),
						(300 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT,
						-BASE_PADDING / 2,
					)
				}
				position={scale(1, 0)}
			>
				<Content header="Unnamed ESP" footer="github.com/ic3w0lf22" />
			</ScriptCard>

			{/* EvoV2 */}
			<ScriptCard
				onActivate={() => runScriptFromUrl("https://projectevo.xyz/script/loader.lua", "EvoV2")}
				index={2}
				backgroundImage="rbxassetid://8992290314"
				backgroundImageSize={new Vector2(682, 1023)}
				dropshadow="rbxassetid://8992290105"
				dropshadowSize={new Vector2(1.15, 1.22)}
				dropshadowPosition={new Vector2(0.5, 0.53)}
				anchorPoint={new Vector2(1, 1)}
				size={
					new UDim2(
						1 / 3,
						-BASE_PADDING * (2 / 3),
						(532 + BASE_PADDING / 2) / BASE_WINDOW_HEIGHT,
						-BASE_PADDING / 2,
					)
				}
				position={scale(1, 1)}
			>
				<Content
					header="EvoV2"
					body="Reliable cheats for\nRoblox's top shooter\ngames, reimagined."
					footer="projectevo.xyz"
				/>
			</ScriptCard>
		</Canvas>
	);
}

export default pure(Scripts);
