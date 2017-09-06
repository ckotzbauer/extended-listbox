/// <reference path="../test-typings.d.ts" />
/// <amd-module name="build/out/test/test/infrastructure/TestHelper"/>

import "../../src/ts/JQueryExtendedListbox";
//import ExtendedListboxInstance = require("../../src/ts/ExtendedListboxInstance");

class TestHelper {

    public static child(element: JQuery, index: number = null): JQuery {
        if (!index) {
            index = 0;
        }

        return $(element.children()[index]);
    }

    public static children(element: JQuery): JQuery[] {
        var childs: JQuery[] = [];

        for (var i: number = 0; i < element.children().length; i++) {
            var c: Element = element.children()[i];
            childs.push($(c));
        }

        return childs;
    }

    public static generateSingleList(options: ListboxSettings = null, items: ListboxItem[] = null): ExtendedListboxInstance {
        options = $.extend({
            getItems: (): ListboxItem[] => {
                return items;
            }
        }, options);

        $('#qunit-fixture').append('<div id="test">');
        let $test: JQuery = $('#test');

        return <ExtendedListboxInstance>$test.listbox(options);
    }

    public static generateMultipleList(options: ListboxSettings = null, items: ListboxItem[] = null): ExtendedListboxInstance {
        options = $.extend({
            multiple: true,
            getItems: (): ListboxItem[] => {
                return items;
            }
        }, options);

        $('#qunit-fixture').append('<div id="test">');
        let $test: JQuery = $('#test');

        return <ExtendedListboxInstance>$('#test').listbox(options);
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

    public static jsonToVal(items: string|number|string[]): string {
        var result: string = '';
        for (var i: number = 0; i < (<string[]>items).length; ++i) {
            if (i !== 0) {
                result += ',';
            }

            result += JSON.parse(items[i]).text;
        }
        return result;
    }

    public static startsWith(s: string, check: string): boolean {
        return s.indexOf(check) === 0;
    }

    public static beforeEach(): void {
        $('body').append('<div id="qunit-fixture"></div>');
    }

    public static afterEach(): void {
        $('#qunit-fixture').remove();
    }
}

export = TestHelper;
