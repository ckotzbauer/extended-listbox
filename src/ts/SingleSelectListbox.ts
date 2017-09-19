import {BaseListBox} from "./BaseListBox";
import {ListboxSettings} from "./contract/ListboxSettings";
import {ListboxItem} from "./contract/ListboxItem";

export class SingleSelectListbox extends BaseListBox {

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
     * @param {boolean} ctrl if control key is pressed
     */
    public onItemClick(domItem: HTMLElement, ctrl: boolean = false): void {
        if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        if (this._selectedDomItem) {
            this.clearSelection();
            this._selectedDomItem = null;
        }

        domItem.classList.toggle(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        domItem.focus();
        this._selectedDomItem = domItem;

        const dataItem: ListboxItem = this.getDataItem(domItem.id);
        dataItem.selected = true;
        this.selectedDataItems.push(dataItem);

        this.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this.getDataItem(domItem.id));
    }


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    public onFilterChange(): void {
        if (!this._selectedDomItem || this._selectedDomItem.style.display === "none") {
            const elements: NodeListOf<Element> = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
            for (let i: number = 0; i < elements.length; i++) {
                let element: HTMLElement = elements.item(i) as HTMLElement;
                if (!element.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) &&
                    !element.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) &&
                    element.style.display !== "none") {
                    this.onItemClick(element);
                    break;
                }
            }
        }

        this.fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}
