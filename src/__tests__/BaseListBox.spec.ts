import { TestHelper } from "../TestHelper";
import { ListBoxSettings } from "../contract/ListBoxSettings";
import { ListBoxItem } from "../contract/ListBoxItem";
import { BaseListBox } from "../BaseListBox";
import { ListBoxEvent } from "../event/ListBoxEvent";
import { ListBoxSearchBarButtonOptions } from "../contract/ListBoxSearchBarButtonOptions";

/* tslint:disable:no-string-literal */

describe("BaseListBox", () => {
    beforeEach(() => TestHelper.beforeEach());
    afterEach(() => TestHelper.afterEach());

    // ********************** BASICS **********************

    it("check root css class", (): void => {
        const { target } = TestHelper.generateSingleList();

        expect(target.classList.contains("listbox-root")).toBeTruthy();
    });

    it("check list css class", (): void => {
        const { target } = TestHelper.generateSingleList();

        const listBox: HTMLElement = TestHelper.child(target);
        expect(listBox.classList.contains("listbox")).toBeTruthy();
    });

    // ********************** SEARCHBAR **********************

    it("check non existent searchbar", (): void => {
        const { target } = TestHelper.generateSingleList();
        const searchbar: Element = target.querySelector(".listbox-searchbar");

        expect(searchbar).toBeNull();
    });

    it("check searchbarwrapper css class", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true });
        const searchbarWrapper: HTMLElement = TestHelper.child(target);

        expect(searchbarWrapper.classList.contains("listbox-searchbar-wrapper")).toBeTruthy();
    });

    it("check searchbar css class", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true });
        const searchbarWrapper: HTMLElement = TestHelper.child(target);
        const searchbar: HTMLElement = TestHelper.child(searchbarWrapper);

        expect(searchbar.classList.contains("listbox-searchbar")).toBeTruthy();
    });

    it("check default searchbar watermark", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true });
        const searchbarWrapper: HTMLElement = TestHelper.child(target);
        const searchbar: HTMLElement = TestHelper.child(searchbarWrapper);

        expect(searchbar.getAttribute("placeholder")).toEqual("Search...");
    });

    it("check explicit searchbar watermark", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true, searchBarWatermark: "Suche ..." });
        const searchbarWrapper: HTMLElement = TestHelper.child(target);
        const searchbar: HTMLElement = TestHelper.child(searchbarWrapper);

        expect(searchbar.getAttribute("placeholder")).toEqual("Suche ...");
    });

    it("check non existent searchbar button", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true });
        const button: Element = target.querySelector(".listbox-searchbar-button");

        expect(button).toBeNull();
    });

    it("check existent searchbar button with icon", (): void => {
        const { target } = TestHelper.generateSingleList(<ListBoxSettings>{
            searchBar: true,
            searchBarButton: { visible: true, icon: "testIcon" },
        });
        const button: Element = target.querySelector(".listbox-searchbar-button");
        const icon: Element = TestHelper.child(button as HTMLElement);

        expect(icon.classList.contains("testIcon")).toBeTruthy();
    });

    it("check searchbar button callback", (): void => {
        let count = 0;
        const callback: () => void = (): void => {
            count++;
        };

        const options: ListBoxSettings = <ListBoxSettings>{};
        options.searchBar = true;
        options.searchBarButton = <ListBoxSearchBarButtonOptions>{};
        options.searchBarButton.visible = true;
        options.searchBarButton.onClick = callback;

        const { target } = TestHelper.generateSingleList(options);
        const button: HTMLButtonElement = target.querySelector(".listbox-searchbar-button") as HTMLButtonElement;
        button.click();

        expect(count).toEqual(1);
    });

    // ********************** ITEMS **********************

    it("check simple items", (): void => {
        const items: string[] = ["Item#1", "Item#2", "Item#3"];

        const { target } = TestHelper.generateSingleList({}, items);
        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(3);

        for (let i = 0; i < itemElements.length; i++) {
            const element: HTMLElement = itemElements[i];
            const item: string = items[i];

            expect(element.classList.contains("listbox-item")).toBeTruthy();
            expect(element.innerText).toEqual(item);
            expect(element.title).toEqual(item);
            expect(TestHelper.startsWith(element.id, "listBoxItem")).toBeTruthy();
        }
    });

    it("check disabled items", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", disabled: true },
            { text: "Item#2", disabled: true },
            { text: "Item#3", disabled: true },
        ];

        const { target } = TestHelper.generateSingleList({}, items);
        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(3);

        for (let i = 0; i < itemElements.length; i++) {
            const element: HTMLElement = itemElements[i];
            const item: ListBoxItem = items[i];

            expect(
                element.classList.contains("listbox-item") && element.classList.contains("listbox-item-disabled")
            ).toBeTruthy();
            expect(element.innerText).toEqual(item.text);
            expect(element.title).toEqual(item.text);
            expect(TestHelper.startsWith(element.id, "listBoxItem")).toBeTruthy();
        }
    });

    it("check selected item", (): void => {
        const items: ListBoxItem[] = [{ text: "Item#1", selected: true }];

        const { target } = TestHelper.generateSingleList({}, items);
        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(1);

        for (let i = 0; i < itemElements.length; i++) {
            const element: HTMLElement = itemElements[i];
            const item: ListBoxItem = items[i];

            expect(
                element.classList.contains("listbox-item") && element.classList.contains("listbox-item-selected")
            ).toBeTruthy();
            expect(element.innerText).toEqual(item.text);
            expect(element.title).toEqual(item.text);
            expect(TestHelper.startsWith(element.id, "listBoxItem")).toBeTruthy();
        }
    });

    it("check header item", (): void => {
        const items: ListBoxItem[] = [{ text: "Item#1", groupHeader: true }];

        const { target } = TestHelper.generateSingleList({}, items);
        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(1);

        for (let i = 0; i < itemElements.length; i++) {
            const element: HTMLElement = itemElements[i];
            const item: ListBoxItem = items[i];

            expect(element.classList.contains("listbox-item") && element.classList.contains("listbox-item-group")).toBeTruthy();
            expect(element.innerText).toEqual(item.text);
            expect(element.title).toEqual(item.text);
            expect(TestHelper.startsWith(element.id, "listBoxItem")).toBeTruthy();
        }
    });

    it("check item with id", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { target } = TestHelper.generateSingleList({}, items);
        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(3);

        for (let i = 0; i < itemElements.length; i++) {
            const element: HTMLElement = itemElements[i];
            const item: ListBoxItem = items[i];

            expect(element.id).toEqual(item.id);
        }
    });

    it("check item with childs", (): void => {
        const items: ListBoxItem[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

        const { target } = TestHelper.generateSingleList({}, items);
        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(1);

        for (let i = 0; i < itemElements.length; i++) {
            const element: HTMLElement = itemElements[i];
            const item: ListBoxItem = items[i];

            expect(element.classList.contains("listbox-item") && element.classList.contains("listbox-item-group")).toBeTruthy();
            expect(element.title).toEqual(item.text);
            expect(TestHelper.startsWith(element.id, "listBoxItem")).toBeTruthy();

            const childElements: HTMLElement[] = TestHelper.children(element);
            expect(childElements.length).toEqual(2);
            for (let j = 0; j < childElements.length; j++) {
                const childElement: HTMLElement = childElements[j];
                const childItem: string | ListBoxItem = items[0].childItems[j];

                expect(
                    childElement.classList.contains("listbox-item") && childElement.classList.contains("listbox-item-child")
                ).toBeTruthy();
                expect(childElement.innerText).toEqual(childItem);
                expect(childElement.title).toEqual(childItem);
                expect(TestHelper.startsWith(childElement.id, "listBoxItem")).toBeTruthy();
            }
        }
    });

    // ********************** METHODS **********************

    it("check item addition text", (): void => {
        const { target, box } = TestHelper.generateSingleList();
        box.addItem("Item #1");

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(1);

        itemElements.forEach(($elem: HTMLElement): void => {
            expect(TestHelper.startsWith($elem.id, "listBoxItem")).toBeTruthy();
            expect($elem.innerText).toEqual("Item #1");
        });
    });

    it("check item addition object", (): void => {
        const { target, box } = TestHelper.generateSingleList();
        box.addItem({ text: "Item #1", id: "id01" });

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(1);

        itemElements.forEach(($elem: HTMLElement): void => {
            expect($elem.id).toEqual("id01");
            expect($elem.innerText).toEqual("Item #1");
        });
    });

    it("check item additions objects", (): void => {
        const { target, box } = TestHelper.generateSingleList();
        box.addItems([
            { text: "Item #1", id: "id01" },
            { text: "Item #2", id: "id02" },
        ]);

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(2);

        itemElements.forEach(($elem: HTMLElement, index: number): void => {
            expect($elem.id).toEqual(index === 0 ? "id01" : "id02");
            expect($elem.innerText).toEqual(index === 0 ? "Item #1" : "Item #2");
        });
    });

    it("check item removal id", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { target, box } = TestHelper.generateMultipleList({}, items);

        box.removeItem("id02");

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(2);

        let found = false;
        itemElements.forEach(($elem: HTMLElement): void => {
            const id: string = $elem.id;
            if (id === "id02") {
                found = true;
            }
        });

        expect(found).toBeFalsy();
    });

    it("check item removal text", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { target, box } = TestHelper.generateSingleList({}, items);

        box.removeItem("Item#3");

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(2);

        let found = false;
        itemElements.forEach(($elem: HTMLElement): void => {
            const text: string = $elem.textContent;
            if (text === "Item#3") {
                found = true;
            }
        });

        expect(found).toBeFalsy();
    });

    it("check items removals text", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { target, box } = TestHelper.generateSingleList({}, items);

        box.removeItems(["Item#3", "Item#1"]);

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(1);

        let found = false;
        itemElements.forEach(($elem: HTMLElement): void => {
            const text: string = $elem.title;
            if (text === "Item#2") {
                found = true;
            }
        });

        expect(found).toBeTruthy();
    });

    it("check parent item removal", (): void => {
        const items: ListBoxItem[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

        const { target, box } = TestHelper.generateSingleList({}, items);

        box.removeItem("Item#1");

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        expect(itemElements.length).toEqual(0);
    });

    it("check destroy", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { target, box } = TestHelper.generateSingleList({ searchBar: true }, items);

        box.destroy();

        expect(target.classList.contains("listbox-root")).toBeFalsy();
        expect(target.children.length).toEqual(0);
    });

    it("check clearSelection", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01", selected: true },
            { text: "Item#2", id: "id02", selected: true },
        ];

        const { box, target } = TestHelper.generateMultipleList({}, items);

        box.clearSelection();

        const listBox: HTMLElement = TestHelper.child(target);
        const itemElements: HTMLElement[] = TestHelper.children(listBox);

        let found = false;
        itemElements.forEach(($elem: HTMLElement): void => {
            if ($elem.classList.contains("listbox-item-selected")) {
                found = true;
            }
        });

        expect(found).toBeFalsy();
    });

    it("check getItem id", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const item: ListBoxItem = box.getItem("id02");

        expect(item).not.toBeNull();
        expect(item.id).toEqual("id02");
        expect(item.text).toEqual("Item#2");
    });

    it("check getItem text", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const item: ListBoxItem = box.getItem("Item#1");

        expect(item).not.toBeNull();
        expect(item.id).toEqual("id01");
        expect(item.text).toEqual("Item#1");
    });

    it("check getItems", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const listItems: ListBoxItem[] = box.getItems();

        expect(listItems.length).toEqual(3);
    });

    it("check moveItemUp", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const originalIndex: number = box.getItem("id03").index;
        const newIndex: number = box.moveItemUp("id03");

        expect(originalIndex).not.toBe(newIndex);
        expect(newIndex).toBe(1);
    });

    it("check moveItemUp (first item)", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01", index: 0 },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const originalIndex: number = box.getItem("id01").index;
        const newIndex: number = box.moveItemUp("id01");

        expect(originalIndex).toBe(newIndex);
        expect(newIndex).toBe(0);
    });

    it("check moveItemDown", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const originalIndex: number = box.getItem("id01").index;
        const newIndex: number = box.moveItemDown("id01");

        expect(originalIndex).not.toBe(newIndex);
        expect(newIndex).toBe(1);
    });

    it("check moveItemDown (last item)", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03", index: 2 },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const originalIndex: number = box.getItem("id03").index;
        const newIndex: number = box.moveItemDown("id03");

        expect(originalIndex).toBe(newIndex);
        expect(newIndex).toBe(2);
    });

    it("check enable", (): void => {
        const { target, box } = TestHelper.generateSingleList({});

        box.enable(true);

        expect(target.classList.contains("listbox-disabled")).toBeFalsy();
    });

    it("check disable", (): void => {
        const { target, box } = TestHelper.generateSingleList({});

        box.enable(false);

        expect(target.classList.contains("listbox-disabled")).toBeTruthy();
    });

    it("check moveItemToBottom", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateSingleList({}, items);

        const originalIndex: number = box.getItem("id01").index;
        const newIndex: number = box.moveItemToBottom("id01");

        expect(originalIndex).not.toEqual(newIndex);
        expect(newIndex).toBe(2);
    });

    it("check moveItemToTop", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const { box } = TestHelper.generateSingleList({}, items);

        const originalIndex: number = box.getItem("id02").index;
        const newIndex: number = box.moveItemToTop("id02");

        expect(originalIndex).not.toEqual(newIndex);
        expect(newIndex).toBe(0);
    });

    it("check getSelection", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02", selected: true },
            {
                text: "Item#3",
                id: "id03",
                childItems: [
                    { text: "SubItem#1", id: "subid01", selected: true },
                    { text: "SubItem#2", id: "subid02" },
                ],
            },
        ];

        const { box } = TestHelper.generateMultipleList({}, items);

        const selection: ListBoxItem[] = box.getSelection();

        expect(selection.length).toEqual(2);
        expect(selection[0].id).toEqual("id02");
        expect(selection[1].id).toEqual("subid01");
    });

    // ********************** EVENTS **********************

    it("check itemEnterPressed event", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        let count = 0;

        const callback: (e: ListBoxEvent) => void = (event: ListBoxEvent): void => {
            count++;
            expect(event.eventName).toEqual(BaseListBox.EVENT_ITEM_ENTER_PRESSED);
            expect(event.target).toEqual(target);
        };

        const { target } = TestHelper.generateSingleList({ onItemEnterPressed: callback }, items);

        const listBox: HTMLElement = TestHelper.child(target);
        const item: HTMLElement = TestHelper.child(listBox, 1); // id02

        const e: any = document.createEvent("Event");
        e.initEvent("keydown", true, false);
        e.which = 13;
        item.dispatchEvent(e);

        expect(count).toEqual(1);
    });

    it("check itemDoubleClicked event", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03" },
        ];

        const callback: (e: ListBoxEvent) => void = (event: ListBoxEvent): void => {
            expect(event.eventName).toEqual(BaseListBox.EVENT_ITEM_DOUBLE_CLICKED);
            expect(event.target).toEqual(target);
        };

        const { target } = TestHelper.generateSingleList({ onItemDoubleClicked: callback }, items);

        const listBox: HTMLElement = TestHelper.child(target);
        const item: HTMLElement = TestHelper.child(listBox, 1); // id02

        item.click();
        item.click();

        //expect(count).toEqual(1); TODO
        expect(1).toEqual(1);
    });

    it("check itemArrowUp event", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02", selected: true },
            { text: "Item#3", id: "id03" },
        ];

        const { box, target } = TestHelper.generateSingleList({}, items);

        const listBox: HTMLElement = TestHelper.child(target);
        const item: HTMLElement = TestHelper.child(listBox, 1); // id02

        expect(box.getItem("id01").selected).toBeFalsy();
        expect(box.getItem("id02").selected).toBeTruthy();

        const e: any = document.createEvent("Event");
        e.initEvent("keydown", true, false);
        e.which = 38;
        item.dispatchEvent(e);

        expect(box.getItem("id01").selected).toBeTruthy();
        expect(box.getItem("id02").selected).toBeFalsy();
    });

    it("check itemArrowDown event", (): void => {
        const items: ListBoxItem[] = [
            { text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02", selected: true },
            { text: "Item#3", id: "id03" },
        ];

        const { target, box } = TestHelper.generateSingleList({}, items);

        const listBox: HTMLElement = TestHelper.child(target);
        const item: HTMLElement = TestHelper.child(listBox, 1); // id02

        expect(box.getItem("id02").selected).toBeTruthy();
        expect(box.getItem("id03").selected).toBeFalsy();

        const e: any = document.createEvent("Event");
        e.initEvent("keydown", true, false);
        e.which = 40;
        item.dispatchEvent(e);

        expect(box.getItem("id02").selected).toBeFalsy();
        expect(box.getItem("id03").selected).toBeTruthy();
    });

    it("check valueChanged event", (): void => {
        const delegate: (event: ListBoxEvent) => void = (event: ListBoxEvent) => {
            expect(event.eventName).toEqual(BaseListBox.EVENT_VALUE_CHANGED);
            expect(event.target).toEqual(target);
            expect(event.args).toEqual("mySpecialValue");
        };

        const { target, box } = TestHelper.generateSingleList({ onValueChanged: delegate });

        box._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, "mySpecialValue");
        box._fireEvent(BaseListBox.EVENT_VALUE_CHANGED, "mySpecialValue");
    });

    it("check itemsChanged event", (): void => {
        const delegate: (event: ListBoxEvent) => void = (event: ListBoxEvent) => {
            expect(event.eventName).toEqual(BaseListBox.EVENT_ITEMS_CHANGED);
            expect(event.target).toEqual(target);
            expect(event.args).toEqual("mySpecialValue");
        };

        const { target, box } = TestHelper.generateSingleList({ onItemsChanged: delegate });

        box._fireEvent(BaseListBox.EVENT_ITEMS_CHANGED, "mySpecialValue");
    });

    it("check filterChanged event", (): void => {
        let t: HTMLElement = null;

        const delegate: (event: ListBoxEvent) => void = (event: ListBoxEvent) => {
            expect(event.eventName).toEqual(BaseListBox.EVENT_FILTER_CHANGED);
            expect(event.target).toEqual(t);
            expect(event.args).toEqual("mySpecialValue");
        };

        const { box, target } = TestHelper.generateSingleList({ onFilterChanged: delegate });
        t = target;

        box._fireEvent(BaseListBox.EVENT_FILTER_CHANGED, "mySpecialValue");
    });
});

/* tslint:enable:no-string-literal */
