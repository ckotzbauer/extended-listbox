import BaseListBox = require("./BaseListBox");
import ListboxSettings = require("./contract/ListboxSettings");
import Listbox = require("./Listbox");

class MultiSelectListbox implements Listbox {

    public baseListBox: BaseListBox;

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
        options = $.extend(
            {
                searchBar: false,
                searchBarWatermark: "Search...",
                searchBarButton: { visible: false },
                multiple: false
            },
            options);

        this.baseListBox = new BaseListBox(domElement, options, this);
        this.baseListBox.createListbox();
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

        let parentValues: any[] = <any[]>this.baseListBox._target.val();

        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_SELECTED);

            const removeIndex: number = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
            parentValues.splice(removeIndex, 1);

            domItem.data("dataItem").selected = false;
        } else {
            domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            domItem.data("dataItem").selected = true;

            if (!parentValues) {
                parentValues = [];
            }

            parentValues.push(JSON.stringify(domItem.data("dataItem")));
        }

        this.baseListBox._target.val(parentValues);
        this.baseListBox._target.dispatchEvent(new Event("change"));

        this.baseListBox.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, parentValues);
    }

    public onFilterChange(): void {
        return undefined;
    }
}

export = MultiSelectListbox;
