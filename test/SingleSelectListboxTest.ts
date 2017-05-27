/// <reference path="./test-typings.d.ts" />
/// <amd-module name="build/out/test/test/SingleSelectListboxTest"/>

import TestHelper = require("./infrastructure/TestHelper");

QUnit.module( "SingleSelectListboxTest", {
    beforeEach: function(): void {
        TestHelper.beforeEach();
    },
    afterEach: function(): void {
        TestHelper.afterEach();
    }
});

QUnit.test('construct default', function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList();

    QUnit.assert.equal(root.target.attr('class'), 'listbox-root');

    var listbox: JQuery = TestHelper.child(root.target);
    QUnit.assert.equal(listbox.attr('class'), 'listbox');

    var searchbar: JQuery = listbox.find('.listbox-searchbar');
    QUnit.assert.notEqual(searchbar.attr('class'), 'listbox-searchbar');
});


QUnit.test('construct with searchbar', function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });

    var searchbar: JQuery = TestHelper.child(root.target);
    QUnit.assert.equal(searchbar.attr('class'), 'listbox-searchbar-wrapper');
    QUnit.assert.equal(TestHelper.child(searchbar).attr('placeholder'), 'Search...');

    var listbox: JQuery = TestHelper.child(root.target, 1);
    QUnit.assert.equal(listbox.attr('class'), 'listbox');
});

QUnit.test('construct with searchbar watermark', function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList(
        { searchBar: true, searchBarWatermark: "Suche..." });

    var searchbar: JQuery = TestHelper.child(root.target);
    QUnit.assert.equal(TestHelper.child(searchbar).attr('placeholder'), 'Suche...');
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

 QUnit.assert.equal(selectedItems.length, 1);
 QUnit.assert.equal(selectedItems.text(), 'A');
 QUnit.assert.equal(selectedItems.text(), select.val());
 });*/


QUnit.test('explicit default value', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
        "A",
        "B",
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");

    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'C');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());
});


QUnit.test('two explicit default values', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
        "A",
        { text: "B", selected: true },
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");

    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'C');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());
});


QUnit.test('one click', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[1]).click();     // click on 'B'

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'B');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());
});


QUnit.test('multiple clicks', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[1]).click();     // click on 'B'

    var selectedItems: JQuery = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'B');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());

    $(items[2]).click();     // click on 'C'

    selectedItems = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'C');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());

    $(items[0]).click();     // click on 'A'

    selectedItems = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'A');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());

    $(items[3]).click();     // click on 'D'

    selectedItems = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'D');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());

    $(items[1]).click();     // click on 'B'

    selectedItems = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'B');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());

    $(items[2]).click();     // click on 'C'

    selectedItems = select.target.find(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems.text(), 'C');
    QUnit.assert.equal(selectedItems.data("dataItem"), select.target.val());
});


QUnit.test('change event', function (): void {
    var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
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
    QUnit.assert.equal(receiveCounter, 1);

    $(items[1]).click();
    $(items[2]).click();

    QUnit.assert.equal(receiveCounter, 3);
});

QUnit.test('onValueChanged callback', function (): void {
    var receiveCounter: number = 0;
    var lastValue: any = null;

    var options: ListBoxOptions = <ListBoxOptions> {};
    options.onValueChanged = function(newValue: ListboxEvent): void {
        receiveCounter++;
        lastValue = newValue.args.text;
    };

    var select: ExtendedListboxInstance = TestHelper.generateSingleList(options, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items: JQuery = select.target.find(".listbox-item");

    $(items[0]).click();
    QUnit.assert.equal(receiveCounter, 1);
    QUnit.assert.equal(lastValue, "A");

    $(items[1]).click();
    $(items[2]).click();

    QUnit.assert.equal(receiveCounter, 3);
    QUnit.assert.equal(lastValue, "C");
});
