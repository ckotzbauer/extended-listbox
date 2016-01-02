define([], function () {

    var TemplateEngine = function () {
    };

    function getStringContent(template, templateName) {
        if (template.indexOf("<template") !== 0) {
            return template;
        }

        var elem = document.createElement('div');
        elem.innerHTML = template;
        var tags = elem.getElementsByTagName("template");

        var index;
        for (index in tags) {
            var tag = tags[index];
            if (tag.id === templateName) {
                return tag.innerHTML.trim();
            }
        }

        return null;
    }

    function process(template, replacements) {
        var keys = Object.keys(replacements);
        keys.forEach(function (key) {
            var value = replacements[key];

            template = template.replace(new RegExp(key, "gi"), value);
        });

        return template;
    }

    function createHtmlElement(content) {
        var child = document.createElement('div');
        child.innerHTML = content;
        child = child.firstChild;
        return child;
    }

    function processLoops(template, element, dao, options) {
        var loops = element.getElementsByTagName("foreach");

        for (var i = 0; i < loops.length; i++) {
            var loop = $(loops[i]);
            var templateName = options[i].template;
            var propertyName = options[i].data;

            var stringTemplate = getStringContent(template, templateName);
            var dataArray = dao[propertyName];

            dataArray.forEach(function (d) {
                var processed = process(stringTemplate, d);
                var elem = $(createHtmlElement(processed));
                elem.insertAfter(loop);
            });

            loop.remove();
        }
    }

    function addAdditionalElement(parent, tag, content, classes) {
        var elem = document.createElement(tag);
        elem.innerHTML = content;

        if (classes) {
            classes.forEach(function (c) {
                elem.classList.add(c);
            })
        }

        parent.appendChild(elem);
    }

    function addTitle(heading, text) {
        addAdditionalElement(heading, "h3", text);
    }

    function addSubTitle(heading, text) {
        addAdditionalElement(heading, "span", text);
    }

    function addAlert(heading, text, type) {
        addAdditionalElement(heading, "h3", text, ["alert", type]);
    }

    TemplateEngine.prototype.processSingleTemplate = function (template, dataObject, options) {
        var stringTemplte = getStringContent(template, "main");
        var html = process(stringTemplte, dataObject);
        var element = createHtmlElement(html);

        processLoops(template, element, dataObject, options.loops);

        if (options.header) {
            var heading = element.children[0];

            if (dataObject.title) {
                addTitle(heading, dataObject.title);
            }

            if (dataObject.subtitle) {
                addSubTitle(heading, dataObject.subtitle);
            }

            if (dataObject.alert) {
                addAlert(heading, dataObject.alert.text, dataObject.alert.type);
            }
        }

        return element;
    };

    TemplateEngine.prototype.processTemplates = function (template, dataObjects, options, callback) {
        dataObjects.forEach(function (dao) {
            var htmlSnippet = this.processSingleTemplate(template, dao, options);
            if (callback) {
                callback(htmlSnippet);
            }
        }.bind(this));
    };


    return new TemplateEngine();
});
