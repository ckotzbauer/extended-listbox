class ListBoxOptions {
    /* If the searchBar is visible */
    searchBar: boolean = false;

    /* Watermark text for search input */
    searchBarWatermark: string = "Search...";

    /* Button configuration */
    searchBarButton: ListboxSearchBarOptions = new ListboxSearchBarOptions();

    /* If multi selection is enabled */
    multiple: boolean = false;

    /* Function which should return a array of items (see below) */
    getItems: () => ListboxItem[] = null;

    /* Delegate which is called on selection changes */
    onValueChanged: (event: ListboxEvent) => void = null;

    /* Delegate which is called on search query changes */
    onFilterChanged: (event: ListboxEvent) => void = null;

    /* Called if items where added, removed or their position changed */
    onItemsChanged: (event: ListboxEvent) => void = null;

    /* callback for enter keyPress event on an item */
    onItemEnterPressed: (event: ListboxEvent) => void = null;

    /* callback for doubleClick event on an item */
    onItemDoubleClicked: (event: ListboxEvent) => void = null;
}
