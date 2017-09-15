import ListboxSettings = require("./contract/ListboxSettings");
import ListboxEvent = require("./event/ListboxEvent");
import ListboxItem = require("./contract/ListboxItem");

class BaseListBox {

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

    public _settings: ListboxSettings;

    private dataItems: ListboxItem[] = [];
    public selectedDataItems: ListboxItem[] = [];


    /**
     * Create an instance of Listbox. The constructor creates div-based
     * listbox under the given root domelement. It applies the given
     * configuration.
     *
     * @constructor
     * @this {BaseListBox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    constructor(domelement: HTMLElement, options: ListboxSettings) {
        options = $.extend(
            {
                searchBar: false,
                searchBarWatermark: "Search...",
                searchBarButton: { visible: false },
                multiple: false
            },
            options);

        this._target = domelement;
        this._settings = options;
    }


    /**
     * Click handling and triggering from other delegates and events.
     *
     * @this {BaseListBox}
     * @param {object} domItem a DOM object
     */
    protected onItemClick(domItem: HTMLElement): void {
    }

    /**
     * Select first visible item if none selected.
     *
     * @this {BaseListBox}
     */
    protected onFilterChange(): void {
    }


    /**
     * Creates a `div`-based listbox, which includes such things as
     * container, listbox itself and searchbar as an optional element.
     *
     * @private
     * @this {BaseListBox}
     */
    public createListbox(): void {
        this._target.classList.add(BaseListBox.MAIN_CLASS);

        if (this._settings.searchBar) {
            this._createSearchbar();
        }

        this._createList();
    }

    /**
     * Creates a Listbox's searchbar.
     *
     * @private
     * @this {BaseListBox}
     */
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
            const searchQuery: string = (<string>$(this).val()).toLowerCase();

            if (searchQuery !== '') {
                // hide list items which are not matched search query
                const items: NodeListOf<HTMLDivElement> = this._list.querySelectorAll<any>("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i: number = 0; i < items.length; i++) {
                    const thisItem: HTMLDivElement = items.item(i);

                    if (thisItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                        return;
                    }

                    const text: string = thisItem.innerText.toLowerCase();

                    if (text.search('^' + searchQuery) !== -1) {
                        thisItem.style.display = "block";
                        thisItem.parentElement.style.display = "block";
                    } else {
                        thisItem.style.display = "none";
                    }
                }

                // hide group item only, if all childs are hidden
                const groups: NodeListOf<HTMLDivElement> =
                    this._list.querySelectorAll<any>("." + BaseListBox.LIST_ITEM_CLASS_GROUP);
                for (let i: number = 0; i < groups.length; i++) {
                    const thisItem: HTMLDivElement = items.item(i);

                    if (thisItem.querySelectorAll(':visible').length === 0) {
                        thisItem.style.display = "none";
                    } else {
                        thisItem.style.display = "block";
                    }
                }
            } else {
                // make visible all list items
                const items: NodeListOf<HTMLDivElement> = this._list.querySelectorAll<any>("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i: number = 0; i < items.length; i++) {
                    const thisItem: HTMLDivElement = items.item(i);
                    thisItem.style.display = "block";
                }
            }

