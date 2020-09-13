import {
    afterEachTest,
    beforeEachTest,
    child,
    click,
    createItem,
    elementEquals,
    generateMultipleList,
    itemEquals,
} from "../test-utils";
import { ListBoxOptions } from "../types/options";

describe("MultiSelectListBoxTest", () => {
    beforeEach(() => beforeEachTest());
    afterEach(() => afterEachTest());

    it("construct default", (): void => {
        const { target } = generateMultipleList();

        expect(target.classList.contains("listbox-root")).toBeTruthy();

        const listBox: HTMLElement = child(target);
        expect(listBox.classList.contains("listbox")).toBeTruthy();

        const searchbar: Element | null = listBox.querySelector(".listbox-searchbar");
        expect(searchbar).toBeNull();
    });

    it("construct with searchbar", (): void => {
        const { target } = generateMultipleList({ searchBar: true });

        const searchbar: HTMLElement = child(target);
        expect(searchbar.classList.contains("listbox-searchbar-wrapper")).toBeTruthy();
        expect(child(searchbar).getAttribute("placeholder")).toEqual("Search...");

        const listBox: HTMLElement = child(target, 1);
        expect(listBox.classList.contains("listbox")).toBeTruthy();
    });

    it("construct with searchbar watermark", (): void => {
        const { target } = generateMultipleList({ searchBar: true, searchBarWatermark: "Suche..." });

        const searchbar: HTMLElement = child(target);
        expect(child(searchbar).getAttribute("placeholder")).toEqual("Suche...");
    });

    it("explicit default value", (): void => {
        const { target, box } = generateMultipleList({}, ["A", "B", createItem("C", "C", true), "D"]);

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["C"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();
    });

    it("two explicit default values", (): void => {
        const { target, box } = generateMultipleList({}, ["A", createItem("B", "B", true), createItem("C", "C", true), "D"]);

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(2);
        expect(elementEquals(box.getSelection(), ["B", "C"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();
    });

    it("one click", (): void => {
        const { target, box } = generateMultipleList({}, [
            createItem("A"),
            createItem("B", "B"),
            createItem("C"),
            createItem("D"),
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[1]); // click on 'B'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["B"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();
    });

    it("two clicks", (): void => {
        const { target } = generateMultipleList({}, [createItem("A"), createItem("B"), createItem("C"), createItem("D")]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[1]); // click on 'B'
        click(items[1]); // click on 'B'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
    });

    it("two clicks (control)", (): void => {
        const { target } = generateMultipleList({}, [createItem("A"), createItem("B"), createItem("C"), createItem("D")]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[1]); // click on 'B'
        click(items[1], true); // click on 'B'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(0);
    });

    it("two clicks on different items", (): void => {
        const { target, box } = generateMultipleList({}, [
            createItem("A"),
            createItem("B"),
            createItem("C", "C"),
            createItem("D"),
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[0]); // click on 'A'
        click(items[2]); // click on 'C'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["C"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();
    });

    it("two clicks on different items (control)", (): void => {
        const { target, box } = generateMultipleList({}, [
            createItem("A", "A"),
            createItem("B"),
            createItem("C", "C"),
            createItem("D"),
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[0]); // click on 'A'
        click(items[2], true); // click on 'C' (with control key)

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(elementEquals(box.getSelection(), ["A", "C"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();
    });

    it("multiple clicks", (): void => {
        const { target, box } = generateMultipleList({}, [
            createItem("A", "A"),
            createItem("B", "B"),
            createItem("C", "C"),
            createItem("D", "D"),
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[0]); // click on 'A'

        let selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["A"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();

        click(items[1]); // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["B"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();

        click(items[0], true); // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(elementEquals(box.getSelection(), ["B", "A"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy(); // TODO

        click(items[2]); // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["C"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();

        click(items[0], true); // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(elementEquals(box.getSelection(), ["C", "A"])).toBeTruthy();

        click(items[1], true); // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(3);
        expect(elementEquals(box.getSelection(), ["C", "A", "B"])).toBeTruthy();

        click(items[0], true); // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(elementEquals(box.getSelection(), ["C", "B"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy(); // TODO

        click(items[1]); // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["B"])).toBeTruthy();

        click(items[2]); // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(elementEquals(box.getSelection(), ["C"])).toBeTruthy();
        expect(itemEquals(selectedItems, box.getSelection())).toBeTruthy();
    });

    it("onValueChanged callback", (): void => {
        let receiveCounter = 0;

        const options: ListBoxOptions = <ListBoxOptions>{};
        options.onValueChanged = (): void => {
            receiveCounter++;
        };

        const { target } = generateMultipleList(options, ["A", "B", "C", "D"]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        click(items[0]);
        expect(receiveCounter).toEqual(1);
        //QUnit.assert.equal(jsonToVal(lastValue), "A"); TODO

        click(items[1]);
        click(items[2]);

        expect(receiveCounter).toEqual(3);
        //QUnit.assert.equal(jsonToVal(lastValue), ["A", "B", "C"]); TODO
    });
});
