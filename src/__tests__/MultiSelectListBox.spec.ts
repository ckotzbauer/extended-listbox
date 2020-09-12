import {TestHelper} from "../TestHelper";
import {ListBoxSettings} from "../contract/ListBoxSettings";
import {ListBoxEvent} from "../event/ListBoxEvent";

describe("MultiSelectListBoxTest", () => {
    beforeEach(() => TestHelper.beforeEach());
    afterEach(() => TestHelper.afterEach());

    it('construct default', (): void => {
        const { target } = TestHelper.generateMultipleList();

        expect(target.classList.contains("listbox-root")).toBeTruthy();

        const listBox: HTMLElement = TestHelper.child(target);
        expect(listBox.classList.contains("listbox")).toBeTruthy();

        const searchbar: Element = listBox.querySelector('.listbox-searchbar');
        expect(searchbar).toBeFalsy();
    });


    it('construct with searchbar', (): void => {
        const { target } = TestHelper.generateMultipleList({ searchBar: true });

        const searchbar: HTMLElement = TestHelper.child(target);
        expect(searchbar.classList.contains("listbox-searchbar-wrapper")).toBeTruthy();
        expect(TestHelper.child(searchbar).getAttribute("placeholder")).toEqual('Search...');

        const listBox: HTMLElement = TestHelper.child(target, 1);
        expect(listBox.classList.contains("listbox")).toBeTruthy();
    });

    it('construct with searchbar watermark', (): void => {
        const { target } = TestHelper.generateMultipleList(
            { searchBar: true, searchBarWatermark: "Suche..." });

        const searchbar: HTMLElement = TestHelper.child(target);
        expect(TestHelper.child(searchbar).getAttribute('placeholder')).toEqual('Suche...');
    });


    it('explicit default value', (): void => {
        const { target, box } = TestHelper.generateMultipleList({}, [
            "A",
            "B",
            { id: "C", text: "C", selected: true },
            "D"
        ]);

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();
    });


    it('two explicit default values', (): void => {
        const { target, box } = TestHelper.generateMultipleList({}, [
            "A",
            { id: "B", text: "B", selected: true },
            { id: "C", text: "C", selected: true },
            "D"
        ]);

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");

        expect(selectedItems.length).toEqual(2);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["B", "C"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();
    });


    it('one click', (): void => {
        const { target, box } = TestHelper.generateMultipleList({}, [
            { id: "A",  text: "A" },
            { id: "B",  text: "B" },
            { id: "C",  text: "C" },
            { id: "D",  text: "D" }
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[1]);     // click on 'B'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["B"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();
    });


    it('two clicks', (): void => {
        const { target } = TestHelper.generateMultipleList({}, [
            { id: "A",  text: "A" },
            { id: "B",  text: "B" },
            { id: "C",  text: "C" },
            { id: "D",  text: "D" }
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[1]);     // click on 'B'
        TestHelper.click(items[1]);     // click on 'B'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
    });

    it('two clicks (control)', (): void => {
        const { target } = TestHelper.generateMultipleList({}, [
            { id: "A",  text: "A" },
            { id: "B",  text: "B" },
            { id: "C",  text: "C" },
            { id: "D",  text: "D" }
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[1]);               // click on 'B'
        TestHelper.click(items[1], true);     // click on 'B'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(0);
    });


    it('two clicks on different items', (): void => {
        const { target, box } = TestHelper.generateMultipleList({}, [
            { id: "A",  text: "A" },
            { id: "B",  text: "B" },
            { id: "C",  text: "C" },
            { id: "D",  text: "D" }
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[0]);     // click on 'A'
        TestHelper.click(items[2]);     // click on 'C'

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();
    });

    it('two clicks on different items (control)', (): void => {
        const { target, box } = TestHelper.generateMultipleList({}, [
            { id: "A",  text: "A" },
            { id: "B",  text: "B" },
            { id: "C",  text: "C" },
            { id: "D",  text: "D" }
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[0]);               // click on 'A'
        TestHelper.click(items[2], true);     // click on 'C' (with control key)

        const selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["A", "C"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();
    });


    it('multiple clicks', (): void => {
        const { target, box } = TestHelper.generateMultipleList({}, [
            { id: "A",  text: "A" },
            { id: "B",  text: "B" },
            { id: "C",  text: "C" },
            { id: "D",  text: "D" }
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[0]);     // click on 'A'

        let selectedItems: NodeListOf<Element> = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["A"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();

        TestHelper.click(items[1]);     // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["B"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();

        TestHelper.click(items[0], true);     // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["B", "A"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy(); // TODO

        TestHelper.click(items[2]);     // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();

        TestHelper.click(items[0], true);     // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C", "A"])).toBeTruthy();

        TestHelper.click(items[1], true);     // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(3);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C", "A", "B"])).toBeTruthy();

        TestHelper.click(items[0], true);     // click on 'A'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(2);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C", "B"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy(); // TODO

        TestHelper.click(items[1]);     // click on 'B'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["B"])).toBeTruthy();

        TestHelper.click(items[2]);     // click on 'C'

        selectedItems = target.querySelectorAll(".listbox-item-selected");
        expect(selectedItems.length).toEqual(1);
        expect(TestHelper.elementEquals(box.selectedDataItems, ["C"])).toBeTruthy();
        expect(TestHelper.itemEquals(selectedItems, box.selectedDataItems)).toBeTruthy();
    });


    it('onValueChanged callback', (): void => {
        let receiveCounter: number = 0;
        let lastValue: any = null;

        const options: ListBoxSettings = <ListBoxSettings> {};
        options.onValueChanged = (newValue: ListBoxEvent): void => {
            receiveCounter++;
            lastValue = newValue.args;
        };

        const { target } = TestHelper.generateMultipleList(options, [
            "A",
            "B",
            "C",
            "D"
        ]);

        const items: NodeListOf<Element> = target.querySelectorAll(".listbox-item");

        TestHelper.click(items[0]);
        expect(receiveCounter).toEqual(1);
        //QUnit.assert.equal(TestHelper.jsonToVal(lastValue), "A"); TODO

        TestHelper.click(items[1]);
        TestHelper.click(items[2]);

        expect(receiveCounter).toEqual(3);
        //QUnit.assert.equal(TestHelper.jsonToVal(lastValue), ["A", "B", "C"]); TODO
    });
});
