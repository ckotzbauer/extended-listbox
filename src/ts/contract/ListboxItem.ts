
export interface ListboxItem {
    text: string;
    id?: string;
    index?: number;
    disabled?: boolean;
    selected?: boolean;
    groupHeader?: boolean;
    parentGroupId?: string;
    childItems?: ListboxItem[];
}
