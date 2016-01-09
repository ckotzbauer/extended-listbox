/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="./BaseListBox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />

module EL {
    "use strict";

    export class SingleSelectListbox extends BaseListBox {

        private _selectedDomItem: JQuery;

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
        constructor(domelement: JQuery, options: ListboxSettings) {
            super(domelement, options);
            this._selectedDomItem = null;
        }

        /**
         * Reset all items and select a given one.
         *
         * @this {SingleSelectListbox}
         * @param {object} domItem a DOM object
         */
        public onItemClick(domItem: JQuery): void {
            if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }

            if (this._selectedDomItem) {
                this.clearSelection(true);
                this._selectedDomItem = null;
            }

            domItem.toggleClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
            this._selectedDomItem = domItem;
            domItem.data("dataItem").selected = true;
            this._target.val(domItem.data("dataItem"));
            this._target.trigger('change');

            this.eventHandler.fireValueChangedEvent(domItem.data("dataItem"));
        }


        /**
         * Select first visible item if none selected.
         *
         * @this {SingleSelectListbox}
         */
        public onFilterChange(): void {
            if (!this._selectedDomItem || !this._selectedDomItem.is(':visible')) {
                var element: JQuery = this._list.children(':visible').first();
                if (element && element.length > 0) {
                    this.onItemClick(element);
                }
            }

            this.eventHandler.fireFilterChangedEvent(this._searchbar.val());
        }
    }
}
