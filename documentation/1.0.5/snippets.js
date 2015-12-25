define("snippets", function () {

    var Snippets = function () {
        this.snippets = [];

        this.snippets.push({
            snippetId: "snippet1",
            title: "Snippet #1",
            subtitle: "Small Test"
            //alert: { text: "<strong>Deprecated: </strong> This function will be removed in release 2.0.0", type: "danger" }
        });
    };

    return new Snippets();
});
