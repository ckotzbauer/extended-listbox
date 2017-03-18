var ListboxOptions = (function () {
    function ListboxOptions() {
        /* If the searchBar is visible */
        this.searchBar = false;
        /* Watermark text for search input */
        this.searchBarWatermark = "Search...";
        /* Button configuration */
        this.searchBarButton = new ListboxSearchBarOptions();
        /* If multi selection is enabled */
        this.multiple = false;
        /* Function which should return a array of items (see below) */
        this.getItems = null;
        /* Delegate which is called on selection changes */
        this.onValueChanged = null;
        /* Delegate which is called on search query changes */
        this.onFilterChanged = null;
        /* Called if items where added, removed or their position changed */
        this.onItemsChanged = null;
        /* callback for enter keyPress event on an item */
        this.onItemEnterPressed = null;
        /* callback for doubleClick event on an item */
        this.onItemDoubleClicked = null;
    }
    return ListboxOptions;
})();
//# sourceMappingURL=classSnippet1.js.map