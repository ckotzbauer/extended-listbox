/// <reference path="./test-typings.d.ts" />
/// <amd-module name="build/out/test/test/BaseListBoxTest"/>

import TestHelper = require("./infrastructure/TestHelper");
import ListboxSettings = require("../src/ts/contract/ListboxSettings");
import ListboxEvent = require("../src/ts/event/ListboxEvent");

/* tslint:disable:no-string-literal */

QUnit.module( "BaseListBoxTest", {
    beforeEach: function(): void {
        TestHelper.beforeEach();
    },
    afterEach: function(): void {
        TestHelper.afterEach();
    }
});

QUnit.test("check multiple creations", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList();
    var instance: ExtendedListboxInstance = <ExtendedListboxInstance>root.target.listbox();

    QUnit.assert.equal(root, instance);
});

QUnit.test("check root css class", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList();

    QUnit.assert.equal(root.target.attr('class'), 'listbox-root');
});

QUnit.test("check list css class", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList();

    var listbox: JQuery = TestHelper.child(root.target);
    QUnit.assert.equal(listbox.attr('class'), 'listbox');
});

QUnit.test("check non existent searchbar", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList();
    var searchbar: JQuery = root.target.find('.listbox-searchbar');

    QUnit.assert.equal(searchbar.length, 0);
});

QUnit.test("check searchbarwrapper css class", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
    var searchbarWrapper: JQuery = TestHelper.child(root.target);

    QUnit.assert.equal(searchbarWrapper.attr('class'), 'listbox-searchbar-wrapper');
});

QUnit.test("check searchbar css class", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
    var searchbarWrapper: JQuery = TestHelper.child(root.target);
    var searchbar: JQuery = TestHelper.child(searchbarWrapper);

    QUnit.assert.equal(searchbar.attr('class'), 'listbox-searchbar');
});

QUnit.test("check default searchbar watermark", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
    var searchbarWrapper: JQuery = TestHelper.child(root.target);
    var searchbar: JQuery = TestHelper.child(searchbarWrapper);

    QUnit.assert.equal(searchbar.attr('placeholder'), 'Search...');
});

QUnit.test("check explicit searchbar watermark", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList(
        { searchBar: true, searchBarWatermark: "Suche ..." });
    var searchbarWrapper: JQuery = TestHelper.child(root.target);
    var searchbar: JQuery = TestHelper.child(searchbarWrapper);

    QUnit.assert.equal(searchbar.attr('placeholder'), 'Suche ...');
});

QUnit.test("check non existent searchbar button", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
    var button: JQuery = root.target.find('.listbox-searchbar-button');

    QUnit.assert.equal(button.length, 0);
});

QUnit.test("check existent searchbar button with icon", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList(<ListboxSettings>{ searchBar: true,
        searchBarButton: { visible: true, icon: "testIcon" } });
    var button: JQuery = root.target.find('.listbox-searchbar-button');
    var icon: JQuery = TestHelper.child(button);

    QUnit.assert.equal(icon.attr('class'), 'testIcon');
});

QUnit.test("check searchbar button callback", function (): void {
    var count: number = 0;
    var callback: () => void = function(): void {
        count++;
    };

    var options: ListBoxOptions = <ListBoxOptions> {};
    options.searchBar = true;
    options.searchBarButton = <ListboxSearchBarButtonOptions> {};
    options.searchBarButton.visible = true;
    options.searchBarButton.onClick = callback;

    var root: ExtendedListboxInstance = TestHelper.generateSingleList(options);
    var button: JQuery = root.target.find('.listbox-searchbar-button');
    button.click();

    QUnit.assert.equal(count, 1);
});

QUnit.test("check simple items", function (): void {
    var items: any[] = ["Item#1", "Item#2", "Item#3"];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 3);

    for (var i: number = 0; i < itemElements.length; i++) {
        var element: JQuery = itemElements[i];
        var item: any = items[i];

        QUnit.assert.equal(element.attr("class"), "listbox-item");
        QUnit.assert.equal(element.text(), item);
        QUnit.assert.equal(element.attr("title"), item);
        QUnit.assert.ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
    }
});

