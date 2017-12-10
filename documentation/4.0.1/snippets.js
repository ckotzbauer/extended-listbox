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

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet1",
            title: "Construction",
            apiSignature: "new SingleSelectListBox(target: HtmlElement, settings: ListBoxSettings)",
            apiDescription: "Create a new SingleSelectListBox on the given DOM element.",
            apiParameters: [
                { key: "settings", value: "An instance from ListBoxSettings to configure the listBox." }
            ],
            apiReturnValue: "New instance of SingleSelectListBox"
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet2",
            title: "Construction",
            apiSignature: "new MultiSelectListBox(target: HtmlElement, settings: ListBoxSettings)",
            apiDescription: "Create a new MultiSelectListBox on the given DOM element.",
            apiParameters: [
                { key: "settings", value: "An instance from ListBoxSettings to configure the listBox." }
            ],
            apiReturnValue: "New instance of MultiSelectListBox"
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet3",
            title: "addItem",
            apiSignature: "listBox.addItem(item: string|ListBoxItem): string",
            apiDescription: "Adds the given item to the list.",
            apiParameters: [
                { key: "item", value: "A string (display name) or an instance from ListBoxItem." }
            ],
            apiReturnValue: "The id of the added element."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet4",
            title: "addItems",
            apiSignature: "listBox.addItems(items: (string|ListBoxItem)[]): string[]",
            apiDescription: "Adds the given items to the list.",
            apiParameters: [
                { key: "items", value: "An array of strings (display name) or instances from ListBoxItem." }
            ],
            apiReturnValue: "The ids of the added elements."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet5",
            title: "removeItem",
            apiSignature: "listBox.removeItem(item: string): void",
            apiDescription: "Removes the item where the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ]
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet6",
            title: "removeItems",
            apiSignature: "listBox.removeItems(items: string[]): void",
            apiDescription: "Removes the items where the given string matches the display name or the id.",
            apiParameters: [
                { key: "items", value: "A string array to identify the items." }
            ]
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet7",
            title: "destroy",
            apiSignature: "listBox.destroy(): void",
            apiDescription: "Reverts all changes on the DOM.",
            apiParameters: []
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet8",
            title: "getItem",
            apiSignature: "listBox.getItem(item: string): ListBoxItem",
            apiDescription: "Returns the ListBoxItem for which the given string matches the display name or the id.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "An instance of ListBoxItem."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet9",
            title: "getItems",
            apiSignature: "listBox.getItems(): ListBoxItem[]",
            apiDescription: "Returns all ListBoxItem objects.",
            apiParameters: [],
            apiReturnValue: "A array of ListBoxItem's"
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet10",
            title: "clearSelection",
            apiSignature: "listBox.clearSelection(): void",
            apiDescription: "Resets the selection state of all items.",
            apiParameters: []
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet11",
            title: "getSelection",
            apiSignature: "listBox.getSelection(): ListBoxItem[]",
            apiDescription: "Returns all ListBoxItem's which are selected.",
            apiParameters: [],
            apiReturnValue: "A array of ListBoxItem's"
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet12",
            title: "moveItemUp",
            apiSignature: "listBox.moveItemUp(item: string): number",
            apiDescription: "Decreases the index of the matching ListBoxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet13",
            title: "moveItemDown",
            apiSignature: "listBox.moveItemDown(item: string): number",
            apiDescription: "Increases the index of the matching ListBoxItem by one.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet14",
            title: "moveItemToBottom",
            apiSignature: "listBox.moveItemToBottom(item: string): number",
            apiDescription: "Sets the index of the matching ListBoxItem to the highest possible value.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet15",
            title: "moveItemToTop",
            apiSignature: "listBox.moveItemToTop(item: string): number",
            apiDescription: "Sets the index of the matching ListBoxItem to zero.",
            apiParameters: [
                { key: "item", value: "A string to identify the item." }
            ],
            apiReturnValue: "The new index of the item."
        });

        this.apiFunctionSnippets.push({
            snippetId: "functionSnippet16",
            title: "enable",
            apiSignature: "listBox.enable(state: boolean): void",
            apiDescription: "Enables or disables the complete component.",
            apiParameters: [
                { key: "state", value: "Boolean to indicate the new component state." }
            ]
        });



        ////  API CLASSES  ////

        this.apiClassSnippets.push({
            snippetId: "classSnippet4",
            title: "BaseListBox",
            apiDescription: "This shows the methods of BaseListBox its their subclasses."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet1",
            title: "ListBoxSettings",
            apiDescription: "This shows the properties of ListBoxSettings with its default values."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet2",
            title: "ListBoxSearchBarButtonOptions",
            apiDescription: "This shows the properties of ListBoxSearchBarButtonOptions with its default values."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet3",
            title: "ListBoxItem",
            apiDescription: "This shows the properties of ListBoxItem with its default values."
        });

        this.apiClassSnippets.push({
            snippetId: "classSnippet5",
            title: "ListBoxEvent",
            apiDescription: "This shows the properties of ListBoxEvent."
        });



        ////  CSS CLASSES  ////

        this.cssSnippets.push({
            snippetId: "cssSnippet1"
        });
    };

    return new Snippets();
});
