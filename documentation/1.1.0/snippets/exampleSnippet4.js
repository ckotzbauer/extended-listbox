$('#exampleSnippet4').listbox({
    searchBar: true,
    getItems: function() {
        return [
            { text: "Group #1", groupHeader: true, childItems: [
                "Item #1",
                { text: "Item #2", disabled: true },
                "Item #3",
                { text: "Item #4", disabled: true }
            ] },
            { text: "Group #2", childItems: [
                "Item #5",
                { text: "Item #6", selected: true },
                "Item #7",
                "Item #8"
            ] }
        ];
    }
});