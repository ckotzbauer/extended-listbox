/*!
 * Extended ListBox
 * Maintainer  Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * Website     https://code-chris.github.io/extended-listbox/documentation/latest/
 * Version     5.0.1
 * Released    2018-07-02T16:32:53.657Z
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/styles/extended-listbox.scss":
/*!******************************************!*\
  !*** ./src/styles/extended-listbox.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/ts/BaseListBox.ts":
/*!*******************************!*\
  !*** ./src/ts/BaseListBox.ts ***!
  \*******************************/
/*! exports provided: BaseListBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseListBox", function() { return BaseListBox; });
class BaseListBox {
    constructor(domelement, options, multiple) {
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
    _createListbox() {
        this._target.classList.add(BaseListBox.MAIN_CLASS);
        if (this._settings.searchBar) {
            this._createSearchbar();
        }
        this._createList();
    }
    _createSearchbar() {
        const searchbarWrapper = document.createElement("div");
        searchbarWrapper.classList.add(BaseListBox.SEARCHBAR_CLASS + '-wrapper');
        this._target.appendChild(searchbarWrapper);
        const searchbar = document.createElement("input");
        searchbar.classList.add(BaseListBox.SEARCHBAR_CLASS);
        searchbar.setAttribute("placeholder", this._settings.searchBarWatermark);
        searchbarWrapper.appendChild(searchbar);
        searchbar.onkeyup = () => {
            const searchQuery = searchbar.value.toLowerCase();
            if (searchQuery !== '') {
                const items = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i = 0; i < items.length; i++) {
                    const thisItem = items.item(i);
                    if (thisItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                        continue;
                    }
                    const text = thisItem.innerText.toLowerCase();
                    if (text.indexOf(searchQuery) !== -1) {
                        thisItem.style.display = "block";
                        thisItem.parentElement.style.display = "block";
                    }
                    else {
                        thisItem.style.display = "none";
                    }
                }
                const groups = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS_GROUP);
                for (let i = 0; i < groups.length; i++) {
                    const thisItem = groups.item(i);
                    const childs = thisItem.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                    let index = -1;
                    for (let j = 0; j < childs.length; j++) {
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
                const items = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i = 0; i < items.length; i++) {
                    const thisItem = items.item(i);
                    thisItem.style.display = "block";
                }
            }
            this._filterChanged();
        };
        if (this._settings.searchBarButton.visible) {
            const button = document.createElement("button");
            button.id = "searchBarButton";
            button.setAttribute("tabindex", "-1");
            button.classList.add(BaseListBox.SEARCHBAR_BUTTON_CLASS);
            searchbarWrapper.appendChild(button);
            if (this._settings.searchBarButton.onClick) {
                button.onclick = this._settings.searchBarButton.onClick;
            }
            if (this._settings.searchBarButton.icon) {
                const icon = document.createElement("i");
                const parts = this._settings.searchBarButton.icon.split(" ");
                parts.forEach((p) => icon.classList.add(p));
                button.appendChild(icon);
            }
        }
        this._searchbarWrapper = searchbarWrapper;
        this._searchbar = searchbar;
    }
    _createList() {
        this._list = document.createElement("div");
        this._list.classList.add(BaseListBox.LIST_CLASS);
        this._target.appendChild(this._list);
        this._resizeListToListBox();
        if (this._settings.getItems) {
            const items = this._settings.getItems();
            if (items) {
                for (let index in items) {
                    this.addItem(this._prepareDataItem(items[index]), true);
                }
            }
        }
    }
    _generateItemId() {
        const num = parseInt("" + (Math.random() * 10000000), 10);
        return "listBoxItem" + num;
    }
    _prepareDataItem(dataItem) {
        let item = {
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
            for (let i in dataItem) {
                if (dataItem.hasOwnProperty(i)) {
                    item[i] = dataItem[i];
                }
            }
            const childs = [];
            for (let index in item.childItems) {
                childs.push(this._prepareDataItem(item.childItems[index]));
            }
            item.childItems = childs;
            return item;
        }
    }
    _addItem(dataItem, internal, parent) {
        this.dataItems.push(dataItem);
        const item = document.createElement("div");
        item.classList.add(BaseListBox.LIST_ITEM_CLASS);
        item.innerText = dataItem.text;
        item.id = dataItem.id;
        item.tabIndex = 1;
        item.title = dataItem.text;
        item.onkeydown = (e) => {
            if (!e.target.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP) && e.eventPhase === 2) {
                if (e.which === 13) {
                    this._fireEvent(BaseListBox.EVENT_ITEM_ENTER_PRESSED, this._getDataItem(e.target.id));
                }
                else if (e.which === 38) {
                    e.preventDefault();
                    this._itemArrowUp(e.target);
                }
                else if (e.which === 40) {
                    e.preventDefault();
                    this._itemArrowDown(e.target);
                }
            }
        };
        item.onclick = (e) => {
            if (e.eventPhase === 2) {
                this._itemClicked(e.target, e.ctrlKey);
            }
        };
        item.ondblclick = (e) => {
            if (!e.target.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                this._fireEvent(BaseListBox.EVENT_ITEM_DOUBLE_CLICKED, this._getDataItem(e.target.id));
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
            const possibleParent = this._locateItem(dataItem.parentGroupId);
            if (possibleParent) {
                parent = possibleParent;
            }
        }
        if (parent) {
            item.classList.add(BaseListBox.LIST_ITEM_CLASS_CHILD);
        }
        let target = parent ? parent : this._list;
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
            for (let index = 0; index < dataItem.childItems.length; index++) {
                this._addItem(this._prepareDataItem(dataItem.childItems[index]), internal, item);
            }
        }
        return dataItem.id;
    }
    _resizeListToListBox() {
        const computed = window.getComputedStyle(this._target, null);
        const containerPadding = parseInt(computed.getPropertyValue("padding-top"), 10) +
            parseInt(computed.getPropertyValue("padding-bottom"), 10);
        let listHeight = parseInt(computed.getPropertyValue("height"), 10) - containerPadding;
        if (this._settings.searchBar) {
            listHeight -= this._searchbarWrapper.offsetHeight;
        }
        this._list.style.height = listHeight + "px";
    }
    _clearItemSelection(domItem) {
        domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
        this._getDataItem(domItem.id).selected = false;
        if (this.multiple) {
            const currentItem = this._getDataItem(domItem.id);
            const removeIndex = this.selectedDataItems.indexOf(currentItem);
            this.selectedDataItems.splice(removeIndex, 1);
        }
        else {
            this.selectedDataItems.splice(0, this.selectedDataItems.length);
        }
    }
    _locateItem(name) {
        let id = null;
        for (let i = 0; i < this.dataItems.length; i++) {
            if (this.dataItems[i].id === name || this.dataItems[i].text === name) {
                id = this.dataItems[i].id;
                break;
            }
        }
        let item = this._target.querySelector("#" + id);
        if (!item) {
            const titleItems = this._target.querySelectorAll('div[title="' + id + '"]');
            if (titleItems.length > 0) {
                return titleItems[0];
            }
        }
        return item;
    }
    _findNextItem(current, direction) {
        let potentialNext = current;
        do {
            potentialNext = potentialNext[direction + "ElementSibling"];
            if (!potentialNext) {
                const parent = current.parentElement;
                if (parent) {
                    const sibling = parent[direction + "ElementSibling"];
                    if (!sibling) {
                        return null;
                    }
                    const nextChildren = sibling.children;
                    if (nextChildren.length > 0) {
                        potentialNext = direction === "next"
                            ? nextChildren[0].firstElementChild
                            : nextChildren[0].lastElementChild;
                    }
                    else {
                        potentialNext = parent;
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
    }
    _fireEvent(name, args) {
        let delegate = this._settings["on" + name[0].toUpperCase() + name.substr(1)];
        if (delegate) {
            delegate({ eventName: name, target: this._target, args: args });
        }
    }
    _elementIndex(element) {
        const childs = Array.prototype.slice.call(element.parentElement.children);
        return childs.indexOf(element);
    }
    _getDataItem(id) {
        for (let i = 0; i < this.dataItems.length; i++) {
            if (this.dataItems[i].id === id) {
                return this.dataItems[i];
            }
        }
        return null;
    }
    _itemArrowUp(domItem) {
        const prev = this._findNextItem(domItem, "previous");
        if (prev) {
            this._clearItemSelection(domItem);
            this._itemClicked(prev);
        }
    }
    _itemArrowDown(domItem) {
        const next = this._findNextItem(domItem, "next");
        if (next) {
            this._clearItemSelection(domItem);
            this._itemClicked(next);
        }
    }
    addItem(dataItem, internal = false) {
        if (!internal && !this.multiple && dataItem["selected"]) {
            this.clearSelection();
        }
        const id = this._addItem(this._prepareDataItem(dataItem), internal, null);
        if (!internal) {
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }
        return id;
    }
    addItems(items) {
        return items.map((item) => this.addItem(item));
    }
    removeItem(item) {
        const uiItem = this._locateItem(item);
        if (uiItem) {
            this._clearItemSelection(uiItem);
            uiItem.parentElement.removeChild(uiItem);
            const dataItem = this._getDataItem(uiItem.id);
            this.dataItems.splice(this.dataItems.indexOf(dataItem), 1);
            const selectedIndex = this.selectedDataItems.indexOf(dataItem);
            if (selectedIndex !== -1) {
                this.selectedDataItems.splice(selectedIndex, 1);
            }
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }
    }
    removeItems(items) {
        items.forEach((item) => this.removeItem(item));
    }
    destroy() {
        while (this._target.firstChild) {
            this._target.removeChild(this._target.firstChild);
        }
        this._target.classList.remove(BaseListBox.MAIN_CLASS);
    }
    clearSelection() {
        const allItems = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
        for (let index = 0; index < allItems.length; index++) {
            allItems[index].classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            this._getDataItem(allItems[index].id).selected = false;
        }
        this.selectedDataItems = [];
    }
    getItem(id) {
        let data = null;
        const item = this._locateItem(id);
        if (item) {
            data = this._getDataItem(item.id);
        }
        return data;
    }
    getItems() {
        const items = [];
        const childs = this._list.children;
        for (let index = 0; index < childs.length; index++) {
            items.push(this._getDataItem(childs[index].id));
        }
        return items;
    }
    moveItemUp(id) {
        let newIndex = null;
        const item = this._locateItem(id);
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
    }
    moveItemDown(id) {
        let newIndex = null;
        const item = this._locateItem(id);
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
    }
    moveItemToTop(id) {
        let newIndex = null;
        const item = this._locateItem(id);
        if (item) {
            item.parentElement.insertBefore(item, item.parentElement.firstElementChild);
            newIndex = this._elementIndex(item);
            this._getDataItem(item.id).index = newIndex;
            this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        }
        return newIndex;
    }
    moveItemToBottom(id) {
        let newIndex = null;
        const item = this._locateItem(id);
        if (item) {
            item.parentElement.appendChild(item);
            newIndex = this._elementIndex(item);
            this._getDataItem(item.id).index = newIndex;
        }
        this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
        return newIndex;
    }
    enable(enable) {
        if (enable) {
            this._target.classList.remove(BaseListBox.MAIN_DISABLED_CLASS);
        }
        else if (!this._target.classList.contains(BaseListBox.MAIN_DISABLED_CLASS)) {
            this._target.classList.add(BaseListBox.MAIN_DISABLED_CLASS);
        }
    }
    getSelection() {
        return this.selectedDataItems;
    }
}
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


/***/ }),

