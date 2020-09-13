interface BaseListBox {
    /** Adds a new item to the list */
    addItem(item: string | ListBoxItem): string;

    /** Adds new items to the list */
    addItems(items: (string | ListBoxItem)[]): string[];

    /** Removes a item from the list */
    removeItem(identifier: string): void;

    /** Removes items from the list */
    removeItems(identifiers: string[]): void;

    /** Reverts all changes from the DOM */
    destroy(): void;

    /** Resets the selection state of all items */
    clearSelection(): void;

    /** Returns a item object for the given id or display text */
    getItem(identifier: string): ListBoxItem;

    /** Returns all item objects */
    getItems(): ListBoxItem[];

    /** Decreases the index of the matching item by one */
    moveItemUp(identifier: string): number;

    /** Increases the index of the matching item by one */
    moveItemDown(identifier: string): number;

    /** Moves item to the bottom of the list */
    moveItemToBottom(identifier: string): number;

    /** Moves item to the top of the list */
    moveItemToTop(identifier: string): number;

    /** Enables or disables the whole list and all childs */
    enable(state: boolean): void;

    /** Returns all ListBoxItem's which are selected */
    getSelection(): ListBoxItem[];
}

interface SingleSelectListBox extends BaseListBox {
    new (domElement: HTMLElement, options: ListBoxSettings): SingleSelectListBox;
}

interface MultiSelectListBox extends BaseListBox {
    new (domElement: HTMLElement, options: ListBoxSettings): MultiSelectListBox;
}
