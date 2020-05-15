/*!
 * Extended ListBox
 * Maintainer  Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * Website     https://ckotzbauer.github.io/extended-listbox/documentation/latest/
 * Version     2.0.0
 * Released    2017-02-04T12:35:10.196Z
 * License     MIT
 * Copyright   (c) 2017
 */
var extendedlistbox =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ListboxEventHandler) {
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
         * @param {Listbox} boxInstance of specific implementation
         */
        function BaseListBox(domelement, options, boxInstance) {
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
        BaseListBox.prototype.onItemClick = function (domItem) {
            this._box.onItemClick(domItem);
        };
        /**
         * Select first visible item if none selected.
         *
         * @this {BaseListBox}
         */
        BaseListBox.prototype.onFilterChange = function () {
            this._box.onFilterChange();
        };
        /**
         * Creates a `div`-based listbox, which includes such things as
         * container, listbox itself and searchbar as an optional element.
         *
         * @private
         * @this {BaseListBox}
         */
        BaseListBox.prototype.createListbox = function () {
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
            var item = {
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
        return BaseListBox;
    }());
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
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(4), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, MultiSelectListbox, SingleSelectListbox, ExtendedListboxInstance) {
    "use strict";
    function initializeListBoxFromOptions(options) {
        "use strict";
        var settings = $.extend({
            searchBar: false,
            searchBarWatermark: "Search...",
            searchBarButton: { visible: false },
            multiple: false
        }, options);
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
                listbox = new MultiSelectListbox($this, settings);
            }
            else {
                listbox = new SingleSelectListbox($this, settings);
            }
            instance = ExtendedListboxInstance.createFrom(listbox, $this);
            $this.data('listbox', listbox);
            $this.data('listbox-instance', instance);
            setInstance(instance);
        });
        return multipleElements ? multipleInstances : singleInstance;
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
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
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
            return this.listbox.baseListBox.addItem(item, false);
        };
        ExtendedListboxInstance.prototype.removeItem = function (identifier) {
            this.listbox.baseListBox.removeItem(identifier);
        };
        ExtendedListboxInstance.prototype.destroy = function () {
            this.listbox.baseListBox.destroy();
        };
        ExtendedListboxInstance.prototype.clearSelection = function () {
            this.listbox.baseListBox.clearSelection(false);
        };
        ExtendedListboxInstance.prototype.getItem = function (identifier) {
            return this.listbox.baseListBox.getItem(identifier);
        };
        ExtendedListboxInstance.prototype.getItems = function () {
            return this.listbox.baseListBox.getItems();
        };
        ExtendedListboxInstance.prototype.getSelection = function () {
            return this.listbox.baseListBox.getSelection();
        };
        ExtendedListboxInstance.prototype.moveItemUp = function (identifier) {
            return this.listbox.baseListBox.moveItemUp(identifier);
        };
        ExtendedListboxInstance.prototype.moveItemDown = function (identifier) {
            return this.listbox.baseListBox.moveItemDown(identifier);
        };
        ExtendedListboxInstance.prototype.moveItemToTop = function (identifier) {
            return this.listbox.baseListBox.moveItemToTop(identifier);
        };
        ExtendedListboxInstance.prototype.moveItemToBottom = function (identifier) {
            return this.listbox.baseListBox.moveItemToBottom(identifier);
        };
        ExtendedListboxInstance.prototype.enable = function (state) {
            this.listbox.baseListBox.enable(state);
        };
        ExtendedListboxInstance.prototype.onValueChanged = function (callback) {
            this.listbox.baseListBox._settings.onValueChanged = callback;
        };
        ExtendedListboxInstance.prototype.onItemsChanged = function (callback) {
            this.listbox.baseListBox._settings.onItemsChanged = callback;
        };
        ExtendedListboxInstance.prototype.onFilterChanged = function (callback) {
            this.listbox.baseListBox._settings.onFilterChanged = callback;
        };
        ExtendedListboxInstance.prototype.onItemEnterPressed = function (callback) {
            this.listbox.baseListBox._settings.onItemEnterPressed = callback;
        };
        ExtendedListboxInstance.prototype.onItemDoubleClicked = function (callback) {
            this.listbox.baseListBox._settings.onItemDoubleClicked = callback;
        };
        return ExtendedListboxInstance;
    }());
    return ExtendedListboxInstance;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, BaseListBox) {
    "use strict";
    var MultiSelectListbox = (function () {
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
            this.baseListBox = new BaseListBox(domelement, options, this);
            this.baseListBox.createListbox();
        }
        /**
         * Toggle item status.
         *
         * @this {MultiSelectListbox}
         * @param {object} domItem a DOM object
         */
        MultiSelectListbox.prototype.onItemClick = function (domItem) {
            if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }
            var parentValues = this.baseListBox._target.val();
            if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
                domItem.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                var removeIndex = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
                parentValues.splice(removeIndex, 1);
                domItem.data("dataItem").selected = false;
            }
            else {
                domItem.addClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                domItem.data("dataItem").selected = true;
                if (!parentValues) {
                    parentValues = [];
                }
                parentValues.push(JSON.stringify(domItem.data("dataItem")));
            }
            this.baseListBox._target.val(parentValues);
            this.baseListBox._target.trigger('change');
            this.baseListBox.eventHandler.fireValueChangedEvent(parentValues);
        };
        MultiSelectListbox.prototype.onFilterChange = function () {
            return undefined;
        };
        return MultiSelectListbox;
    }());
    return MultiSelectListbox;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, BaseListBox) {
    "use strict";
    var SingleSelectListbox = (function () {
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
        SingleSelectListbox.prototype.onItemClick = function (domItem) {
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
            this.baseListBox.eventHandler.fireValueChangedEvent(domItem.data("dataItem"));
        };
        /**
         * Select first visible item if none selected.
         *
         * @this {SingleSelectListbox}
         */
        SingleSelectListbox.prototype.onFilterChange = function () {
            if (!this._selectedDomItem || !this._selectedDomItem.is(':visible')) {
                var element = this.baseListBox._list.children(':visible').first();
                if (element && element.length > 0) {
                    this.onItemClick(element);
                }
            }
            this.baseListBox.eventHandler.fireFilterChangedEvent(this.baseListBox._searchbar.val());
        };
        return SingleSelectListbox;
    }());
    return SingleSelectListbox;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    var ListboxEvent = (function () {
        function ListboxEvent(eventName, target, args) {
            this.eventName = eventName;
            this.target = target;
            this.args = args;
        }
        return ListboxEvent;
    }());
    ListboxEvent.VALUE_CHANGED = "valueChanged";
    ListboxEvent.FILTER_CHANGED = "filterChanged";
    ListboxEvent.ITEMS_CHANGED = "itemsChanged";
    ListboxEvent.ITEM_ENTER_PRESSED = "itemEnterPressed";
    ListboxEvent.ITEM_DOUBLE_CLICKED = "itemDoubleClicked";
    return ListboxEvent;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ListboxEvent) {
    "use strict";
    var ListboxEventHandler = (function () {
        function ListboxEventHandler(listBox) {
            this.listBox = listBox;
        }
        ListboxEventHandler.prototype.fire = function (name, delegate, args) {
            if (delegate) {
                var event = new ListboxEvent(name, this.listBox._target, args);
                delegate(event);
            }
        };
        ListboxEventHandler.prototype.fireValueChangedEvent = function (args) {
            this.fire(ListboxEvent.VALUE_CHANGED, this.listBox._settings.onValueChanged, args);
        };
        ListboxEventHandler.prototype.fireItemsChangedEvent = function (args) {
            this.fire(ListboxEvent.ITEMS_CHANGED, this.listBox._settings.onItemsChanged, args);
        };
        ListboxEventHandler.prototype.fireFilterChangedEvent = function (args) {
            this.fire(ListboxEvent.FILTER_CHANGED, this.listBox._settings.onFilterChanged, args);
        };
        ListboxEventHandler.prototype.fireItemEnterPressedEvent = function (args) {
            this.fire(ListboxEvent.ITEM_ENTER_PRESSED, this.listBox._settings.onItemEnterPressed, args);
        };
        ListboxEventHandler.prototype.fireItemDoubleClickedEvent = function (args) {
            this.fire(ListboxEvent.ITEM_DOUBLE_CLICKED, this.listBox._settings.onItemDoubleClicked, args);
        };
        return ListboxEventHandler;
    }());
    return ListboxEventHandler;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=extended-listbox.js.map