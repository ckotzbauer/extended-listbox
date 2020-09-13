import { BaseListBox } from "./base-list-box";
import { ListBoxOptions } from "./types/options";
import { ListBoxItem } from "./types/list-box-item";

export class MultiSelectListBox extends BaseListBox<"multi"> {
    /**
     * Create an instance of MultiSelectListBox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {MultiSelectListBox}
     * @param {object} domElement DOM element to be converted to the ListBox
     * @param {object} options an object with ListBox settings
     */
    constructor(domElement: HTMLElement, options: ListBoxOptions) {
        super(domElement, options, true);
        this.selected = [];
        this._createListbox();
    }

    protected _itemClicked(domItem: HTMLElement, ctrl = false): void {
        if (
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)
        ) {
            return;
        }

        const dataItem: ListBoxItem = this._getDataItem(domItem.id) as ListBoxItem;

        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
            if (!ctrl) {
                // deselect all except this
                this.clearSelection();
                domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = true;
                this.selected.push(dataItem);
            } else {
                // deselect only this
                domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = false;
                const removeIndex: number = this.selected.indexOf(this._getDataItem(domItem.id) as ListBoxItem);
                this.selected.splice(removeIndex, 1);
            }
        } else {
            if (!ctrl) {
                // deselect all others
                this.clearSelection();
            }

            domItem.focus();
            domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            dataItem.selected = true;
            this.selected.push(dataItem);
        }

        this._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this.selected);
    }

    protected _filterChanged(): void {
        this._fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }

    public clearSelection(): void {
        super.clearSelection();
        this.selected = [];
    }

    protected onRemoveItem(item: ListBoxItem): void {
        const selectedIndex: number = this.selected.indexOf(item);
        if (selectedIndex !== -1) {
            this.selected.splice(selectedIndex, 1);
        }
    }

    protected _clearItemSelection(domItem: HTMLElement): void {
        super._clearItemSelection(domItem);
        const currentItem: ListBoxItem = this._getDataItem(domItem.id) as ListBoxItem;
        const removeIndex: number = this.selected.indexOf(currentItem);
        this.selected.splice(removeIndex, 1);
    }
}
