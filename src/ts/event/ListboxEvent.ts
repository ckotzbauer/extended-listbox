/// <reference path="../../../typings/tsd.d.ts" />

module EL {
    "use strict";

    export class ListboxEvent {

        public static VALUE_CHANGED: string = "valueChanged";
        public static FILTER_CHANGED: string = "filterChanged";
        public static ITEMS_CHANGED: string = "itemsChanged";

        public eventName: string;
        public target: JQuery;
        public args: any;

        constructor(eventName: string, target: JQuery, args: any) {
            this.eventName = eventName;
            this.target = target;
            this.args = args;
        }
    }
}
