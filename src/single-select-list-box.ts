import { BaseListBox } from "./base-list-box";
import { ListBoxOptions } from "./types/options";
import { ListBoxItem } from "./types/list-box-item";

export class SingleSelectListBox extends BaseListBox<"single"> {
    private _selectedDomItem: HTMLElement | null;

    /**
     * Create an instance of SingleSelectListBox.
     *
     * Inherit a {ListBox} class.
     *
     * @constructor
     * @this {SingleSelectListBox}
     * @param {object} domElement DOM element to be converted to the ListBox
     * @param {object} options an object with ListBox settings
     */
    constructor(domElement: HTMLElement, options: ListBoxOptions) {
        super(domElement, options, false);
        this._selectedDomItem = null;
        this.selected = null;
        this._createListbox();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _itemClicked(domItem: HTMLElement): void {
        if (
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)
        ) {
            return;
        }

        if (this._selectedDomItem) {
            this.clearSelection();
            this._selectedDomItem = null;
        }

        domItem.classList.toggle(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        domItem.focus();
        this._selectedDomItem = domItem;

        const dataItem: ListBoxItem = this._getDataItem(domItem.id) as ListBoxItem;
        dataItem.selected = true;
        this.selected = dataItem;

        this._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this._getDataItem(domItem.id));
    }

    protected _filterChanged(): void {
        if (!this._selectedDomItem || this._selectedDomItem.style.display === "none") {
            const elements: NodeListOf<Element> = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
            for (let i = 0; i < elements.length; i++) {
                const element: HTMLElement = elements.item(i) as HTMLElement;
                if (
                    !element.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) &&
                    !element.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) &&
                    element.style.display !== "none"
                ) {
                    this._itemClicked(element);
                    break;
                }
            }
        }

        this._fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }

    public clearSelection(): void {
        super.clearSelection();
        this.selected = null;
    }

    protected onRemoveItem(item: ListBoxItem): void {
        if (item.id === this.selected?.id) {
            this.selected = null;
        }
    }

    protected _clearItemSelection(domItem: HTMLElement): void {
        super._clearItemSelection(domItem);
        this.selected = null;
    }
}
