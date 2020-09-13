import { Options } from "./types/options";
import { ListBoxItem } from "./types/list-box-item";
import { Instance, ListBoxNameMap } from "types/instance";
import listBox from "./index";

export function createInstance<K extends keyof ListBoxNameMap>(
    mode: K,
    options?: Options,
    items: (string | Partial<ListBoxItem>)[] = []
): { box: Instance<K>; target: HTMLElement } {
    options = options || {};
    if (!options.getItems) {
        options.getItems = (): (string | Partial<ListBoxItem>)[] => items;
    }

    const test: HTMLElement = document.createElement("div");
    test.id = "test";
    document.getElementById("fixture")?.appendChild(test);

    return { box: listBox<K>(test, mode, options) as Instance<K>, target: test };
}

export function child(element: HTMLElement, index = 0): HTMLElement {
    return element.children[index] as HTMLElement;
}

export function children(element: HTMLElement): HTMLElement[] {
    return Array.prototype.slice.call(element.children);
}

export function elementEquals(dataItems: ListBoxItem[], elements: string[]): boolean {
    return JSON.stringify(dataItems.map((d: ListBoxItem) => d.id).sort()) === JSON.stringify(elements.sort());
}

export function itemEquals(items: NodeListOf<Element>, dataItems: ListBoxItem[]): boolean {
    const ids: string[] = [];

    for (let i = 0; i < items.length; i++) {
        ids.push(items.item(i).id);
    }

    return elementEquals(dataItems, ids);
}

export function beforeEachTest(): void {
    const div: HTMLElement = document.createElement("div");
    div.id = "fixture";
    document.body.appendChild(div);
}

export function afterEachTest(): void {
    const e: Element | null = document.getElementById("fixture");
    e?.parentElement?.removeChild(e);
}

export function click(element: Element, ctrl = false): void {
    const e: any = document.createEvent("Event");
    e.initEvent("click", true, false);
    e.ctrlKey = ctrl;
    element.dispatchEvent(e);
}

export function createItem(
    text: string,
    id: string | null = null,
    selected = false,
    childItems: ListBoxItem[] = []
): Partial<ListBoxItem> {
    if (id === null) {
        return { text, selected, childItems };
    } else {
        return { text, id, selected, childItems };
    }
}
