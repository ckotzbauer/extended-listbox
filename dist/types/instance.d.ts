import { Options, ListBoxOptions } from "./options";
import { ListBoxItem } from "./list-box-item";
export interface ListBoxNameMap {
    single: ListBoxItem | null;
    multi: ListBoxItem[];
}
export interface Instance<K extends keyof ListBoxNameMap> {
    addItem(item: string | Partial<ListBoxItem>): string;
    addItems(items: (string | Partial<ListBoxItem>)[]): string[];
    removeItem(identifier: string): void;
    removeItems(identifiers: string[]): void;
    destroy(): void;
    clearSelection(): void;
    getItem(identifier: string): ListBoxItem | null;
    getItems(): ListBoxItem[];
    moveItemUp(identifier: string): number | null;
    moveItemDown(identifier: string): number | null;
    moveItemToBottom(identifier: string): number | null;
    moveItemToTop(identifier: string): number | null;
    enable(state: boolean): void;
    getSelection(): ListBoxNameMap[K];
}
export interface ListBoxFn {
    <K extends keyof ListBoxNameMap>(selector: Node, mode: K, config?: Options): Instance<K>;
    <K extends keyof ListBoxNameMap>(selector: ArrayLike<Node>, config?: Options): Instance<K>[];
    <K extends keyof ListBoxNameMap>(selector: string, config?: Options): Instance<K> | Instance<K>[];
    defaultConfig: Partial<ListBoxOptions>;
}
