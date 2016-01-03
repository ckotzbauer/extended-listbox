class ListboxOptions {
    searchBar: boolean = false; /* If the searchBar is visible */
    searchBarWatermark: string = "Search...";   /* Watermark text for search input */
    searchBarButton: {};
    multiple: boolean = false;  /* If multi selection is enabled */
    getItems: Function = null;  /* Function which should return a array of items (see below) */
    onValueChanged: Function = null;    /* Delegate which is called on selection changes */
    onFilterChanged: Function = null;   /* Delegate which is called on search query changes */
    onItemsChanged: Function = null;    /* Called if items where added, removed or their position changed */
}
