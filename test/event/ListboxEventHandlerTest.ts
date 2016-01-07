/// <reference path="../test-typings.d.ts" />
/// <amd-module name="event/ListboxEventHandlerTest"/>

/// <reference path="../infrastructure/TestHelper" />

module EL {
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

        var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"]);

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

        var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"]);

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

        var handler: ListboxEventHandler = new ListboxEventHandler(listbox["listbox"]);

        handler.fireFilterChangedEvent("mySpecialValue");
    });
}
