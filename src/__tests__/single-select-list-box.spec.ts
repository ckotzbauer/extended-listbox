import { afterEachTest, beforeEachTest, child, click, createItem, createInstance } from "../test-utils";
import { ListBoxOptions } from "../types/options";
import { ListBoxEvent } from "../types/list-box-event";

describe("SingleSelectListBoxTest", () => {
    beforeEach(() => beforeEachTest());
    afterEach(() => afterEachTest());

    it("construct default", (): void => {
        const { target } = createInstance("single");

        expect(target.classList.contains("listbox-root")).toBeTruthy();

        const listBox: HTMLElement = child(target);
        expect(listBox.classList.contains("listbox")).toBeTruthy();

        const searchbar: Element | null = listBox.querySelector(".listbox-searchbar");
        expect(searchbar).toBeNull();
    });

    it("construct with searchbar", (): void => {
        const { target } = createInstance("single", { searchBar: true });

        const searchbar: HTMLElement = child(target);
        expect(searchbar.classList.contains("listbox-searchbar-wrapper")).toBeTruthy();
        expect(child(searchbar).getAttribute("placeholder")).toEqual("Search...");

        const listBox: HTMLElement = child(target, 1);
        expect(listBox.classList.contains("listbox")).toBeTruthy();
    });

    it("construct with searchbar watermark", (): void => {
        const { target } = createInstance("single", { searchBar: true, searchBarWatermark: "Suche..." });

        const searchbar: HTMLElement = child(target);
        expect(child(searchbar).getAttribute("placeholder")).toEqual("Suche...");
    });

    it("explicit default value", (): void => {
        const { target } = createInstance("single", {}, ["A", "B", createItem("C", "C", true), "D"]);

        const selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");
    });

    it("two explicit default values", (): void => {
        const { target } = createInstance("single", {}, ["A", createItem("B", "B", true), createItem("C", "C", true), "D"]);

        const selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");
    });

    it("one click", (): void => {
        const { target } = createInstance("single", {}, ["A", createItem("B"), "C", "D"]);

        const items: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item");

        click(items[1]); // click on 'B'

        const selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("B");
    });

    it("multiple clicks", (): void => {
        const { target } = createInstance("single", {}, ["A", "B", "C", "D"]);

        const items: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item");

        click(items[1]); // click on 'B'

        let selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("B");

        click(items[2]); // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");

        click(items[0]); // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("A");

        click(items[3]); // click on 'D'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("D");

        click(items[1]); // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("B");

        click(items[2]); // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");
    });

    it("onValueChanged callback", (): void => {
        let receiveCounter = 0;
        let lastValue: any = null;

        const options: ListBoxOptions = <ListBoxOptions>{};
        options.onValueChanged = (newValue: ListBoxEvent): void => {
            receiveCounter++;
            lastValue = newValue.args.text;
        };

        const { target } = createInstance("single", options, ["A", "B", "C", "D"]);

        const items: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item");

        click(items[0]);
        expect(receiveCounter).toEqual(1);
        expect(lastValue).toEqual("A");

        click(items[1]);
        click(items[2]);

        expect(receiveCounter).toEqual(3);
        expect(lastValue).toEqual("C");
    });
});
