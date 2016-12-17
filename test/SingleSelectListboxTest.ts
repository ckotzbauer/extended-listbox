/// <reference path="./test-typings.d.ts" />
/// <amd-module name="SingleSelectListboxTest"/>

/// <reference path="./infrastructure/TestHelper.ts" />

module EL {
    "use strict";

    QUnit.module( "SingleSelectListboxTest", {
        beforeEach: function(): void {
            TestHelper.beforeEach();
        },
        afterEach: function(): void {
            TestHelper.afterEach();
        }
    });

    test('construct default', function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList();

        equal(root.target.attr('class'), 'listbox-root');

        var listbox: JQuery = TestHelper.child(root.target);
        equal(listbox.attr('class'), 'listbox');

        var searchbar: JQuery = listbox.find('.listbox-searchbar');
        notEqual(searchbar.attr('class'), 'listbox-searchbar');
    });


    test('construct with searchbar', function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });

        var searchbar: JQuery = TestHelper.child(root.target);
        equal(searchbar.attr('class'), 'listbox-searchbar-wrapper');
        equal(TestHelper.child(searchbar).attr('placeholder'), 'Search...');

        var listbox: JQuery = TestHelper.child(root.target, 1);
        equal(listbox.attr('class'), 'listbox');
    });

    test('construct with searchbar watermark', function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList(
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
        var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
            "A",
            "B",
            { text: "C", selected: true },
            "D"
        ]);

        var selectedItems: JQuery = select.target.find(".listbox-item-selected");

        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'C');
        equal(selectedItems.data("dataItem"), select.target.val());
    });


    test('two explicit default values', function (): void {
        var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
            "A",
            { text: "B", selected: true },
            { text: "C", selected: true },
            "D"
        ]);

        var selectedItems: JQuery = select.target.find(".listbox-item-selected");

        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'C');
        equal(selectedItems.data("dataItem"), select.target.val());
    });


    test('one click', function (): void {
        var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
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
        equal(selectedItems.data("dataItem"), select.target.val());
    });


    test('multiple clicks', function (): void {
        var select: ExtendedListboxInstance = TestHelper.generateSingleList({}, [
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
        equal(selectedItems.data("dataItem"), select.target.val());

        $(items[2]).click();     // click on 'C'

        selectedItems = select.target.find(".listbox-item-selected");
        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'C');
        equal(selectedItems.data("dataItem"), select.target.val());

        $(items[0]).click();     // click on 'A'

        selectedItems = select.target.find(".listbox-item-selected");
        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'A');
        equal(selectedItems.data("dataItem"), select.target.val());

        $(items[3]).click();     // click on 'D'

        selectedItems = select.target.find(".listbox-item-selected");
        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'D');
        equal(selectedItems.data("dataItem"), select.target.val());

        $(items[1]).click();     // click on 'B'

        selectedItems = select.target.find(".listbox-item-selected");
        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'B');
        equal(selectedItems.data("dataItem"), select.target.val());

        $(items[2]).click();     // click on 'C'

        selectedItems = select.target.find(".listbox-item-selected");
        equal(selectedItems.length, 1);
        equal(selectedItems.text(), 'C');
        equal(selectedItems.data("dataItem"), select.target.val());
    });


    test('change event', function (): void {
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
        equal(receiveCounter, 1);
        equal(lastValue, "A");

        $(items[1]).click();
        $(items[2]).click();

        equal(receiveCounter, 3);
        equal(lastValue, "C");
    });
}