QUnit.test("check disabled items", function (): void {
    var items: any[] = [{ text: "Item#1", disabled: true },
        { text: "Item#2", disabled: true }, { text: "Item#3", disabled: true }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 3);

    for (var i: number = 0; i < itemElements.length; i++) {
        var element: JQuery = itemElements[i];
        var item: any = items[i];

        QUnit.assert.equal(element.attr("class"), "listbox-item listbox-item-disabled");
        QUnit.assert.equal(element.text(), item.text);
        QUnit.assert.equal(element.attr("title"), item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
    }
});

QUnit.test("check selected item", function (): void {
    var items: any[] = [{ text: "Item#1", selected: true }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    for (var i: number = 0; i < itemElements.length; i++) {
        var element: JQuery = itemElements[i];
        var item: any = items[i];

        QUnit.assert.equal(element.attr("class"), "listbox-item listbox-item-selected");
        QUnit.assert.equal(element.text(), item.text);
        QUnit.assert.equal(element.attr("title"), item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
    }
});

QUnit.test("check header item", function (): void {
    var items: any[] = [{ text: "Item#1", groupHeader: true }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    for (var i: number = 0; i < itemElements.length; i++) {
        var element: JQuery = itemElements[i];
        var item: any = items[i];

        QUnit.assert.equal(element.attr("class"), "listbox-item listbox-item-group");
        QUnit.assert.equal(element.text(), item.text);
        QUnit.assert.equal(element.attr("title"), item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
    }
});

QUnit.test("check item with id", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 3);

    for (var i: number = 0; i < itemElements.length; i++) {
        var element: JQuery = itemElements[i];
        var item: any = items[i];

        QUnit.assert.equal(element.attr("id"), item.id);
    }
});

QUnit.test("check item with childs", function (): void {
    var items: any[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    for (var i: number = 0; i < itemElements.length; i++) {
        var element: JQuery = itemElements[i];
        var item: any = items[i];

        QUnit.assert.equal(element.attr("class"), "listbox-item listbox-item-group");
        QUnit.assert.equal(element.attr("title"), item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));

        var childElements: JQuery[] = TestHelper.children(element);
        QUnit.assert.equal(childElements.length, 2);
        for (var j: number = 0; j < childElements.length; j++) {
            var childElement: JQuery = childElements[j];
            var childItem: any = items[0].childItems[j];

            QUnit.assert.equal(childElement.attr("class"), "listbox-item listbox-item-child");
            QUnit.assert.equal(childElement.text(), childItem);
            QUnit.assert.equal(childElement.attr("title"), childItem);
            QUnit.assert.ok(TestHelper.startsWith(childElement.attr("id"), "listboxitem"));
        }
    }
});

QUnit.test("check item removal id", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    root.removeItem("id02");

    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 2);

    var found: boolean = false;
    itemElements.forEach(function ($elem: JQuery): void {
        var id: string = $elem.attr("id");
        if (id === "id02") {
            found = true;
        }
    });

    QUnit.assert.equal(found, false);
});

QUnit.test("check item removal text", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

    root.removeItem("Item#3");

    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 2);

    var found: boolean = false;
    itemElements.forEach(function ($elem: JQuery): void {
        var text: string = $elem.text();
        if (text === "Item#3") {
            found = true;
        }
    });

    QUnit.assert.equal(found, false);
});

QUnit.test("check parent item removal", function (): void {
    var items: any[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

    root.removeItem("Item#1");

    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 0);
});

QUnit.test("check destroy", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true }, items);

    root.destroy();

    var listbox: JQuery = TestHelper.child(root.target);
    var containerChilds: JQuery[] = TestHelper.children(listbox);

    QUnit.assert.notEqual(root.target.attr("class"), "listbox-root");
    QUnit.assert.equal(containerChilds.length, 0);
});

QUnit.test("check clearSelection", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01", selected: true }, { text: "Item#2", id: "id02", selected: true }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    root.clearSelection();

    var listbox: JQuery = TestHelper.child(root.target);
    var itemElements: JQuery[] = TestHelper.children(listbox);

    var found: boolean = false;
    itemElements.forEach(function ($elem: JQuery): void {
        var text: string = $elem.attr("class");
        if (text.indexOf("listbox-item-selected") !== -1) {
            found = true;
        }
    });

    QUnit.assert.equal(found, false);
});

QUnit.test("check getItem id", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var item: ListboxItem = root.getItem("id02");

    QUnit.assert.ok(item !== null);
    QUnit.assert.equal(item.id, "id02");
    QUnit.assert.equal(item.text, "Item#2");
});

QUnit.test("check getItem text", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var item: ListboxItem = root.getItem("Item#1");

    QUnit.assert.ok(item !== null);
    QUnit.assert.equal(item.id, "id01");
    QUnit.assert.equal(item.text, "Item#1");
});

QUnit.test("check getItems", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var listItems: ListboxItem[] = root.getItems();

    QUnit.assert.equal(listItems.length, 3);
});

QUnit.test("check moveItemUp", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var originalIndex: number = root.getItem("id03").index;
    var newIndex: number = root.moveItemUp("id03");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 1);
});

