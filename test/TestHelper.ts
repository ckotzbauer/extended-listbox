/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../dist/extended-listbox.d.ts" />

export class TestHelper {

    public static child(element: JQuery, index: number = null): JQuery {
        if (!index) {
            index = 0;
        }

        return $(element.children()[index]);
    }

    public static generateSingleList(options: ListBoxOptions = null, items: any[] = null): JQuery {
        options = $.extend({
            getItems: function (): any[] {
                return items;
            }
        }, options);

        return $('#test').listbox(options);
    }

    public static generateMultipleList(options: ListBoxOptions = null, items: any[] = null): JQuery {
        options = $.extend({
            multiple: true,
            getItems: function (): any[] {
                return items;
            }
        }, options);

        return $('#test').listbox(options);
    }

    public static itemsToVal(items: JQuery): string {
        var result: string = '';
        for (var i: number = 0; i < items.length; ++i) {
            if (i !== 0) {
                result += ',';
            }

            result += $(items[i]).data("dataItem").text;
        }
        return result;
    }

    public static jsonToVal(items: any[]): string {
        var result: string = '';
        for (var i: number = 0; i < items.length; ++i) {
            if (i !== 0) {
                result += ',';
            }

            result += JSON.parse(items[i]).text;
        }
        return result;
    }
}
