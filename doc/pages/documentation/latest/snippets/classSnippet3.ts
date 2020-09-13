interface ListBoxItem {
    /** display text */
    text?: string;

    /** unique identifier, if not set it will be generated */
    id?: string;

    /** index position from the item in the list; only used for manual addItem api calls */
    index?: number;

    /** determines if the item should be clickable */
    disabled?: boolean;

    /** determines if the item is selected */
    selected?: boolean;

    /** determines if the item has childItems */
    groupHeader?: boolean;

    /** display text or id of the parent; only used for manual addItem api calls */
    parentGroupId?: string;

    /** list of childItems */
    childItems?: (string | ListBoxItem)[];
}
