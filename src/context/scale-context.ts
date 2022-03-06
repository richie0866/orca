import Roact from "@rbxts/roact";

export const ScaleContext = Roact.createContext<Roact.Binding<number>>(Roact.createBinding(1)[0]);
