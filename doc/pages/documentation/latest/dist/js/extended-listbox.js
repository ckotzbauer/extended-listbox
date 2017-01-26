/* Extended Listbox 1.1.3; (c) 2016 Christian Kotzbauer; BSD-3-Clause License */ 
/**
 * Extended Listbox is a simple to use jQuery plugin as powerful
 * alternative to the HTML `<select>` tag.
 *
 * The main problem of <select> tag is that last one isn't flexible
 * for customization with *CSS*. Extended-Listbox solves this problem.
 * This component creates a list structure based on <div> tags.
 * The configuration is completely in JavaScript. It opens up great
 * possibilities for customization.
 *
 * @copyright   (c) 2016, Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * @version     1.1.3
 * @license     BSD-3-Clause
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EL;
(function (EL) {
    "use strict";
    var ListboxItem = (function () {
        function ListboxItem() {
            this.text = null;
            this.id = null;
            this.index = null;
            this.disabled = false;
            this.selected = false;
            this.groupHeader = false;
            this.parentGroupId = null;
            this.childItems = [];
        }
        return ListboxItem;
    }());
    EL.ListboxItem = ListboxItem;
})(EL || (EL = {}));
var EL;
(function (EL) {
    "use strict";
    var ListboxSearchBarButtonOptions = (function () {
        function ListboxSearchBarButtonOptions() {
            this.visible = false;
            this.icon = null;
            this.onClick = null;
        }
        return ListboxSearchBarButtonOptions;
    }());
    EL.ListboxSearchBarButtonOptions = ListboxSearchBarButtonOptions;
})(EL || (EL = {}));
var EL;
(function (EL) {
    "use strict";
    var ListboxEvent = (function () {
        function ListboxEvent(eventName, target, args) {
            this.eventName = eventName;
            this.target = target;
            this.args = args;
        }
        ListboxEvent.VALUE_CHANGED = "valueChanged";
        ListboxEvent.FILTER_CHANGED = "filterChanged";
        ListboxEvent.ITEMS_CHANGED = "itemsChanged";
        ListboxEvent.ITEM_ENTER_PRESSED = "itemEnterPressed";
        ListboxEvent.ITEM_DOUBLE_CLICKED = "itemDoubleClicked";
        return ListboxEvent;
    }());
    EL.ListboxEvent = ListboxEvent;
})(EL || (EL = {}));
/// <reference path="./ListboxSearchBarButtonOptions.ts" />
/// <reference path="../event/ListboxEvent.ts" />
var EL;
(function (EL) {
    "use strict";
    var ListboxSettings = (function () {
        function ListboxSettings() {
            this.searchBar = false;
            this.searchBarWatermark = 'Search...';
            this.searchBarButton = new EL.ListboxSearchBarButtonOptions();
            this.multiple = false;
            this.getItems = null;
            this.onValueChanged = null;
            this.onFilterChanged = null;
            this.onItemsChanged = null;
            this.onItemEnterPressed = null;
            this.onItemDoubleClicked = null;
        }
        return ListboxSettings;
    }());
    EL.ListboxSettings = ListboxSettings;
})(EL || (EL = {}));
/// <reference path="../BaseListBox.ts" />
/// <reference path="./ListboxEvent.ts" />
var EL;
(function (EL) {
    "use strict";
    var ListboxEventHandler = (function () {
        function ListboxEventHandler(listBox) {
            this.listBox = listBox;
        }
        ListboxEventHandler.prototype.fire = function (name, delegate, args) {
            if (delegate) {
                var event = new EL.ListboxEvent(name, this.listBox._target, args);
                delegate(event);
            }
        };
        ListboxEventHandler.prototype.fireValueChangedEvent = function (args) {
            this.fire(EL.ListboxEvent.VALUE_CHANGED, this.listBox._settings.onValueChanged, args);
        };
        ListboxEventHandler.prototype.fireItemsChangedEvent = function (args) {
            this.fire(EL.ListboxEvent.ITEMS_CHANGED, this.listBox._settings.onItemsChanged, args);
        };
        ListboxEventHandler.prototype.fireFilterChangedEvent = function (args) {
            this.fire(EL.ListboxEvent.FILTER_CHANGED, this.listBox._settings.onFilterChanged, args);
        };
        ListboxEventHandler.prototype.fireItemEnterPressedEvent = function (args) {
            this.fire(EL.ListboxEvent.ITEM_ENTER_PRESSED, this.listBox._settings.onItemEnterPressed, args);
        };
        ListboxEventHandler.prototype.fireItemDoubleClickedEvent = function (args) {
            this.fire(EL.ListboxEvent.ITEM_DOUBLE_CLICKED, this.listBox._settings.onItemDoubleClicked, args);
        };
        return ListboxEventHandler;
    }());
    EL.ListboxEventHandler = ListboxEventHandler;
})(EL || (EL = {}));
/// <reference path="./contract/ListboxItem.ts" />
/// <reference path="./contract/ListboxSettings.ts" />
/// <reference path="./event/ListboxEventHandler.ts" />
var EL;
(function (EL) {
    "use strict";
    var BaseListBox = (function () {
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
        function BaseListBox(domelement, options) {
            this._target = domelement;
            this._settings = options;
            this.eventHandler = new EL.ListboxEventHandler(this);
            this._createListbox();
        }
        /**
         * Creates a `div`-based listbox, which includes such things as
         * container, listbox itself and searchbar as an optional element.
         *
         * @private
         * @this {BaseListBox}
         */
        BaseListBox.prototype._createListbox = function () {
            this._target.addClass(BaseListBox.MAIN_CLASS);
            if (this._settings.searchBar) {
                this._createSearchbar();
            }
            this._createList();
        };
        /**
         * Creates a Listbox's searchbar.
         *
         * @private
         * @this {BaseListBox}
         * @TODO: critical to rewrite this piece of shit
         */
        BaseListBox.prototype._createSearchbar = function () {
            // searchbar wrapper is needed for properly stretch
            // the searchbar over the listbox width
            var searchbarWrapper = $('<div>')
                .addClass(BaseListBox.SEARCHBAR_CLASS + '-wrapper')
                .appendTo(this._target);
            var searchbar = $('<input>')
                .addClass(BaseListBox.SEARCHBAR_CLASS)
                .appendTo(searchbarWrapper)
                .attr('placeholder', this._settings.searchBarWatermark);
            // set filter handler
            var self = this;
            searchbar.keyup(function () {
                var searchQuery = $(this).val().toLowerCase();
                if (searchQuery !== '') {
                    // hide list items which are not matched search query
                    self._list.find("." + BaseListBox.LIST_ITEM_CLASS).each(function () {
                        var $this = $(this);
                        if ($this.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                            return;
                        }
                        var text = $this.text().toLowerCase();
                        if (text.search('^' + searchQuery) !== -1) {
                            $this.css('display', 'block');
                            $this.parent().css('display', 'block');
                        }
                        else {
                            $this.css('display', 'none');
                        }
                    });
                    // hide group item only, if all childs are hidden
                    self._list.find("." + BaseListBox.LIST_ITEM_CLASS_GROUP).each(function () {
                        var $this = $(this);
                        if ($this.children(':visible').length === 0) {
                            $this.css('display', 'none');
                        }
                        else {
                            $this.css('display', 'block');
                        }
                    });
                }
                else {
                    // make visible all list items
                    self._list.find("." + BaseListBox.LIST_ITEM_CLASS).each(function () {
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
                var button = $('<button>')
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
        };
        /**
         * Creates a listbox itself.
         *
         * @private
         * @this {BaseListBox}
         */
        BaseListBox.prototype._createList = function () {
            // create container
            this._list = $('<div>')
                .addClass(BaseListBox.LIST_CLASS)
                .appendTo(this._target);
            this._resizeListToListbox();
            // create items
            if (this._settings.getItems) {
                var items = this._settings.getItems();
                if (items) {
                    var index;
                    for (index in items) {
                        this.addItem(this._prepareDataItem(items[index]), true);
                    }
                }
            }
        };
        /**
         * Generates a new ID for a item.
         *
         * @this {BaseListBox}
         */
        BaseListBox.prototype._generateItemId = function () {
            var num = parseInt("" + (Math.random() * 10000000), 10);
            return "listboxitem" + num;
        };
        /**
         * Prepares the dataobject for one item.
         *
         * @this {BaseListBox}
         * @param {object} dataItem object returned from getItems
         */
        BaseListBox.prototype._prepareDataItem = function (dataItem) {
            var item = new EL.ListboxItem();
            if (!dataItem.id) {
                item.id = this._generateItemId();
            }
            if (typeof dataItem === "string" || typeof dataItem === "number") {
                item.text = dataItem;
                return item;
            }
            else {
                item = $.extend(item, dataItem);
                var childs = [];
                var index;
                for (index in item.childItems) {
                    childs.push(this._prepareDataItem(item.childItems[index]));
                }
                item.childItems = childs;
                return item;
            }
        };
        /**
         * Add item to the listbox.
         *
         * @this {BaseListBox}
         * @param {object} dataItem display data for item
         * @param {object} internal: true if this function is not called directly as api function.
         * * @param {object} $parent: the DOM parent element
         */
        BaseListBox.prototype._addItem = function (dataItem, internal, $parent) {
            var self = this;
            var item = $('<div>')
                .addClass(BaseListBox.LIST_ITEM_CLASS)
                .text(dataItem.text)
                .attr("id", dataItem.id)
                .attr("title", dataItem.text)
                .attr("tabindex", "1")
                .data("dataItem", dataItem)
                .keydown(function (e) {
                var $target = $(e.target);
                if (!$target.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP) && e.eventPhase === 2) {
                    if (e.which === 13) {
                        // Enter
                        self.onItemEnterPressed($target);
                    }
                    else if (e.which === 38) {
                        // Arrow up
                        e.preventDefault();
                        self.onItemArrowUp($target);
                    }
                    else if (e.which === 40) {
                        // Arrow down
                        e.preventDefault();
                        self.onItemArrowDown($target);
                    }
                }
            })
                .click(function () {
                self.onItemClick($(this));
            })
                .dblclick(function () {
                var $target = $(this);
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
                var $possibleParent = this.locateItem(dataItem.parentGroupId);
                if ($possibleParent) {
                    $parent = $possibleParent;
                }
            }
            if ($parent) {
                item.addClass(BaseListBox.LIST_ITEM_CLASS_CHILD);
            }
            var $target = $parent ? $parent : this._list;
            if (dataItem.index !== undefined && dataItem.index !== null && !internal) {
                $target = $target.children().eq(dataItem.index);
                item.insertBefore($target);
            }
            else {
                item.appendTo($target);
            }
            if (dataItem.childItems && dataItem.childItems.length > 0) {
                if (!item.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                    item.addClass(BaseListBox.LIST_ITEM_CLASS_GROUP);
                }
                var index;
                for (index = 0; index < dataItem.childItems.length; index++) {
                    var child = dataItem.childItems[index];
                    this._addItem(child, internal, item);
                }
            }
            return dataItem.id;
        };
        /**
         * Add item to the listbox.
         *
         * @this {BaseListBox}
         * @param {object} dataItem display data for item
         * @param {object} internal: true if this function is not called directly as api function.
         */
        BaseListBox.prototype.addItem = function (dataItem, internal) {
            if (!internal && !this._settings.multiple && dataItem.selected) {
                this.clearSelection(internal);
            }
            var id = this._addItem(this._prepareDataItem(dataItem), internal, null);
            if (!internal) {
                this.eventHandler.fireItemsChangedEvent(this.getItems());
            }
            return id;
        };
        /**
         * Remove first matching item from the listbox.
         *
         * @this {BaseListBox}
         * @param {string} item: display text or id from item to remove
         */
        BaseListBox.prototype.removeItem = function (item) {
            var uiItem = this.locateItem(item);
            if (uiItem) {
                this._clearItemSelection(uiItem);
                uiItem.remove();
                this.eventHandler.fireItemsChangedEvent(this.getItems());
            }
        };
        /**
         * Reverts all changes on the DOM
         *
         * @this {BaseListBox}
         */
        BaseListBox.prototype.destroy = function () {
            this._target.children().remove();
            this._target.removeClass(BaseListBox.MAIN_CLASS);
        };
        /**
         * Resize list to listbox. It's a small hack since I can't
         * do it with CSS.
         */
        BaseListBox.prototype._resizeListToListbox = function () {
            var listHeight = this._target.height();
            if (this._settings.searchBar) {
                listHeight -= this._searchbarWrapper.outerHeight(true);
            }
            this._list.height(listHeight);
        };
        /**
         * Clears all selected items.
         */
        BaseListBox.prototype.clearSelection = function (internal) {
            // Remove selected class from all other items
            var allItems = this._list.find("." + BaseListBox.LIST_ITEM_CLASS);
            allItems.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            var index;
            for (index = 0; index < allItems.length; index++) {
                $(allItems[index]).data("dataItem").selected = false;
            }
            if (this._settings.multiple) {
                this._target.val([]);
            }
            else {
                this._target.val(null);
            }
            if (!internal) {
                this._target.trigger('change');
            }
        };
        /**
         * Clears selection of given items.
         *
         * @param {object} domItem DOM item
         */
        BaseListBox.prototype._clearItemSelection = function (domItem) {
            domItem.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            domItem.data("dataItem").selected = false;
            if (this._settings.multiple) {
                var parentValues = this._target.val();
                if (parentValues) {
                    var removeIndex = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
                    parentValues.splice(removeIndex, 1);
                    this._target.val(parentValues);
                }
            }
            else {
                this._target.val(null);
            }
            this._target.trigger('change');
        };
        /**
         * Returns the dataItem for a given id or text.
         *
         * @param {object} id unique id or text from listItem
         */
        BaseListBox.prototype.getItem = function (id) {
            var data = null;
            var $item = this.locateItem(id);
            if ($item) {
                data = $item.data("dataItem");
            }
            return data;
        };
        /**
         * Returns all dataItems.
         */
        BaseListBox.prototype.getItems = function () {
            var dataItems = [];
            var childs = this._list.children();
            var index;
            for (index = 0; index < childs.length; index++) {
                dataItems.push($(childs[index]).data("dataItem"));
            }
            return dataItems;
        };
        /**
         * Decreases the index of the item by one.
         *
         * @param {object} id unique id or text from listItem
         */
        BaseListBox.prototype.moveItemUp = function (id) {
            var newIndex = null;
            var $item = this.locateItem(id);
            if ($item) {
                $item.insertBefore($item.prev());
                newIndex = $item.index();
                $item.data("dataItem").index = newIndex;
            }
            this.eventHandler.fireItemsChangedEvent(this.getItems());
            return newIndex;
        };
        /**
         * Increases the index of the item by one.
         *
         * @param {object} id unique id or text from listItem
         */
        BaseListBox.prototype.moveItemDown = function (id) {
            var newIndex = null;
            var $item = this.locateItem(id);
            if ($item) {
                $item.insertAfter($item.next());
                newIndex = $item.index();
                $item.data("dataItem").index = newIndex;
            }
            this.eventHandler.fireItemsChangedEvent(this.getItems());
            return newIndex;
        };
        /**
         * Sets the index of the item to zero.
         *
         * @param {object} id unique id or text from listItem
         */
        BaseListBox.prototype.moveItemToTop = function (id) {
            var newIndex = null;
            var $item = this.locateItem(id);
            if ($item) {
                $item.parent().prepend($item);
                newIndex = $item.index();
                $item.data("dataItem").index = newIndex;
            }
            this.eventHandler.fireItemsChangedEvent(this.getItems());
            return newIndex;
        };
        /**
         * Sets the index of the matching item to the highest.
         *
         * @param {object} id unique id or text from listItem
         */
        BaseListBox.prototype.moveItemToBottom = function (id) {
            var newIndex = null;
            var $item = this.locateItem(id);
            if ($item) {
                $item.parent().append($item);
                newIndex = $item.index();
                $item.data("dataItem").index = newIndex;
            }
            this.eventHandler.fireItemsChangedEvent(this.getItems());
            return newIndex;
        };
        /**
         * Enables or disables the whole component.
         *
         * @param {boolean} enable: new enable value.
         */
        BaseListBox.prototype.enable = function (enable) {
            if (enable) {
                this._target.removeClass(BaseListBox.MAIN_DISABLED_CLASS);
            }
            else if (!this._target.hasClass(BaseListBox.MAIN_DISABLED_CLASS)) {
                this._target.addClass(BaseListBox.MAIN_DISABLED_CLASS);
            }
        };
        BaseListBox.prototype.locateItem = function (id) {
            var $item = $("#" + id, this._list);
            if ($item.length === 0) {
                $item = $('div[title="' + id + '"]');
            }
            if ($item.length === 0) {
                $item = null;
            }
            return $item;
        };
        /**
         * Called for a keyPressed event with the enter key for a item.
         *
         * @param {JQuery} domItem: the domItem.
         */
        BaseListBox.prototype.onItemEnterPressed = function (domItem) {
            this.eventHandler.fireItemEnterPressedEvent(domItem.data("dataItem"));
        };
        /**
         * Called for a doubleClick on a item.
         *
         * @param {JQuery} domItem: the domItem.
         */
        BaseListBox.prototype.onItemDoubleClicked = function (domItem) {
            this.eventHandler.fireItemDoubleClickedEvent(domItem.data("dataItem"));
        };
        /**
         * Called for a keyPressed event with the arrow up key for a item.
         *
         * @param {JQuery} domItem: the domItem.
         */
        BaseListBox.prototype.onItemArrowUp = function (domItem) {
            var prev = this.findNextItem(domItem, "prev");
            if (prev) {
                this._clearItemSelection(domItem);
                this.onItemClick(prev);
            }
        };
        /**
         * Called for a keyPressed event with the arrow down key for a item.
         *
         * @param {JQuery} domItem: the domItem.
         */
        BaseListBox.prototype.onItemArrowDown = function (domItem) {
            var next = this.findNextItem(domItem, "next");
            if (next) {
                this._clearItemSelection(domItem);
                this.onItemClick(next);
            }
        };
        BaseListBox.prototype.findNextItem = function (current, direction) {
            var potentialNext = current;
            do {
                potentialNext = potentialNext[direction]();
                if (potentialNext.length === 0) {
                    var parent = current.parent();
                    if (parent.length === 1) {
                        var nextChildren = parent[direction]().children();
                        if (nextChildren.length > 0) {
                            potentialNext = direction === "next" ? nextChildren.first() : nextChildren.last();
                        }
                        else {
                            potentialNext = parent;
                        }
                    }
                    else {
                        return null;
                    }
                }
                if (potentialNext.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED)) {
                    continue;
                }
                return potentialNext;
            } while (true);
        };
        /**
         * Returns all dataItems which are selected.
         */
        BaseListBox.prototype.getSelection = function () {
            var topLevelItems = this.getItems();
            var allItems = [].concat(topLevelItems);
            topLevelItems.forEach(function (item) {
                allItems = allItems.concat(item.childItems);
            });
            return allItems.filter(function (item) { return item.selected; });
        };
        BaseListBox.MAIN_CLASS = 'listbox-root';
        BaseListBox.MAIN_DISABLED_CLASS = 'listbox-disabled';
        BaseListBox.LIST_CLASS = 'listbox';
        BaseListBox.LIST_ITEM_CLASS = 'listbox-item';
        BaseListBox.LIST_ITEM_CLASS_DISABLED = 'listbox-item-disabled';
        BaseListBox.LIST_ITEM_CLASS_SELECTED = 'listbox-item-selected';
        BaseListBox.LIST_ITEM_CLASS_GROUP = 'listbox-item-group';
        BaseListBox.LIST_ITEM_CLASS_CHILD = 'listbox-item-child';
        BaseListBox.SEARCHBAR_CLASS = 'listbox-searchbar';
        BaseListBox.SEARCHBAR_BUTTON_CLASS = 'listbox-searchbar-button';
        return BaseListBox;
    }());
    EL.BaseListBox = BaseListBox;
})(EL || (EL = {}));
/// <reference path="./BaseListBox.ts" />
/// <reference path="./contract/ListboxItem.ts" />
/// <reference path="./event/ListboxEvent.ts" />
var EL;
(function (EL) {
    "use strict";
    var ExtendedListboxInstance = (function () {
        function ExtendedListboxInstance() {
        }
        ExtendedListboxInstance.createFrom = function (listbox, target) {
            var instance = new ExtendedListboxInstance();
            instance.listbox = listbox;
            instance.target = target;
            return instance;
        };
        ExtendedListboxInstance.prototype.addItem = function (item) {
            return this.listbox.addItem(item, false);
        };
        ExtendedListboxInstance.prototype.removeItem = function (identifier) {
            this.listbox.removeItem(identifier);
        };
        ExtendedListboxInstance.prototype.destroy = function () {
            this.listbox.destroy();
        };
        ExtendedListboxInstance.prototype.clearSelection = function () {
            this.listbox.clearSelection(false);
        };
        ExtendedListboxInstance.prototype.getItem = function (identifier) {
            return this.listbox.getItem(identifier);
        };
        ExtendedListboxInstance.prototype.getItems = function () {
            return this.listbox.getItems();
        };
        ExtendedListboxInstance.prototype.getSelection = function () {
            return this.listbox.getSelection();
        };
        ExtendedListboxInstance.prototype.moveItemUp = function (identifier) {
            return this.listbox.moveItemUp(identifier);
        };
        ExtendedListboxInstance.prototype.moveItemDown = function (identifier) {
            return this.listbox.moveItemDown(identifier);
        };
        ExtendedListboxInstance.prototype.moveItemToTop = function (identifier) {
            return this.listbox.moveItemToTop(identifier);
        };
        ExtendedListboxInstance.prototype.moveItemToBottom = function (identifier) {
            return this.listbox.moveItemToBottom(identifier);
        };
        ExtendedListboxInstance.prototype.enable = function (state) {
            this.listbox.enable(state);
        };
        ExtendedListboxInstance.prototype.onValueChanged = function (callback) {
            this.listbox._settings.onValueChanged = callback;
        };
        ExtendedListboxInstance.prototype.onItemsChanged = function (callback) {
            this.listbox._settings.onItemsChanged = callback;
        };
        ExtendedListboxInstance.prototype.onFilterChanged = function (callback) {
            this.listbox._settings.onFilterChanged = callback;
        };
        ExtendedListboxInstance.prototype.onItemEnterPressed = function (callback) {
            this.listbox._settings.onItemEnterPressed = callback;
        };
        ExtendedListboxInstance.prototype.onItemDoubleClicked = function (callback) {
            this.listbox._settings.onItemDoubleClicked = callback;
        };
        return ExtendedListboxInstance;
    }());
    EL.ExtendedListboxInstance = ExtendedListboxInstance;
})(EL || (EL = {}));
/// <reference path="./BaseListBox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />
var EL;
(function (EL) {
    "use strict";
    var MultiSelectListbox = (function (_super) {
        __extends(MultiSelectListbox, _super);
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
        function MultiSelectListbox(domelement, options) {
            _super.call(this, domelement, options);
        }
        /**
         * Toggle item status.
         *
         * @this {MultiSelectListbox}
         * @param {object} domItem a DOM object
         */
        MultiSelectListbox.prototype.onItemClick = function (domItem) {
            if (domItem.hasClass(EL.BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.hasClass(EL.BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }
            var parentValues = this._target.val();
            if (domItem.hasClass(EL.BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
                domItem.removeClass(EL.BaseListBox.LIST_ITEM_CLASS_SELECTED);
                var removeIndex = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
                parentValues.splice(removeIndex, 1);
                domItem.data("dataItem").selected = false;
            }
            else {
                domItem.addClass(EL.BaseListBox.LIST_ITEM_CLASS_SELECTED);
                domItem.data("dataItem").selected = true;
                if (!parentValues) {
                    parentValues = [];
                }
                parentValues.push(JSON.stringify(domItem.data("dataItem")));
            }
            this._target.val(parentValues);
            this._target.trigger('change');
            this.eventHandler.fireValueChangedEvent(parentValues);
        };
        MultiSelectListbox.prototype.onFilterChange = function () {
            return undefined;
        };
        return MultiSelectListbox;
    }(EL.BaseListBox));
    EL.MultiSelectListbox = MultiSelectListbox;
})(EL || (EL = {}));
/// <reference path="./BaseListBox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />
var EL;
(function (EL) {
    "use strict";
    var SingleSelectListbox = (function (_super) {
        __extends(SingleSelectListbox, _super);
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
        function SingleSelectListbox(domelement, options) {
            _super.call(this, domelement, options);
            this._selectedDomItem = null;
        }
        /**
         * Reset all items and select a given one.
         *
         * @this {SingleSelectListbox}
         * @param {object} domItem a DOM object
         */
        SingleSelectListbox.prototype.onItemClick = function (domItem) {
            if (domItem.hasClass(EL.BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.hasClass(EL.BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }
            if (this._selectedDomItem) {
                this.clearSelection(true);
                this._selectedDomItem = null;
            }
            domItem.toggleClass(EL.BaseListBox.LIST_ITEM_CLASS_SELECTED);
            domItem.focus();
            this._selectedDomItem = domItem;
            domItem.data("dataItem").selected = true;
            this._target.val(domItem.data("dataItem"));
            this._target.trigger('change');
            this.eventHandler.fireValueChangedEvent(domItem.data("dataItem"));
        };
        /**
         * Select first visible item if none selected.
         *
         * @this {SingleSelectListbox}
         */
        SingleSelectListbox.prototype.onFilterChange = function () {
            if (!this._selectedDomItem || !this._selectedDomItem.is(':visible')) {
                var element = this._list.children(':visible').first();
                if (element && element.length > 0) {
                    this.onItemClick(element);
                }
            }
            this.eventHandler.fireFilterChangedEvent(this._searchbar.val());
        };
        return SingleSelectListbox;
    }(EL.BaseListBox));
    EL.SingleSelectListbox = SingleSelectListbox;
})(EL || (EL = {}));
var EL;
(function (EL) {
    "use strict";
    var Util = (function () {
        function Util() {
        }
        Util.deprecatedMethod = function (method, version, replacement) {
            if (replacement === void 0) { replacement = null; }
            var warning;
            if (replacement) {
                warning = ("ExtendedListbox: Method " + method + " is deprecated and ") +
                    ("will be replaced with " + replacement + " in " + version + ".");
            }
            else {
                warning = "ExtendedListbox: Method " + method + " is deprecated and will be removed in " + version + ".";
            }
            console.warn(warning);
        };
        return Util;
    }());
    EL.Util = Util;
})(EL || (EL = {}));
/// <reference path="./ExtendedListboxInstance.ts" />
/// <reference path="./BaseListBox.ts" />
/// <reference path="./MultiSelectListbox.ts" />
/// <reference path="./SingleSelectListbox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />
/// <reference path="./infrastructure/Util.ts" />
var EL;
(function (EL) {
    "use strict";
    function initializeListBoxFromOptions(options) {
        "use strict";
        var settings = new EL.ListboxSettings();
        settings = $.extend(settings, options);
        var multipleInstances = [];
        var singleInstance = null;
        var multipleElements = this.length > 1;
        var setInstance = function (instance) {
            if (multipleElements) {
                multipleInstances.push(instance);
            }
            else {
                singleInstance = instance;
            }
        };
        this.each(function () {
            var listbox;
            var instance;
            var $this = $(this);
            if ($this.data('listbox-instance')) {
                setInstance($this.data('listbox-instance'));
                return;
            }
            if (settings.multiple) {
                listbox = new EL.MultiSelectListbox($this, settings);
            }
            else {
                listbox = new EL.SingleSelectListbox($this, settings);
            }
            instance = EL.ExtendedListboxInstance.createFrom(listbox, $this);
            $this.data('listbox', listbox);
            $this.data('listbox-instance', instance);
            setInstance(instance);
        });
        return multipleElements ? multipleInstances : singleInstance;
    }
    /**
     * @deprecated: This method will be removed in 2.0.0
     *
     * @param functionName
     * @param callArgs
     * @returns {any}
     */
    function callApiFunction(functionName, callArgs) {
        "use strict";
        var publicFunctions = ["addItem", "removeItem", "destroy", "getItem", "getItems",
            "moveItemUp", "moveItemDown", "clearSelection", "enable"];
        var ret = null;
        this.each(function () {
            var instance = $(this).data('listbox');
            EL.Util.deprecatedMethod(functionName, "2.0.0", "corresponding method in class ExtendedListboxInstance");
            if (instance == null && window.console && console.error) {
                console.error('The listbox(\'' + functionName + '\') method was called on an ' +
                    'element that is not using ListBox.');
                return;
            }
            if ($.inArray(functionName, publicFunctions) === -1) {
                console.error('' + functionName + ' is no public API function.');
                return;
            }
            var args = Array.prototype.slice.call(callArgs, 1);
            ret = instance[functionName].apply(instance, args);
        });
        return ret;
    }
    /**
     * jQuery plugin definition. Please note, that jQuery's `each()` method
     * returns `false` to stop iteration; otherwise it should return `true`.
     *
     * @param {object} options an object with Listbox settings
     */
    $.fn.listbox = function (options) {
        if (typeof options === 'object' || !options) {
            return initializeListBoxFromOptions.call(this, options);
        }
        else if (typeof options === 'string') {
            return callApiFunction.call(this, options, arguments);
        }
    };
})(EL || (EL = {}));

//# sourceMappingURL=extended-listbox.js.map
