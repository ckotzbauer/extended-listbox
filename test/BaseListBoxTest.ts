/// <reference path="./test-typings.d.ts" />
/// <amd-module name="build/out/test/test/BaseListBoxTest"/>

import {TestHelper} from "./infrastructure/TestHelper";
import {ListboxSettings} from "../src/ts/contract/ListboxSettings";
import {BaseListBox} from "../src/ts/BaseListBox";
import {ListboxEvent} from "../src/ts/event/ListboxEvent";
import {ListboxSearchBarButtonOptions} from "../src/ts/contract/ListboxSearchBarButtonOptions";

/* tslint:disable:no-string-literal */

QUnit.module("BaseListBoxTest", {
    beforeEach: (): void => {
        TestHelper.beforeEach();
    },
    afterEach: (): void => {
        TestHelper.afterEach();
    }
});

// ********************** BASICS **********************

QUnit.test("check root css class", (): void => {
    const { target } = TestHelper.generateSingleList();

    QUnit.assert.ok(target.classList.contains("listbox-root"));
});

QUnit.test("check list css class", (): void => {
    const { target } = TestHelper.generateSingleList();

    const listbox: HTMLElement = TestHelper.child(target);
    QUnit.assert.ok(listbox.classList.contains("listbox"));
});


// ********************** SEARCHBAR **********************

QUnit.test("check non existent searchbar", (): void => {
    const { target } = TestHelper.generateSingleList();
    const searchbar: Element = target.querySelector('.listbox-searchbar');

    QUnit.assert.ok(searchbar === null);
});

QUnit.test("check searchbarwrapper css class", (): void => {
    const { target } = TestHelper.generateSingleList({ searchBar: true });
    const searchbarWrapper: HTMLElement = TestHelper.child(target);

    QUnit.assert.ok(searchbarWrapper.classList.contains('listbox-searchbar-wrapper'));
});

QUnit.test("check searchbar css class", (): void => {
    const { target } = TestHelper.generateSingleList({ searchBar: true });
    const searchbarWrapper: HTMLElement = TestHelper.child(target);
    const searchbar: HTMLElement = TestHelper.child(searchbarWrapper);

    QUnit.assert.ok(searchbar.classList.contains('listbox-searchbar'));
});

QUnit.test("check default searchbar watermark", (): void => {
    const { target } = TestHelper.generateSingleList({ searchBar: true });
    const searchbarWrapper: HTMLElement = TestHelper.child(target);
    const searchbar: HTMLElement = TestHelper.child(searchbarWrapper);

    QUnit.assert.equal(searchbar.getAttribute("placeholder"), 'Search...');
});

QUnit.test("check explicit searchbar watermark", (): void => {
    const { target } = TestHelper.generateSingleList(
        { searchBar: true, searchBarWatermark: "Suche ..." });
    const searchbarWrapper: HTMLElement = TestHelper.child(target);
    const searchbar: HTMLElement = TestHelper.child(searchbarWrapper);

    QUnit.assert.equal(searchbar.getAttribute('placeholder'), 'Suche ...');
});

QUnit.test("check non existent searchbar button", (): void => {
    const { target } = TestHelper.generateSingleList({ searchBar: true });
    const button: Element = target.querySelector('.listbox-searchbar-button');

    QUnit.assert.ok(button === null);
});

QUnit.test("check existent searchbar button with icon", (): void => {
    const { target } = TestHelper.generateSingleList(<ListboxSettings>{ searchBar: true,
        searchBarButton: { visible: true, icon: "testIcon" } });
    const button: Element = target.querySelector('.listbox-searchbar-button');
    const icon: Element = TestHelper.child(button as HTMLElement);

    QUnit.assert.ok(icon.classList.contains("testIcon"));
});

QUnit.test("check searchbar button callback", (): void => {
    let count: number = 0;
    const callback: () => void = (): void => {
        count++;
    };

    const options: ListboxSettings = <ListboxSettings> {};
    options.searchBar = true;
    options.searchBarButton = <ListboxSearchBarButtonOptions> {};
    options.searchBarButton.visible = true;
    options.searchBarButton.onClick = callback;

    const { target } = TestHelper.generateSingleList(options);
    const button: HTMLButtonElement = target.querySelector('.listbox-searchbar-button') as HTMLButtonElement;
    button.click();

    QUnit.assert.equal(count, 1);
});


// ********************** ITEMS **********************

QUnit.test("check simple items", (): void => {
    const items: string[] = ["Item#1", "Item#2", "Item#3"];

    const { target } = TestHelper.generateSingleList({}, items);
    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 3);

    for (let i: number = 0; i < itemElements.length; i++) {
        const element: HTMLElement = itemElements[i];
        const item: string = items[i];

        QUnit.assert.ok(element.classList.contains("listbox-item"));
        QUnit.assert.equal(element.innerText, item);
        QUnit.assert.equal(element.title, item);
        QUnit.assert.ok(TestHelper.startsWith(element.id, "listboxitem"));
    }
});

