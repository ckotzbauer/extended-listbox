/// <reference path="../typings/jquery/jquery.d.ts"/>

interface ListBoxOptions {
    searchBar?: boolean,
    searchBarWatermark?: string,
    searchBarButton?: any,
    multiple?: boolean,
    getItems?: () => any,
    onValueChanged?: (value: any) => void,
    onFilterChanged?: (value: any) => void,
    onItemsChanged?: (value: any) => void
}

interface JQuery {
    listbox(): JQuery;

    /*listbox(method: 'addItem', item: any): any;

    listbox(method: 'removeItem', value: any): any;

    listbox(method: 'destroy'): any;

    listbox(method: 'getItem', value: any): any;

    listbox(method: 'getItems', value: any): any;

    listbox(method: 'moveItemUp', value: any): any;

    listbox(method: 'moveItemDown', value: any): any;

    listbox(method: 'clearSelection'): any;*/

    listbox(method: string): any;
    listbox(options: ListBoxOptions): JQuery;
}