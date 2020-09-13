import { ListBoxEvent } from "./list-box-event";
import { ListBoxItem } from "./list-box-item";

export type ComponentMode = "single" | "multi";

export interface ListBoxOptions {
    /** determines if the searchBar is visible */
    searchBar: boolean;

    /** watermark (placeholder) for the searchBar */
    searchBarWatermark: string;

    /** settings for the searchBar button */
    searchBarButton: {
        visible: boolean;
        icon: string;
        onClick: () => void;
    };

    /** function which returns a array of items */
    getItems: () => (string | Partial<ListBoxItem>)[];

    /** callback for selection changes */
    onValueChanged: (event: ListBoxEvent) => void;

    /** callback for searchBar text changes */
    onFilterChanged: (event: ListBoxEvent) => void;

    /** callback for item changes (item added, item removed, item order) */
    onItemsChanged: (event: ListBoxEvent) => void;

    /** callback for enter keyPress event on an item */
    onItemEnterPressed: (event: ListBoxEvent) => void;

    /** callback for doubleClick event on an item */
    onItemDoubleClicked: (event: ListBoxEvent) => void;
}

export const defaults: ListBoxOptions = {
    searchBar: false,
    searchBarWatermark: "Search...",
    searchBarButton: {
        visible: false,
        icon: "",
        onClick: (): any => null,
    },
    getItems: () => [],
    onValueChanged: () => null,
    onFilterChanged: () => null,
    onItemsChanged: () => null,
    onItemEnterPressed: () => null,
    onItemDoubleClicked: () => null,
};

export type Options = Partial<ListBoxOptions>;
