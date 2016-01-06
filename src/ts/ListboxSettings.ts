/// <reference path="../../typings/tsd.d.ts" />

import {ListboxItem} from "./ListboxItem";
import {ListboxSearchBarButtonOptions} from "./ListboxSearchBarButtonOptions";
import {ListboxEvent} from "./event/ListboxEvent";

export class ListboxSettings {
    public searchBar: boolean = false;
    public searchBarWatermark: string = 'Search...';
    public searchBarButton: ListboxSearchBarButtonOptions = new ListboxSearchBarButtonOptions();
    public multiple: boolean = false;
    public getItems: () => any[] = null;
    public onValueChanged: (value: ListboxEvent) => void = null;
    public onFilterChanged: (value: ListboxEvent) => void = null;
    public onItemsChanged: (values: ListboxEvent) => void = null;
}
