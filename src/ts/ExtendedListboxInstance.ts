import ListboxEvent = require("./event/ListboxEvent");
import ListboxItem = require("./contract/ListboxItem");
import Listbox = require("./Listbox");

class ExtendedListboxInstance {

    private listbox: Listbox;
    public target: JQuery;

    public static createFrom(listbox: Listbox, target: JQuery): ExtendedListboxInstance {
        var instance: ExtendedListboxInstance = new ExtendedListboxInstance();
        instance.listbox = listbox;
        instance.target = target;
        return instance;
    }

    public addItem(item: string|ListboxItem): string {
        return this.listbox.baseListBox.addItem(item, false);
    }

    public removeItem(identifier: string): void {
        this.listbox.baseListBox.removeItem(identifier);
    }

    public destroy(): void {
        this.listbox.baseListBox.destroy();
    }

    public clearSelection(): void {
        this.listbox.baseListBox.clearSelection(false);
    }

    public getItem(identifier: string): ListboxItem {
        return this.listbox.baseListBox.getItem(identifier);
    }

    public getItems(): ListboxItem[] {
        return this.listbox.baseListBox.getItems();
    }

    public getSelection(): ListboxItem[] {
        return this.listbox.baseListBox.getSelection();
    }

    public moveItemUp(identifier: string): number {
        return this.listbox.baseListBox.moveItemUp(identifier);
    }

    public moveItemDown(identifier: string): number {
        return this.listbox.baseListBox.moveItemDown(identifier);
    }

    public moveItemToTop(identifier: string): number {
        return this.listbox.baseListBox.moveItemToTop(identifier);
    }

    public moveItemToBottom(identifier: string): number {
        return this.listbox.baseListBox.moveItemToBottom(identifier);
    }

    public enable(state: boolean): void {
        this.listbox.baseListBox.enable(state);
    }

    public onValueChanged(callback: (event: ListboxEvent) => void): void {
        this.listbox.baseListBox._settings.onValueChanged = callback;
    }

    public onItemsChanged(callback: (event: ListboxEvent) => void): void {
        this.listbox.baseListBox._settings.onItemsChanged = callback;
    }

    public onFilterChanged(callback: (event: ListboxEvent) => void): void {
        this.listbox.baseListBox._settings.onFilterChanged = callback;
    }

    public onItemEnterPressed(callback: (event: ListboxEvent) => void): void {
        this.listbox.baseListBox._settings.onItemEnterPressed = callback;
    }

    public onItemDoubleClicked(callback: (event: ListboxEvent) => void): void {
        this.listbox.baseListBox._settings.onItemDoubleClicked = callback;
    }
}

export = ExtendedListboxInstance;
