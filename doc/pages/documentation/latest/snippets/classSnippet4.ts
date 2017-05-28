class ExtendedListboxInstance {
    /* DOM element of the listbox root */
    target: JQuery;

    /* Adds a new item to the list */
    addItem(item: string|ListboxItem): string;

    /* Adds new items to the list */
    addItems(item: (string | ListboxItem)[]): string[];

    /* Removes a item from the list */
    removeItem(identifier: string): void;

    /* Removes items from the list */
    removeItems(identifiers: string[]): void;

    /* Reverts all changes from the DOM */
    destroy(): void;

    /* Resets the selection state of all items */
    clearSelection(): void;

    /* Returns a item object for the given id or display text */
    getItem(identifier: string): ListboxItem;

    /* Returns all item objects */
    getItems(): ListboxItem[];

    /* Returns all ListboxItem's which are selected */
    getSelection(): ListboxItem[];

    /* Decreases the index of the matching item by one */
    moveItemUp(identifier: string): number;

    /* Increases the index of the matching item by one */
    moveItemDown(identifier: string): number;

    /* Moves item to the bottom of the list */
    moveItemToBottom(identifier: string): number;

    /* Moves item to the top of the list */
    moveItemToTop(identifier: string): number;

    /* Enables or disables the whole list and all childs */
    enable(state: boolean): void;

    /* callback for selection changes */
    onValueChanged(callback: (event: ListboxEvent) => void): void;

    /* callback for item changes (item added, item removed, item order) */
    onItemsChanged(callback: (event: ListboxEvent) => void): void;

    /* callback for searchBar text changes */
    onFilterChanged(callback: (event: ListboxEvent) => void): void;

    /* callback for enter keyPress event on an item */
    onItemEnterPressed(callback: (event: ListboxEvent) => void): void;

    /* callback for doubleClick event on an item */
    onItemDoubleClicked(callback: (event: ListboxEvent) => void): void;
}