class ListboxItem {
    text: string = null;    /* Displayable item text */
    id: string = null;  /* Unique element id, if null it will be generated like listboxitem8294854 */
    index: number = null;   /* Index position of item in the list; only used for addItem api calls. */
    disabled: boolean = false;  /* true if the item should not be selectable */
    selected: boolean = false;  /* true if the item is selected */
    groupHeader: boolean = false;   /* true if the item has childs */
    parentGroupId: string = null;   /* ID or display text for parent; only used for addItem api calls. */
    childItems: ListboxItem[] = []; /* list of child items */
}
