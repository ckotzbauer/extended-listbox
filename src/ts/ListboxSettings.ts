/// <reference path="../../typings/tsd.d.ts" />

import {ListboxItem} from "./ListboxItem";
import {ListboxSearchBarButtonOptions} from "./ListboxSearchBarButtonOptions";

export class ListboxSettings {
    public searchBar: boolean = false;
    public searchBarWatermark: string = 'Search...';
    public searchBarButton: ListboxSearchBarButtonOptions = new ListboxSearchBarButtonOptions();
    public multiple: boolean = false;
    public getItems: () => any[] = null;
    public onValueChanged: (value: ListboxItem|ListboxItem[]) => void = null;
    public onFilterChanged: (value: string) => void = null;
    public onItemsChanged: (values: ListboxItem[]) => void = null;
}
