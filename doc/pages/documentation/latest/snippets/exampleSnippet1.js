var target = document.getElementById("exampleSnippet1");

new SingleSelectListBox(target, {
    getItems: function() {
        return [
            "Item #1",
            "Item #2",
            "Item #3",
            "Item #4"
        ];
    }
});