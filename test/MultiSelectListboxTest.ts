/// <reference path="./test-typings.d.ts" />
/// <amd-module name="build/out/test/test/MultiSelectListboxTest"/>

import {TestHelper} from "./infrastructure/TestHelper";
import {ListboxSettings} from "../src/ts/contract/ListboxSettings";
import {ListboxEvent} from "../src/ts/event/ListboxEvent";

QUnit.module("MultiSelectListboxTest", {
    beforeEach: (): void => {
        TestHelper.beforeEach();
    },
    afterEach: (): void => {
        TestHelper.afterEach();
    }
});

QUnit.test('construct default', (): void => {
    const { target } = TestHelper.generateMultipleList();

    QUnit.assert.ok(target.classList.contains("listbox-root"));

    const listbox: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(listbox.classList.contains("listbox"));

    const searchbar: Element = listbox.querySelector('.listbox-searchbar');
    QUnit.assert.ok(!searchbar);
});


QUnit.test('construct with searchbar', (): void => {
    const { target } = TestHelper.generateMultipleList({ searchBar: true });

    const searchbar: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(searchbar.classList.contains("listbox-searchbar-wrapper"));
    QUnit.assert.equal(TestHelper.child(searchbar).getAttribute("placeholder"), 'Search...');

    const listbox: HTMLElement = TestHelper.child(target, 1);
    QUnit.assert.ok(listbox.classList.contains("listbox"));
});

QUnit.test('construct with searchbar watermark', (): void => {
    const { target } = TestHelper.generateMultipleList(
        { searchBar: true, searchBarWatermark: "Suche..." });

    const searchbar: HTMLElement = TestHelper.child(target);
    QUnit.assert.equal(TestHelper.child(searchbar).getAttribute('placeholder'), 'Suche...');
});


QUnit.test('explicit default value', (): void => {
    const { target, box } = TestHelper.generateMultipleList({}, [
        "A",
        "B",
        { id: "C", text: "C", selected: true },
        "D"
    ]);

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));
});


QUnit.test('two explicit default values', (): void => {
    const { target, box } = TestHelper.generateMultipleList({}, [
        "A",
        { id: "B", text: "B", selected: true },
        { id: "C", text: "C", selected: true },
        "D"
    ]);

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

    QUnit.assert.equal(selectedItems.length, 2);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["B", "C"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));
});


QUnit.test('one click', (): void => {
    const { target, box } = TestHelper.generateMultipleList({}, [
        { id: "A",  text: "A" },
        { id: "B",  text: "B" },
        { id: "C",  text: "C" },
        { id: "D",  text: "D" }
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[1]);     // click on 'B'

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["B"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));
});


QUnit.test('two clicks', (): void => {
    const { target } = TestHelper.generateMultipleList({}, [
        { id: "A",  text: "A" },
        { id: "B",  text: "B" },
        { id: "C",  text: "C" },
        { id: "D",  text: "D" }
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[1]);     // click on 'B'
    TestHelper.click(items[1]);     // click on 'B'

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
});

QUnit.test('two clicks (control)', (): void => {
    const { target } = TestHelper.generateMultipleList({}, [
        { id: "A",  text: "A" },
        { id: "B",  text: "B" },
        { id: "C",  text: "C" },
        { id: "D",  text: "D" }
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[1]);               // click on 'B'
    TestHelper.click(items[1], true);     // click on 'B'

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 0);
});


QUnit.test('two clicks on different items', (): void => {
    const { target, box } = TestHelper.generateMultipleList({}, [
        { id: "A",  text: "A" },
        { id: "B",  text: "B" },
        { id: "C",  text: "C" },
        { id: "D",  text: "D" }
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[0]);     // click on 'A'
    TestHelper.click(items[2]);     // click on 'C'

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));
});

QUnit.test('two clicks on different items (control)', (): void => {
    const { target, box } = TestHelper.generateMultipleList({}, [
        { id: "A",  text: "A" },
        { id: "B",  text: "B" },
        { id: "C",  text: "C" },
        { id: "D",  text: "D" }
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[0]);               // click on 'A'
    TestHelper.click(items[2], true);     // click on 'C' (with control key)

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 2);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["A", "C"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));
});


QUnit.test('multiple clicks', (): void => {
    const { target, box } = TestHelper.generateMultipleList({}, [
        { id: "A",  text: "A" },
        { id: "B",  text: "B" },
        { id: "C",  text: "C" },
        { id: "D",  text: "D" }
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[0]);     // click on 'A'

    let selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["A"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));

    TestHelper.click(items[1]);     // click on 'B'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["B"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));

    TestHelper.click(items[0], true);     // click on 'A'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 2);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["B", "A"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems)); // TODO

    TestHelper.click(items[2]);     // click on 'C'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));

    TestHelper.click(items[0], true);     // click on 'A'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 2);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C", "A"]));

    TestHelper.click(items[1], true);     // click on 'B'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 3);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C", "A", "B"]));

    TestHelper.click(items[0], true);     // click on 'A'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 2);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C", "B"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems)); // TODO

    TestHelper.click(items[1]);     // click on 'B'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["B"]));

    TestHelper.click(items[2]);     // click on 'C'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.ok(TestHelper.elementEquals(box.selectedDataItems, ["C"]));
    QUnit.assert.ok(TestHelper.itemEquals(selectedItems, box.selectedDataItems));
});


QUnit.test('onValueChanged callback', (): void => {
    let receiveCounter: number = 0;
    let lastValue: any = null;

    const options: ListboxSettings = <ListboxSettings> {};
    options.onValueChanged = (newValue: ListboxEvent): void => {
        receiveCounter++;
        lastValue = newValue.args;
    };

    const { target } = TestHelper.generateMultipleList(options, [
        "A",
        "B",
        "C",
        "D"
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    TestHelper.click(items[0]);
    QUnit.assert.equal(receiveCounter, 1);
    //QUnit.assert.equal(TestHelper.jsonToVal(lastValue), "A"); TODO

    TestHelper.click(items[1]);
    TestHelper.click(items[2]);

    QUnit.assert.equal(receiveCounter, 3);
    //QUnit.assert.equal(TestHelper.jsonToVal(lastValue), ["A", "B", "C"]); TODO
});
