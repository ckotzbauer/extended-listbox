var ListboxOptions = (function () {
    function ListboxOptions() {
        this.searchBar = false; /* If the searchBar is visible */
        this.searchBarWatermark = "Search..."; /* Watermark text for search input */
        this.searchBarButton = new ListboxSearchBarOptions(); /* Button configuration */
        this.multiple = false; /* If multi selection is enabled */
        this.getItems = null; /* Function which should return a array of items (see below) */
        this.onValueChanged = null; /* Delegate which is called on selection changes */
        this.onFilterChanged = null; /* Delegate which is called on search query changes */
        this.onItemsChanged = null; /* Called if items where added, removed or their position changed */
    }
    return ListboxOptions;
})();
//# sourceMappingURL=classSnippet1.js.map