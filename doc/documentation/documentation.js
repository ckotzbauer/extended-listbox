window.snippetMap = {};

var snippets = [];

snippets.push({
    snippetId: "snippet1",
    title: "Snippet #1",
    subtitle: "Small Test"
});

$(function () {
    require(["text!snippets/snippetTemplate.html"], function (snippetTemplate) {
        // Add snippets to DOM
        var index;
        for (index in snippets) {
            var snippet = snippets[index];
            var preparedHtml = snippetTemplate
                .replace(/SNIPPETID/g, snippet.snippetId)
                .replace(/SUBTITLE/g, snippet.subtitle)
                .replace(/TITLE/g, snippet.title);

            var child = document.createElement('div');
            child.innerHTML = preparedHtml;
            child = child.firstChild;
            document.getElementById('sourceSnippets').appendChild(child);
        }

        // Add code snippet to view and execute it.
        $(".snippet").each(function (index, snippet) {
            var $snippet = $(snippet);
            var $preview = $(".snippetPreview", $snippet);
            var $root = $("div[id^='snippet']", $preview);
            var $code = $(".snippetCode", $snippet);

            var snippetId = $root.attr("id");
            var moduleId = "text!snippets/" + snippetId + ".js";

            require([moduleId], function (content) {
                $code.html(content);
                hljs.highlightBlock($code[0]);
                eval(content);

                window.snippetMap[snippetId] = content;
            });
        });
    });
});

function copyToClipboard(content) {
    var el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function copySnippet(snippetId) {
    var source = window.snippetMap[snippetId];
    copyToClipboard(source);
}
