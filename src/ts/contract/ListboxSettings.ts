import ListboxSearchBarButtonOptions = require("./ListboxSearchBarButtonOptions");
import ListboxEvent = require("../event/ListboxEvent");

interface ListboxSettings {
    searchBar: boolean;
    searchBarWatermark: string;
    searchBarButton: ListboxSearchBarButtonOptions;
    multiple: boolean;
    getItems: () => (string|ListboxItem)[];
    onValueChanged: (value: ListboxEvent) => void;
    onFilterChanged: (value: ListboxEvent) => void;
    onItemsChanged: (values: ListboxEvent) => void;
    onItemEnterPressed: (values: ListboxEvent) => void;
    onItemDoubleClicked: (values: ListboxEvent) => void;
}

export = ListboxSettings;
