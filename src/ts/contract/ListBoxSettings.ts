import {ListBoxSearchBarButtonOptions} from "./ListboxSearchBarButtonOptions";
import {ListBoxEvent} from "../event/ListBoxEvent";
import {ListBoxItem} from "./ListBoxItem";

export interface ListBoxSettings {
    searchBar?: boolean;
    searchBarWatermark?: string;
    searchBarButton?: ListBoxSearchBarButtonOptions;
    getItems?: () => (string|ListBoxItem)[];
    onValueChanged?: (value: ListBoxEvent) => void;
    onFilterChanged?: (value: ListBoxEvent) => void;
    onItemsChanged?: (values: ListBoxEvent) => void;
    onItemEnterPressed?: (values: ListBoxEvent) => void;
    onItemDoubleClicked?: (values: ListBoxEvent) => void;
}
