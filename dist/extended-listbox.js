/* extended-listbox v6.0.0, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['extended-listbox'] = factory());
}(this, (function () { 'use strict';

    const defaults = {
        searchBar: false,
        searchBarWatermark: "Search...",
        searchBarButton: {
            visible: false,
            icon: "",
            onClick: () => null,
        },
        getItems: () => [],
        onValueChanged: () => null,
        onFilterChanged: () => null,
        onItemsChanged: () => null,
        onItemEnterPressed: () => null,
        onItemDoubleClicked: () => null,
    };

    class BaseListBox {
        constructor(domelement, options, multiple) {
            this.dataItems = [];
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
            searchbarWrapper.classList.add(BaseListBox.SEARCHBAR_CLASS + "-wrapper");
            this._target.appendChild(searchbarWrapper);
            const searchbar = document.createElement("input");
            searchbar.classList.add(BaseListBox.SEARCHBAR_CLASS);
            searchbar.setAttribute("placeholder", this._settings.searchBarWatermark);
            searchbarWrapper.appendChild(searchbar);
            searchbar.onkeyup = () => {
                const searchQuery = searchbar.value.toLowerCase();
                if (searchQuery !== "") {
                    const items = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                    for (let i = 0; i < items.length; i++) {
                        const thisItem = items.item(i);
                        if (thisItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                            continue;
                        }
                        const text = thisItem.innerText.toLowerCase();
                        if (text.indexOf(searchQuery) !== -1) {
                            thisItem.style.display = "block";
                            if (thisItem.parentElement) {
                                thisItem.parentElement.style.display = "block";
                            }
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
                    for (const index in items) {
                        this.addItem(this._prepareDataItem(items[index]), true);
                    }
                }
            }
        }
        _generateItemId() {
            const num = parseInt("" + Math.random() * 10000000, 10);
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
                index: null,
            };
            if (typeof dataItem === "string" || typeof dataItem === "number") {
                item.text = dataItem;
                return item;
            }
            else {
                item = Object.assign(Object.assign({}, item), dataItem);
                const childs = [];
                for (const child of item.childItems || []) {
                    childs.push(this._prepareDataItem(child));
                }
                item.childItems = childs;
                return item;
            }
        }
        _addItem(dataItem, internal, parent) {
            var _a;
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
                (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(item, target);
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
            const containerPadding = parseInt(computed.getPropertyValue("padding-top"), 10) + parseInt(computed.getPropertyValue("padding-bottom"), 10);
            let listHeight = parseInt(computed.getPropertyValue("height"), 10) - containerPadding;
            if (this._settings.searchBar) {
                listHeight -= this._searchbarWrapper.offsetHeight;
            }
            this._list.style.height = listHeight + "px";
        }
        _clearItemSelection(domItem) {
            domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            this._getDataItem(domItem.id).selected = false;
        }
        _locateItem(name) {
            var _a;
            const id = (_a = this.dataItems.find((d) => d.id === name || d.text === name)) === null || _a === void 0 ? void 0 : _a.id;
            const item = this._target.querySelector("#" + id);
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
                potentialNext = direction === "next" ? potentialNext.nextElementSibling : potentialNext.previousElementSibling;
                if (!potentialNext) {
                    const parent = current.parentElement;
                    if (parent) {
                        const sibling = direction === "next" ? parent.nextElementSibling : parent.previousElementSibling;
                        if (!sibling) {
                            return null;
                        }
                        const nextChildren = sibling.children;
                        if (nextChildren.length > 0) {
                            potentialNext =
                                direction === "next" ? nextChildren[0].firstElementChild : nextChildren[0].lastElementChild;
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
            const delegate = this._settings["on" + name[0].toUpperCase() + name.substr(1)];
            if (delegate) {
                delegate({ eventName: name, target: this._target, args: args });
            }
        }
        _elementIndex(element) {
            var _a;
            const childs = Array.prototype.slice.call((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.children);
            return childs.indexOf(element);
        }
        _getDataItem(id) {
            return this.dataItems.find((d) => d.id === id) || null;
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
            if (!internal && !this.multiple && dataItem.selected) {
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
            var _a;
            const uiItem = this._locateItem(item);
            if (uiItem) {
                this._clearItemSelection(uiItem);
                (_a = uiItem.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(uiItem);
                const dataItem = this._getDataItem(uiItem.id);
                this.dataItems.splice(this.dataItems.indexOf(dataItem), 1);
                this.onRemoveItem(dataItem);
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
            for (const item of Array.from(allItems)) {
                item.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                this._getDataItem(item.id).selected = false;
            }
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
            for (const child of Array.from(childs)) {
                items.push(this._getDataItem(child.id));
            }
            return items;
        }
        moveItemUp(id) {
            var _a;
            let newIndex = null;
            const item = this._locateItem(id);
            if (item && item.previousElementSibling) {
                (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(item, item.previousElementSibling);
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
            var _a;
            let newIndex = null;
            const item = this._locateItem(id);
            if (item && item.nextElementSibling) {
                (_a = item.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(item.nextElementSibling, item);
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
            var _a;
            let newIndex = null;
            const item = this._locateItem(id);
            if (item) {
                (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(item, item.parentElement.firstElementChild);
                newIndex = this._elementIndex(item);
                this._getDataItem(item.id).index = newIndex;
                this._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, this.getItems());
            }
            return newIndex;
        }
        moveItemToBottom(id) {
            var _a;
            let newIndex = null;
            const item = this._locateItem(id);
            if (item) {
                (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(item);
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
            return this.selected;
        }
    }
    BaseListBox.MAIN_CLASS = "listbox-root";
    BaseListBox.MAIN_DISABLED_CLASS = "listbox-disabled";
    BaseListBox.LIST_CLASS = "listbox";
    BaseListBox.LIST_ITEM_CLASS = "listbox-item";
    BaseListBox.LIST_ITEM_CLASS_DISABLED = "listbox-item-disabled";
    BaseListBox.LIST_ITEM_CLASS_SELECTED = "listbox-item-selected";
    BaseListBox.LIST_ITEM_CLASS_GROUP = "listbox-item-group";
    BaseListBox.LIST_ITEM_CLASS_CHILD = "listbox-item-child";
    BaseListBox.SEARCHBAR_CLASS = "listbox-searchbar";
    BaseListBox.SEARCHBAR_BUTTON_CLASS = "listbox-searchbar-button";
    BaseListBox.EVENT_VALUE_CHANGED = "valueChanged";
    BaseListBox.EVENT_FILTER_CHANGED = "filterChanged";
    BaseListBox.EVENT_ITEMS_CHANGED = "itemsChanged";
    BaseListBox.EVENT_ITEM_ENTER_PRESSED = "itemEnterPressed";
    BaseListBox.EVENT_ITEM_DOUBLE_CLICKED = "itemDoubleClicked";

    class SingleSelectListBox extends BaseListBox {
        constructor(domElement, options) {
            super(domElement, options, false);
            this._selectedDomItem = null;
            this.selected = null;
            this._createListbox();
        }
        _itemClicked(domItem) {
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
            const dataItem = this._getDataItem(domItem.id);
            dataItem.selected = true;
            this.selected = dataItem;
            this._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this._getDataItem(domItem.id));
        }
        _filterChanged() {
            if (!this._selectedDomItem || this._selectedDomItem.style.display === "none") {
                const elements = this._list.querySelectorAll("." + BaseListBox.LIST_ITEM_CLASS);
                for (let i = 0; i < elements.length; i++) {
                    const element = elements.item(i);
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
        clearSelection() {
            super.clearSelection();
            this.selected = null;
        }
        onRemoveItem(item) {
            var _a;
            if (item.id === ((_a = this.selected) === null || _a === void 0 ? void 0 : _a.id)) {
                this.selected = null;
            }
        }
        _clearItemSelection(domItem) {
            super._clearItemSelection(domItem);
            this.selected = null;
        }
    }

    class MultiSelectListBox extends BaseListBox {
        constructor(domElement, options) {
            super(domElement, options, true);
            this.selected = [];
            this._createListbox();
        }
        _itemClicked(domItem, ctrl = false) {
            if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }
            const dataItem = this._getDataItem(domItem.id);
            if (domItem.classList.contains(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
                if (!ctrl) {
                    this.clearSelection();
                    domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                    dataItem.selected = true;
                    this.selected.push(dataItem);
                }
                else {
                    domItem.classList.remove(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                    dataItem.selected = false;
                    const removeIndex = this.selected.indexOf(this._getDataItem(domItem.id));
                    this.selected.splice(removeIndex, 1);
                }
            }
            else {
                if (!ctrl) {
                    this.clearSelection();
                }
                domItem.focus();
                domItem.classList.add(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                dataItem.selected = true;
                this.selected.push(dataItem);
            }
            this._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, this.selected);
        }
        _filterChanged() {
            this._fireEvent(BaseListBox.EVENT_FILTER_CHANGED, this._searchbar.value);
        }
        clearSelection() {
            super.clearSelection();
            this.selected = [];
        }
        onRemoveItem(item) {
            const selectedIndex = this.selected.indexOf(item);
            if (selectedIndex !== -1) {
                this.selected.splice(selectedIndex, 1);
            }
        }
        _clearItemSelection(domItem) {
            super._clearItemSelection(domItem);
            const currentItem = this._getDataItem(domItem.id);
            const removeIndex = this.selected.indexOf(currentItem);
            this.selected.splice(removeIndex, 1);
        }
    }

    function createListBox(element, mode, instanceConfig) {
        const config = Object.assign(Object.assign({}, defaults), instanceConfig);
        if (mode === "single") {
            return new SingleSelectListBox(element, config);
        }
        else {
            return new MultiSelectListBox(element, config);
        }
    }

    function _listBox(nodeList, mode, config) {
        const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement);
        const instances = [];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            try {
                if (node._listBox !== undefined) {
                    node._listBox.destroy();
                    node._listBox = undefined;
                }
                node._listBox = createListBox(node, mode, config || {});
                instances.push(node._listBox);
            }
            catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    const listBox = function (selector, mode, config) {
        if (typeof selector === "string") {
            return _listBox(window.document.querySelectorAll(selector), mode, config);
        }
        else if (selector instanceof Node) {
            return _listBox([selector], mode, config);
        }
        else {
            return _listBox(selector, mode, config);
        }
    };

    return listBox;

})));
