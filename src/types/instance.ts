import { Options, ListBoxOptions } from "./options";
import { ListBoxItem } from "./list-box-item";

export interface ListBoxNameMap {
    single: ListBoxItem | null;
    multi: ListBoxItem[];
}

export interface Instance<K extends keyof ListBoxNameMap> {
    /** Adds a new item to the list */
    addItem(item: string | Partial<ListBoxItem>): string;

    /** Adds new items to the list */
    addItems(items: (string | Partial<ListBoxItem>)[]): string[];

    /** Removes a item from the list */
    removeItem(identifier: string): void;

    /** Removes items from the list */
    removeItems(identifiers: string[]): void;

    /** Reverts all changes from the DOM */
    destroy(): void;

    /** Resets the selection state of all items */
    clearSelection(): void;

    /** Returns a item object for the given id or display text */
    getItem(identifier: string): ListBoxItem | null;

    /** Returns all item objects */
    getItems(): ListBoxItem[];

    /** Decreases the index of the matching item by one */
    moveItemUp(identifier: string): number | null;

    /** Increases the index of the matching item by one */
    moveItemDown(identifier: string): number | null;

    /** Moves item to the bottom of the list */
    moveItemToBottom(identifier: string): number | null;

    /** Moves item to the top of the list */
    moveItemToTop(identifier: string): number | null;

    /** Enables or disables the whole list and all childs */
    enable(state: boolean): void;

    /** Returns all ListBoxItem's which are selected */
    getSelection(): ListBoxNameMap[K];
}

export interface ListBoxFn {
    <K extends keyof ListBoxNameMap>(selector: Node, mode: K, config?: Options): Instance<K>;
    <K extends keyof ListBoxNameMap>(selector: ArrayLike<Node>, config?: Options): Instance<K>[];
    <K extends keyof ListBoxNameMap>(selector: string, config?: Options): Instance<K> | Instance<K>[];
    defaultConfig: Partial<ListBoxOptions>;
}
