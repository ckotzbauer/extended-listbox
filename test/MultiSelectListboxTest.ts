/// <reference path="./test-typings.d.ts" />
/// <amd-module name="MultiSelectListboxTest"/>

import {TestHelper} from "./infrastructure/TestHelper";

QUnit.module( "MultiSelectListboxTest", {
    beforeEach: function(): void {
        TestHelper.beforeEach();
    },
    afterEach: function(): void {
        TestHelper.afterEach();
    }
});

test('construct default', function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateMultipleList();

    equal(root.target.attr('class'), 'listbox-root');

    var listbox: JQuery = TestHelper.child(root.target);
    equal(listbox.attr('class'), 'listbox');

    var searchbar: JQuery = listbox.find('.listbox-searchbar');
    notEqual(searchbar.attr('class'), 'listbox-searchbar');
});


test('construct with searchbar', function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateMultipleList({ searchBar: true });

    var searchbar: JQuery = TestHelper.child(root.target);
    equal(searchbar.attr('class'), 'listbox-searchbar-wrapper');
    equal(TestHelper.child(searchbar).attr('placeholder'), 'Search...');

    var listbox: JQuery = TestHelper.child(root.target, 1);
    equal(listbox.attr('class'), 'listbox');
});

test('construct with searchbar watermark', function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateMultipleList(
        { searchBar: true, searchBarWatermark: "Suche..." });

    var searchbar: JQuery = TestHelper.child(root.target);
    equal(TestHelper.child(searchbar).attr('placeholder'), 'Suche...');
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
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");

    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem").text, TestHelper.jsonToVal(select.target.val()));
});


test('two explicit default values', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        { text: "B", selected: true },
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");

    equal(selectedItems.length, 2);
    equal(TestHelper.itemsToVal(selectedItems), 'B,C');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));
});


test('one click', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[1]).click();     // click on 'B'

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem").text, TestHelper.jsonToVal(select.target.val()));
});


test('two clicks', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[1]).click();     // click on 'B'
    $(items[1]).click();     // click on 'B'

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 0);
    // TODO equal(select.val(), []);
});


test('two clicks on different items', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[0]).click();     // click on 'A'
    $(items[2]).click();     // click on 'C'

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(TestHelper.itemsToVal(selectedItems), 'A,C');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));
});


test('multiple clicks', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[0]).click();     // click on 'A'

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(TestHelper.itemsToVal(selectedItems), 'A');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));

    $(items[1]).click();     // click on 'B'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(TestHelper.itemsToVal(selectedItems), 'A,B');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));

    $(items[0]).click();     // click on 'A'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(TestHelper.itemsToVal(selectedItems), 'B');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));

    $(items[2]).click();     // click on 'C'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(TestHelper.itemsToVal(selectedItems), 'B,C');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));

    $(items[0]).click();     // click on 'A'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 3);
    equal(TestHelper.itemsToVal(selectedItems), 'A,B,C');
    //equal(itemsToVal(selectedItems), jsonToVal(select.val())); TODO fix sorting

    $(items[1]).click();     // click on 'B'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(TestHelper.itemsToVal(selectedItems), 'A,C');
    //equal(itemsToVal(selectedItems), jsonToVal(select.val())); TODO fix sorting

    $(items[0]).click();     // click on 'A'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(TestHelper.itemsToVal(selectedItems), 'C');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));

    $(items[1]).click();     // click on 'B'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(TestHelper.itemsToVal(selectedItems), 'B,C');
    //equal(itemsToVal(selectedItems), jsonToVal(select.val())); TODO fix sorting

    $(items[2]).click();     // click on 'C'

    selectedItems = select.target.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(TestHelper.itemsToVal(selectedItems), 'B');
    equal(TestHelper.itemsToVal(selectedItems), TestHelper.jsonToVal(select.target.val()));
});


test('change event', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var receiveCounter: number = 0;
    select.target.on('change', function(): void {
        receiveCounter++;
    });

    var items: JQuery = select.target.find(".listbox-item");

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
    options.onValueChanged = function(newValue: ListboxEvent): void {
        receiveCounter++;
        lastValue = newValue.args;
    };

    var select: ExtendedListboxInstance = TestHelper.generateMultipleList(options, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[0]).click();
    equal(receiveCounter, 1);
    equal(TestHelper.jsonToVal(lastValue), "A");

    $(items[1]).click();
    $(items[2]).click();

    equal(receiveCounter, 3);
    equal(TestHelper.jsonToVal(lastValue), ["A", "B", "C"]);
});