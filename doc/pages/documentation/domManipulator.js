define(["text!./pages/documentation/snippetTemplate.html"], function (snippetTemplate) {

    var DomManipulator = function () {
        window.snippetMap = {};
    };

    function addTitle(heading, title) {
        var titleElement = document.createElement("h3");
        titleElement.innerHTML = title;
        heading.appendChild(titleElement);
    }

    function addSubTitle(heading, subTitle) {
        var subTitleElement = document.createElement("span");
        subTitleElement.innerHTML = subTitle;
        heading.appendChild(subTitleElement);
    }

    function addAltert(heading, text, type) {
        var alertElement = document.createElement("div");
        alertElement.innerHTML = text;
        alertElement.classList.add("alert");
        alertElement.classList.add(type);
        heading.appendChild(alertElement);
    }

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

    DomManipulator.prototype.manipulate = function (snippetArray) {
        // Add snippets to DOM
        var index;
        for (index in snippetArray) {
            var snippet = snippetArray[index];

            if (snippet.snippetId) {
                continue;
            }

            var preparedHtml = snippetTemplate
                .replace(/SNIPPETID/g, snippet.snippetId);

            var child = document.createElement('div');
            child.innerHTML = preparedHtml;
            child = child.firstChild;

            var heading = child.children[0];

            if (snippet.title) {
                addTitle(heading, snippet.title);
            }

            if (snippet.subtitle) {
                addSubTitle(heading, snippet.subtitle);
            }

            if (snippet.alert) {
                addAltert(heading, snippet.alert.text, snippet.alert.type);
            }

            document.getElementById('sourceSnippets').appendChild(child);
        }

        // Add code snippet to view and execute it.
        $(".snippet").each(function (index, snippet) {
            var $snippet = $(snippet);
            var $preview = $(".snippetPreview", $snippet);
            var $root = $("div[id^='snippet']", $preview);
            var $code = $(".snippetCode", $snippet);

            var snippetId = $root.attr("id");
            var moduleId = "text!./snippets/" + snippetId + ".js";

            require([moduleId], function (content) {
                $code.html(content);
                hljs.highlightBlock($code[0]);
                eval(content);

                window.snippetMap[snippetId] = content;
            });
        });
    };

    return new DomManipulator();
});

