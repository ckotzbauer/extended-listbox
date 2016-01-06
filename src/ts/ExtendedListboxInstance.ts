/// <reference path="../../typings/tsd.d.ts" />

import {ListboxItem} from "./ListboxItem";
import {ListboxEvent} from "./event/ListboxEvent";
import {BaseListBox} from "./BaseListBox";

export class ExtendedListboxInstance {

    private listbox: BaseListBox;
    public target: JQuery;

    public static createFrom(listbox: BaseListBox, target: JQuery): ExtendedListboxInstance {
        var instance: ExtendedListboxInstance = new ExtendedListboxInstance();
        instance.listbox = listbox;
        instance.target = target;
        return instance;
    }

    public addItem(item: string|ListboxItem): string {
        return this.listbox.addItem(item, false);
    }

    public removeItem(identifier: string): void {
        this.listbox.removeItem(identifier);
    }

    public destroy(): void {
        this.listbox.destroy();
    }

    public clearSelection(): void {
        this.listbox.clearSelection(false);
    }

    public getItem(identifier: string): ListboxItem {
        return this.listbox.getItem(identifier);
    }

    public getItems(): ListboxItem[] {
        return this.listbox.getItems();
    }

    public getSelection(): ListboxItem|ListboxItem[] {
        // TODO
        return null;
    }

    public moveItemUp(identifier: string): number {
        return this.listbox.moveItemUp(identifier);
    }

    public moveItemDown(identifier: string): number {
        return this.listbox.moveItemDown(identifier);
    }

    public moveItemToTop(identifier: string): number {
        // TODO
        return null;
    }

    public moveItemToBottom(identifier: string): number {
        // TODO
        return null;
    }

    public enable(state: boolean): void {
        this.listbox.enable(state);
    }

    public onValueChanged(callback: (event: ListboxEvent) => void): void {
        this.listbox._settings.onValueChanged = callback;
    }
}
