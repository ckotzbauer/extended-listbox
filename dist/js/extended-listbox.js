/*!
 * Extended ListBox
 * Maintainer  Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * Website     https://code-chris.github.io/extended-listbox/documentation/latest/
 * Version     4.0.2
 * Released    2018-01-05T17:02:45.039Z
 * License     MIT
 * Copyright   (c) 2018
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
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseListBox = (function () {
        function BaseListBox(domelement, options, multiple) {
            this.dataItems = [];
            this.selectedDataItems = [];
            options = options || {};
            options.searchBar = options.searchBar || false;
            options.searchBarWatermark = options.searchBarWatermark || "Search...";
            options.searchBarButton = options.searchBarButton || { visible: false };
            this._target = domelement;
            this._settings = options;
            this.multiple = multiple;
        }
        BaseListBox.prototype._createListbox = function () {
            this._target.classList.add(BaseListBox.MAIN_CLASS);
            if (this._settings.searchBar) {
                this._createSearchbar();
            }
            this._createList();
        };
        BaseListBox.prototype._createSearchbar = function () {
            var _this = this;
            var searchbarWrapper = document.createElement("div");
            searchbarWrapper.classList.add(BaseListBox.SEARCHBAR_CLASS + '-wrapper');
            this._target.appendChild(searchbarWrapper);
            var searchbar = document.createElement("input");
            searchbar.classList.add(BaseListBox.SEARCHBAR_CLASS);
            searchbar.setAttribute("placeholder", this._settings.searchBarWatermark);
            searchbarWrapper.appendChild(searchbar);
            searchbar.onkeyup = function () {
                var searchQuery = searchbar.value.toLowerCase();
                if (searchQuery !== '') {
                    var items = _this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                    for (var i = 0; i < items.length; i++) {
                        var thisItem = items.item(i);
                        if (thisItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                            continue;
                        }
                        var text = thisItem.innerText.toLowerCase();
                        if (text.search(searchQuery) !== -1) {
                            thisItem.style.display = "block";
                            thisItem.parentElement.style.display = "block";
                        }
                        else {
                            thisItem.style.display = "none";
                        }
                    }
                    var groups = _this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS_GROUP);
                    for (var i = 0; i < groups.length; i++) {
                        var thisItem = groups.item(i);
                        var childs = thisItem.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                        var index = -1;
                        for (var j = 0; j < childs.length; j++) {
                            if (childs.item(j).style.display !== "none") {
                                index = j;
                                break;
                            }
                        }
                        if (index === -1) {
                            thisItem.style.display = "none";
                        }
                        else {
                            thisItem.style.display = "block";
                        }
                    }
                }
                else {
                    var items = _this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                    for (var i = 0; i < items.length; i++) {
                        var thisItem = items.item(i);
                        thisItem.style.display = "block";
                    }
                }
                _this._filterChanged();
            };
            if (this._settings.searchBarButton.visible) {
                var button = document.createElement("button");
                button.id = "searchBarButton";
                button.setAttribute("tabindex", "-1");
                button.classList.add(BaseListBox.SEARCHBAR_BUTTON_CLASS);
                searchbarWrapper.appendChild(button);
                if (this._settings.searchBarButton.onClick) {
                    button.onclick = this._settings.searchBarButton.onClick;
                }
                if (this._settings.searchBarButton.icon) {
                    var icon_1 = document.createElement("i");
                    var parts = this._settings.searchBarButton.icon.split(" ");
                    parts.forEach(function (p) { return icon_1.classList.add(p); });
                    button.appendChild(icon_1);
                }
            }
            this._searchbarWrapper = searchbarWrapper;
            this._searchbar = searchbar;
        };
        BaseListBox.prototype._createList = function () {
            this._list = document.createElement("div");
            this._list.classList.add(BaseListBox.LIST_CLASS);
            this._target.appendChild(this._list);
            this._resizeListToListBox();
            if (this._settings.getItems) {
                var items = this._settings.getItems();
                if (items) {
                    for (var index in items) {
                        this.addItem(this._prepareDataItem(items[index]), true);
                    }
                }
            }
        };
        BaseListBox.prototype._generateItemId = function () {
            var num = parseInt("" + (Math.random() * 10000000), 10);
            return "listBoxItem" + num;
        };
        BaseListBox.prototype._prepareDataItem = function (dataItem) {
            var item = {
                childItems: [],
                disabled: false,
                groupHeader: null,
                id: this._generateItemId(),
                parentGroupId: null,
                selected: false,
                text: null,
                index: null
            };
            if (typeof dataItem === "string" || typeof dataItem === "number") {
                item.text = dataItem;
                return item;
            }
            else {
                for (var i in dataItem) {
                    if (dataItem.hasOwnProperty(i)) {
                        item[i] = dataItem[i];
                    }
                }
                var childs = [];
                for (var index in item.childItems) {
                    childs.push(this._prepareDataItem(item.childItems[index]));
                }
                item.childItems = childs;
                return item;
            }
        };
        BaseListBox.prototype._addItem = function (dataItem, internal, parent) {
            var _this = this;
            this.dataItems.push(dataItem);
            var item = document.createElement("div");
            item.classList.add(BaseListBox.LIST_ITEM_CLASS);
            item.innerText = dataItem.text;
            item.id = dataItem.id;
            item.tabIndex = 1;
            item.title = dataItem.text;
            item.onkeydown = function (e) {
                if (!e.target.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) && e.eventPhase === 2) {
                    if (e.which === 13) {
                        _this._fireEvent(BaseListBox.EVENT_ITEM_ENTER_PRESSED, _this._getDataItem(e.target.id));
                    }
                    else if (e.which === 38) {
                        e.preventDefault();
                        _this._itemArrowUp(e.target);
                    }
                    else if (e.which === 40) {
                        e.preventDefault();
                        _this._itemArrowDown(e.target);
                    }
                }
            };
            item.onclick = function (e) {
                if (e.eventPhase === 2) {
                    _this._itemClicked(e.target, e.ctrlKey);
                }
            };
            item.ondblclick = function (e) {
                if (!e.target.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                    _this._fireEvent(BaseListBox.EVENT_ITEM_DOUBLE_CLICKED, _this._getDataItem(e.target.id));
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
                var possibleParent = this._locateItem(dataItem.parentGroupId);
                if (possibleParent) {
                    parent = possibleParent;
                }
            }
            if (parent) {
                item.classList.add(BaseListBox.LIST_ITEM_CLASS_CHILD);
            }
            var target = parent ? parent : this._list;
            if (dataItem.index !== undefined && dataItem.index !== null && !internal) {
                target = target.children.item(dataItem.index);
                target.parentElement.insertBefore(item, target);
            }
            else {
                target.appendChild(item);
            }
            if (dataItem.childItems && dataItem.childItems.length > 0) {
                if (!item.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                    item.classList.add(BaseListBox.LIST_ITEM_CLASS_GROUP);
                }
                for (var index = 0; index < dataItem.childItems.length; index++) {
                    this._addItem(this._prepareDataItem(dataItem.childItems[index]), internal, item);
                }
            }
            return dataItem.id;
        };
        BaseListBox.prototype._resizeListToListBox = function () {
            var computed = window.getComputedStyle(this._target, null);
            var containerPadding = parseInt(computed.getPropertyValue("padding-top"), 10) +
                parseInt(computed.getPropertyValue("padding-bottom"), 10);
            var listHeight = parseInt(computed.getPropertyValue("height"), 10) - containerPadding;
            if (this._settings.searchBar) {
                listHeight -= this._searchbarWrapper.offsetHeight;
            }
            this._list.style.height = listHeight + "px";
        };
        BaseListBox.prototype._clearItemSelection = function (domItem) {
            domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            this._getDataItem(domItem.id).selected = false;
            if (this.multiple) {
                var currentItem = this._getDataItem(domItem.id);
                var removeIndex = this.selectedDataItems.indexOf(currentItem);
                this.selectedDataItems.splice(removeIndex, 1);
            }
            else {
                this.selectedDataItems.splice(0, this.selectedDataItems.length);
            }
        };
        BaseListBox.prototype._locateItem = function (name) {
            var id = null;
            for (var i = 0; i < this.dataItems.length; i++) {
                if (this.dataItems[i].id === name || this.dataItems[i].text === name) {
                    id = this.dataItems[i].id;
                    break;
                }
            }
            var item = this._target.querySelector("#" + id);
            if (!item) {
                var titleItems = this._target.querySelectorAll('div[title="' + id + '"]');
                if (titleItems.length > 0) {
                    return titleItems[0];
                }
            }
            return item;
        };
        BaseListBox.prototype._findNextItem = function (current, direction) {
            var potentialNext = current;
            do {
                potentialNext = potentialNext[direction + "ElementSibling"];
                if (!potentialNext) {
                    var parent_1 = current.parentElement;
                    if (parent_1) {
                        var sibling = parent_1[direction + "ElementSibling"];
                        if (!sibling) {
                            return null;
                        }
                        var nextChildren = sibling.children;
                        if (nextChildren.length > 0) {
                            potentialNext = direction === "next"
                                ? nextChildren[0].firstElementChild
                                : nextChildren[0].lastElementChild;
                        }
                        else {
                            potentialNext = parent_1;
                        }
                    }
                    else {
                        return null;
                    }
                }
                if (potentialNext && potentialNext.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED)) {
                    continue;
                }
                return potentialNext;
            } while (true);
        };
        BaseListBox.prototype._fireEvent = function (name, args) {
            var delegate = this._settings["on" + name[0].toUpperCase() + name.substr(1)];
            if (delegate) {
                delegate({ eventName: name, target: this._target, args: args });
            }
        };
        BaseListBox.prototype._elementIndex = function (element) {
            var childs = Array.prototype.slice.call(element.parentElement.children);
            return childs.indexOf(element);
        };
        BaseListBox.prototype._getDataItem = function (id) {
            for (var i = 0; i < this.dataItems.length; i++) {
                if (this.dataItems[i].id === id) {
                    return this.dataItems[i];
                }
            }
            return null;
        };
        BaseListBox.prototype._itemArrowUp = function (domItem) {
            var prev = this._findNextItem(domItem, "previous");
            if (prev) {
                this._clearItemSelection(domItem);
                this._itemClicked(prev);
            }
        };
        BaseListBox.prototype._itemArrowDown = function (domItem) {
            var next = this._findNextItem(domItem, "next");
            if (next) {
                this._clearItemSelection(domItem);
                this._itemClicked(next);
            }
        };
        BaseListBox.prototype.addItem = function (dataItem, internal) {
            if (internal === void 0) { internal = false; }
            if (!internal && !this.multiple && dataItem["selected"]) {
                this.clearSelection();
            }
            var id = this._addItem(this._prepareDataItem(dataItem), internal, null);
            if (!internal) {
                this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            }
            return id;
        };
        BaseListBox.prototype.addItems = function (items) {
            var _this = this;
            return items.map(function (item) { return _this.addItem(item); });
        };
        BaseListBox.prototype.removeItem = function (item) {
            var uiItem = this._locateItem(item);
            if (uiItem) {
                this._clearItemSelection(uiItem);
                uiItem.parentElement.removeChild(uiItem);
                var dataItem = this._getDataItem(uiItem.id);
                this.dataItems.splice(this.dataItems.indexOf(dataItem), 1);
                var selectedIndex = this.selectedDataItems.indexOf(dataItem);
                if (selectedIndex !== -1) {
                    this.selectedDataItems.splice(selectedIndex, 1);
                }
                this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            }
        };
        BaseListBox.prototype.removeItems = function (items) {
            var _this = this;
            items.forEach(function (item) { return _this.removeItem(item); });
        };
        BaseListBox.prototype.destroy = function () {
            while (this._target.firstChild) {
                this._target.removeChild(this._target.firstChild);
            }
            this._target.classList.remove(BaseListBox.MAIN_CLASS);
        };
        BaseListBox.prototype.clearSelection = function () {
            var allItems = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
            for (var index = 0; index < allItems.length; index++) {
                allItems[index].classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                this._getDataItem(allItems[index].id).selected = false;
            }
            this.selectedDataItems = [];
        };
        BaseListBox.prototype.getItem = function (id) {
            var data = null;
            var item = this._locateItem(id);
            if (item) {
                data = this._getDataItem(item.id);
            }
            return data;
        };
        BaseListBox.prototype.getItems = function () {
            var items = [];
            var childs = this._list.children;
            for (var index = 0; index < childs.length; index++) {
                items.push(this._getDataItem(childs[index].id));
            }
            return items;
        };
        BaseListBox.prototype.moveItemUp = function (id) {
            var newIndex = null;
            var item = this._locateItem(id);
            if (item && item.previousElementSibling) {
                item.parentElement.insertBefore(item, item.previousElementSibling);
                newIndex = this._elementIndex(item);
                this._getDataItem(item.id).index = newIndex;
                this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            }
            else if (item) {
                newIndex = this._elementIndex(item);
            }
            return newIndex;
        };
        BaseListBox.prototype.moveItemDown = function (id) {
            var newIndex = null;
            var item = this._locateItem(id);
            if (item && item.nextElementSibling) {
                item.parentNode.insertBefore(item.nextElementSibling, item);
                newIndex = this._elementIndex(item);
                this._getDataItem(item.id).index = newIndex;
                this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            }
            else if (item) {
                newIndex = this._elementIndex(item);
            }
            return newIndex;
        };
        BaseListBox.prototype.moveItemToTop = function (id) {
            var newIndex = null;
            var item = this._locateItem(id);
            if (item) {
                item.parentElement.insertBefore(item, item.parentElement.firstElementChild);
                newIndex = this._elementIndex(item);
                this._getDataItem(item.id).index = newIndex;
                this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            }
            return newIndex;
        };
        BaseListBox.prototype.moveItemToBottom = function (id) {
            var newIndex = null;
            var item = this._locateItem(id);
            if (item) {
                item.parentElement.appendChild(item);
                newIndex = this._elementIndex(item);
                this._getDataItem(item.id).index = newIndex;
            }
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            return newIndex;
        };
        BaseListBox.prototype.enable = function (enable) {
            if (enable) {
                this._target.classList.remove(BaseListBox.MAIN_DISABLED_CLASS);
            }
            else if (!this._target.classList.contains(BaseListBox.MAIN_DISABLED_CLASS)) {
                this._target.classList.add(BaseListBox.MAIN_DISABLED_CLASS);
            }
        };
        BaseListBox.prototype.getSelection = function () {
            return this.selectedDataItems;
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
        BaseListBox.EVENT_VALUE_CHANGED = "valueChanged";
        BaseListBox.EVENT_FILTER_CHANGED = "filterChanged";
        BaseListBox.EVENT_ITEMS_CHANGED = "itemsChanged";
        BaseListBox.EVENT_ITEM_ENTER_PRESSED = "itemEnterPressed";
        BaseListBox.EVENT_ITEM_DOUBLE_CLICKED = "itemDoubleClicked";
        return BaseListBox;
    }());
    exports.BaseListBox = BaseListBox;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(5);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, SingleSelectListBox_1, MultiSelectListBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.SingleSelectListBox = SingleSelectListBox_1.SingleSelectListBox;
    window.MultiSelectListBox = MultiSelectListBox_1.MultiSelectListBox;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, BaseListBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SingleSelectListBox = (function (_super) {
        __extends(SingleSelectListBox, _super);
        function SingleSelectListBox(domElement, options) {
            var _this = _super.call(this, domElement, options, false) || this;
            _this._selectedDomItem = null;
            _this._createListbox();
            return _this;
        }
        SingleSelectListBox.prototype._itemClicked = function (domItem, ctrl) {
            if (ctrl === void 0) { ctrl = false; }
            if (domItem.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }
            if (this._selectedDomItem) {
                this.clearSelection();
                this._selectedDomItem = null;
            }
            domItem.classList.toggle(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_SELECTED);
            domItem.focus();
            this._selectedDomItem = domItem;
            var dataItem = this._getDataItem(domItem.id);
            dataItem.selected = true;
            this.selectedDataItems.push(dataItem);
            this._fireEvent(BaseListBox_1.BaseListBox.EVENT_VALUE_CHANGED, this._getDataItem(domItem.id));
        };
        SingleSelectListBox.prototype._filterChanged = function () {
            if (!this._selectedDomItem || this._selectedDomItem.style.display === "none") {
                var elements = this._list.querySelectorAll("." + BaseListBox_1.BaseListBox.LIST_ITEM_CLASS);
                for (var i = 0; i < elements.length; i++) {
                    var element = elements.item(i);
                    if (!element.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_GROUP) &&
                        !element.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_DISABLED) &&
                        element.style.display !== "none") {
                        this._itemClicked(element);
                        break;
                    }
                }
            }
            this._fireEvent(BaseListBox_1.BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
        };
        return SingleSelectListBox;
    }(BaseListBox_1.BaseListBox));
    exports.SingleSelectListBox = SingleSelectListBox;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, BaseListBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MultiSelectListBox = (function (_super) {
        __extends(MultiSelectListBox, _super);
        function MultiSelectListBox(domElement, options) {
            var _this = _super.call(this, domElement, options, true) || this;
            _this._createListbox();
            return _this;
        }
        MultiSelectListBox.prototype._itemClicked = function (domItem, ctrl) {
            if (ctrl === void 0) { ctrl = false; }
            if (domItem.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }
            var dataItem = this._getDataItem(domItem.id);
            if (domItem.classList.contains(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
                if (!ctrl) {
                    this.clearSelection();
                    domItem.classList.add(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_SELECTED);
                    dataItem.selected = true;
                    this.selectedDataItems.push(dataItem);
                }
                else {
                    domItem.classList.remove(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_SELECTED);
                    dataItem.selected = false;
                    var removeIndex = this.selectedDataItems.indexOf(this._getDataItem(domItem.id));
                    this.selectedDataItems.splice(removeIndex, 1);
                }
            }
            else {
                if (!ctrl) {
                    this.clearSelection();
                }
                domItem.focus();
                domItem.classList.add(BaseListBox_1.BaseListBox.LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = true;
                this.selectedDataItems.push(dataItem);
            }
            this._fireEvent(BaseListBox_1.BaseListBox.EVENT_VALUE_CHANGED, this.selectedDataItems);
        };
        MultiSelectListBox.prototype._filterChanged = function () {
            this._fireEvent(BaseListBox_1.BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
        };
        return MultiSelectListBox;
    }(BaseListBox_1.BaseListBox));
    exports.MultiSelectListBox = MultiSelectListBox;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=extended-listbox.js.map