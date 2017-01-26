import ListboxSearchBarButtonOptions = require("./ListboxSearchBarButtonOptions");
import ListboxEvent = require("../event/ListboxEvent");

class ListboxSettings {
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

export = ListboxSettings;
