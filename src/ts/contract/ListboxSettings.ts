/// <reference path="../../../typings/tsd.d.ts" />

/// <reference path="./ListboxSearchBarButtonOptions.ts" />
/// <reference path="../event/ListboxEvent.ts" />

module EL {
    "use strict";

    export class ListboxSettings {
        public searchBar: boolean = false;
        public searchBarWatermark: string = 'Search...';
        public searchBarButton: ListboxSearchBarButtonOptions = new ListboxSearchBarButtonOptions();
        public multiple: boolean = false;
        public getItems: () => any[] = null;
        public onValueChanged: (value: ListboxEvent) => void = null;
        public onFilterChanged: (value: ListboxEvent) => void = null;
        public onItemsChanged: (values: ListboxEvent) => void = null;
        public onItemEnterPressed: (values: ListboxEvent) => void = null;
        public onItemDoubleClicked: (values: ListboxEvent) => void = null;
    }
}
