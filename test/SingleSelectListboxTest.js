/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./extended-listbox.d.ts" />
function child(element, index) {
    if (index === void 0) { index = null; }
    if (!index) {
        index = 0;
    }
    return $(element.children()[index]);
}
function generateSingleList(options, items) {
    if (options === void 0) { options = null; }
    if (items === void 0) { items = null; }
    options = $.extend({
        getItems: function () {
            return items;
        }
    }, options);
    return $('#test').listbox(options);
}
test('construct default', function () {
    var root = generateSingleList();
    equal(root.attr('class'), 'listbox-root');
    var listbox = child(root);
    equal(listbox.attr('class'), 'listbox');
    var searchbar = listbox.find('.listbox-searchbar');
    notEqual(searchbar.attr('class'), 'listbox-searchbar');
});
test('construct with searchbar', function () {
    var root = generateSingleList({ searchBar: true });
    var searchbar = child(root);
    equal(searchbar.attr('class'), 'listbox-searchbar-wrapper');
    equal(child(searchbar).attr('placeholder'), 'Search...');
    var listbox = child(root, 1);
    equal(listbox.attr('class'), 'listbox');
});
test('construct with searchbar watermark', function () {
    var root = generateSingleList({ searchBar: true, searchBarWatermark: "Suche..." });
    var searchbar = child(root);
    equal(child(searchbar).attr('placeholder'), 'Suche...');
});
// TODO implement implicit default value
/*test('implicit default value', function () {
 var select = $('#test')
 .append('<option>A</option>')
 .append('<option>B</option>')
 .append('<option>C</option>')
 .listbox();

 var list = select.next().find('.lbjs-list');
 var selectedItems = list.children('[selected]');

 equal(selectedItems.length, 1);
 equal(selectedItems.text(), 'A');
 equal(selectedItems.text(), select.val());
 });*/
test('explicit default value', function () {
    var select = generateSingleList({}, [
        "A",
        "B",
        { text: "C", selected: true },
        "D"
    ]);
    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
});
test('two explicit default values', function () {
    var select = generateSingleList({}, [
        "A",
        { text: "B", selected: true },
        { text: "C", selected: true },
        "D"
    ]);
    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
});
test('one click', function () {
    var select = generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);
    var items = select.find(".listbox-item");
    $(items[1]).click(); // click on 'B'
    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem"), select.val());
});
test('multiple clicks', function () {
    var select = generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);
    var items = select.find(".listbox-item");
    $(items[1]).click(); // click on 'B'
    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem"), select.val());
    $(items[2]).click(); // click on 'C'
    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
    $(items[0]).click(); // click on 'A'
    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'A');
    equal(selectedItems.data("dataItem"), select.val());
    $(items[3]).click(); // click on 'D'
    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'D');
    equal(selectedItems.data("dataItem"), select.val());
    $(items[1]).click(); // click on 'B'
    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem"), select.val());
    $(items[2]).click(); // click on 'C'
    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
});
test('change event', function () {
    var select = generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);
    var receiveCounter = 0;
    select.on('change', function () {
        receiveCounter++;
    });
    var items = select.find(".listbox-item");
    $(items[0]).click();
    equal(receiveCounter, 1);
    $(items[1]).click();
    $(items[2]).click();
    equal(receiveCounter, 3);
});
test('onValueChanged callback', function () {
    var receiveCounter = 0;
    var lastValue = null;
    var callback = function (newValue) {
        receiveCounter++;
        lastValue = newValue.text;
    };
    var select = generateSingleList({ onValueChanged: callback }, [
        "A",
        "B",
        "C",
        "D"
    ]);
    var items = select.find(".listbox-item");
    $(items[0]).click();
    equal(receiveCounter, 1);
    equal(lastValue, "A");
    $(items[1]).click();
    $(items[2]).click();
    equal(receiveCounter, 3);
    equal(lastValue, "C");
});
//# sourceMappingURL=SingleSelectListboxTest.js.map