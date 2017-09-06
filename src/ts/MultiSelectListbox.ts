import BaseListBox = require("./BaseListBox");
import ListboxSettings = require("./contract/ListboxSettings");
import Listbox = require("./Listbox");
import ListboxEvent = require("./event/ListboxEvent");

class MultiSelectListbox implements Listbox {

    public baseListBox: BaseListBox;

    /**
     * Create an instance of MultiSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {MultiSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    constructor(domelement: JQuery, options: ListboxSettings) {
        this.baseListBox = new BaseListBox(domelement, options, this);
        this.baseListBox.createListbox();
    }

    /**
     * Toggle item status.
     *
     * @this {MultiSelectListbox}
     * @param {object} domItem a DOM object
     */
    public onItemClick(domItem: JQuery): void {
        if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        var parentValues: any[] = <any[]>this.baseListBox._target.val();

        if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
            domItem.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);

            var removeIndex: number = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
            parentValues.splice(removeIndex, 1);

            domItem.data("dataItem").selected = false;
        } else {
            domItem.addClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            domItem.data("dataItem").selected = true;

            if (!parentValues) {
                parentValues = [];
            }

            parentValues.push(JSON.stringify(domItem.data("dataItem")));
        }

        this.baseListBox._target.val(parentValues);
        this.baseListBox._target.trigger('change');

        this.baseListBox.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, parentValues);
    }

    public onFilterChange(): void {
        return undefined;
    }
}

export = MultiSelectListbox;
