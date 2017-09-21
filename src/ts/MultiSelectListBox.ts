import {BaseListBox} from "./BaseListBox";
import {ListBoxSettings} from "./contract/ListBoxSettings";
import {ListBoxItem} from "./contract/ListBoxItem";

export class MultiSelectListBox extends BaseListBox {

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
    constructor(domElement: HTMLElement, options?: ListBoxSettings) {
        super(domElement, options, true);
        this._createListbox();
    }

    protected _itemClicked(domItem: HTMLElement, ctrl: boolean = false): void {
        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        let dataItem: ListBoxItem = this._getDataItem(domItem.id);

        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
            if (!ctrl) {
                // deselect all except this
                this.clearSelection();
                domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = true;
                this.selectedDataItems.push(dataItem);
            } else {
                // deselect only this
                domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = false;
                const removeIndex: number = this.selectedDataItems.indexOf(
                    this._getDataItem(domItem.id));
                this.selectedDataItems.splice(removeIndex, 1);
            }
        } else {
            if (!ctrl) {
                // deselect all others
                this.clearSelection();
            }

            domItem.focus();
            domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            dataItem.selected = true;
            this.selectedDataItems.push(dataItem);
        }

        this._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this.selectedDataItems);
    }

    protected _filterChanged(): void {
        this._fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}
