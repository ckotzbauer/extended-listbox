class ListboxOptions {
    /* If the searchBar is visible */
    searchBar: boolean = false;

    /* Watermark text for search input */
    searchBarWatermark: string = "Search...";

    /* Button configuration */
    searchBarButton: ListboxSearchBarOptions = new ListboxSearchBarOptions();

    /* If multi selection is enabled */
    multiple: boolean = false;

    /* Function which should return a array of items (see below) */
    getItems: Function = null;

    /* Delegate which is called on selection changes */
    onValueChanged: Function = null;

    /* Delegate which is called on search query changes */
    onFilterChanged: Function = null;

    /* Called if items where added, removed or their position changed */
    onItemsChanged: Function = null;

    /* callback for enter keyPress event on an item */
    onItemEnterPressed: Function = null;

    /* callback for doubleClick event on an item */
    onItemDoubleClicked: Function = null;
}
