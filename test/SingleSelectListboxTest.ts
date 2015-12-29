/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../dist/extended-listbox.d.ts" />

function child(element: JQuery, index: number = null): JQuery {
    "use strict";

    if (!index) {
        index = 0;
    }

    return $(element.children()[index]);
}

function generateSingleList(options: ListBoxOptions = null, items: any[] = null): JQuery {
    "use strict";

    options = $.extend({
        getItems: function (): any[] {
            return items;
        }
    }, options);

    return $('#test').listbox(options);
}


test('construct default', function (): void {
    var root: JQuery = generateSingleList();

    equal(root.attr('class'), 'listbox-root');

    var listbox: JQuery = child(root);
    equal(listbox.attr('class'), 'listbox');

    var searchbar: JQuery = listbox.find('.listbox-searchbar');
    notEqual(searchbar.attr('class'), 'listbox-searchbar');
});


test('construct with searchbar', function (): void {
    var root: JQuery = generateSingleList({ searchBar: true });

    var searchbar: JQuery = child(root);
    equal(searchbar.attr('class'), 'listbox-searchbar-wrapper');
    equal(child(searchbar).attr('placeholder'), 'Search...');

    var listbox: JQuery = child(root, 1);
    equal(listbox.attr('class'), 'listbox');
});

test('construct with searchbar watermark', function (): void {
    var root: JQuery = generateSingleList({ searchBar: true, searchBarWatermark: "Suche..." });

    var searchbar: JQuery = child(root);
    equal(child(searchbar).attr('placeholder'), 'Suche...');
});

// TODO implement implicit default value
/*test('implicit default value', function (): void {
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


test('explicit default value', function (): void {
    var select: JQuery = generateSingleList({}, [
        "A",
        "B",
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems: JQuery = select.find(".listbox-item-selected");

    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
});


test('two explicit default values', function (): void {
    var select: JQuery = generateSingleList({}, [
        "A",
        { text: "B", selected: true },
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems: JQuery = select.find(".listbox-item-selected");

    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
});


test('one click', function (): void {
    var select: JQuery = generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.find(".listbox-item");

    $(items[1]).click();     // click on 'B'

    var selectedItems: JQuery = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem"), select.val());
});


test('multiple clicks', function (): void {
    var select: JQuery = generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.find(".listbox-item");

    $(items[1]).click();     // click on 'B'

    var selectedItems: JQuery = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem"), select.val());

    $(items[2]).click();     // click on 'C'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());

    $(items[0]).click();     // click on 'A'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'A');
    equal(selectedItems.data("dataItem"), select.val());

    $(items[3]).click();     // click on 'D'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'D');
    equal(selectedItems.data("dataItem"), select.val());

    $(items[1]).click();     // click on 'B'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem"), select.val());

    $(items[2]).click();     // click on 'C'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem"), select.val());
});


test('change event', function (): void {
    var select: JQuery = generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var receiveCounter: number = 0;
    select.on('change', function(): void {
        receiveCounter++;
    });

    var items: JQuery = select.find(".listbox-item");

    $(items[0]).click();
    equal(receiveCounter, 1);

    $(items[1]).click();
    $(items[2]).click();

    equal(receiveCounter, 3);
});

test('onValueChanged callback', function (): void {
    var receiveCounter: number = 0;
    var lastValue: any = null;

    var options: ListBoxOptions = <ListBoxOptions> {};
    options.onValueChanged = function(newValue: any): void {
        receiveCounter++;
        lastValue = newValue.text;
    };

    var select: JQuery = generateSingleList(options, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.find(".listbox-item");

    $(items[0]).click();
    equal(receiveCounter, 1);
    equal(lastValue, "A");

    $(items[1]).click();
    $(items[2]).click();

    equal(receiveCounter, 3);
    equal(lastValue, "C");
});