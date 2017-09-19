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
        super(domElement, options, false);
        this._selectedDomItem = null;
        this._createListbox();
    }

    protected _itemClicked(domItem: HTMLElement, ctrl: boolean = false): void {
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

        const dataItem: ListboxItem = this._getDataItem(domItem.id);
        dataItem.selected = true;
        this.selectedDataItems.push(dataItem);

        this._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this._getDataItem(domItem.id));
    }

    protected _filterChanged(): void {
        if (!this._selectedDomItem || this._selectedDomItem.style.display === "none") {
            const elements: NodeListOf<Element> = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
            for (let i: number = 0; i < elements.length; i++) {
                let element: HTMLElement = elements.item(i) as HTMLElement;
                if (!element.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) &&
                    !element.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) &&
                    element.style.display !== "none") {
                    this._itemClicked(element);
                    break;
                }
            }
        }

        this._fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}