/***/ "./src/ts/Index.ts":
/*!*************************!*\
  !*** ./src/ts/Index.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SingleSelectListBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleSelectListBox */ "./src/ts/SingleSelectListBox.ts");
/* harmony import */ var _MultiSelectListBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MultiSelectListBox */ "./src/ts/MultiSelectListBox.ts");


window.SingleSelectListBox = _SingleSelectListBox__WEBPACK_IMPORTED_MODULE_0__["SingleSelectListBox"];
window.MultiSelectListBox = _MultiSelectListBox__WEBPACK_IMPORTED_MODULE_1__["MultiSelectListBox"];


/***/ }),

/***/ "./src/ts/MultiSelectListBox.ts":
/*!**************************************!*\
  !*** ./src/ts/MultiSelectListBox.ts ***!
  \**************************************/
/*! exports provided: MultiSelectListBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectListBox", function() { return MultiSelectListBox; });
/* harmony import */ var _BaseListBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseListBox */ "./src/ts/BaseListBox.ts");

class MultiSelectListBox extends _BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"] {
    constructor(domElement, options) {
        super(domElement, options, true);
        this._createListbox();
    }
    _itemClicked(domItem, ctrl = false) {
        if (domItem.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_GROUP)) {
            return;
        }
        let dataItem = this._getDataItem(domItem.id);
        if (domItem.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_SELECTED)) {
            if (!ctrl) {
                this.clearSelection();
                domItem.classList.add(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = true;
                this.selectedDataItems.push(dataItem);
            }
            else {
                domItem.classList.remove(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = false;
                const removeIndex = this.selectedDataItems.indexOf(this._getDataItem(domItem.id));
                this.selectedDataItems.splice(removeIndex, 1);
            }
        }
        else {
            if (!ctrl) {
                this.clearSelection();
            }
            domItem.focus();
            domItem.classList.add(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_SELECTED);
            dataItem.selected = true;
            this.selectedDataItems.push(dataItem);
        }
        this._fireEvent(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].EVENT_VALUE_CHANGED, this.selectedDataItems);
    }
    _filterChanged() {
        this._fireEvent(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}


/***/ }),