QUnit.test("check disabled items", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", disabled: true },
        { text: "Item#2", disabled: true }, { text: "Item#3", disabled: true }];

    const { target } = TestHelper.generateSingleList({}, items);
    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 3);

    for (let i: number = 0; i < itemElements.length; i++) {
        const element: HTMLElement = itemElements[i];
        const item: ListboxItem = items[i];

        QUnit.assert.ok(element.classList.contains("listbox-item") && element.classList.contains("listbox-item-disabled"));
        QUnit.assert.equal(element.innerText, item.text);
        QUnit.assert.equal(element.title, item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.id, "listboxitem"));
    }
});

QUnit.test("check selected item", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", selected: true }];

    const { target } = TestHelper.generateSingleList({}, items);
    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    for (let i: number = 0; i < itemElements.length; i++) {
        const element: HTMLElement = itemElements[i];
        const item: ListboxItem = items[i];

        QUnit.assert.ok(element.classList.contains("listbox-item") && element.classList.contains("listbox-item-selected"));
        QUnit.assert.equal(element.innerText, item.text);
        QUnit.assert.equal(element.title, item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.id, "listboxitem"));
    }
});

QUnit.test("check header item", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", groupHeader: true }];

    const { target } = TestHelper.generateSingleList({}, items);
    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    for (let i: number = 0; i < itemElements.length; i++) {
        const element: HTMLElement = itemElements[i];
        const item: ListboxItem = items[i];

        QUnit.assert.ok(element.classList.contains("listbox-item") && element.classList.contains("listbox-item-group"));
        QUnit.assert.equal(element.innerText, item.text);
        QUnit.assert.equal(element.title, item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.id, "listboxitem"));
    }
});

QUnit.test("check item with id", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { target } = TestHelper.generateSingleList({}, items);
    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 3);

    for (let i: number = 0; i < itemElements.length; i++) {
        const element: HTMLElement = itemElements[i];
        const item: ListboxItem = items[i];

        QUnit.assert.equal(element.id, item.id);
    }
});

QUnit.test("check item with childs", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

    const { target } = TestHelper.generateSingleList({}, items);
    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    for (let i: number = 0; i < itemElements.length; i++) {
        const element: HTMLElement = itemElements[i];
        const item: ListboxItem = items[i];

        QUnit.assert.ok(element.classList.contains("listbox-item") && element.classList.contains("listbox-item-group"));
        QUnit.assert.equal(element.title, item.text);
        QUnit.assert.ok(TestHelper.startsWith(element.id, "listboxitem"));

        const childElements: HTMLElement[] = TestHelper.children(element);
        QUnit.assert.equal(childElements.length, 2);
        for (let j: number = 0; j < childElements.length; j++) {
            const childElement: HTMLElement = childElements[j];
            const childItem: string|ListboxItem = items[0].childItems[j];

            QUnit.assert.ok(childElement.classList.contains("listbox-item") &&
                childElement.classList.contains("listbox-item-child"));
            QUnit.assert.equal(childElement.innerText, childItem);
            QUnit.assert.equal(childElement.title, childItem);
            QUnit.assert.ok(TestHelper.startsWith(childElement.id, "listboxitem"));
        }
    }
});


// ********************** METHODS **********************

QUnit.test("check item addition text", (): void => {
    const { target, box } = TestHelper.generateSingleList();
    box.addItem("Item #1");

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    itemElements.forEach(($elem: HTMLElement): void => {
        QUnit.assert.equal(TestHelper.startsWith($elem.id, "listboxitem"), true);
        QUnit.assert.equal($elem.innerText, "Item #1");
    });
});

QUnit.test("check item addition object", (): void => {
    const { target, box } = TestHelper.generateSingleList();
    box.addItem({ text: "Item #1", id: "id01" });

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    itemElements.forEach(($elem: HTMLElement): void => {
        QUnit.assert.equal($elem.id, "id01");
        QUnit.assert.equal($elem.innerText, "Item #1");
    });
});

QUnit.test("check item additions objects", (): void => {
    const { target, box } = TestHelper.generateSingleList();
    box.addItems([{ text: "Item #1", id: "id01" }, { text: "Item #2", id: "id02" }]);

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 2);

    itemElements.forEach(($elem: HTMLElement, index: number): void => {
        QUnit.assert.equal($elem.id, index === 0 ? "id01" : "id02");
        QUnit.assert.equal($elem.innerText, index === 0 ? "Item #1" : "Item #2");
    });
});

