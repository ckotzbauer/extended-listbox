define("snippets", function () {

    var Snippets = function () {
        this.exampleSnippets = [];
        this.apiFunctionSnippets = [];
        this.apiClassSnippets = [];
        this.cssSnippets = [];


        ////  EXAMPLES  ////

        this.exampleSnippets.push({
            snippetId: "exampleSnippet1",
            title: "Simple list of items"
        });

        this.exampleSnippets.push({
            snippetId: "exampleSnippet2",
            title: "Multiselect list",
            subtitle: "Multiple items are selectable."
        });

        this.exampleSnippets.push({
            snippetId: "exampleSnippet3",
            title: "Searchable list",
            subtitle: "List with preselection and a searchBar."
        });

        this.exampleSnippets.push({
            snippetId: "exampleSnippet4",
            title: "Grouped list items",
            subtitle: "Multiple item groups and disabled items."
        });



        ////  API FUNCTIONS  ////

        var deprecationAlert = { type: "warning", text: "<b>Deprecated:</b> This method is replaced with " +
            "corresponding method in ExtendedListboxInstance and will be removed in 2.0.0" };

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet1",
            title: "Construction",
            apiSignature: "$('#functionSnippet1').listbox(options: ListboxOptions): ExtendedListboxInstance|ExtendedListboxInstance[]",
            apiDescription: "Create a new Listbox on the given DOM element.",
            apiParameters: [
                { key: "options", value: "An instance from ListboxOptions to configure the listbox." }
            ],
            apiReturnValue: "One or more instances from ExtendedListboxInstance"
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet2",
            title: "addItem",
            apiSignature: "$('#functionSnippet2').listbox('addItem', item: string|ListboxItem): number",
            apiDescription: "Adds the given item to the list.",
            apiParameters: [
                { key: "item", value: "A string (display name) or an instance from ListboxItem." }
            ],
            apiReturnValue: "The id of the added element.",
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet2.1",
            title: "addItem",
            apiSignature: "listboxInstance.addItem(item: string|ListboxItem): number",
            apiDescription: "Adds the given item to the list.",
            apiParameters: [
                { key: "item", value: "A string (display name) or an instance from ListboxItem." }
            ],
            apiReturnValue: "The id of the added element."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet3",
            title: "removeItem",
            apiSignature: "$('#functionSnippet3').listbox('removeItem', item: string): void",
            apiDescription: "Removes the item where the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet3.1",
            title: "removeItem",
            apiSignature: "listboxInstance.removeItem(item: string): void",
            apiDescription: "Removes the item where the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ]
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet4",
            title: "destroy",
            apiSignature: "$('#functionSnippet4').listbox('destroy'): void",
            apiDescription: "Reverts all changes on the DOM.",
            apiParameters: [],
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet4.1",
            title: "destroy",
            apiSignature: "listboxInstance.destroy(): void",
            apiDescription: "Reverts all changes on the DOM.",
            apiParameters: []
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet5",
            title: "getItem",
            apiSignature: "$('#functionSnippet5').listbox('getItem', item: string): ListboxItem",
            apiDescription: "Returns the ListboxItem for which the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "An instance of ListboxItem.",
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet5.1",
            title: "getItem",
            apiSignature: "listboxInstance.getItem(item: string): ListboxItem",
            apiDescription: "Returns the ListboxItem for which the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "An instance of ListboxItem."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet6",
            title: "getItems",
            apiSignature: "$('#functionSnippet6').listbox('getItems'): ListboxItem[]",
            apiDescription: "Returns all ListboxItem objects.",
            apiParameters: [],
            apiReturnValue: "A array of ListboxItem's",
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet6.1",
            title: "getItems",
            apiSignature: "listboxInstance.getItems(): ListboxItem[]",
            apiDescription: "Returns all ListboxItem objects.",
            apiParameters: [],
            apiReturnValue: "A array of ListboxItem's"
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet7",
            title: "moveItemUp",
            apiSignature: "$('#functionSnippet7').listbox('moveItemUp', item: string): number",
            apiDescription: "Decreases the index of the matching ListboxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item.",
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet7.1",
            title: "moveItemUp",
            apiSignature: "listboxInstance.moveItemUp(item: string): number",
            apiDescription: "Decreases the index of the matching ListboxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet8",
            title: "moveItemDown",
            apiSignature: "$('#functionSnippet8').listbox('moveItemDown', item: string): number",
            apiDescription: "Increases the index of the matching ListboxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item.",
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet8.1",
            title: "moveItemDown",
            apiSignature: "listboxInstance.moveItemDown(item: string): number",
            apiDescription: "Increases the index of the matching ListboxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet9",
            title: "clearSelection",
            apiSignature: "$('#functionSnippet9').listbox('clearSelection'): void",
            apiDescription: "Resets the selection state of all items.",
            apiParameters: [],
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet9.1",
            title: "clearSelection",
            apiSignature: "listboxInstance.clearSelection(): void",
            apiDescription: "Resets the selection state of all items.",
            apiParameters: []
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet10",
            title: "enable",
            apiSignature: "$('#functionSnippet10').listbox('enable', state: boolean): void",
            apiDescription: "Enables or disables the complete component.",
            apiParameters: [
                { key: "state", value: "Boolean to indicate the new component state." }
            ],
            alert: deprecationAlert
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet10.1",
            title: "enable",
            apiSignature: "listboxInstance.enable(state: boolean): void",
            apiDescription: "Enables or disables the complete component.",
            apiParameters: [
                { key: "state", value: "Boolean to indicate the new component state." }
            ]
        });



        ////  API CLASSES  ////

        this.apiClassSnippets.push({
            snippetId: "classSnippet4",
            title: "ExtendedListboxInstance",
            apiDescription: "This shows the methods of ExtendedListboxInstance."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet1",
            title: "ListboxOptions",
            apiDescription: "This shows the properties of ListboxOptions with its default values."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet2",
            title: "ListboxSearchBarButtonOptions",
            apiDescription: "This shows the properties of ListboxSearchBarButtonOptions with its default values."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet3",
            title: "ListboxItem",
            apiDescription: "This shows the properties of ListboxItem with its default values."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet5",
            title: "ListboxEvent",
            apiDescription: "This shows the properties of ListboxEvent."
        });



        ////  CSS CLASSES  ////

        this.cssSnippets.push({
            snippetId: "cssSnippet1"
        });
    };

    return new Snippets();
});
