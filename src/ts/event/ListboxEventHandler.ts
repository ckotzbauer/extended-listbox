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

        private fire(name: string, delegate: Function, args: any): void {
            if (delegate) {
                var event: ListboxEvent = new ListboxEvent(name, this.listBox._target, args);
                delegate(event);
            }
        }

        public fireValueChangedEvent(args: any): void {
            this.fire(ListboxEvent.VALUE_CHANGED, this.listBox._settings.onValueChanged, args);
        }

        public fireItemsChangedEvent(args: any): void {
            this.fire(ListboxEvent.ITEMS_CHANGED, this.listBox._settings.onItemsChanged, args);
        }

        public fireFilterChangedEvent(args: any): void {
            this.fire(ListboxEvent.FILTER_CHANGED, this.listBox._settings.onFilterChanged, args);
        }

        public fireItemEnterPressedEvent(args: any): void {
            this.fire(ListboxEvent.ITEM_ENTER_PRESSED, this.listBox._settings.onItemEnterPressed, args);
        }

        public fireItemDoubleClickedEvent(args: any): void {
            this.fire(ListboxEvent.ITEM_DOUBLE_CLICKED, this.listBox._settings.onItemDoubleClicked, args);
        }
    }
}
