import BaseListBox = require("./BaseListBox");
import ListboxSettings = require("./contract/ListboxSettings");
import ListboxItem = require("./contract/ListboxItem");

class SingleSelectListbox extends BaseListBox {

    private _selectedDomItem: HTMLElement;

    /**
     * Create an instance of SingleSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {SingleSelectListbox}
     * @param {object} domElement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    constructor(domElement: HTMLElement, options: ListboxSettings) {
        super(domElement, options);
        this._selectedDomItem = null;
        this.createListbox();
    }

    /**
     * Reset all items and select a given one.
     *
     * @this {SingleSelectListbox}
     * @param {object} domItem a DOM object
     */
    public onItemClick(domItem: HTMLElement): void {
        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        if (this._selectedDomItem) {
            this.clearSelection(true);
            this._selectedDomItem = null;
        }

        domItem.classList.toggle(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        domItem.focus();
        this._selectedDomItem = domItem;

        const dataItem: ListboxItem = this.getDataItem(domItem.id);
        dataItem.selected = true;
        this.selectedDataItems.push(dataItem);

        this._target.dispatchEvent(new Event("change"));
        this.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this.getDataItem(domItem.id));
    }


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    public onFilterChange(): void {
        if (!this._selectedDomItem || this._selectedDomItem.querySelectorAll(":visible").length > 0) {
            const element: HTMLElement = this._list.querySelectorAll(':visible').item(0) as HTMLElement;
            if (element && (element as any).length > 0) { // TODO
                this.onItemClick(element);
            }
        }

        this.fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}

export = SingleSelectListbox;
