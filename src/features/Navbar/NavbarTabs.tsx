import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";

import Button from "components/Button";
import { Page, selectCurrentPage, setCurrentPage } from "reducers/pages";
import { Theme } from "reducers/themes";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

interface Props {
	style: Theme["navbar"];
}

function NavbarTabs({ style }: Props) {
	const dispatch = useRootDispatch();
	const currentPage = useRootSelector(selectCurrentPage);

	return (
		<>
			{/* Buttons */}
			<Button.Root
				onClick={() => dispatch(setCurrentPage(Page.Home))}
				active={currentPage === Page.Home}
				style={style.button}
				size={new UDim2(0, 100, 0, 56)}
			>
				<Button.Icon image="rbxassetid://8992031167" size={new UDim2(0, 36, 0, 36)} />
			</Button.Root>

			<Button.Root
				onClick={() => dispatch(setCurrentPage(Page.Apps))}
				active={currentPage === Page.Apps}
				style={style.button}
				size={new UDim2(0, 100, 0, 56)}
				position={new UDim2(0, 100, 0, 0)}
			>
				<Button.Icon image="rbxassetid://8992031246" size={new UDim2(0, 36, 0, 36)} />
			</Button.Root>

			<Button.Root
				onClick={() => dispatch(setCurrentPage(Page.Scripts))}
				active={currentPage === Page.Scripts}
				style={style.button}
				size={new UDim2(0, 100, 0, 56)}
				position={new UDim2(0, 200, 0, 0)}
			>
				<Button.Icon image="rbxassetid://8992030918" size={new UDim2(0, 36, 0, 36)} />
			</Button.Root>

			<Button.Root
				onClick={() => dispatch(setCurrentPage(Page.Settings))}
				active={currentPage === Page.Settings}
				style={style.button}
				size={new UDim2(0, 100, 0, 56)}
				position={new UDim2(0, 300, 0, 0)}
			>
				<Button.Icon image="rbxassetid://8992031056" size={new UDim2(0, 36, 0, 36)} />
			</Button.Root>
		</>
	);
}

export default hooked(NavbarTabs);
