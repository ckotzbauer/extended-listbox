var ListboxItem = (function () {
    function ListboxItem() {
        /* Displayable item text */
        this.text = null;
        /* Unique element id, if null it will be generated like listboxitem8294854 */
        this.id = null;
        /* Index position of item in the list; only used for addItem api calls. */
        this.index = null;
        /* true if the item should not be selectable */
        this.disabled = false;
        /* true if the item is selected */
        this.selected = false;
        /* true if the item has childs */
        this.groupHeader = false;
        /* ID or display text for parent; only used for addItem api calls. */
        this.parentGroupId = null;
        /* list of child items */
        this.childItems = [];
    }
    return ListboxItem;
})();
//# sourceMappingURL=classSnippet3.js.map