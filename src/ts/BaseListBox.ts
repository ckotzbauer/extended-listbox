/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./ListboxSettings.ts" />

module ExtendedListbox {

    export abstract class BaseListBox {

        protected static MAIN_CLASS:string = 'listbox-root';
        protected static LIST_CLASS:string = 'listbox';
        protected static LIST_ITEM_CLASS:string = 'listbox-item';
        protected static LIST_ITEM_CLASS_DISABLED:string = 'listbox-item-disabled';
        protected static LIST_ITEM_CLASS_SELECTED:string = 'listbox-item-selected';
        protected static LIST_ITEM_CLASS_GROUP:string = 'listbox-item-group';
        protected static LIST_ITEM_CLASS_CHILD:string = 'listbox-item-child';
        protected static SEARCHBAR_CLASS:string = 'listbox-searchbar';
        protected static SEARCHBAR_BUTTON_CLASS:string = 'listbox-searchbar-button';

        protected _parent:JQuery;
        protected _list:JQuery;
        private _searchbarWrapper:JQuery;
        protected _searchbar:JQuery;

        protected _settings:ListboxSettings;


        /**
         * Create an instance of Listbox. The constructor creates div-based
         * listbox under the given root domelement. It applies the given
         * configuration.
         *
         * @constructor
         * @this {Listbox}
         * @param {object} domelement DOM element to be converted to the Listbox
         * @param {object} options an object with Listbox settings
         */
        constructor(domelement, options) {
            this._parent = domelement;
            this._settings = options;

            this._createListbox();
        }


        abstract onItemClick(domItem: JQuery): void;
        abstract onFilterChange(): void;


        /**
         * Creates a `div`-based listbox, which includes such things as
         * container, listbox itself and searchbar as an optional element.
         *
         * @private
         * @this {Listbox}
         */
        private _createListbox() {
            this._parent.addClass(BaseListBox.MAIN_CLASS);

            if (this._settings.searchBar) {
                this._createSearchbar();
            }

            this._createList();
        }

        /**
         * Creates a Listbox's searchbar.
         *
         * @private
         * @this {Listbox}
         * @TODO: critical to rewrite this piece of shit
         */
        private _createSearchbar() {
            // searchbar wrapper is needed for properly stretch
            // the searchbar over the listbox width
            var searchbarWrapper = $('<div>')
                .addClass(BaseListBox.SEARCHBAR_CLASS + '-wrapper')
                .appendTo(this._parent);

            var searchbar = $('<input>')
                .addClass(BaseListBox.SEARCHBAR_CLASS)
                .appendTo(searchbarWrapper)
                .attr('placeholder', this._settings.searchBarWatermark);

            // set filter handler
            var self:BaseListBox = this;
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

                        if (text.search('^' + searchQuery) != -1) {
                            $this.css('display', 'block');
                            $this.parent().css('display', 'block');
                        } else {
                            $this.css('display', 'none');
                        }
                    });