/***/ "./src/ts/SingleSelectListBox.ts":
/*!***************************************!*\
  !*** ./src/ts/SingleSelectListBox.ts ***!
  \***************************************/
/*! exports provided: SingleSelectListBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleSelectListBox", function() { return SingleSelectListBox; });
/* harmony import */ var _BaseListBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseListBox */ "./src/ts/BaseListBox.ts");

class SingleSelectListBox extends _BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"] {
    constructor(domElement, options) {
        super(domElement, options, false);
        this._selectedDomItem = null;
        this._createListbox();
    }
    _itemClicked(domItem, ctrl = false) {
        if (domItem.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_DISABLED) ||
            domItem.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_GROUP)) {
            return;
        }
        if (this._selectedDomItem) {
            this.clearSelection();
            this._selectedDomItem = null;
        }
        domItem.classList.toggle(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_SELECTED);
        domItem.focus();
        this._selectedDomItem = domItem;
        const dataItem = this._getDataItem(domItem.id);
        dataItem.selected = true;
        this.selectedDataItems.push(dataItem);
        this._fireEvent(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].EVENT_VALUE_CHANGED, this._getDataItem(domItem.id));
    }
    _filterChanged() {
        if (!this._selectedDomItem || this._selectedDomItem.style.display === "none") {
            const elements = this._list.querySelectorAll("." + _BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS);
            for (let i = 0; i < elements.length; i++) {
                let element = elements.item(i);
                if (!element.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_GROUP) &&
                    !element.classList.contains(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].LIST_ITEM_CLASS_DISABLED) &&
                    element.style.display !== "none") {
                    this._itemClicked(element);
                    break;
                }
            }
        }
        this._fireEvent(_BaseListBox__WEBPACK_IMPORTED_MODULE_0__["BaseListBox"].EVENT_FILTER_CHANGED, this._searchbar.value);
    }
}


/***/ }),

/***/ 0:
/*!******************************************************************!*\
  !*** multi ./src/ts/Index.ts ./src/styles/extended-listbox.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/win-dev/github/extended-listbox/src/ts/Index.ts */"./src/ts/Index.ts");
module.exports = __webpack_require__(/*! /mnt/win-dev/github/extended-listbox/src/styles/extended-listbox.scss */"./src/styles/extended-listbox.scss");


/***/ })

/******/ });
//# sourceMappingURL=extended-listbox.js.map