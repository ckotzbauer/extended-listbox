/// <reference path="../../typings/tsd.d.ts" />

/// <reference path="./ExtendedListboxInstance.ts" />
/// <reference path="./BaseListBox.ts" />
/// <reference path="./MultiSelectListbox.ts" />
/// <reference path="./SingleSelectListbox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />
/// <reference path="./infrastructure/Util.ts" />

module EL {
    "use strict";

    function initializeListBoxFromOptions(options: ListboxSettings): ExtendedListboxInstance|ExtendedListboxInstance[] {
        "use strict";

        var settings: ListboxSettings = new ListboxSettings();
        settings = $.extend(settings, options);

        var multipleInstances: ExtendedListboxInstance[] = [];
        var singleInstance: ExtendedListboxInstance = null;
        var multipleElements: boolean = this.length > 1;

        this.each(function (): void {
            var listbox: BaseListBox;
            var instance: ExtendedListboxInstance;
            var $this: JQuery = $(this);

            if (settings.multiple) {
                listbox = new MultiSelectListbox($this, settings);
            } else {
                listbox = new SingleSelectListbox($this, settings);
            }

            $this.data('listbox', listbox);

            instance = ExtendedListboxInstance.createFrom(listbox, $this);
            if (multipleElements) {
                multipleInstances.push(instance);
            } else {
                singleInstance = instance;
            }
        });

        return multipleElements ? multipleInstances : singleInstance;
    }

    /**
     * @deprecated: This method will be removed in 2.0.0
     *
     * @param functionName
     * @param callArgs
     * @returns {any}
     */
    function callApiFunction(functionName: string, callArgs: any): any {
        "use strict";

        var publicFunctions: string[] = ["addItem", "removeItem", "destroy", "getItem", "getItems",
            "moveItemUp", "moveItemDown", "clearSelection", "enable"];


        var ret: any = null;

        this.each(function (): void {
            var instance: BaseListBox = $(this).data('listbox');

            Util.deprecatedMethod(functionName, "2.0.0", "corresponding method in class ExtendedListboxInstance");

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
}
