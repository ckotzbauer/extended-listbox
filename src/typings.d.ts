import { Instance, ListBoxFn } from "./types/instance";

declare const listBox: ListBoxFn;

export default listBox;
export type ListBox = Instance<"single" | "multi">;
export { Options, ListBoxOptions } from "./types/options";
export * from "./types/globals";
export * from "./types/list-box-event";
export * from "./types/list-box-item";