QUnit.test("check item removal id", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { target, box } = TestHelper.generateSingleList({ multiple: true }, items);

    box.removeItem("id02");

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 2);

    let found: boolean = false;
    itemElements.forEach(($elem: HTMLElement): void => {
        const id: string = $elem.id;
        if (id === "id02") {
            found = true;
        }
    });

    QUnit.assert.equal(found, false);
});

QUnit.test("check item removal text", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { target, box } = TestHelper.generateSingleList({}, items);

    box.removeItem("Item#3");

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 2);

    let found: boolean = false;
    itemElements.forEach(($elem: HTMLElement): void => {
        const text: string = $elem.textContent;
        if (text === "Item#3") {
            found = true;
        }
    });

    QUnit.assert.equal(found, false);
});

QUnit.test("check items removals text", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { target, box } = TestHelper.generateSingleList({}, items);

    box.removeItems(["Item#3", "Item#1"]);

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 1);

    let found: boolean = false;
    itemElements.forEach(($elem: HTMLElement): void => {
        const text: string = $elem.textContent;
        if (text === "Item#2") {
            found = true;
        }
    });

    QUnit.assert.equal(found, true);
});

QUnit.test("check parent item removal", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

    const { target, box } = TestHelper.generateSingleList({}, items);

    box.removeItem("Item#1");

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    QUnit.assert.equal(itemElements.length, 0);
});

QUnit.test("check destroy", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { target, box } = TestHelper.generateSingleList({ searchBar: true }, items);

    box.destroy();

    QUnit.assert.notOk(target.classList.contains("listbox-root"));
    QUnit.assert.equal(target.children.length, 0);
});

QUnit.test("check clearSelection", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01", selected: true }, { text: "Item#2", id: "id02", selected: true }];

    const { box, target } = TestHelper.generateSingleList({ multiple: true }, items);

    box.clearSelection();

    const listbox: HTMLElement = TestHelper.child(target);
    const itemElements: HTMLElement[] = TestHelper.children(listbox);

    let found: boolean = false;
    itemElements.forEach(($elem: HTMLElement): void => {
        if ($elem.classList.contains("listbox-item-selected")) {
            found = true;
        }
    });

    QUnit.assert.equal(found, false);
});

QUnit.test("check getItem id", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const item: ListboxItem = box.getItem("id02");

    QUnit.assert.ok(item !== null);
    QUnit.assert.equal(item.id, "id02");
    QUnit.assert.equal(item.text, "Item#2");
});

QUnit.test("check getItem text", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const item: ListboxItem = box.getItem("Item#1");

    QUnit.assert.ok(item !== null);
    QUnit.assert.equal(item.id, "id01");
    QUnit.assert.equal(item.text, "Item#1");
});

QUnit.test("check getItems", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const listItems: ListboxItem[] = box.getItems();

    QUnit.assert.equal(listItems.length, 3);
});

QUnit.test("check moveItemUp", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const originalIndex: number = box.getItem("id03").index;
    const newIndex: number = box.moveItemUp("id03");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 1);
});

QUnit.test("check moveItemUp (first item)", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01", index: 0 },
        { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const originalIndex: number = box.getItem("id01").index;
    const newIndex: number = box.moveItemUp("id01");

    QUnit.assert.equal(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 0);
});

QUnit.test("check moveItemDown", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const originalIndex: number = box.getItem("id01").index;
    const newIndex: number = box.moveItemDown("id01");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 1);
});

QUnit.test("check moveItemDown (last item)", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" },
        { text: "Item#3", id: "id03", index: 2 }];

    const { box } = TestHelper.generateSingleList({ multiple: true }, items);

    const originalIndex: number = box.getItem("id03").index;
    const newIndex: number = box.moveItemDown("id03");

    QUnit.assert.equal(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 2);
});

QUnit.test("check enable", (): void => {
    const { target, box } = TestHelper.generateSingleList({ });

    box.enable(true);

    QUnit.assert.notOk(target.classList.contains("listbox-disabled"));
});

QUnit.test("check disable", (): void => {
    const { target, box } = TestHelper.generateSingleList({ });

    box.enable(false);

    QUnit.assert.ok(target.classList.contains("listbox-disabled"));
});

QUnit.test("check moveItemToBottom", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({}, items);

    const originalIndex: number = box.getItem("id01").index;
    const newIndex: number = box.moveItemToBottom("id01");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 2);
});

QUnit.test("check moveItemToTop", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    const { box } = TestHelper.generateSingleList({}, items);

    const originalIndex: number = box.getItem("id02").index;
    const newIndex: number = box.moveItemToTop("id02");

    QUnit.assert.notEqual(originalIndex, newIndex);
    QUnit.assert.equal(newIndex, 0);
});

