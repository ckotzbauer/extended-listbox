/// <reference path="../test-typings.d.ts" />
/// <amd-module name="build/out/test/test/event/ListboxEventHandlerTest"/>

import TestHelper = require("../infrastructure/TestHelper");
import ListboxEvent = require("../../src/ts/event/ListboxEvent");
import ListboxEventHandler = require("../../src/ts/event/ListboxEventHandler");
//import ExtendedListboxInstance = require("../../src/ts/ExtendedListboxInstance");

QUnit.module( "ListboxEventHandlerTest", {
    beforeEach: function(): void {
        TestHelper.beforeEach();
    },
    afterEach: function(): void {
        TestHelper.afterEach();
    }
});

QUnit.test("check valueChanged event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, ListboxEvent.VALUE_CHANGED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onValueChanged: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fire(ListboxEvent.VALUE_CHANGED, "mySpecialValue");
});

QUnit.test("check itemsChanged event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, ListboxEvent.ITEMS_CHANGED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onItemsChanged: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fire(ListboxEvent.ITEMS_CHANGED, "mySpecialValue");
});

QUnit.test("check filterChanged event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, ListboxEvent.FILTER_CHANGED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onFilterChanged: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fire(ListboxEvent.FILTER_CHANGED, "mySpecialValue");
});

QUnit.test("check itemEnterPressed event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, ListboxEvent.ITEM_ENTER_PRESSED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onItemEnterPressed: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fire(ListboxEvent.ITEM_ENTER_PRESSED, "mySpecialValue");
});

QUnit.test("check itemDoubleClicked event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, ListboxEvent.ITEM_DOUBLE_CLICKED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onItemDoubleClicked: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fire(ListboxEvent.ITEM_DOUBLE_CLICKED, "mySpecialValue");
});
