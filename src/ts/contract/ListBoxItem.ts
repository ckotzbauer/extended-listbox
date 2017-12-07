
export interface ListBoxItem {
    text: string;
    id?: string;
    index?: number;
    disabled?: boolean;
    selected?: boolean;
    groupHeader?: boolean;
    parentGroupId?: string;
    childItems?: (string|ListBoxItem)[];
}
