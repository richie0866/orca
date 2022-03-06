import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "@rbxts/roact-rodux-hooked";
import Rodux from "@rbxts/rodux";

import { RootState, RootStore } from "store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<Rodux.Action>();
export const useAppStore = () => useStore<RootStore>();