QUnit.test("check moveItemUp (first item)", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01", index: 0 },
        { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var originalIndex: number = root.getItem("id01").index;
    var newIndex: number = root.moveItemUp("id01");

    QUnit.assert.equal(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 0);
});

QUnit.test("check moveItemDown", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var originalIndex: number = root.getItem("id01").index;
    var newIndex: number = root.moveItemDown("id01");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 1);
});

QUnit.test("check moveItemDown (last item)", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" },
        { text: "Item#3", id: "id03", index: 2 }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

    var originalIndex: number = root.getItem("id03").index;
    var newIndex: number = root.moveItemDown("id03");

    QUnit.assert.equal(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 2);
});

QUnit.test("check enable", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ });

    root.enable(true);

    QUnit.assert.notEqual(root.target.attr("class"), "listbox-root listbox-disabled");
});

QUnit.test("check disable", function (): void {
    var root: ExtendedListboxInstance = TestHelper.generateSingleList({ });

    root.enable(false);

    QUnit.assert.equal(root.target.attr("class"), "listbox-root listbox-disabled");
});

QUnit.test("check moveItemToBottom", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

    var originalIndex: number = root.getItem("id01").index;
    var newIndex: number = root.moveItemToBottom("id01");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 2);
});

QUnit.test("check moveItemToTop", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

    var originalIndex: number = root.getItem("id02").index;
    var newIndex: number = root.moveItemToTop("id02");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 0);
});

QUnit.test("check itemEnterPressed event", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var count: number = 0;

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    root.onItemEnterPressed(function (): void {
        count++;
    });

    var listbox: JQuery = TestHelper.child(root.target);
    var item: JQuery = TestHelper.child(listbox, 1); // id02

    var e: any = jQuery.Event("keydown");
    e.which = 13;
    e.eventPhase = 2;
    item.trigger(e);

    QUnit.assert.equal(count, 1);
});

QUnit.test("check itemDoubleClicked event", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    var count: number = 0;

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
    root.onItemDoubleClicked(function (): void {
        count++;
    });

    var listbox: JQuery = TestHelper.child(root.target);
    var item: JQuery = TestHelper.child(listbox, 1); // id02

    item.dblclick();

    QUnit.assert.equal(count, 1);
});

QUnit.test("check itemArrowUp event", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" },
        { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

    var listbox: JQuery = TestHelper.child(root.target);
    var item: JQuery = TestHelper.child(listbox, 1); // id02

    QUnit.assert.equal(root.getItem("id01").selected, false);
    QUnit.assert.equal(root.getItem("id02").selected, true);

    var e: any = jQuery.Event("keydown");
    e.which = 38;
    e.eventPhase = 2;
    item.trigger(e);

    QUnit.assert.equal(root.getItem("id01").selected, true);
    QUnit.assert.equal(root.getItem("id02").selected, false);
});

QUnit.test("check itemArrowDown event", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" },
        { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

    var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

    var listbox: JQuery = TestHelper.child(root.target);
    var item: JQuery = TestHelper.child(listbox, 1); // id02

    QUnit.assert.equal(root.getItem("id02").selected, true);
    QUnit.assert.equal(root.getItem("id03").selected, false);

    var e: any = jQuery.Event("keydown");
    e.which = 40;
    e.eventPhase = 2;
    item.trigger(e);

    QUnit.assert.equal(root.getItem("id02").selected, false);
    QUnit.assert.equal(root.getItem("id03").selected, true);
});

QUnit.test("check getSelection", function (): void {
    var items: any[] = [{ text: "Item#1", id: "id01" },
        { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03", childItems: [
            { text: "SubItem#1", id: "subid01", selected: true }, { text: "SubItem#2", id: "subid02" }
        ] }];

    var root: ExtendedListboxInstance = TestHelper.generateMultipleList({}, items);

    var selection: ListboxItem[] = root.getSelection();

    QUnit.assert.equal(selection.length, 2);
    QUnit.assert.equal(selection[0].id, "id02");
    QUnit.assert.equal(selection[1].id, "subid01");
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

    listbox["listbox"].baseListBox.fireEvent(ListboxEvent.VALUE_CHANGED, "mySpecialValue");
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

    listbox["listbox"].baseListBox.fireEvent(ListboxEvent.ITEMS_CHANGED, "mySpecialValue");
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

    listbox["listbox"].baseListBox.fireEvent(ListboxEvent.FILTER_CHANGED, "mySpecialValue");
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

    listbox["listbox"].baseListBox.fireEvent(ListboxEvent.ITEM_ENTER_PRESSED, "mySpecialValue");
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

    listbox["listbox"].baseListBox.fireEvent(ListboxEvent.ITEM_DOUBLE_CLICKED, "mySpecialValue");
});

/* tslint:enable:no-string-literal */
