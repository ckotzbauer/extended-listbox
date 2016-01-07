// Type definitions for extended-listbox 1.0.5
// Project: https://github.com/code-chris/extended-listbox
// Definitions by: Christian Kotzbauer <https://github.com/code-chris>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface ListboxItem {
    /** display text */
    text?: string;

    /** unique identifier, if not set it will be generated */
    id?: string;

    /** index position from the item in the list; only used for manual addItem api calls */
    index?: number;

    /** determines if the item should be clickable */
    disabled?: boolean;

    /** determines if the item is selected */
    selected?: boolean;

    /** determines if the item has childItems */
    groupHeader?: boolean;

    /** display text or id of the parent; only used for manual addItem api calls */
    parentGroupId?: string;

    /** list of childItems */
    childItems?: any[];
}

interface ListboxSearchBarButtonOptions {
    /** determines if the button is visible */
    visible?: boolean;

    /** css class for the i-tag of the button */
    icon?: string;

    /** callback for button click */
    onClick?: () => void;
}

interface ListBoxOptions {
    /** determines if the searchBar is visible */
    searchBar?: boolean;

    /** watermark (placeholder) for the searchBar */
    searchBarWatermark?: string;

    /** settings for the searchBar button */
    searchBarButton?: ListboxSearchBarButtonOptions;

    /** determines if multiple items can be selected */
    multiple?: boolean;

    /** function which returns a array of items */
    getItems?: () => any;

    /** callback for selection changes */
    onValueChanged?: (value: ListboxItem|ListboxItem[]) => void;

    /** callback for searchBar text changes */
    onFilterChanged?: (value: string) => void;

    /** callback for item changes (item added, item removed, item order) */
    onItemsChanged?: (value: ListboxItem[]) => void;
}

interface ListboxEvent {
    eventName: string;
    target: JQuery;
    args: any;
}

interface ExtendedListboxInstance {
    target: JQuery;
    addItem(item: string|ListboxItem): string;
    removeItem(identifier: string): void;
    destroy(): void;
    clearSelection(): void;
    getItem(identifier: string): ListboxItem;
    getItems(): ListboxItem[];
    moveItemUp(identifier: string): number;
    moveItemDown(identifier: string): number;
    enable(state: boolean): void;
    onValueChanged(callback: (event: ListboxEvent) => void): void;
    onItemsChanged(callback: (event: ListboxEvent) => void): void;
    onFilterChanged(callback: (event: ListboxEvent) => void): void;
}

interface JQuery {
    listbox(): ExtendedListboxInstance|ExtendedListboxInstance[];
    listbox(methodName: 'addItem'): string;
    listbox(methodName: 'removeItem'): void;
    listbox(methodName: 'destroy'): void;
    listbox(methodName: 'getItem'): ListboxItem;
    listbox(methodName: 'getItems'): ListboxItem[];
    listbox(methodName: 'moveItemUp'): number;
    listbox(methodName: 'moveItemDown'): number;
    listbox(methodName: 'clearSelection'): void;
    listbox(methodName: 'enable'): void;
    listbox(methodName: string): any;
    listbox(methodName: string, methodParameter: any): any;
    listbox(options: ListBoxOptions): ExtendedListboxInstance|ExtendedListboxInstance[];
}