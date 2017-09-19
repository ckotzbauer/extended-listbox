import {BaseListBox} from "./BaseListBox";
import {ListboxSettings} from "./contract/ListboxSettings";
import {ListboxItem} from "./contract/ListboxItem";

export class MultiSelectListbox extends BaseListBox {

    /**
     * Create an instance of MultiSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {MultiSelectListbox}
     * @param {object} domElement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    constructor(domElement: HTMLElement, options: ListboxSettings) {
        super(domElement, options);
        this.createListbox();
    }

    /**
     * Toggle item status.
     *
     * @this {MultiSelectListbox}
     * @param {object} domItem a DOM object
     */
    public onItemClick(domItem: HTMLElement): void {
        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
            domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);

            const removeIndex: number = this.selectedDataItems.indexOf(
                this.getDataItem(domItem.id));
            this.selectedDataItems.splice(removeIndex, 1);

            this.getDataItem(domItem.id).selected = false;
        } else {
            domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);

            let dataItem: ListboxItem = this.getDataItem(domItem.id);
            dataItem.selected = true;

            this.selectedDataItems.push(dataItem);
        }

        this.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this.selectedDataItems);
    }

    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    public onFilterChange(): void {
        this.fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}
