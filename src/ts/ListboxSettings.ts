module ExtendedListbox {

    export class ListboxSettings {
        public searchBar: boolean = false;
        public searchBarWatermark: string = 'Search...';
        public searchBarButton: ListBoxSearchButtonSettings = new ListBoxSearchButtonSettings();
        public multiple: boolean = false;
        public getItems: Function = null;
        public onValueChanged: Function = null;
        public onFilterChanged: Function = null;
        public onItemsChanged: Function = null
    }

    export class ListBoxSearchButtonSettings {
        public visible: boolean = false;
        public icon: string = null;
        public onClick: Function = null;

    }
}



