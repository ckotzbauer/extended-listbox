import { ListBoxOptions, Options } from "./types/options";
import { ListBoxItem } from "./types/list-box-item";
import { SingleSelectListBox } from "./single-select-list-box";
import { MultiSelectListBox } from "./multi-select-list-box";

export function generateSingleList(
    options?: Options,
    items: (string | Partial<ListBoxItem>)[] = []
): { box: SingleSelectListBox; target: HTMLElement } {
    options = options || {};
    if (!options.getItems) {
        options.getItems = (): (string | Partial<ListBoxItem>)[] => items;
    }

    const test: HTMLElement = document.createElement("div");
    test.id = "test-single";
    document.getElementById("fixture")?.appendChild(test);

    return { box: new SingleSelectListBox(test, options as ListBoxOptions), target: test };
}

export function generateMultipleList(
    options?: Options,
    items: (string | Partial<ListBoxItem>)[] = []
): { box: MultiSelectListBox; target: HTMLElement } {
    options = options || {};
    if (!options.getItems) {
        options.getItems = (): (string | Partial<ListBoxItem>)[] => items;
    }

    const test: HTMLElement = document.createElement("div");
    test.id = "test-multiple";
    document.getElementById("fixture")?.appendChild(test);

    return { box: new MultiSelectListBox(test, options as ListBoxOptions), target: test };
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
