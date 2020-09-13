import { Options } from "./options";
import { Instance, ListBoxNameMap } from "./instance";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElement {
        listBox: <K extends keyof ListBoxNameMap>(mode: K, config?: Options) => Instance<K>;
        _listBox?: Instance<any>;
    }

    interface NodeList {
        listBox: <K extends keyof ListBoxNameMap>(mode: K, config?: Options) => Instance<K> | Instance<K>[];
    }

    interface HTMLCollection {
        listBox: <K extends keyof ListBoxNameMap>(mode: K, config?: Options) => Instance<K> | Instance<K>[];
    }
}
