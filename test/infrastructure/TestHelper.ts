/// <reference path="../test-typings.d.ts" />
/// <amd-module name="build/out/test/test/infrastructure/TestHelper"/>

import {ListboxSettings} from "../../src/ts/contract/ListboxSettings";
import {SingleSelectListbox} from "../../src/ts/SingleSelectListbox";
import {MultiSelectListbox} from "../../src/ts/MultiSelectListbox";

export class TestHelper {

    public static child(element: HTMLElement, index: number = null): HTMLElement {
        return element.children[index || 0] as HTMLElement;
    }

    public static children(element: HTMLElement): HTMLElement[] {
        return Array.prototype.slice.call(element.children);
    }

    public static generateSingleList(options: ListboxSettings = null,
                                     items: (string|ListboxItem)[] = null): { box: SingleSelectListbox, target: HTMLElement } {
        options = options || {};
        if (!options.getItems) {
            options.getItems = (): (string|ListboxItem)[] => items;
        }

        const test: HTMLElement = document.createElement("div");
        test.id = "test";
        document.getElementById("qunit-fixture").appendChild(test);

        return { box: new SingleSelectListbox(test, options), target: test };
    }

    public static generateMultipleList(options: ListboxSettings = null,
                                       items: (string|ListboxItem)[] = null): { box: MultiSelectListbox, target: HTMLElement } {
        options = options || {};
        if (!options.getItems) {
            options.getItems = (): (string|ListboxItem)[] => items;
        }

        const test: HTMLElement = document.createElement("div");
        test.id = "test";
        document.getElementById("qunit-fixture").appendChild(test);

        return { box: new MultiSelectListbox(test, options), target: test };
    }

    public static startsWith(s: string, check: string): boolean {
        return s.indexOf(check) === 0;
    }

    public static elementEquals(dataItems: ListboxItem[], elements: string[]): boolean {
        return JSON.stringify(dataItems.map((d: ListboxItem) => d.id).sort()) === JSON.stringify(elements.sort());
    }

    public static itemEquals(items: NodeListOf<Element>, dataItems: ListboxItem[]): boolean {
        let ids: string[] = [];

        for (let i: number = 0; i < items.length; i++) {
            ids.push(items.item(i).id);
        }

        return TestHelper.elementEquals(dataItems, ids);
    }

    public static beforeEach(): void {
        const div: HTMLElement = document.createElement("div");
        div.id = "qunit-fixture";
        document.body.appendChild(div);
    }

    public static afterEach(): void {
        const e: Element = document.getElementById("qunit-fixture");
        e.parentElement.removeChild(e);
    }

    public static click(element: Element, ctrl: boolean = false): void {
        const e: any = document.createEvent("Event");
        e.initEvent("click", true, false);
        e.ctrlKey = ctrl;
        element.dispatchEvent(e);
        //(element as HTMLButtonElement).click();
    }
}

