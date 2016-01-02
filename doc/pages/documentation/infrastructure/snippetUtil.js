define([], function () {

    var SnippetUtil = function () {
        this.snippetMap = {};
    };

    SnippetUtil.prototype.postprocessExampleSnippet = function (element) {
        var $snippet = $(element);
        var $code = $(".snippetCode", $snippet);

        var snippetId = element.id.substr(0, element.id.indexOf("-"));
        var moduleId = "text!./snippets/" + snippetId + ".js";

        require([moduleId], function (content) {
            $code.html(content);
            hljs.highlightBlock($code[0]);
            eval(content);
            this.snippetMap[snippetId] = content;
        }.bind(this));
    };

    SnippetUtil.prototype.postprocessApiSnippet = function (element) {
        var $snippet = $(element);
        var $code = $snippet.find("code");
        hljs.highlightBlock($code[0]);
    };

    function copyToClipboard(content) {
        var el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    SnippetUtil.prototype.copySnippet = function (snippetId) {
        var source = this.snippetMap[snippetId];
        copyToClipboard(source);
    };


    return new SnippetUtil();
});
