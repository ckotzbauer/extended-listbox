/// <reference path="./test-typings.d.ts" />
/// <amd-module name="build/out/test/test/SingleSelectListboxTest"/>

import {TestHelper} from "./infrastructure/TestHelper";
import {ListBoxSettings} from "../src/ts/contract/ListBoxSettings";
import {ListBoxEvent} from "../src/ts/event/ListBoxEvent";

QUnit.module("SingleSelectListBoxTest", {
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

    const listBox: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(listBox.classList.contains("listbox"));

    const searchbar: Element = listBox.querySelector('.listbox-searchbar');
    QUnit.assert.ok(!searchbar);
});


QUnit.test('construct with searchbar', (): void => {
    const { target } = TestHelper.generateSingleList({ searchBar: true });

    const searchbar: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(searchbar.classList.contains('listbox-searchbar-wrapper'));
    QUnit.assert.equal(TestHelper.child(searchbar).getAttribute('placeholder'), 'Search...');

    const listBox: HTMLElement = TestHelper.child(target, 1);
    QUnit.assert.ok(listBox.classList.contains("listbox"));
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

    TestHelper.click(items[1]);     // click on 'B'

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

    TestHelper.click(items[1]);     // click on 'B'

    let selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'B');

    TestHelper.click(items[2]);     // click on 'C'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'C');

    TestHelper.click(items[0]);     // click on 'A'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'A');

    TestHelper.click(items[3]);     // click on 'D'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'D');

    TestHelper.click(items[1]);     // click on 'B'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'B');

    TestHelper.click(items[2]);     // click on 'C'

    selectedItems = target.querySelectorAll(".listbox-item-selected");
    QUnit.assert.equal(selectedItems.length, 1);
    QUnit.assert.equal(selectedItems[0].textContent, 'C');
});

QUnit.test('onValueChanged callback', (): void => {
    let receiveCounter: number = 0;
    let lastValue: any = null;

    const options: ListBoxSettings = <ListBoxSettings> {};
    options.onValueChanged = (newValue: ListBoxEvent): void => {
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

    TestHelper.click(items[0]);
    QUnit.assert.equal(receiveCounter, 1);
    QUnit.assert.equal(lastValue, "A");

    TestHelper.click(items[1]);
    TestHelper.click(items[2]);

    QUnit.assert.equal(receiveCounter, 3);
    QUnit.assert.equal(lastValue, "C");
});