                    // hide group item only, if all childs are hidden
                    self._list.find("." + BaseListBox.LIST_ITEM_CLASS_GROUP).each(function () {
                        var $this = $(this);
                        if ($this.children(':visible').length === 0) {
                            $this.css('display', 'none');
                        } else {
                            $this.css('display', 'block');
                        }
                    });
                } else {
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
        }


        /**
         * Creates a listbox itself.
         *
         * @private
         * @this {Listbox}
         */
        private _createList() {
            // create container
            this._list = $('<div>')
                .addClass(BaseListBox.LIST_CLASS)
                .appendTo(this._parent);

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
        }

        /**
         * Generates a new ID for a item.
         *
         * @private
         * @this {Listbox}
         */
        protected _generateItemId() {
            var num = parseInt("" + (Math.random() * 10000000), 10);
            return "listboxitem" + num;
        }

        /**
         * Prepares the dataobject for one item.
         *
         * @private
         * @this {Listbox}
         * @param {object} dataItem object returned from getItems
         */
        protected _prepareDataItem(dataItem) {
            var defaults = {
                text: null,
                id: this._generateItemId(),
                index: null,
                disabled: false,
                selected: false,
                groupHeader: false,
                parentGroupId: null,
                childItems: []
            };

            if (typeof dataItem === "string" || typeof dataItem === "number") {
                defaults.text = dataItem;
                return defaults;
            } else {
                var item = $.extend(defaults, dataItem);

                var childs = [];
                var index;
                for (index = 0; index < item.childItems.length; index++) {
                    childs.push(this._prepareDataItem(item.childItems[index]));
                }

                item.childItems = childs;
                return item;
            }
        }


        /**
         * Add item to the listbox.
         *
         * @this {Listbox}
         * @param {object} dataItem display data for item
         * @param {object} internal: true if this function is not called directly as api function.
         * * @param {object} $parent: the DOM parent element
         */
        protected _addItem(dataItem, internal, $parent) {
            var self = this;
            var item = $('<div>')
                .addClass(BaseListBox.LIST_ITEM_CLASS)
                .text(dataItem.text)
                .attr("id", dataItem.id)
                .attr("title", dataItem.text)
                .data("dataItem", dataItem)
                .click(function () {
                    self.onItemClick($(this));
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
                var $possibleParent = $("#" + dataItem.parentGroupId, this._list);
                if ($possibleParent.length === 0) {
                    $possibleParent = $('div[title="' + dataItem.parentGroupId + '"]');
                }

                if ($possibleParent.length > 0) {
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
            } else {
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
        }

        /**
         * Add item to the listbox.
         *
         * @this {Listbox}
         * @param {object} dataItem display data for item
         * @param {object} internal: true if this function is not called directly as api function.
         */
        protected addItem(dataItem, internal) {
            if (!internal && !this._settings.multiple && dataItem.selected) {
                this.clearSelection(internal);
            }

            var id = this._addItem(this._prepareDataItem(dataItem), internal, null);

            if (!internal) {
                if (this._settings.onItemsChanged) {
                    this._settings.onItemsChanged(this.getItems());
                }
            }

            return id;
        }


        /**
         * Remove first matching item from the listbox.
         *
         * @this {Listbox}
         * @param {string} item: display text or id from item to remove
         */
        protected removeItem(item) {
            var items = this._list.find("." + BaseListBox.LIST_ITEM_CLASS);
            var index;

            for (index in items) {
                var uiItem = $(items[index]);
                if (uiItem.text() === item || uiItem.attr("id") === item) {
                    this._clearItemSelection(uiItem);

                    uiItem.remove();

                    if (this._settings.onItemsChanged) {
                        this._settings.onItemsChanged(this.getItems());
                    }

                    return;
                }
            }
        }


        /**
         * Reverts all changes on the DOM
         *
         * @this {Listbox}
         */
        protected destroy() {
            this._parent.children().remove();
            this._parent.removeClass(BaseListBox.MAIN_CLASS);
        }


        /**
         * Resize list to listbox. It's a small hack since I can't
         * do it with CSS.
         *
         * @private
         */
        protected _resizeListToListbox() {
            var listHeight = this._parent.height();

            if (this._settings.searchBar) {
                listHeight -= this._searchbarWrapper.outerHeight(true);
            }

            this._list.height(listHeight);
        }


        /**
         * Clears all selected items.
         *
         * @private
         */
        protected clearSelection(internal) {
            // Remove selected class from all other items
            var allItems = this._list.find("." + BaseListBox.LIST_ITEM_CLASS);

            allItems.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            var index;
            for (index = 0; index < allItems.length; index++) {
                $(allItems[index]).data("dataItem").selected = false;
            }

            if (this._settings.multiple) {
                this._parent.val([]);
            } else {
                this._parent.val(null);
            }

            if (!internal) {
                this._parent.trigger('change');
            }
        }


        /**
         * Clears selection of given items.
         *
         * @private
         * @param {object} domItem DOM item
         */
        protected _clearItemSelection(domItem) {
            domItem.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            domItem.data("dataItem").selected = false;

            if (this._settings.multiple) {
                var parentValues = this._parent.val();
                var removeIndex = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
                parentValues.splice(removeIndex, 1);
                this._parent.val(parentValues);
            } else {
                this._parent.val(null);
            }

            this._parent.trigger('change');
        }


        /**
         * Returns the dataItem for a given id or text.
         *
         * @private
         * @param {object} id unique id or text from listItem
         */
        protected getItem(id) {
            var data = null;

            var $item = $("#" + id, this._list);
            if ($item.length === 0) {
                $item = $('div[title="' + id + '"]');
            }

            if ($item.length > 0) {
                data = $item.data("dataItem");
            }

            return data;
        }


        /**
         * Returns all dataItems.
         *
         * @private
         */
        protected getItems() {
            var dataItems = [];

            var childs = this._list.children();
            var index;
            for (index = 0; index < childs.length; index++) {
                dataItems.push($(childs[index]).data("dataItem"));
            }

            return dataItems;
        }


        /**
         * Decreases the index of the item by one.
         *
         * @private
         * @param {object} id unique id or text from listItem
         */
        protected moveItemUp(id) {
            var newIndex = null;

            var $item = $("#" + id, this._list);
            if ($item.length === 0) {
                $item = $('div[title="' + id + '"]');
            }

            if ($item.length > 0) {
                $item.insertBefore($item.prev());
                newIndex = $item.index();
                $item.data("dataItem").index = newIndex;
            }

            if (this._settings.onItemsChanged) {
                this._settings.onItemsChanged(this.getItems());
            }

            return newIndex;
        }

        /**
         * Increases the index of the item by one.
         *
         * @private
         * @param {object} id unique id or text from listItem
         */
        protected moveItemDown(id) {
            var newIndex = null;

            var $item = $("#" + id, this._list);
            if ($item.length === 0) {
                $item = $('div[title="' + id + '"]');
            }

            if ($item.length > 0) {
                $item.insertAfter($item.next());
                newIndex = $item.index();
                $item.data("dataItem").index = newIndex;
            }

            if (this._settings.onItemsChanged) {
                this._settings.onItemsChanged(this.getItems());
            }

            return newIndex;
        }
    }
}


