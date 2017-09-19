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
     * @param {boolean} ctrl if control key is pressed
     */
    public onItemClick(domItem: HTMLElement, ctrl: boolean = false): void {
        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        let dataItem: ListboxItem = this.getDataItem(domItem.id);

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
                    this.getDataItem(domItem.id));
                this.selectedDataItems.splice(removeIndex, 1);
            }
        } else {
            if (!ctrl) {
                // deselect all others
                this.clearSelection();
            }

            domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
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
