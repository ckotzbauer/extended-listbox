/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./MultiSelectListbox.ts" />
/// <reference path="./SingleSelectListbox.ts" />

module ExtendedListbox {
    function initializeListBoxFromOptions(options) {
        var settings = $.extend({
            searchBar: false,
            searchBarWatermark: 'Search...',
            searchBarButton: { visible: false, icon: null, onClick: null },
            multiple: false,
            getItems: null,
            onValueChanged: null,
            onFilterChanged: null,
            onItemsChanged: null
        }, options);

        return this.each(function () {
            var instance;

            if (settings.multiple) {
                instance = new MultiSelectListbox($(this), settings);
            } else {
                instance = new SingleSelectListbox($(this), settings);
            }

            $(this).data('listbox', instance);

            return !!instance;
        });
    }

    function callApiFunction(functionName, callArgs) {
        var publicFunctions = ["addItem", "removeItem", "destroy", "getItem", "getItems",
            "moveItemUp", "moveItemDown", "clearSelection"];


        var ret = null;

        this.each(function () {
            var instance = $(this).data('listbox');

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

            var args = Array.prototype.slice.call(callArgs, 1);

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
    $.fn.listbox = function (options) {
        if (typeof options === 'object') {
            return initializeListBoxFromOptions.call(this, options);
        } else if (typeof options === 'string') {
            return callApiFunction.call(this, options, arguments);
        }
    };
}
