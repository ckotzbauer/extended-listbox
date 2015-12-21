/// <reference path="../typings/jquery/jquery.d.ts"/>

interface ListBoxOptions {
    /** determines if the searchBar is visible */
    searchBar?: boolean;

    /** watermark (placeholder) for the searchBar */
    searchBarWatermark?: string;

    /** settings for the searchBar button */
    searchBarButton?: any;

    /** determines if multiple items can be selected */
    multiple?: boolean;

    /** function which returns a array of items */
    getItems?: () => any;

    /** callback for selection changes */
    onValueChanged?: (value: any) => void;

    /** callback for searchBar text changes */
    onFilterChanged?: (value: any) => void;

    /** callback for item changes (item added, item removed, item order) */
    onItemsChanged?: (value: any) => void;
}

interface JQuery {
    listbox(): JQuery;
    listbox(methodName: 'addItem'): string;
    listbox(methodName: 'removeItem'): void;
    listbox(methodName: 'destroy'): void;
    listbox(methodName: 'getItem'): any;
    listbox(methodName: 'getItems'): any;
    listbox(methodName: 'moveItemUp'): number;
    listbox(methodName: 'moveItemDown'): number;
    listbox(methodName: 'clearSelection'): void;
    listbox(methodName: 'enable'): void;
    listbox(methodName: string): any;
    listbox(methodName: string, methodParameter: any): any;
    listbox(options: ListBoxOptions): JQuery;
}