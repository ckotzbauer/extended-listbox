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
            apiSignature: "$('#apiSnippet1').listbox(options: ListboxOptions): void",
            apiDescription: "Create a new Listbox on the given DOM element.",
            apiParameters: [
                { key: "options", value: "An instance from ListboxOptions to configure the listbox." }
            ]
        });
    };

    return new Snippets();
});
