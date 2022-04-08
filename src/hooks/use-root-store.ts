import { RootAction, RootState, RootStore } from "store";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "@rbxts/roact-rodux-hooked";

export const useRootSelector = useSelector as TypedUseSelectorHook<RootState>;

export const useRootDispatch = () => useDispatch<RootAction>();

export const useRootStore = () => useStore<RootStore>();
