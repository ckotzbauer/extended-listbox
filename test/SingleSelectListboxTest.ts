/// <reference path="./test-typings.d.ts" />
/// <amd-module name="build/out/test/test/SingleSelectListboxTest"/>

import TestHelper = require("./infrastructure/TestHelper");
import ListboxSettings = require("../src/ts/contract/ListboxSettings");
import ListboxEvent = require("../src/ts/event/ListboxEvent");

QUnit.module("SingleSelectListboxTest", {
    beforeEach: (): void => {
        TestHelper.beforeEach();
    },
    afterEach: (): void => {
        TestHelper.afterEach();
    }
});

QUnit.test('construct default', (): void => {
    const { target } = TestHelper.generateSingleList();

    QUnit.assert.ok(target.classList.contains("listbox-root"));

    const listbox: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(listbox.classList.contains("listbox"));

    const searchbar: Element = listbox.querySelector('.listbox-searchbar');
    QUnit.assert.ok(!searchbar);
});


QUnit.test('construct with searchbar', (): void => {
    const { target } = TestHelper.generateSingleList({ searchBar: true });

    const searchbar: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(searchbar.classList.contains('listbox-searchbar-wrapper'));
    QUnit.assert.equal(TestHelper.child(searchbar).getAttribute('placeholder'), 'Search...');

    const listbox: HTMLElement = TestHelper.child(target, 1);
    QUnit.assert.ok(listbox.classList.contains("listbox"));
});

QUnit.test('construct with searchbar watermark', (): void => {
    const { target } = TestHelper.generateSingleList(
        { searchBar: true, searchBarWatermark: "Suche..." });

    const searchbar: HTMLElement = TestHelper.child(target);
    QUnit.assert.equal(TestHelper.child(searchbar).getAttribute('placeholder'), 'Suche...');
});


QUnit.test('explicit default value', (): void => {
    const { target } = TestHelper.generateSingleList({}, [
        "A",
        "B",
        { text: "C", selected: true },
        "D"
    ]);

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'C');
});


QUnit.test('two explicit default values', (): void => {
    const { target } = TestHelper.generateSingleList({}, [
        "A",
        { text: "B", selected: true },
        { text: "C", selected: true },
        "D"
    ]);

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'C');
});


QUnit.test('one click', (): void => {
    const { target } = TestHelper.generateSingleList({}, [
        "A",
        { id: "B", text: "B" },
        "C",
        "D"
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    $(items[1]).click();     // click on 'B'

    const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'B');
});


QUnit.test('multiple clicks', (): void => {
    const { target } = TestHelper.generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    $(items[1]).click();     // click on 'B'

    let selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'B');

    $(items[2]).click();     // click on 'C'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'C');

    $(items[0]).click();     // click on 'A'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'A');

    $(items[3]).click();     // click on 'D'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'D');

    $(items[1]).click();     // click on 'B'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'B');

    $(items[2]).click();     // click on 'C'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'C');
});


QUnit.test('change event', (): void => {
    const { target } = TestHelper.generateSingleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    let receiveCounter: number = 0;
    target.onchange = (): void => {
        receiveCounter++;
    };

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    $(items[0]).click();
    QUnit.assert.equal(receiveCounter, 1);

    $(items[1]).click();
    $(items[2]).click();

    QUnit.assert.equal(receiveCounter, 3);
});

QUnit.test('onValueChanged callback', (): void => {
    let receiveCounter: number = 0;
    let lastValue: any = null;

    const options: ListboxSettings = <ListboxSettings> {};
    options.onValueChanged = (newValue: ListboxEvent): void => {
        receiveCounter++;
        lastValue = newValue.args.text;
    };

    const { target } = TestHelper.generateSingleList(options, [
        "A",
        "B",
        "C",
        "D"
    ]);

    const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

    $(items[0]).click();
    QUnit.assert.equal(receiveCounter, 1);
    QUnit.assert.equal(lastValue, "A");

    $(items[1]).click();
    $(items[2]).click();

    QUnit.assert.equal(receiveCounter, 3);
    QUnit.assert.equal(lastValue, "C");
});
