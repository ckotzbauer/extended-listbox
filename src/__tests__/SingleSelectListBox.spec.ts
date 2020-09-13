import { TestHelper } from "../TestHelper";
import { ListBoxSettings } from "../contract/ListBoxSettings";
import { ListBoxEvent } from "../event/ListBoxEvent";

describe("SingleSelectListBoxTest", () => {
    beforeEach(() => TestHelper.beforeEach());
    afterEach(() => TestHelper.afterEach());

    it("construct default", (): void => {
        const { target } = TestHelper.generateSingleList();

        expect(target.classList.contains("listbox-root")).toBeTruthy();

        const listBox: HTMLElement = TestHelper.child(target);
        expect(listBox.classList.contains("listbox")).toBeTruthy();

        const searchbar: Element = listBox.querySelector(".listbox-searchbar");
        expect(searchbar).toBeFalsy();
    });

    it("construct with searchbar", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true });

        const searchbar: HTMLElement = TestHelper.child(target);
        expect(searchbar.classList.contains("listbox-searchbar-wrapper")).toBeTruthy();
        expect(TestHelper.child(searchbar).getAttribute("placeholder")).toEqual("Search...");

        const listBox: HTMLElement = TestHelper.child(target, 1);
        expect(listBox.classList.contains("listbox")).toBeTruthy();
    });

    it("construct with searchbar watermark", (): void => {
        const { target } = TestHelper.generateSingleList({ searchBar: true, searchBarWatermark: "Suche..." });

        const searchbar: HTMLElement = TestHelper.child(target);
        expect(TestHelper.child(searchbar).getAttribute("placeholder")).toEqual("Suche...");
    });

    it("explicit default value", (): void => {
        const { target } = TestHelper.generateSingleList({}, ["A", "B", { text: "C", selected: true }, "D"]);

        const selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");
    });

    it("two explicit default values", (): void => {
        const { target } = TestHelper.generateSingleList({}, [
            "A",
            { text: "B", selected: true },
            { text: "C", selected: true },
            "D",
        ]);

        const selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");
    });

    it("one click", (): void => {
        const { target } = TestHelper.generateSingleList({}, ["A", { id: "B", text: "B" }, "C", "D"]);

        const items: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[1]); // click on 'B'

        const selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("B");
    });

    it("multiple clicks", (): void => {
        const { target } = TestHelper.generateSingleList({}, ["A", "B", "C", "D"]);

        const items: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[1]); // click on 'B'

        let selectedItems: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("B");

        TestHelper.click(items[2]); // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");

        TestHelper.click(items[0]); // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("A");

        TestHelper.click(items[3]); // click on 'D'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("D");

        TestHelper.click(items[1]); // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("B");

        TestHelper.click(items[2]); // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(selectedItems[0].title).toEqual("C");
    });

    it("onValueChanged callback", (): void => {
        let receiveCounter = 0;
        let lastValue: any = null;

        const options: ListBoxSettings = <ListBoxSettings>{};
        options.onValueChanged = (newValue: ListBoxEvent): void => {
            receiveCounter++;
            lastValue = newValue.args.text;
        };

        const { target } = TestHelper.generateSingleList(options, ["A", "B", "C", "D"]);

        const items: NodeListOf<HTMLElement> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[0]);
        expect(receiveCounter).toEqual(1);
        expect(lastValue).toEqual("A");

        TestHelper.click(items[1]);
        TestHelper.click(items[2]);

        expect(receiveCounter).toEqual(3);
        expect(lastValue).toEqual("C");
    });
});
