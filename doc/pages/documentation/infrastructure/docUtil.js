define([
    "./templateEngine",
    "./snippetUtil",
    "text!./snippetTemplate.html",
    "text!./apiFunctionTemplate.html",
    "text!./apiClassTemplate.html",
    "text!./cssTemplate.html"],
    function (templateEngine, snippetUtil, snippetTemplate, apiFunctionTemplate, apiClassTemplate, cssTemplate) {

        var DocUtil = function (snippets) {
            this.snippets = snippets;
        };

        DocUtil.prototype.init = function () {
            templateEngine.processTemplates(snippetTemplate, this.snippets.exampleSnippets,
                { header: true },
                function (element) {
                    $(element).appendTo($(".sourceSnippets"));
                    snippetUtil.postprocessExampleSnippet(element);
                });

            templateEngine.processTemplates(apiFunctionTemplate, this.snippets.apiFunctionSnippets,
                { header: true, loops: [{ template: "parameters", data: "apiParameters" }] },
                function (element, dao) {
                    $(element).appendTo($(".apiFunctionWrapper"));
                    snippetUtil.postprocessApiFunctionSnippet(element, dao);
                });

            templateEngine.processTemplates(apiClassTemplate, this.snippets.apiClassSnippets,
                { header: true },
                function (element) {
                    $(element).appendTo($(".apiClassWrapper"));
                    snippetUtil.postprocessApiClassSnippet(element);
                });

            templateEngine.processTemplates(cssTemplate, this.snippets.cssSnippets,
                { header: false },
                function (element) {
                    $(element).appendTo($(".cssWrapper"));
                    snippetUtil.postprocessCssSnippet(element);
                });
        };

        DocUtil.prototype.copySnippet = function (snippetId) {
            snippetUtil.copySnippet(snippetId);
        };

        return DocUtil;
    });
