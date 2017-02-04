/// <reference path="../test-typings.d.ts" />
/// <amd-module name="build/out/test/test/event/ListboxEventHandlerTest"/>

import TestHelper = require("../infrastructure/TestHelper");
import ListboxEvent = require("../../src/ts/event/ListboxEvent");
import ListboxEventHandler = require("../../src/ts/event/ListboxEventHandler");
import ExtendedListboxInstance = require("../../src/ts/ExtendedListboxInstance");

QUnit.module( "ListboxEventHandlerTest", {
    beforeEach: function(): void {
        TestHelper.beforeEach();
    },
    afterEach: function(): void {
        TestHelper.afterEach();
    }
});

test("check valueChanged event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        equal(event.eventName, ListboxEvent.VALUE_CHANGED);
        equal(event.target, target);
        equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onValueChanged: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fireValueChangedEvent("mySpecialValue");
});

test("check itemsChanged event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        equal(event.eventName, ListboxEvent.ITEMS_CHANGED);
        equal(event.target, target);
        equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onItemsChanged: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fireItemsChangedEvent("mySpecialValue");
});

test("check filterChanged event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        equal(event.eventName, ListboxEvent.FILTER_CHANGED);
        equal(event.target, target);
        equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onFilterChanged: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fireFilterChangedEvent("mySpecialValue");
});

test("check itemEnterPressed event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        equal(event.eventName, ListboxEvent.ITEM_ENTER_PRESSED);
        equal(event.target, target);
        equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onItemEnterPressed: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fireItemEnterPressedEvent("mySpecialValue");
});

test("check itemDoubleClicked event", function (): void {
    var target: JQuery = null;

    var delegate: any = (event: ListboxEvent) => {
        equal(event.eventName, ListboxEvent.ITEM_DOUBLE_CLICKED);
        equal(event.target, target);
        equal(event.args, "mySpecialValue");
    };

    var listbox: ExtendedListboxInstance = TestHelper.generateSingleList({ onItemDoubleClicked: delegate });
    target = listbox.target;

    var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"].baseListBox);

    handler.fireItemDoubleClickedEvent("mySpecialValue");
});
