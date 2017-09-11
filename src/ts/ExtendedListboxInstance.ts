import Listbox = require("./Listbox");
import BaseListBox = require("./BaseListBox");

class ExtendedListboxInstance {

    private listbox: Listbox;
    public target: HTMLElement;

    constructor(listbox: Listbox, target: HTMLElement) {
        this.listbox = listbox;
        this.target = target;

        const lb: BaseListBox = this.listbox.baseListBox;
        let methods: string[] = ["addItem", "addItems", "removeItem", "removeItems", "destroy", "clearSelection",
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
}

export = ExtendedListboxInstance;
