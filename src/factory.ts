import { Instance, ListBoxNameMap } from "./types/instance";
import { Options, defaults, ListBoxOptions } from "./types/options";
import { SingleSelectListBox } from "./single-select-list-box";
import { MultiSelectListBox } from "./multi-select-list-box";

export function createListBox<K extends keyof ListBoxNameMap>(
    element: HTMLElement,
    mode: K,
    instanceConfig: Options
): Instance<K> {
    const config: ListBoxOptions = {
        ...defaults,
        ...instanceConfig,
    };

    if (mode === "single") {
        return new SingleSelectListBox(element, config) as any;
    } else {
        return new MultiSelectListBox(element, config) as any;
    }
}
