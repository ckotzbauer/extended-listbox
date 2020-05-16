var target = document.getElementById("exampleSnippet2");

new MultiSelectListBox(target, {
    getItems: function() {
        return [
            "Item #1",
            { text: "Item #2", selected: true },
            "Item #3",
            "Item #4",
            "Item #5",
            "Item #6",
            "Item #7",
            { text: "Item #8", selected: true }
        ];
    }
});