import ListboxSettings = require("./contract/ListboxSettings");
import ListboxEventHandler = require("./event/ListboxEventHandler");
import ListboxItem = require("./contract/ListboxItem");
import Listbox = require("./Listbox");

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

    public _target: JQuery;
    public _list: JQuery;
    private _searchbarWrapper: JQuery;
    public _searchbar: JQuery;

    public _settings: ListboxSettings;
    private _box: Listbox;
    public eventHandler: ListboxEventHandler;


    /**
     * Create an instance of Listbox. The constructor creates div-based
     * listbox under the given root domelement. It applies the given
     * configuration.
     *
     * @constructor
     * @this {BaseListBox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     * @param {Listbox} boxInstance of specific implementation
     */
    constructor(domelement: JQuery, options: ListboxSettings, boxInstance: Listbox) {
        this._target = domelement;
        this._box = boxInstance;
        this._settings = options;

        this.eventHandler = new ListboxEventHandler(this);
    }


    /**
     * Click handling and triggering from other delegates and events.
     *
     * @this {BaseListBox}
     * @param {object} domItem a DOM object
     */
    protected onItemClick(domItem: JQuery): void {
        this._box.onItemClick(domItem);
    }

    /**
     * Select first visible item if none selected.
     *
     * @this {BaseListBox}
     */
    protected onFilterChange(): void {
        this._box.onFilterChange();
    }


    /**
     * Creates a `div`-based listbox, which includes such things as
     * container, listbox itself and searchbar as an optional element.
     *
     * @private
     * @this {BaseListBox}
     */
    public createListbox(): void {
        this._target.addClass(BaseListBox.MAIN_CLASS);

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
     * @TODO: critical to rewrite this piece of shit
     */
    private _createSearchbar(): void {
        // searchbar wrapper is needed for properly stretch
        // the searchbar over the listbox width
        var searchbarWrapper: JQuery = $('<div>')
            .addClass(BaseListBox.SEARCHBAR_CLASS + '-wrapper')
            .appendTo(this._target);

        var searchbar: JQuery = $('<input>')
            .addClass(BaseListBox.SEARCHBAR_CLASS)
            .appendTo(searchbarWrapper)
            .attr('placeholder', this._settings.searchBarWatermark);

        // set filter handler
        var self: BaseListBox = this;
        searchbar.keyup(function (): void {
            var searchQuery: string = $(this).val().toLowerCase();

            if (searchQuery !== '') {
                // hide list items which are not matched search query
                self._list.find("." + BaseListBox.LIST_ITEM_CLASS).each(function (): void {
                    var $this: JQuery = $(this);

                    if ($this.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                        return;
                    }

                    var text: string = $this.text().toLowerCase();

                    if (text.search('^' + searchQuery) !== -1) {
                        $this.css('display', 'block');
                        $this.parent().css('display', 'block');
                    } else {
                        $this.css('display', 'none');
                    }
                });

                // hide group item only, if all childs are hidden
                self._list.find("." + BaseListBox.LIST_ITEM_CLASS_GROUP).each(function (): void {
                    var $this: JQuery = $(this);
                    if ($this.children(':visible').length === 0) {
                        $this.css('display', 'none');
                    } else {
                        $this.css('display', 'block');
                    }
                });
            } else {
                // make visible all list items
                self._list.find("." + BaseListBox.LIST_ITEM_CLASS).each(function (): void {
                    $(this).css('display', 'block');
                });
            }

            // @hack: call special handler which is used only for SingleSelectListbox
            //        to prevent situation when none of items are selected
            if (self.onFilterChange) {
                self.onFilterChange();
            }
        });

        if (this._settings.searchBarButton.visible) {
            // create button in search field
            var button: JQuery = $('<button>')
                .attr('id', 'searchBarButton')
                .attr('tabindex', '-1')
                .addClass(BaseListBox.SEARCHBAR_BUTTON_CLASS)
                .appendTo(searchbarWrapper);

            if (this._settings.searchBarButton.onClick) {
                button.click(this._settings.searchBarButton.onClick);
            }

            // icon for search button
            $('<i>')
                .addClass(this._settings.searchBarButton.icon)
                .appendTo(button);
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
        this._list = $('<div>')
            .addClass(BaseListBox.LIST_CLASS)
            .appendTo(this._target);

        this._resizeListToListbox();

        // create items
        if (this._settings.getItems) {
            var items: any[] = this._settings.getItems();
            if (items) {
                var index: any;
                for (index in items) {
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
        var num: number = parseInt("" + (Math.random() * 10000000), 10);
        return "listboxitem" + num;
    }

    /**
     * Prepares the dataobject for one item.
     *
     * @this {BaseListBox}
     * @param {object} dataItem object returned from getItems
     */
    protected _prepareDataItem(dataItem: any): ListboxItem {
        var item: ListboxItem = {
            childItems: [],
            disabled: false,
            groupHeader: null,
            id: null,
            parentGroupId: null,
            selected: false,
            text: null,
            index: null
        };

        if (!dataItem.id) {
            item.id = this._generateItemId();
        }

        if (typeof dataItem === "string" || typeof dataItem === "number") {
            item.text = <string> dataItem;
            return item;
        } else {
            item = $.extend(item, dataItem);

            var childs: ListboxItem[] = [];

            var index: any;
            for (index in item.childItems) {
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
    protected _addItem(dataItem: ListboxItem, internal: boolean, $parent: JQuery): string {
        var self: BaseListBox = this;
        var item: JQuery = $('<div>')
            .addClass(BaseListBox.LIST_ITEM_CLASS)
            .text(dataItem.text)
            .attr("id", dataItem.id)
            .attr("title", dataItem.text)
            .attr("tabindex", "1")
            .data("dataItem", dataItem)
            .keydown(function (e: JQueryKeyEventObject): void {
                var $target: JQuery = $(e.target);
                if (!$target.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP) && e.eventPhase === 2) {
                    if (e.which === 13) {
                        // Enter
                        self.onItemEnterPressed($target);
                    } else if (e.which === 38) {
                        // Arrow up
                        e.preventDefault();
                        self.onItemArrowUp($target);
                    } else if (e.which === 40) {
                        // Arrow down
                        e.preventDefault();
                        self.onItemArrowDown($target);
                    }
                }
            })
            .click(function (): void {
                self.onItemClick($(this));
            })
            .dblclick(function (): void {
                var $target: JQuery = $(this);
                if (!$target.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                    self.onItemDoubleClicked($target);
                }
            });

        if (dataItem.disabled) {
            item.addClass(BaseListBox.LIST_ITEM_CLASS_DISABLED);
        }

        if (dataItem.groupHeader) {
            item.addClass(BaseListBox.LIST_ITEM_CLASS_GROUP);
        }

        if (dataItem.selected) {
            this.onItemClick(item);
        }

        if (dataItem.parentGroupId) {
            var $possibleParent: JQuery = this.locateItem(dataItem.parentGroupId);

            if ($possibleParent) {
                $parent = $possibleParent;
            }
        }

        if ($parent) {
            item.addClass(BaseListBox.LIST_ITEM_CLASS_CHILD);
        }

        var $target: JQuery = $parent ? $parent : this._list;
        if (dataItem.index !== undefined && dataItem.index !== null && !internal) {
            $target = $target.children().eq(dataItem.index);
            item.insertBefore($target);
        } else {
            item.appendTo($target);
        }

        if (dataItem.childItems && dataItem.childItems.length > 0) {
            if (!item.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                item.addClass(BaseListBox.LIST_ITEM_CLASS_GROUP);
            }

            var index: number;
            for (index = 0; index < dataItem.childItems.length; index++) {
                var child: ListboxItem = dataItem.childItems[index];
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
    public addItem(dataItem: any, internal: boolean): string {
        if (!internal && !this._settings.multiple && dataItem.selected) {
            this.clearSelection(internal);
        }

        var id: string = this._addItem(this._prepareDataItem(dataItem), internal, null);

        if (!internal) {
            this.eventHandler.fireItemsChangedEvent(this.getItems());
        }

        return id;
    }


    /**
     * Remove first matching item from the listbox.
     *
     * @this {BaseListBox}
     * @param {string} item: display text or id from item to remove
     */
    public removeItem(item: string): void {
        var uiItem: JQuery = this.locateItem(item);
        if (uiItem) {
            this._clearItemSelection(uiItem);
            uiItem.remove();

            this.eventHandler.fireItemsChangedEvent(this.getItems());
        }
    }


    /**
     * Reverts all changes on the DOM
     *
     * @this {BaseListBox}
     */
    public destroy(): void {
        this._target.children().remove();
        this._target.removeClass(BaseListBox.MAIN_CLASS);
    }


    /**
     * Resize list to listbox. It's a small hack since I can't
     * do it with CSS.
     */
    protected _resizeListToListbox(): void {
        var listHeight: number = this._target.height();

        if (this._settings.searchBar) {
            listHeight -= this._searchbarWrapper.outerHeight(true);
        }

        this._list.height(listHeight);
    }


    /**
     * Clears all selected items.
     */
    public clearSelection(internal: boolean): void {
        // Remove selected class from all other items
        var allItems: JQuery = this._list.find("." + BaseListBox.LIST_ITEM_CLASS);

        allItems.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        var index: number;
        for (index = 0; index < allItems.length; index++) {
            $(allItems[index]).data("dataItem").selected = false;
        }

        if (this._settings.multiple) {
            this._target.val([]);
        } else {
            this._target.val(null);
        }

        if (!internal) {
            this._target.trigger('change');
        }
    }


    /**
     * Clears selection of given items.
     *
     * @param {object} domItem DOM item
     */
    protected _clearItemSelection(domItem: JQuery): void {
        domItem.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        domItem.data("dataItem").selected = false;

        if (this._settings.multiple) {
            var parentValues: any[] = this._target.val();
            if (parentValues) {
                var removeIndex: number = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
                parentValues.splice(removeIndex, 1);
                this._target.val(parentValues);
            }
        } else {
            this._target.val(null);
        }

        this._target.trigger('change');
    }


    /**
     * Returns the dataItem for a given id or text.
     *
     * @param {object} id unique id or text from listItem
     */
    public getItem(id: string): ListboxItem {
        var data: ListboxItem = null;

        var $item: JQuery = this.locateItem(id);

        if ($item) {
            data = $item.data("dataItem");
        }

        return data;
    }


    /**
     * Returns all dataItems.
     */
    public getItems(): ListboxItem[] {
        var dataItems: ListboxItem[] = [];

        var childs: JQuery = this._list.children();
        var index: number;
        for (index = 0; index < childs.length; index++) {
            dataItems.push($(childs[index]).data("dataItem"));
        }

        return dataItems;
    }


    /**
     * Decreases the index of the item by one.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemUp(id: string): number {
        var newIndex: number = null;

        var $item: JQuery = this.locateItem(id);

        if ($item) {
            $item.insertBefore($item.prev());
            newIndex = $item.index();
            $item.data("dataItem").index = newIndex;
        }

        this.eventHandler.fireItemsChangedEvent(this.getItems());

        return newIndex;
    }

    /**
     * Increases the index of the item by one.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemDown(id: string): number {
        var newIndex: number = null;

        var $item: JQuery = this.locateItem(id);

        if ($item) {
            $item.insertAfter($item.next());
            newIndex = $item.index();
            $item.data("dataItem").index = newIndex;
        }

        this.eventHandler.fireItemsChangedEvent(this.getItems());

        return newIndex;
    }

    /**
     * Sets the index of the item to zero.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemToTop(id: string): number {
        var newIndex: number = null;

        var $item: JQuery = this.locateItem(id);

        if ($item) {
            $item.parent().prepend($item);
            newIndex = $item.index();
            $item.data("dataItem").index = newIndex;
        }

        this.eventHandler.fireItemsChangedEvent(this.getItems());

        return newIndex;
    }

    /**
     * Sets the index of the matching item to the highest.
     *
     * @param {object} id unique id or text from listItem
     */
    public moveItemToBottom(id: string): number {
        var newIndex: number = null;

        var $item: JQuery = this.locateItem(id);

        if ($item) {
            $item.parent().append($item);
            newIndex = $item.index();
            $item.data("dataItem").index = newIndex;
        }

        this.eventHandler.fireItemsChangedEvent(this.getItems());

        return newIndex;
    }


    /**
     * Enables or disables the whole component.
     *
     * @param {boolean} enable: new enable value.
     */
    public enable(enable: boolean): void {
        if (enable) {
            this._target.removeClass(BaseListBox.MAIN_DISABLED_CLASS);
        } else if (!this._target.hasClass(BaseListBox.MAIN_DISABLED_CLASS)) {
            this._target.addClass(BaseListBox.MAIN_DISABLED_CLASS);
        }
    }

    protected locateItem(id: string): JQuery {
        var $item: JQuery = $("#" + id, this._list);
        if ($item.length === 0) {
            $item = $('div[title="' + id + '"]');
        }

        if ($item.length === 0) {
            $item = null;
        }

        return $item;
    }

    /**
     * Called for a keyPressed event with the enter key for a item.
     *
     * @param {JQuery} domItem: the domItem.
     */
    protected onItemEnterPressed(domItem: JQuery): void {
        this.eventHandler.fireItemEnterPressedEvent(domItem.data("dataItem"));
    }

    /**
     * Called for a doubleClick on a item.
     *
     * @param {JQuery} domItem: the domItem.
     */
    protected onItemDoubleClicked(domItem: JQuery): void {
        this.eventHandler.fireItemDoubleClickedEvent(domItem.data("dataItem"));
    }

    /**
     * Called for a keyPressed event with the arrow up key for a item.
     *
     * @param {JQuery} domItem: the domItem.
     */
    protected onItemArrowUp(domItem: JQuery): void {
        var prev: JQuery = this.findNextItem(domItem, "prev");

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
    protected onItemArrowDown(domItem: JQuery): void {
        var next: JQuery = this.findNextItem(domItem, "next");

        if (next) {
            this._clearItemSelection(domItem);
            this.onItemClick(next);
        }
    }

    private findNextItem(current: JQuery, direction: string): JQuery {
        var potentialNext: JQuery = current;

        do {
            potentialNext = potentialNext[direction]();

            if (potentialNext.length === 0) {
                var parent: JQuery = current.parent();
                if (parent.length === 1) {
                    var nextChildren: JQuery = parent[direction]().children();
                    if (nextChildren.length > 0) {
                        potentialNext = direction === "next" ? nextChildren.first() : nextChildren.last();
                    } else {
                        potentialNext = parent;
                    }
                } else {
                    return null;
                }
            }

            if (potentialNext.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED)) {
                continue;
            }

            return potentialNext;
        } while (true);
    }

    /**
     * Returns all dataItems which are selected.
     */
    public getSelection(): ListboxItem[] {
        var topLevelItems: ListboxItem[] = this.getItems();
        var allItems: ListboxItem[] = [].concat(topLevelItems);

        topLevelItems.forEach((item: ListboxItem) => {
            allItems = allItems.concat(item.childItems);
        });

        return allItems.filter((item: ListboxItem) => item.selected);
    }
}

export = BaseListBox;
