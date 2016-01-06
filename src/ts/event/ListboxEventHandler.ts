/// <reference path="../../../typings/tsd.d.ts" />

/// <reference path="../BaseListBox.ts" />
/// <reference path="./ListboxEvent.ts" />

module EL {
    "use strict";

    export class ListboxEventHandler {

        private listBox: BaseListBox;

        constructor(listBox: BaseListBox) {
            this.listBox = listBox;
        }

        public fireValueChangedEvent(args: any): void {
            var delegate: Function = this.listBox._settings.onValueChanged;
            if (delegate) {
                var event: ListboxEvent = new ListboxEvent(ListboxEvent.VALUE_CHANGED, this.listBox._target, args);
                delegate(event);
            }
        }

        public fireItemsChangedEvent(args: any): void {
            var delegate: Function = this.listBox._settings.onItemsChanged;
            if (delegate) {
                var event: ListboxEvent = new ListboxEvent(ListboxEvent.ITEMS_CHANGED, this.listBox._target, args);
                delegate(event);
            }
        }

        public fireFilterChangedEvent(args: any): void {
            var delegate: Function = this.listBox._settings.onFilterChanged;
            if (delegate) {
                var event: ListboxEvent = new ListboxEvent(ListboxEvent.FILTER_CHANGED, this.listBox._target, args);
                delegate(event);
            }
        }
    }
}
