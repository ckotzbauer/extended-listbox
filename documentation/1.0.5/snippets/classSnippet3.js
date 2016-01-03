var ListboxItem = (function () {
    function ListboxItem() {
        this.text = null; /* Displayable item text */
        this.id = null; /* Unique element id, if null it will be generated like listboxitem8294854 */
        this.index = null; /* Index position of item in the list; only used for addItem api calls. */
        this.disabled = false; /* true if the item should not be selectable */
        this.selected = false; /* true if the item is selected */
        this.groupHeader = false; /* true if the item has childs */
        this.parentGroupId = null; /* ID or display text for parent; only used for addItem api calls. */
        this.childItems = []; /* list of child items */
    }
    return ListboxItem;
})();
//# sourceMappingURL=classSnippet3.js.map