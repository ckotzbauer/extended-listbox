import Listbox = require("./Listbox");
import BaseListBox = require("./BaseListBox");

class ExtendedListboxInstanceImpl implements ExtendedListboxInstance {

    private listbox: Listbox;
    public target: JQuery;

    constructor(listbox: Listbox, target: JQuery) {
        this.listbox = listbox;
        this.target = target;

        var lb: BaseListBox = this.listbox.baseListBox;
        var methods: string[] = ["addItem", "addItems", "removeItem", "removeItems", "destroy", "clearSelection",
            "getItem", "getItems", "getSelection", "moveItemUp", "moveItemDown", "moveItemToTop", "moveItemToBottom", "enable"];

        for (let i: number = 0; i < methods.length; i++) {
            let name: string = methods[i];
            this[name] = lb[name].bind(lb);
        }

        methods = ["onValueChanged", "onItemsChanged", "onFilterChanged", "onItemEnterPressed", "onItemDoubleClicked"];

        for (let i: number = 0; i < methods.length; i++) {
            let name: string = methods[i];
            this[name] = (e) => { lb._settings[name] = e; };
        }
    }

    // implement members only to fulfill interface requirements
    public addItem(item: string | ListboxItem): string {
        return undefined;
    }

    public addItems(item: (string | ListboxItem)[]): string[] {
        return undefined;
    }

    public removeItem(identifier: string): void {
    }

    public removeItems(identifiers: string[]): void {
    }

    public destroy(): void {
    }

    public clearSelection(): void {
    }

    public getItem(identifier: string): ListboxItem {
        return undefined;
    }

    public getItems(): ListboxItem[] {
        return undefined;
    }

    public getSelection(): ListboxItem[] {
        return undefined;
    }

    public moveItemUp(identifier: string): number {
        return undefined;
    }

    public moveItemDown(identifier: string): number {
        return undefined;
    }

    public moveItemToBottom(identifier: string): number {
        return undefined;
    }

    public moveItemToTop(identifier: string): number {
        return undefined;
    }

    public enable(state: boolean): void {
    }

    public onValueChanged(callback: (event: ListboxEvent) => void): void {
    }

    public onItemsChanged(callback: (event: ListboxEvent) => void): void {
    }

    public onFilterChanged(callback: (event: ListboxEvent) => void): void {
    }

    public onItemEnterPressed(callback: (event: ListboxEvent) => void): void {
    }

    public onItemDoubleClicked(callback: (event: ListboxEvent) => void): void {
    }
}

export = ExtendedListboxInstanceImpl;
