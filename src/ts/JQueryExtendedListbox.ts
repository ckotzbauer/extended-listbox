/// <reference path="../../typings/tsd.d.ts" />

import {MultiSelectListbox} from "./MultiSelectListbox";
import {SingleSelectListbox} from "./SingleSelectListbox";
import {BaseListBox} from "./BaseListBox";
import {ListboxSettings} from "./ListboxSettings";

function initializeListBoxFromOptions(options: ListboxSettings): JQuery {
    var settings: ListboxSettings = new ListboxSettings();
    settings = $.extend(settings, options);

    return this.each(function (): boolean {
        var instance: BaseListBox;

        if (settings.multiple) {
            instance = new MultiSelectListbox($(this), settings);
        } else {
            instance = new SingleSelectListbox($(this), settings);
        }

        $(this).data('listbox', instance);

        return !!instance;
    });
}

function callApiFunction(functionName: string, callArgs: any): any {
    var publicFunctions: string[] = ["addItem", "removeItem", "destroy", "getItem", "getItems",
        "moveItemUp", "moveItemDown", "clearSelection", "enable"];


    var ret: any = null;

    this.each(function (): void {
        var instance: BaseListBox = $(this).data('listbox');

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

        var args: any = Array.prototype.slice.call(callArgs, 1);

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
$.fn.listbox = function (options: any): any {
    if (typeof options === 'object') {
        return initializeListBoxFromOptions.call(this, options);
    } else if (typeof options === 'string') {
        return callApiFunction.call(this, options, arguments);
    }
};
