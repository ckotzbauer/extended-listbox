define("snippets", function () {

    var Snippets = function () {
        this.exampleSnippets = [];
        this.apiFunctionSnippets = [];


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



        ////  APIs  ////

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet1",
            title: "Construction",
            apiSignature: "$('#apiSnippet1').listbox(options: ListboxOptions): JQuery",
            apiDescription: "Create a new Listbox on the given DOM element.",
            apiParameters: [
                { key: "options", value: "An instance from ListboxOptions to configure the listbox." }
            ],
            apiReturnValue: "A JQuery Object."
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet2",
            title: "addItem",
            apiSignature: "$('#apiSnippet2').listbox('addItem', item: string|ListboxItem): number",
            apiDescription: "Adds the given item to the list.",
            apiParameters: [
                { key: "item", value: "A string (display name) or an instance from ListboxItem." }
            ],
            apiReturnValue: "The id of the added element."
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet3",
            title: "removeItem",
            apiSignature: "$('#apiSnippet3').listbox('removeItem', item: string): void",
            apiDescription: "Removes the item where the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ]
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet4",
            title: "destroy",
            apiSignature: "$('#apiSnippet4').listbox('destroy'): void",
            apiDescription: "Reverts all changes on the DOM.",
            apiParameters: []
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet5",
            title: "getItem",
            apiSignature: "$('#apiSnippet5').listbox('getItem', item: string): ListboxItem",
            apiDescription: "Returns the ListboxItem for which the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "An instance of ListboxItem."
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet6",
            title: "getItems",
            apiSignature: "$('#apiSnippet6').listbox('getItems'): ListboxItem[]",
            apiDescription: "Returns all ListboxItem objects.",
            apiParameters: [],
            apiReturnValue: "A array of ListboxItem's"
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet7",
            title: "moveItemUp",
            apiSignature: "$('#apiSnippet7').listbox('moveItemUp', item: string): number",
            apiDescription: "Decreases the index of the matching ListboxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet8",
            title: "moveItemDown",
            apiSignature: "$('#apiSnippet8').listbox('moveItemDown', item: string): number",
            apiDescription: "Increases the index of the matching ListboxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet9",
            title: "clearSelection",
            apiSignature: "$('#apiSnippet9').listbox('clearSelection'): void",
            apiDescription: "Resets the selection state of all items.",
            apiParameters: []
        });

        this.apiFunctionSnippets.push({
            snippetId: "apiSnippet10",
            title: "enable",
            apiSignature: "$('#apiSnippet10').listbox('enable', state: boolean): void",
            apiDescription: "Enables or disables the complete component.",
            apiParameters: [
                { key: "state", value: "Boolean to indicate the new component state." }
            ]
        });
    };

    return new Snippets();
});