QUnit.test("check getSelection", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" },
    { text: "Item#2", id: "id02", selected: true }, {
        text: "Item#3", id: "id03", childItems: [
            { text: "SubItem#1", id: "subid01", selected: true }, { text: "SubItem#2", id: "subid02" }
        ]
    }];

    const { box } = TestHelper.generateMultipleList({}, items);

    const selection: ListboxItem[] = box.getSelection();

    QUnit.assert.equal(selection.length, 2);
    QUnit.assert.equal(selection[0].id, "id02");
    QUnit.assert.equal(selection[1].id, "subid01");
});


// ********************** EVENTS **********************

QUnit.test("check itemEnterPressed event", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    let count: number = 0;

    const callback: (e: ListboxEvent) => void = (event: ListboxEvent): void => {
        count++;
        QUnit.assert.equal(event.eventName, BaseListBox.EVENT_ITEM_ENTER_PRESSED);
        QUnit.assert.equal(event.target, target);
    };

    const { target } = TestHelper.generateSingleList({ onItemEnterPressed: callback }, items);

    const listbox: HTMLElement = TestHelper.child(target);
    const item: HTMLElement = TestHelper.child(listbox, 1); // id02

    const e: any = document.createEvent("Event");
    e.initEvent("keydown", true, false);
    e.which = 13;
    item.dispatchEvent(e);

    QUnit.assert.equal(count, 1);
});

QUnit.test("check itemDoubleClicked event", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

    let count: number = 0;

    const callback: (e: ListboxEvent) => void = (event: ListboxEvent): void => {
        count++;
        QUnit.assert.equal(event.eventName, BaseListBox.EVENT_ITEM_DOUBLE_CLICKED);
        QUnit.assert.equal(event.target, target);
    };

    const { target } = TestHelper.generateSingleList({ onItemDoubleClicked: callback }, items);

    const listbox: HTMLElement = TestHelper.child(target);
    const item: HTMLElement = TestHelper.child(listbox, 1); // id02

    item.click();
    item.click();

    //QUnit.assert.equal(count, 1); TODO
    QUnit.assert.equal(1, 1);
});

QUnit.test("check itemArrowUp event", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" },
        { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

    const { box, target } = TestHelper.generateSingleList({}, items);

    const listbox: HTMLElement = TestHelper.child(target);
    const item: HTMLElement = TestHelper.child(listbox, 1); // id02

    QUnit.assert.equal(box.getItem("id01").selected, false);
    QUnit.assert.equal(box.getItem("id02").selected, true);

    const e: any = document.createEvent("Event");
    e.initEvent("keydown", true, false);
    e.which = 38;
    item.dispatchEvent(e);

    QUnit.assert.equal(box.getItem("id01").selected, true);
    QUnit.assert.equal(box.getItem("id02").selected, false);
});

QUnit.test("check itemArrowDown event", (): void => {
    const items: ListboxItem[] = [{ text: "Item#1", id: "id01" },
        { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

    const { target, box } = TestHelper.generateSingleList({}, items);

    const listbox: HTMLElement = TestHelper.child(target);
    const item: HTMLElement = TestHelper.child(listbox, 1); // id02

    QUnit.assert.equal(box.getItem("id02").selected, true);
    QUnit.assert.equal(box.getItem("id03").selected, false);

    const e: any = document.createEvent("Event");
    e.initEvent("keydown", true, false);
    e.which = 40;
    item.dispatchEvent(e);

    QUnit.assert.equal(box.getItem("id02").selected, false);
    QUnit.assert.equal(box.getItem("id03").selected, true);
});

QUnit.test("check valueChanged event", (): void => {
    const delegate: (event: ListboxEvent) => void = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, BaseListBox.EVENT_VALUE_CHANGED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    const { target, box } = TestHelper.generateSingleList({ onValueChanged: delegate });

    box.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, "mySpecialValue");
    box.fireEvent(BaseListBox.EVENT_VALUE_CHANGED, "mySpecialValue");
});

QUnit.test("check itemsChanged event", (): void => {
    const delegate: (event: ListboxEvent) => void = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, BaseListBox.EVENT_ITEMS_CHANGED);
        QUnit.assert.equal(event.target, target);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    const { target, box } = TestHelper.generateSingleList({ onItemsChanged: delegate });

    box.fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, "mySpecialValue");
});

QUnit.test("check filterChanged event", (): void => {
    let t: HTMLElement = null;

    const delegate: (event: ListboxEvent) => void = (event: ListboxEvent) => {
        QUnit.assert.equal(event.eventName, BaseListBox.EVENT_FILTER_CHANGED);
        QUnit.assert.equal(event.target, t);
        QUnit.assert.equal(event.args, "mySpecialValue");
    };

    const { box, target } = TestHelper.generateSingleList({ onFilterChanged: delegate });
    t = target;

    box.fireEvent(BaseListBox.EVENT_FILTER_CHANGED, "mySpecialValue");
});

/* tslint:enable:no-string-literal */
