var target = document.getElementById("exampleSnippet3");

new SingleSelectListbox(target, {
    searchBar: true,
    getItems: function() {
        return [
            "Item #1",
            { text: "Item #2", selected: true },
            "Item #3",
            "Item #4"
        ];
    }
});