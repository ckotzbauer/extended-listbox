/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="./BaseListBox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />

module EL {
    "use strict";

    export class MultiSelectListbox extends BaseListBox {

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
        constructor(domelement: JQuery, options: ListboxSettings) {
            super(domelement, options);
        }

        /**
         * Toggle item status.
         *
         * @this {MultiSelectListbox}
         * @param {object} domItem a DOM object
         */
        public onItemClick(domItem: JQuery): void {
            if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_DISABLED) ||
                domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_GROUP)) {
                return;
            }

            var parentValues: any[] = this._target.val();

            if (domItem.hasClass(BaseListBox.LIST_ITEM_CLASS_SELECTED)) {
                domItem.removeClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);

                var removeIndex: number = parentValues.indexOf(JSON.stringify(domItem.data("dataItem")));
                parentValues.splice(removeIndex, 1);

                domItem.data("dataItem").selected = false;
            } else {
                domItem.addClass(BaseListBox.LIST_ITEM_CLASS_SELECTED);
                domItem.data("dataItem").selected = true;

                if (!parentValues) {
                    parentValues = [];
                }

                parentValues.push(JSON.stringify(domItem.data("dataItem")));
            }

            this._target.val(parentValues);
            this._target.trigger('change');

            this.eventHandler.fireValueChangedEvent(parentValues);
        }

        public onFilterChange(): void {
            return undefined;
        }
    }
}
