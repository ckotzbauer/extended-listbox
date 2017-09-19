import {ListboxSearchBarButtonOptions} from "./ListboxSearchBarButtonOptions";
import {ListboxEvent} from "../event/ListboxEvent";

export interface ListboxSettings {
    searchBar?: boolean;
    searchBarWatermark?: string;
    searchBarButton?: ListboxSearchBarButtonOptions;
    getItems?: () => (string|ListboxItem)[];
    onValueChanged?: (value: ListboxEvent) => void;
    onFilterChanged?: (value: ListboxEvent) => void;
    onItemsChanged?: (values: ListboxEvent) => void;
    onItemEnterPressed?: (values: ListboxEvent) => void;
    onItemDoubleClicked?: (values: ListboxEvent) => void;
}
