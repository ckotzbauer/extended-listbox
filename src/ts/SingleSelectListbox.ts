import BaseListBox = require("./BaseListBox");
import ListboxSettings = require("./contract/ListboxSettings");
import Listbox = require("./Listbox");
import ListboxEvent = require("./event/ListboxEvent");

class SingleSelectListbox implements Listbox {

    public baseListBox: BaseListBox;
    private _selectedDomItem: JQuery;

    /**
     * Create an instance of SingleSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {SingleSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    constructor(domelement: JQuery, options: ListboxSettings) {
        this._selectedDomItem = null;
        this.baseListBox = new BaseListBox(domelement, options, this);
        this.baseListBox.createListbox();
    }

    /**
     * Reset all items and select a given one.
     *
     * @this {SingleSelectListbox}
     * @param {object} domItem a DOM object
     */
    public onItemClick(domItem: JQuery): void {
        if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        if (this._selectedDomItem) {
            this.baseListBox.clearSelection(true);
            this._selectedDomItem = null;
        }

        domItem.toggleClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        domItem.focus();
        this._selectedDomItem = domItem;
        domItem.data("dataItem").selected = true;
        this.baseListBox._target.val(domItem.data("dataItem"));
        this.baseListBox._target.trigger('change');

        this.baseListBox.fireEvent(ListboxEvent.VALUE_CHANGED, domItem.data("dataItem"));
    }


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    public onFilterChange(): void {
        if (!this._selectedDomItem || !this._selectedDomItem.is(':visible')) {
            var element: JQuery = this.baseListBox._list.children(':visible').first();
            if (element && element.length > 0) {
                this.onItemClick(element);
            }
        }

        this.baseListBox.fireEvent(ListboxEvent.FILTER_CHANGED, this.baseListBox._searchbar.val());
    }
}

export = SingleSelectListbox;
