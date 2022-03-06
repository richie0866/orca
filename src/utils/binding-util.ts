import Roact from "@rbxts/roact";

export type BindingOrValue<T> = T | Roact.Binding<T>;

export function isBinding(binding: unknown): binding is Roact.Binding<unknown> {
	return typeIs(binding, "table") && "getValue" in binding;
}

export function mapBinding<T, U>(value: BindingOrValue<T>, transform: (value: T) => U): Roact.Binding<U> {
	return isBinding(value) ? value.map(transform) : Roact.createBinding(transform(value))[0];
}

export function asBinding<T>(value: BindingOrValue<T>): Roact.Binding<T> {
	return isBinding(value) ? value : Roact.createBinding(value)[0];
}
