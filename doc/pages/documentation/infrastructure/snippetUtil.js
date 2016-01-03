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

    SnippetUtil.prototype.postprocessApiFunctionSnippet = function (element, dao) {
        var $snippet = $(element);
        var $code = $snippet.find("code");
        hljs.highlightBlock($code[0]);

        if (!dao.apiParameters || dao.apiParameters.length === 0) {
            $snippet.find("div.parameters").remove();
        }

        if (!dao.apiReturnValue) {
            $snippet.find("div.returnValue").remove();
        }
    };

    SnippetUtil.prototype.postprocessApiClassSnippet = function (element) {
        var $snippet = $(element);
        var $code = $("code", $snippet);

        var snippetId = element.id.substr(0, element.id.indexOf("-"));
        var moduleId = "text!./snippets/" + snippetId + ".ts";

        require([moduleId], function (content) {
            $code.html(content);
            hljs.highlightBlock($code[0]);
        }.bind(this));
    };

    SnippetUtil.prototype.postprocessCssSnippet = function (element) {
        var $snippet = $(element);
        var $code = $("code", $snippet);

        var snippetId = element.id.substr(0, element.id.indexOf("-"));
        var moduleId = "text!./snippets/" + snippetId + ".css";

        require([moduleId], function (content) {
            $code.html(content);
            hljs.highlightBlock($code[0]);
        }.bind(this));
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
