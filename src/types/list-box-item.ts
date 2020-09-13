export interface ListBoxItem {
    /** display text */
    text: string | null;

    /** unique identifier, if not set it will be generated */
    id: string | null;

    /** index position from the item in the list; only used for manual addItem api calls */
    index: number | null;

    /** determines if the item should be clickable */
    disabled: boolean | null;

    /** determines if the item is selected */
    selected: boolean | null;

    /** determines if the item has childItems */
    groupHeader: boolean | null;

    /** display text or id of the parent; only used for manual addItem api calls */
    parentGroupId: string | null;

    /** list of childItems */
    childItems: (string | Partial<ListBoxItem>)[] | null;
}
