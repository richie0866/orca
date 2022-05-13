import Rodux from "@rbxts/rodux";
import { RootState } from "reducers";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "@rbxts/roact-rodux-hooked";

export const useRootSelector = useSelector as TypedUseSelectorHook<RootState>;
export const useRootDispatch = useDispatch;
export const useRootStore = useStore as () => Rodux.Store<RootState>;
