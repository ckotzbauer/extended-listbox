/**
 * Listbox.js is a simple jQuery plugin that provides a more powerful
 * alternative to the standard `<select>` tag.
 *
 * The main problem of <select> tag is that last one isn't flexible
 * for customization with *CSS*. ListboxJS solves this problem.
 * This component creates a list structure based on <div> tags.
 * The configuration is completely in JavaScript. It opens up great
 * possibilities for customization.
 *
 * @copyright   (c) 2015, Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * @version     1.0.0-beta.5
 * @license     BSD
 */

(function ($) {
    'use strict';


    // CSS classes used by Listbox.js
    var MAIN_CLASS = 'listbox-root';
    var LIST_CLASS = 'listbox';
    var LIST_ITEM_CLASS = 'listbox-item';
    var LIST_ITEM_CLASS_DISABLED = 'listbox-item-disabled';
    var LIST_ITEM_CLASS_SELECTED = 'listbox-item-selected';
    var LIST_ITEM_CLASS_GROUP = 'listbox-item-group';
    var LIST_ITEM_CLASS_CHILD = 'listbox-item-child';
    var SEARCHBAR_CLASS = 'listbox-searchbar';
    var SEARCHBAR_BUTTON_CLASS = 'listbox-searchbar-button';



    /**
     * Inherit the prototype methods from one constructor into another.
     * The prototype of `constructor` will be set to a new object created
     * from `superConstructor`.
     *
     * As an additional convenience, `superConstructor` will be accessible
     * through the `constructor.super_` property.
     */
    function inherits(constructor, superConstructor) {
        constructor.prototype = Object.create(superConstructor.prototype);
        constructor.prototype.constructor = constructor;
        constructor.prototype.super_ = superConstructor;
    }



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
    function Listbox(domelement, options) {
        this._parent   = domelement;
        this._settings = options;

        this._createListbox();
    }



    /**
     * Creates a `div`-based listbox, which includes such things as
     * container, listbox itself and searchbar as an optional element.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createListbox = function () {
        this._parent.addClass(MAIN_CLASS);

        if (this._settings.searchBar) {
            this._createSearchbar();
        }

        this._createList();
    };

    /**
     * Creates a Listbox's searchbar.
     *
     * @private
     * @this {Listbox}
     * @TODO: critical to rewrite this piece of shit
     */
    Listbox.prototype._createSearchbar = function () {
        // searchbar wrapper is needed for properly stretch
        // the searchbar over the listbox width
        var searchbarWrapper = $('<div>')
            .addClass(SEARCHBAR_CLASS + '-wrapper')
            .appendTo(this._parent);

        var searchbar = $('<input>')
            .addClass(SEARCHBAR_CLASS)
            .appendTo(searchbarWrapper)
            .attr('placeholder', this._settings.searchBarWatermark);

        // set filter handler
        var self = this;
        searchbar.keyup(function () {
            var searchQuery = $(this).val().toLowerCase();

            if (searchQuery !== '') {
                // hide list items which are not matched search query
                self._list.find("." + LIST_ITEM_CLASS).each(function () {
                    var $this = $(this);

                    if ($this.hasClass(LIST_ITEM_CLASS_GROUP)) {
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
                self._list.find("." + LIST_ITEM_CLASS_GROUP).each(function () {
                    var $this = $(this);
                    if ($this.children(':visible').length === 0) {
                        $this.css('display', 'none');
                    } else {
                        $this.css('display', 'block');
                    }
                });
            } else {
                // make visible all list items
                self._list.find("." + LIST_ITEM_CLASS).each(function () {
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
                .addClass(SEARCHBAR_BUTTON_CLASS)
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
     * @this {Listbox}
     */
    Listbox.prototype._createList = function () {
        // create container
        this._list = $('<div>')
            .addClass(LIST_CLASS)
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
    };

    /**
     * Generates a new ID for a item.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._generateItemId = function () {
        var num = parseInt(Math.random() * 10000000, 10);
        return "listboxitem" + num;
    };

    /**
     * Prepares the dataobject for one item.
     *
     * @private
     * @this {Listbox}
     * @param {object} dataItem object returned from getItems
     */
    Listbox.prototype._prepareDataItem = function (dataItem) {
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
    };


    /**
     * Add item to the listbox.
     *
     * @this {Listbox}
     * @param {object} dataItem display data for item
     * @param {object} internal: true if this function is not called directly as api function.
     * * @param {object} $parent: the DOM parent element
     */
    Listbox.prototype._addItem = function (dataItem, internal, $parent) {
        var self = this;
        var item = $('<div>')
            .addClass(LIST_ITEM_CLASS)
            .text(dataItem.text)
            .attr("id", dataItem.id)
            .attr("title", dataItem.text)
            .data("dataItem", dataItem)
            .click(function () {
                self.onItemClick($(this));
            });

        if (dataItem.disabled) {
            item.addClass(LIST_ITEM_CLASS_DISABLED);
        }

        if (dataItem.groupHeader) {
            item.addClass(LIST_ITEM_CLASS_GROUP);
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
            item.addClass(LIST_ITEM_CLASS_CHILD);
        }

        var $target = $parent ? $parent : this._list;
        if (dataItem.index !== undefined && dataItem.index !== null && !internal) {
            $target = $target.children().eq(dataItem.index);
            item.insertBefore($target);
        } else {
            item.appendTo($target);
        }

        if (dataItem.childItems && dataItem.childItems.length > 0) {
            if (!item.hasClass(LIST_ITEM_CLASS_GROUP)) {
                item.addClass(LIST_ITEM_CLASS_GROUP);
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
     * @this {Listbox}
     * @param {object} dataItem display data for item
     * @param {object} internal: true if this function is not called directly as api function.
     */
    Listbox.prototype.addItem = function (dataItem, internal) {
        if (!internal && !this._settings.multiple && dataItem.selected) {
            this.clearSelection();
        }

        var id = this._addItem(this._prepareDataItem(dataItem), internal);

        if (!internal) {
            if (this._settings.onItemsChanged) {
                this._settings.onItemsChanged(this.getItems());
            }
        }

        return id;
    };




    /**
     * Remove first matching item from the listbox.
     *
     * @this {Listbox}
     * @param {string} item: display text or id from item to remove
     */
    Listbox.prototype.removeItem = function (item) {
        var items = this._list.find("." + LIST_ITEM_CLASS);
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
    };




    /**
     * Reverts all changes on the DOM
     *
     * @this {Listbox}
     */
    Listbox.prototype.destroy = function () {
        this._parent.children().remove();
        this._parent.removeClass(MAIN_CLASS);
    };




    /**
     * Resize list to listbox. It's a small hack since I can't
     * do it with CSS.
     *
     * @private
     */
    Listbox.prototype._resizeListToListbox = function () {
        var listHeight = this._parent.height();

        if (this._settings.searchBar) {
            listHeight -= this._searchbarWrapper.outerHeight(true);
        }

        this._list.height(listHeight);
    };


    /**
     * Clears all selected items.
     *
     * @private
     */
    Listbox.prototype.clearSelection = function() {
        // Remove selected class from all other items
        var allItems = this._list.find("." + LIST_ITEM_CLASS);

        allItems.removeClass(LIST_ITEM_CLASS_SELECTED);
        var index;
        for (index = 0; index < allItems.length; index++) {
            $(allItems[index]).data("dataItem").selected = false;
        }

        if (this._settings.multiple) {
            this._parent.val([]);
        } else {
            this._parent.val(null);
        }

        this._parent.trigger('change');
    };


    /**
     * Clears selection of given items.
     *
     * @private
     * @param {object} domItem DOM item
     */
    Listbox.prototype._clearItemSelection = function(domItem) {
        domItem.removeClass(LIST_ITEM_CLASS_SELECTED);
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
    };



    /**
     * Returns the dataItem for a given id or text.
     *
     * @private
     * @param {object} id unique id or text from listItem
     */
    Listbox.prototype.getItem = function(id) {
        var data = null;

        var $item = $("#" + id, this._list);
        if ($item.length === 0) {
            $item = $('div[title="' + id + '"]');
        }

        if ($item.length > 0) {
            data = $item.data("dataItem");
        }

        return data;
    };


    /**
     * Returns all dataItems.
     *
     * @private
     */
    Listbox.prototype.getItems = function() {
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
     * @private
     * @param {object} id unique id or text from listItem
     */
    Listbox.prototype.moveItemUp = function(id) {
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
    };

    /**
     * Increases the index of the item by one.
     *
     * @private
     * @param {object} id unique id or text from listItem
     */
    Listbox.prototype.moveItemDown = function(id) {
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
    };




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
        this.super_.call(this, domelement, options);
        this._selectedDomItem = null;
    }

    inherits(SingleSelectListbox, Listbox);


    /**
     * Reset all items and select a given one.
     *
     * @this {SingleSelectListbox}
     * @param {object} domItem a DOM object
     */
    SingleSelectListbox.prototype.onItemClick = function (domItem) {
        if (domItem.hasClass(LIST_ITEM_CLASS_DISABLED) || domItem.hasClass(LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        this.clearSelection();

        this._selectedDomItem = null;

        domItem.toggleClass(LIST_ITEM_CLASS_SELECTED);
        this._selectedDomItem = domItem;
        domItem.data("dataItem").selected = true;
        this._parent.val(domItem.data("dataItem"));
        this._parent.trigger('change');

        if (this._settings.onValueChanged) {
            this._settings.onValueChanged(domItem.data("dataItem"));
        }
    };


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    SingleSelectListbox.prototype.onFilterChange = function () {
        if (!this._selectedDomItem || !this._selectedDomItem.is(':visible')) {
            this.onItemClick(this._list.children(':visible').first());
        }

        if (this._settings.onFilterChanged) {
            this._settings.onFilterChanged(this._searchbar.val());
        }
    };




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
        this.super_.call(this, domelement, options);
    }

    inherits(MultiSelectListbox, Listbox);




    /**
     * Toggle item status.
     *
     * @this {MultiSelectListbox}
     * @param {object} domItem a DOM object
     */
    MultiSelectListbox.prototype.onItemClick = function (domItem) {
        if (domItem.hasClass(LIST_ITEM_CLASS_DISABLED) || domItem.hasClass(LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        var parentValues = this._parent.val();

        if (domItem.hasClass(LIST_ITEM_CLASS_SELECTED)) {
            domItem.removeClass(LIST_ITEM_CLASS_SELECTED);

            var removeIndex = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
            parentValues.splice(removeIndex, 1);

            domItem.data("dataItem").selected = false;
        } else {
            domItem.addClass(LIST_ITEM_CLASS_SELECTED);
            domItem.data("dataItem").selected = true;

            if (!parentValues) {
                parentValues = [];
            }

            parentValues.push(JSON.stringify(domItem.data("dataItem")));
        }

        this._parent.val(parentValues);
        this._parent.trigger('change');

        if (this._settings.onValueChanged) {
            this._settings.onValueChanged(parentValues);
        }
    };




    function initializeListBoxFromOptions(options) {
        var settings = $.extend({
            searchBar: false,
            searchBarWatermark: 'Search...',
            searchBarButton: { visible: false, icon: null, onClick: null },
            multiple: false,
            getItems: null,
            onValueChanged: null,
            onFilterChanged: null,
            onItemsChanged: null
        }, options);

        return this.each(function () {
            var instance;

            if (settings.multiple) {
                instance = new MultiSelectListbox($(this), settings);
            } else {
                instance = new SingleSelectListbox($(this), settings);
            }

            $(this).data('listbox', instance);

            return !!instance;
        });
    }

    function callApiFunction(functionName, callArgs) {
        var publicFunctions = ["addItem", "removeItem", "destroy", "getItem", "getItems",
            "moveItemUp", "moveItemDown", "clearSelection"];


        var ret = null;

        this.each(function () {
            var instance = $(this).data('listbox');

            if (instance == null && window.console && console.error) {
                console.error(
                    'The listbox(\'' + functionName + '\') method was called on an ' +
                    'element that is not using ListBox.'
                );
                return;
            }

            if ($.inArray(functionName, publicFunctions) === -1) {
                console.error(
                    '' + functionName + ' is no public API function.'
                );
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
        if (typeof options === 'object') {
            return initializeListBoxFromOptions.call(this, options);
        } else if (typeof options === 'string') {
            return callApiFunction.call(this, options, arguments);
        }
    };
})(jQuery);
