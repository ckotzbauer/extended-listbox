define(["../domManipulator", "./snippets"], function (domManipulator, snippets) {

    var Index = function () {
        domManipulator.manipulate(snippets.snippets, "latest");
    };

    return Index;
});
