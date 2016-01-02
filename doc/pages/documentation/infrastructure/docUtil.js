define([
    "./templateEngine",
    "./snippetUtil",
    "text!./snippetTemplate.html",
    "text!./apiTemplate.html"],
    function (templateEngine, snippetUtil, snippetTemplate, apiTemplate) {

        var DocUtil = function (snippets) {
            this.snippets = snippets;
        };

        DocUtil.prototype.init = function () {
            templateEngine.processTemplates(snippetTemplate, this.snippets.exampleSnippets,
                {header: true},
                function (element) {
                    $(element).appendTo($(".sourceSnippets"));
                    snippetUtil.postprocessExampleSnippet(element);
                });

            templateEngine.processTemplates(apiTemplate, this.snippets.apiFunctionSnippets,
                {header: true, loops: [{template: "parameters", data: "apiParameters"}]},
                function (element, dao) {
                    $(element).appendTo($(".apiFunctionWrapper"));
                    snippetUtil.postprocessApiSnippet(element, dao);
                });
        };

        DocUtil.prototype.copySnippet = function (snippetId) {
            snippetUtil.copySnippet(snippetId);
        };

        return DocUtil;
    });
