define([
    "../infrastructure/templateEngine",
    "../infrastructure/snippetUtil",
    "./snippets",
    "text!../snippetTemplate.html",
    "text!../apiTemplate.html"],
    function (templateEngine, snippetUtil, snippets, snippetTemplate, apiTemplate) {

        var Index = function () {
        };

        Index.prototype.init = function () {
            templateEngine.processTemplates(snippetTemplate, snippets.exampleSnippets,
                { header: true },
                function (element) {
                    $(element).appendTo($(".sourceSnippets"));
                    snippetUtil.postprocessExampleSnippet(element);
                });

            templateEngine.processTemplates(apiTemplate, snippets.apiFunctionSnippets,
                { loops: [{ template: "parameters", data: "apiParameters" }] },
                function (element, dao) {
                    $(element).appendTo($(".apiFunctionWrapper"));
                    snippetUtil.postprocessApiSnippet(element, dao);
                });
        };

        Index.prototype.copySnippet = function (snippetId) {
            snippetUtil.copySnippet(snippetId);
        };

        return Index;
    });
