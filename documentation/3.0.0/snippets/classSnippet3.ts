class ListboxItem {
    /* Displayable item text */
    text: string = null;

    /* Unique element id, if null it will be generated like listboxitem8294854 */
    id: string = null;

    /* Index position of item in the list; only used for addItem api calls. */
    index: number = null;

    /* true if the item should not be selectable */
    disabled: boolean = false;

    /* true if the item is selected */
    selected: boolean = false;

    /* true if the item has childs */
    groupHeader: boolean = false;

    /* ID or display text for parent; only used for addItem api calls. */
    parentGroupId: string = null;

    /* list of child items */
    childItems: ListboxItem[] = [];
}
