interface ListBoxSettings {
    /** determines if the searchBar is visible */
    searchBar?: boolean;

    /** watermark (placeholder) for the searchBar */
    searchBarWatermark?: string;

    /** settings for the searchBar button */
    searchBarButton?: ListBoxSearchBarButtonOptions;

    /** function which returns a array of items */
    getItems?: () => (string | ListBoxItem)[];

    /** callback for selection changes */
    onValueChanged?: (event: ListBoxEvent) => void;

    /** callback for searchBar text changes */
    onFilterChanged?: (event: ListBoxEvent) => void;

    /** callback for item changes (item added, item removed, item order) */
    onItemsChanged?: (event: ListBoxEvent) => void;

    /** callback for enter keyPress event on an item */
    onItemEnterPressed?: (event: ListBoxEvent) => void;

    /** callback for doubleClick event on an item */
    onItemDoubleClicked?: (event: ListBoxEvent) => void;
}
