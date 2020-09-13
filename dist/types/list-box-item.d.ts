export interface ListBoxItem {
    text: string | null;
    id: string | null;
    index: number | null;
    disabled: boolean | null;
    selected: boolean | null;
    groupHeader: boolean | null;
    parentGroupId: string | null;
    childItems: (string | Partial<ListBoxItem>)[] | null;
}
