import { ListBoxEvent } from "./list-box-event";
import { ListBoxItem } from "./list-box-item";
export declare type ComponentMode = "single" | "multi";
export interface ListBoxOptions {
    searchBar: boolean;
    searchBarWatermark: string;
    searchBarButton: {
        visible: boolean;
        icon: string;
        onClick: () => void;
    };
    getItems: () => (string | Partial<ListBoxItem>)[];
    onValueChanged: (event: ListBoxEvent) => void;
    onFilterChanged: (event: ListBoxEvent) => void;
    onItemsChanged: (event: ListBoxEvent) => void;
    onItemEnterPressed: (event: ListBoxEvent) => void;
    onItemDoubleClicked: (event: ListBoxEvent) => void;
}
export declare const defaults: ListBoxOptions;
export declare type Options = Partial<ListBoxOptions>;
