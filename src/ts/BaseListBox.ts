import {ListBoxSettings} from "./contract/ListBoxSettings";
import {ListBoxEvent} from "./event/ListBoxEvent";
import {ListBoxItem} from "./contract/ListBoxItem";

export abstract class BaseListBox {

    public static MAIN_CLASS: string = 'listbox-root';
    public static MAIN_DISABLED_CLASS: string = 'listbox-disabled';
    public static LIST_CLASS: string = 'listbox';
    public static LIST_ITEM_CLASS: string = 'listbox-item';
    public static LIST_ITEM_CLASS_DISABLED: string = 'listbox-item-disabled';
    public static LIST_ITEM_CLASS_SELECTED: string = 'listbox-item-selected';
    public static LIST_ITEM_CLASS_GROUP: string = 'listbox-item-group';
    public static LIST_ITEM_CLASS_CHILD: string = 'listbox-item-child';
    public static SEARCHBAR_CLASS: string = 'listbox-searchbar';
    public static SEARCHBAR_BUTTON_CLASS: string = 'listbox-searchbar-button';

    public static EVENT_VALUE_CHANGED: string = "valueChanged";
    public static EVENT_FILTER_CHANGED: string = "filterChanged";
    public static EVENT_ITEMS_CHANGED: string = "itemsChanged";
    public static EVENT_ITEM_ENTER_PRESSED: string = "itemEnterPressed";
    public static EVENT_ITEM_DOUBLE_CLICKED: string = "itemDoubleClicked";

    public _target: HTMLElement;
    public _list: HTMLDivElement;
    private _searchbarWrapper: HTMLDivElement;
    public _searchbar: HTMLInputElement;

    public _settings: ListBoxSettings;
    private multiple: boolean;

    private dataItems: ListBoxItem[] = [];
    public selectedDataItems: ListBoxItem[] = [];

    protected constructor(domelement: HTMLElement, options: ListBoxSettings, multiple: boolean) {
        options = options || {};
        options.searchBar = options.searchBar || false;
        options.searchBarWatermark = options.searchBarWatermark || "Search...";
        options.searchBarButton = options.searchBarButton || { visible: false };

        this._target = domelement;
        this._settings = options;
        this.multiple = multiple;
    }

    protected abstract _itemClicked(domItem: HTMLElement, ctrl?: boolean): void;
    protected abstract _filterChanged(): void;

    protected _createListbox(): void {
        this._target.classList.add(BaseListBox.MAIN_CLASS);

        if (this._settings.searchBar) {
            this._createSearchbar();
        }

        this._createList();
    }

    private _createSearchbar(): void {
        // searchbar wrapper is needed for properly stretch
        // the searchbar over the listbox width
        const searchbarWrapper: HTMLDivElement = document.createElement("div");
        searchbarWrapper.classList.add(BaseListBox.SEARCHBAR_CLASS + '-wrapper');
        this._target.appendChild(searchbarWrapper);

        const searchbar: HTMLInputElement = document.createElement("input");
        searchbar.classList.add(BaseListBox.SEARCHBAR_CLASS);
        searchbar.setAttribute("placeholder", this._settings.searchBarWatermark);
        searchbarWrapper.appendChild(searchbar);

        // set filter handler
        searchbar.onkeyup = (): void => {
            const searchQuery: string = searchbar.value.toLowerCase();

            if (searchQuery !== '') {
                // hide list items which are not matched search query
                const items: NodeListOf<HTMLDivElement> = this._list.querySelectorAll<any>("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i: number = 0; i < items.length; i++) {
                    const thisItem: HTMLDivElement = items.item(i);

                    if (thisItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                        continue;
                    }

                    const text: string = thisItem.innerText.toLowerCase();

                    if (text.indexOf(searchQuery) !== -1) {
                        thisItem.style.display = "block";
                        thisItem.parentElement.style.display = "block";
                    } else {
                        thisItem.style.display = "none";
                    }
                }

                // hide group item only, if all childs are hidden
                const groups: NodeListOf<Element> =
                    this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS_GROUP);
                for (let i: number = 0; i < groups.length; i++) {
                    const thisItem: HTMLElement = groups.item(i) as HTMLElement;
                    const childs: NodeListOf<Element> = thisItem.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                    let index: number = -1;

                    for (let j: number = 0; j < childs.length; j++) {
                        if ((childs.item(j) as HTMLElement).style.display !== "none") {
                            index = j;
                            break;
                        }
                    }

                    if (index === -1) {
                        thisItem.style.display = "none";
                    } else {
                        thisItem.style.display = "block";
                    }
                }
            } else {
                // make visible all list items
                const items: NodeListOf<Element> = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i: number = 0; i < items.length; i++) {
                    const thisItem: HTMLElement = items.item(i) as HTMLElement;
                    thisItem.style.display = "block";
                }
            }

