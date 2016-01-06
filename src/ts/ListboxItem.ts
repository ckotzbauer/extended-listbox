/// <reference path="../../typings/tsd.d.ts" />

module EL {
    "use strict";

    export class ListboxItem {
        public text: string = null;
        public id: string = null;
        public index: number = null;
        public disabled: boolean = false;
        public selected: boolean = false;
        public groupHeader: boolean = false;
        public parentGroupId: string = null;
        public childItems: ListboxItem[] = [];
    }
}
