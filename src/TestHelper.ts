import { ListBoxSettings } from "./contract/ListBoxSettings";
import { ListBoxItem } from "./contract/ListBoxItem";
import { SingleSelectListBox } from "./SingleSelectListBox";
import { MultiSelectListBox } from "./MultiSelectListBox";

export class TestHelper {
    public static child(element: HTMLElement, index: number = null): HTMLElement {
        return element.children[index || 0] as HTMLElement;
    }

    public static children(element: HTMLElement): HTMLElement[] {
        return Array.prototype.slice.call(element.children);
    }

    public static generateSingleList(
        options: ListBoxSettings = null,
        items: (string | ListBoxItem)[] = null
    ): { box: SingleSelectListBox; target: HTMLElement } {
        options = options || {};
        if (!options.getItems) {
            options.getItems = (): (string | ListBoxItem)[] => items;
        }

        const test: HTMLElement = document.createElement("div");
        test.id = "test-single";
        document.getElementById("fixture").appendChild(test);

        return { box: new SingleSelectListBox(test, options), target: test };
    }

    public static generateMultipleList(
        options: ListBoxSettings = null,
        items: (string | ListBoxItem)[] = null
    ): { box: MultiSelectListBox; target: HTMLElement } {
        options = options || {};
        if (!options.getItems) {
            options.getItems = (): (string | ListBoxItem)[] => items;
        }

        const test: HTMLElement = document.createElement("div");
        test.id = "test-multiple";
        document.getElementById("fixture").appendChild(test);

        return { box: new MultiSelectListBox(test, options), target: test };
    }

    public static startsWith(s: string, check: string): boolean {
        return s.indexOf(check) === 0;
    }

    public static elementEquals(dataItems: ListBoxItem[], elements: string[]): boolean {
        return JSON.stringify(dataItems.map((d: ListBoxItem) => d.id).sort()) === JSON.stringify(elements.sort());
    }

    public static itemEquals(items: NodeListOf<Element>, dataItems: ListBoxItem[]): boolean {
        const ids: string[] = [];

        for (let i = 0; i < items.length; i++) {
            ids.push(items.item(i).id);
        }

        return TestHelper.elementEquals(dataItems, ids);
    }

    public static beforeEach(): void {
        const div: HTMLElement = document.createElement("div");
        div.id = "fixture";
        document.body.appendChild(div);
    }

    public static afterEach(): void {
        const e: Element = document.getElementById("fixture");
        e.parentElement.removeChild(e);
    }

    public static click(element: Element, ctrl = false): void {
        const e: any = document.createEvent("Event");
        e.initEvent("click", true, false);
        e.ctrlKey = ctrl;
        element.dispatchEvent(e);
    }
}
