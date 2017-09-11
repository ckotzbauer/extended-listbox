import BaseListBox = require("./BaseListBox");
import ListboxSettings = require("./contract/ListboxSettings");
import Listbox = require("./Listbox");

class SingleSelectListbox implements Listbox {

    public baseListBox: BaseListBox;
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
        options = $.extend(
            {
                searchBar: false,
                searchBarWatermark: "Search...",
                searchBarButton: { visible: false },
                multiple: false
            },
            options);

        this._selectedDomItem = null;
        this.baseListBox = new BaseListBox(domElement, options, this);
        this.baseListBox.createListbox();
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
            this.baseListBox.clearSelection(true);
            this._selectedDomItem = null;
        }

        domItem.classList.toggle(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        domItem.focus();
        this._selectedDomItem = domItem;
        domItem.data("dataItem").selected = true;
        this.baseListBox._target.val(domItem.data("dataItem"));
        this.baseListBox._target.dispatchEvent(new Event("change"));

        this.baseListBox.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, domItem.data("dataItem"));
    }


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    public onFilterChange(): void {
        if (!this._selectedDomItem || this._selectedDomItem.querySelectorAll(":visible").length > 0) {
            var element: HTMLElement = this.baseListBox._list.querySelectorAll(':visible').item(0) as HTMLElement;
            if (element && element.length > 0) {
                this.onItemClick(element);
            }
        }

        this.baseListBox.fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this.baseListBox._searchbar.val());
    }
}

export = SingleSelectListbox;