            // @hack: call special handler which is used only for SingleSelectListbox
            //        to prevent situation when none of items are selected
            if (this.onFilterChange) {
                this.onFilterChange();
            }
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
            const icon: HTMLElement = document.createElement("i");
            icon.classList.add(this._settings.searchBarButton.icon);
            button.appendChild(icon);
        }

        // save for using in _resizeListToListbox()
        this._searchbarWrapper = searchbarWrapper;
        this._searchbar = searchbar;
    }


    /**
     * Creates a listbox itself.
     *
     * @private
     * @this {BaseListBox}
     */
    private _createList(): void {
        // create container
        this._list = document.createElement("div");
        this._list.classList.add(BaseListBox.LIST_CLASS);
        this._target.appendChild(this._list);

        this._resizeListToListbox();

        // create items
        if (this._settings.getItems) {
            const items: (string|ListboxItem)[] = <(string|ListboxItem)[]>this._settings.getItems();
            if (items) {
                for (let index in items) {
                    this.addItem(this._prepareDataItem(items[index]), true);
                }
            }
        }
    }

    /**
     * Generates a new ID for a item.
     *
     * @this {BaseListBox}
     */
    protected _generateItemId(): string {
        const num: number = parseInt("" + (Math.random() * 10000000), 10);
        return "listboxitem" + num;
    }

    /**
     * Prepares the dataobject for one item.
     *
     * @this {BaseListBox}
     * @param {object} dataItem object returned from getItems
     */
    protected _prepareDataItem(dataItem: ListboxItem|string): ListboxItem {
        let item: ListboxItem = {
            childItems: [],
            disabled: false,
            groupHeader: null,
            id: null,
            parentGroupId: null,
            selected: false,
            text: null,
            index: null
        };

        /* tslint:disable:no-string-literal */
        if (!dataItem["id"]) {
            item.id = this._generateItemId();
        }
        /* tslint:enable:no-string-literal */

        if (typeof dataItem === "string" || typeof dataItem === "number") {
            item.text = <string> dataItem;
            return item;
        } else {
            item = $.extend(item, dataItem);

            const childs: ListboxItem[] = [];

            for (let index in item.childItems) {
                childs.push(this._prepareDataItem(item.childItems[index]));
            }

            item.childItems = childs;
            return item;
        }
    }


    /**
     * Add item to the listbox.
     *
     * @this {BaseListBox}
     * @param {object} dataItem display data for item
     * @param {object} internal: true if this function is not called directly as api function.
     * * @param {object} $parent: the DOM parent element
     */
    protected _addItem(dataItem: ListboxItem, internal: boolean, $parent: HTMLElement): string {
        this.dataItems.push(dataItem);

        const item: HTMLDivElement = document.createElement("div");
        item.classList.add(BaseListBox.LIST_ITEM_CLASS);
        item.innerText = dataItem.text;
        item.id = dataItem.id;
        item.title = dataItem.text;
        item.tabIndex = 1;
        item.onkeydown = (e: KeyboardEvent): void => {
            if (!(<HTMLElement>e.target).classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) && e.eventPhase === 2) {
                if (e.which === 13) {
                    // Enter
                    this.fireEvent(BaseListBox.EVENT_ITEM_ENTER_PRESSED, this.getDataItem((e.target as HTMLElement).id));
                } else if (e.which === 38) {
                    // Arrow up
                    e.preventDefault();
                    this.onItemArrowUp(e.target as HTMLElement);
                } else if (e.which === 40) {
                    // Arrow down
                    e.preventDefault();
                    this.onItemArrowDown(e.target as HTMLElement);
                }
            }
        };

        item.onclick = (e: MouseEvent): void => {
            this.onItemClick(e.target as HTMLElement);
        };

        item.ondblclick = (e: MouseEvent): void => {
            if (!(<HTMLElement>e.target).classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                this.fireEvent(BaseListBox.EVENT_ITEM_DOUBLE_CLICKED, this.getDataItem((e.target as HTMLElement).id));
            }
        };

        if (dataItem.disabled) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_DISABLED);
        }

        if (dataItem.groupHeader) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_GROUP);
        }

        if (dataItem.selected) {
            this.onItemClick(item);
        }

        if (dataItem.parentGroupId) {
            const $possibleParent: HTMLElement = this.locateItem(dataItem.parentGroupId);

            if ($possibleParent) {
                $parent = $possibleParent;
            }
        }

        if ($parent) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_CHILD);
        }

        let $target: HTMLElement = $parent ? $parent : this._list;
        if (dataItem.index !== undefined && dataItem.index !== null && !internal) {
            $target = <HTMLElement>$target.children.item(dataItem.index);
            $target.parentElement.insertBefore(item, $target);
        } else {
            $target.appendChild(item);
        }

        if (dataItem.childItems && dataItem.childItems.length > 0) {
            if (!item.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                item.classList.add(BaseListBox.LIST_ITEM_CLASS_GROUP);
            }

            for (let index: number = 0; index < dataItem.childItems.length; index++) {
                let child: ListboxItem = dataItem.childItems[index];
                this._addItem(child, internal, item);
            }
        }


        return dataItem.id;
    }

    /**
     * Add item to the listbox.
     *
     * @this {BaseListBox}
     * @param {object} dataItem display data for item
     * @param {object} internal: true if this function is not called directly as api function.
     */
    public addItem(dataItem: ListboxItem|string, internal: boolean = false): string {
        /* tslint:disable:no-string-literal */
        if (!internal && !this._settings.multiple && dataItem["selected"]) {
            this.clearSelection(internal);
        }
        /* tslint:enable:no-string-literal */

        const id: string = this._addItem(this._prepareDataItem(dataItem), internal, null);

        if (!internal) {
            this.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }

        return id;
    }

    /**
     * Add multiple item to the listbox.
     *
     * @this {BaseListBox}
     * @param {object} items display data of items
     */
    public addItems(items: (string|ListboxItem)[]): string[] {
        return items.map((item: string|ListboxItem) => this.addItem(item));
    }

    /**
     * Remove first matching item from the listbox.
     *
     * @this {BaseListBox}
     * @param {string} item: display text or id from item to remove
     */
    public removeItem(item: string): void {
        const uiItem: HTMLElement = this.locateItem(item);
        if (uiItem) {
            this._clearItemSelection(uiItem);
            uiItem.remove();

            const dataItem: ListboxItem = this.getDataItem(uiItem.id);
            this.dataItems.splice(this.dataItems.indexOf(dataItem), 1);

            const selectedIndex: number = this.selectedDataItems.indexOf(dataItem);
            if (selectedIndex !== -1) {
                this.selectedDataItems.splice(selectedIndex, 1);
            }

            this.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }
    }

    /**
     * Remove all matching items of array from the listbox.
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
     * Resize list to listbox. It's a small hack since I can't
     * do it with CSS.
     */
    protected _resizeListToListbox(): void {
        let listHeight: number = this._target.clientHeight;

        if (this._settings.searchBar) {
            listHeight -= this._searchbarWrapper.offsetHeight;
        }

        this._list.style.height = listHeight + "px";
    }


    /**
     * Clears all selected items.
     */
    public clearSelection(internal?: boolean): void {
        // Remove selected class from all other items
        const allItems: NodeList = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);

        for (let index: number = 0; index < allItems.length; index++) {
            (<HTMLElement>allItems[index]).classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            this.getDataItem((allItems[index] as Element).id).selected = false;
        }

        if (!internal) {
            this._target.dispatchEvent(new Event("change"));
        }
    }


    /**
     * Clears selection of given items.
     *
     * @param {object} domItem DOM item
     */
    protected _clearItemSelection(domItem: HTMLElement): void {
        domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        this.getDataItem(domItem.id).selected = false;

        if (this._settings.multiple) {
            const currentItem: ListboxItem = this.getDataItem(domItem.id);
            const removeIndex: number = this.selectedDataItems.indexOf(currentItem);
            this.selectedDataItems.splice(removeIndex, 1);
        } else {
            this.selectedDataItems.splice(0, this.selectedDataItems.length);
        }

        this._target.dispatchEvent(new Event("change"));
    }


    /**
     * Returns the dataItem for a given id or text.
     *
     * @param {object} id unique id or text from listItem
     */
    public getItem(id: string): ListboxItem {
        let data: ListboxItem = null;

        const $item: HTMLElement = this.locateItem(id);

        if ($item) {
            data = this.getDataItem($item.id);
        }

        return data;
    }


    /**
     * Returns all dataItems.
     */
    public getItems(): ListboxItem[] {
        const items: ListboxItem[] = [];

        const childs: NodeList = this._list.children;
        for (let index: number = 0; index < childs.length; index++) {
            items.push(this.getDataItem((childs[index] as Element).id));
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

        const $item: HTMLElement = this.locateItem(id);

        if ($item && $item.previousElementSibling) {
            $item.parentElement.insertBefore($item, $item.previousElementSibling);
            newIndex = this.elementIndex($item);
            this.getDataItem($item.id).index = newIndex;
            this.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        } else if ($item) {
            newIndex = this.elementIndex($item);
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

        const $item: HTMLElement = this.locateItem(id);

        if ($item && $item.nextElementSibling) {
            $item.parentNode.insertBefore($item.nextElementSibling, $item);
            newIndex = this.elementIndex($item);
            this.getDataItem($item.id).index = newIndex;
            this.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        } else if ($item) {
            newIndex = this.elementIndex($item);
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

        const $item: HTMLElement = this.locateItem(id);

        if ($item) {
            $item.parentElement.insertBefore($item, $item.parentElement.firstElementChild);
            newIndex = this.elementIndex($item);
            this.getDataItem($item.id).index = newIndex;
            this.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
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

        const $item: HTMLElement = this.locateItem(id);

        if ($item) {
            $item.parentElement.appendChild($item);
            newIndex = this.elementIndex($item);
            this.getDataItem($item.id).index = newIndex;
        }

        this.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());

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

    protected locateItem(id: string): HTMLElement {
        let $item: HTMLElement = document.getElementById(id);
        if (!$item) {
            const titleItems: NodeListOf<Element> = document.querySelectorAll('div[title="' + id + '"]');

            if (titleItems.length > 0) {
                return titleItems[0] as HTMLElement;
            }
        }

        return $item;
    }

    /**
     * Called for a keyPressed event with the arrow up key for a item.
     *
     * @param {JQuery} domItem: the domItem.
     */
    public onItemArrowUp(domItem: HTMLElement): void {
        const prev: HTMLElement = this.findNextItem(domItem, "previous");

        if (prev) {
            this._clearItemSelection(domItem);
            this.onItemClick(prev);
        }
    }

    /**
     * Called for a keyPressed event with the arrow down key for a item.
     *
     * @param {JQuery} domItem: the domItem.
     */
    public onItemArrowDown(domItem: HTMLElement): void {
        const next: HTMLElement = this.findNextItem(domItem, "next");

        if (next) {
            this._clearItemSelection(domItem);
            this.onItemClick(next);
        }
    }

    private findNextItem(current: HTMLElement, direction: string): HTMLElement {
        let potentialNext: Element = current;

        do {
            potentialNext = potentialNext[direction + "ElementSibling"];

            if (!potentialNext) {
                const parent: HTMLElement = current.parentElement;
                if (parent) {
                    const nextChildren: NodeListOf<Element> = parent[direction + "ElementSibling"].children;
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

            if (potentialNext.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED)) {
                continue;
            }

            return potentialNext as HTMLElement;
        } while (true);
    }

    /**
     * Returns all dataItems which are selected.
     */
    public getSelection(): ListboxItem[] {
        return this.selectedDataItems;
    }

    public fireEvent(name: string, args: any): void {
        let delegate: (e: ListboxEvent) => void = this._settings["on" + name[0].toUpperCase() + name.substr(1)];

        if (delegate) {
            delegate({ eventName: name, target: this._target, args: args });
        }
    }

    private elementIndex(element: Element): number {
        const childs: Element[] = Array.prototype.slice.call(element.parentElement.children);
        return childs.indexOf(element);
    }

    public getDataItem(id: string): ListboxItem {
        for (let i: number = 0; i < this.dataItems.length; i++) {
            if (this.dataItems[i].id === id) {
                return this.dataItems[i];
            }
        }

        return null;
    }
}

export = BaseListBox;