            this._filterChanged();
        };

        if (this._settings.searchBarButton.visible) {
            // create button in search field
            const button: HTMLButtonElement = document.createElement("button");
            button.id = "searchBarButton";
            button.setAttribute("tabindex", "-1");
            button.classList.add(BaseListBox.SEARCHBAR_BUTTON_CLASS);
            searchbarWrapper.appendChild(button);

            if (this._settings.searchBarButton.onClick) {
                button.onclick = this._settings.searchBarButton.onClick;
            }

            // icon for search button
            if (this._settings.searchBarButton.icon) {
                const icon: HTMLElement = document.createElement("i");
                const parts: string[] = this._settings.searchBarButton.icon.split(" ");
                parts.forEach((p: string) => icon.classList.add(p));
                button.appendChild(icon);
            }
        }

        // save for using in _resizeListToListBox()
        this._searchbarWrapper = searchbarWrapper;
        this._searchbar = searchbar;
    }

    private _createList(): void {
        // create container
        this._list = document.createElement("div");
        this._list.classList.add(BaseListBox.LIST_CLASS);
        this._target.appendChild(this._list);

        this._resizeListToListBox();

        // create items
        if (this._settings.getItems) {
            const items: (string|ListBoxItem)[] = <(string|ListBoxItem)[]>this._settings.getItems();
            if (items) {
                for (let index in items) {
                    this.addItem(this._prepareDataItem(items[index]), true);
                }
            }
        }
    }

    private _generateItemId(): string {
        const num: number = parseInt("" + (Math.random() * 10000000), 10);
        return "listBoxItem" + num;
    }

    private _prepareDataItem(dataItem: ListBoxItem|string): ListBoxItem {
        /* tslint:disable:no-string-literal */
        let item: ListBoxItem = {
            childItems: [],
            disabled: false,
            groupHeader: null,
            id: this._generateItemId(),
            parentGroupId: null,
            selected: false,
            text: null,
            index: null
        };
        /* tslint:enable:no-string-literal */

        if (typeof dataItem === "string" || typeof dataItem === "number") {
            item.text = <string> dataItem;
            return item;
        } else {
            for (let i in dataItem) {
                if (dataItem.hasOwnProperty(i)) {
                    item[i] = dataItem[i];
                }
            }

            const childs: ListBoxItem[] = [];

            for (let index in item.childItems) {
                childs.push(this._prepareDataItem(item.childItems[index]));
            }

            item.childItems = childs;
            return item;
        }
    }

    private _addItem(dataItem: ListBoxItem, internal: boolean, parent: HTMLElement): string {
        this.dataItems.push(dataItem);

        const item: HTMLDivElement = document.createElement("div");
        item.classList.add(BaseListBox.LIST_ITEM_CLASS);
        item.innerText = dataItem.text;
        item.id = dataItem.id;
        item.tabIndex = 1;
        item.title = dataItem.text;
        item.onkeydown = (e: KeyboardEvent): void => {
            if (!(<HTMLElement>e.target).classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) && e.eventPhase === 2) {
                if (e.which === 13) {
                    // Enter
                    this._fireEvent(BaseListBox.EVENT_ITEM_ENTER_PRESSED, this._getDataItem((e.target as HTMLElement).id));
                } else if (e.which === 38) {
                    // Arrow up
                    e.preventDefault();
                    this._itemArrowUp(e.target as HTMLElement);
                } else if (e.which === 40) {
                    // Arrow down
                    e.preventDefault();
                    this._itemArrowDown(e.target as HTMLElement);
                }
            }
        };

        item.onclick = (e: MouseEvent): void => {
            if (e.eventPhase === 2) {
                this._itemClicked(e.target as HTMLElement, e.ctrlKey);
            }
        };

        item.ondblclick = (e: MouseEvent): void => {
            if (!(<HTMLElement>e.target).classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                this._fireEvent(BaseListBox.EVENT_ITEM_DOUBLE_CLICKED, this._getDataItem((e.target as HTMLElement).id));
            }
        };

        if (dataItem.disabled) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_DISABLED);
        }

        if (dataItem.groupHeader) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_GROUP);
        }

        if (dataItem.selected) {
            this._itemClicked(item, true);
        }

        if (dataItem.parentGroupId) {
            const possibleParent: HTMLElement = this._locateItem(dataItem.parentGroupId);

            if (possibleParent) {
                parent = possibleParent;
            }
        }

        if (parent) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_CHILD);
        }

        let target: HTMLElement = parent ? parent : this._list;
        if (dataItem.index !== undefined && dataItem.index !== null && !internal) {
            target = <HTMLElement>target.children.item(dataItem.index);
            target.parentElement.insertBefore(item, target);
        } else {
            target.appendChild(item);
        }

        if (dataItem.childItems && dataItem.childItems.length > 0) {
            if (!item.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                item.classList.add(BaseListBox.LIST_ITEM_CLASS_GROUP);
            }

            for (let index: number = 0; index < dataItem.childItems.length; index++) {
                this._addItem(this._prepareDataItem(dataItem.childItems[index]), internal, item);
            }
        }


        return dataItem.id;
    }

    protected _resizeListToListBox(): void {
        const computed: CSSStyleDeclaration = window.getComputedStyle(this._target, null);
        const containerPadding: number = parseInt(computed.getPropertyValue("padding-top"), 10) +
            parseInt(computed.getPropertyValue("padding-bottom"), 10);
        let listHeight: number = parseInt(computed.getPropertyValue("height"), 10) - containerPadding;

        if (this._settings.searchBar) {
            listHeight -= this._searchbarWrapper.offsetHeight;
        }

        this._list.style.height = listHeight + "px";
    }

    protected _clearItemSelection(domItem: HTMLElement): void {
        domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        this._getDataItem(domItem.id).selected = false;

        if (this.multiple) {
            const currentItem: ListBoxItem = this._getDataItem(domItem.id);
            const removeIndex: number = this.selectedDataItems.indexOf(currentItem);
            this.selectedDataItems.splice(removeIndex, 1);
        } else {
            this.selectedDataItems.splice(0, this.selectedDataItems.length);
        }
    }

    protected _locateItem(name: string): HTMLElement {
        let id: string = null;
        for (let i: number = 0; i < this.dataItems.length; i++) {
            if (this.dataItems[i].id === name || this.dataItems[i].text === name) {
                id = this.dataItems[i].id;
                break;
            }
        }

        let item: HTMLElement = this._target.querySelector("#" + id) as HTMLElement;
        if (!item) {
            const titleItems: NodeListOf<Element> = this._target.querySelectorAll('div[title="' + id + '"]');

            if (titleItems.length > 0) {
                return titleItems[0] as HTMLElement;
            }
        }

        return item;
    }

    private _findNextItem(current: HTMLElement, direction: string): HTMLElement {
        let potentialNext: Element = current;

        do {
            potentialNext = potentialNext[direction + "ElementSibling"];

            if (!potentialNext) {
                const parent: HTMLElement = current.parentElement;
                if (parent) {
                    const sibling: Element = parent[direction + "ElementSibling"];
                    if (!sibling) {
                        return null;
                    }

                    const nextChildren: NodeListOf<Element> = sibling.children;
                    if (nextChildren.length > 0) {
                        potentialNext = direction === "next"
                            ? nextChildren[0].firstElementChild
                            : nextChildren[0].lastElementChild;
                    } else {
                        potentialNext = parent;
                    }
                } else {
                    return null;
                }
            }

            if (potentialNext && potentialNext.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED)) {
                continue;
            }

            return potentialNext as HTMLElement;
        } while (true);
    }

    public _fireEvent(name: string, args: any): void {
        let delegate: (e: ListBoxEvent) => void = this._settings["on" + name[0].toUpperCase() + name.substr(1)];

        if (delegate) {
            delegate({ eventName: name, target: this._target, args: args });
        }
    }

    private _elementIndex(element: Element): number {
        const childs: Element[] = Array.prototype.slice.call(element.parentElement.children);
        return childs.indexOf(element);
    }

    protected _getDataItem(id: string): ListBoxItem {
        for (let i: number = 0; i < this.dataItems.length; i++) {
            if (this.dataItems[i].id === id) {
                return this.dataItems[i];
            }
        }

        return null;
    }

    private _itemArrowUp(domItem: HTMLElement): void {
        const prev: HTMLElement = this._findNextItem(domItem, "previous");

        if (prev) {
            this._clearItemSelection(domItem);
            this._itemClicked(prev);
        }
    }

    private _itemArrowDown(domItem: HTMLElement): void {
        const next: HTMLElement = this._findNextItem(domItem, "next");

        if (next) {
            this._clearItemSelection(domItem);
            this._itemClicked(next);
        }
    }



    /*******************************  PUBLIC API  ******************************* */

    /**
     * Add item to the listBox.
     *
     * @this {BaseListBox}
     * @param {object} dataItem display data for item
     * @param {object} internal: true if this function is not called directly as api function.
     */
    public addItem(dataItem: ListBoxItem|string, internal: boolean = false): string {
        /* tslint:disable:no-string-literal */
        if (!internal && !this.multiple && dataItem["selected"]) {
            this.clearSelection();
        }
        /* tslint:enable:no-string-literal */

        const id: string = this._addItem(this._prepareDataItem(dataItem), internal, null);

        if (!internal) {
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }

        return id;
    }

    /**
     * Add multiple item to the listBox.
     *
     * @this {BaseListBox}
     * @param {object} items display data of items
     */
    public addItems(items: (string|ListBoxItem)[]): string[] {
        return items.map((item: string|ListBoxItem) => this.addItem(item));
    }

    /**
     * Remove first matching item from the listBox.
     *
     * @this {BaseListBox}
     * @param {string} item: display text or id from item to remove
     */
    public removeItem(item: string): void {
        const uiItem: HTMLElement = this._locateItem(item);
        if (uiItem) {
            this._clearItemSelection(uiItem);
            uiItem.parentElement.removeChild(uiItem);

            const dataItem: ListBoxItem = this._getDataItem(uiItem.id);
            this.dataItems.splice(this.dataItems.indexOf(dataItem), 1);

            const selectedIndex: number = this.selectedDataItems.indexOf(dataItem);
            if (selectedIndex !== -1) {
                this.selectedDataItems.splice(selectedIndex, 1);
            }

            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }
    }

    /**
     * Remove all matching items of array from the listBox.
     *
     * @this {BaseListBox}
     * @param {string[]} items: display text or id from items to remove
     */
    public removeItems(items: string[]): void {
        items.forEach((item: string) => this.removeItem(item));
    }


    /**
     * Reverts all changes on the DOM
     *
     * @this {BaseListBox}
     */
    public destroy(): void {
        while (this._target.firstChild) {
            this._target.removeChild(this._target.firstChild);
        }

        this._target.classList.remove(BaseListBox.MAIN_CLASS);
    }

    /**
     * Clears all selected items.
     */
    public clearSelection(): void {
        // Remove selected class from all other items
        const allItems: NodeList = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);

        for (let index: number = 0; index < allItems.length; index++) {
            (<HTMLElement>allItems[index]).classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            this._getDataItem((allItems[index] as Element).id).selected = false;
        }

        this.selectedDataItems = [];
    }


    /**
     * Returns the dataItem for a given id or text.
     *
     * @param {object} id unique id or text from listItem
     */
    public getItem(id: string): ListBoxItem {
        let data: ListBoxItem = null;

        const item: HTMLElement = this._locateItem(id);

        if (item) {
            data = this._getDataItem(item.id);
        }

        return data;
    }


    /**
     * Returns all dataItems.
     */
    public getItems(): ListBoxItem[] {
        const items: ListBoxItem[] = [];

        const childs: NodeList = this._list.children;
        for (let index: number = 0; index < childs.length; index++) {
            items.push(this._getDataItem((childs[index] as Element).id));
        }

        return items;
    }


    /**
     * Decreases the index of the item by one.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemUp(id: string): number {
        let newIndex: number = null;

        const item: HTMLElement = this._locateItem(id);

        if (item && item.previousElementSibling) {
            item.parentElement.insertBefore(item, item.previousElementSibling);
            newIndex = this._elementIndex(item);
            this._getDataItem(item.id).index = newIndex;
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        } else if (item) {
            newIndex = this._elementIndex(item);
        }

        return newIndex;
    }

    /**
     * Increases the index of the item by one.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemDown(id: string): number {
        let newIndex: number = null;

        const item: HTMLElement = this._locateItem(id);

        if (item && item.nextElementSibling) {
            item.parentNode.insertBefore(item.nextElementSibling, item);
            newIndex = this._elementIndex(item);
            this._getDataItem(item.id).index = newIndex;
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        } else if (item) {
            newIndex = this._elementIndex(item);
        }

        return newIndex;
    }

    /**
     * Sets the index of the item to zero.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemToTop(id: string): number {
        let newIndex: number = null;

        const item: HTMLElement = this._locateItem(id);

        if (item) {
            item.parentElement.insertBefore(item, item.parentElement.firstElementChild);
            newIndex = this._elementIndex(item);
            this._getDataItem(item.id).index = newIndex;
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }

        return newIndex;
    }

    /**
     * Sets the index of the matching item to the highest.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemToBottom(id: string): number {
        let newIndex: number = null;

        const item: HTMLElement = this._locateItem(id);

        if (item) {
            item.parentElement.appendChild(item);
            newIndex = this._elementIndex(item);
            this._getDataItem(item.id).index = newIndex;
        }

        this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());

        return newIndex;
    }


    /**
     * Enables or disables the whole component.
     *
     * @param {boolean} enable: new enable value.
     */
    public enable(enable: boolean): void {
        if (enable) {
            this._target.classList.remove(BaseListBox.MAIN_DISABLED_CLASS);
        } else if (!this._target.classList.contains(BaseListBox.MAIN_DISABLED_CLASS)) {
            this._target.classList.add(BaseListBox.MAIN_DISABLED_CLASS);
        }
    }

    /**
     * Returns all dataItems which are selected.
     */
    public getSelection(): ListBoxItem[] {
        return this.selectedDataItems;
    }
}
