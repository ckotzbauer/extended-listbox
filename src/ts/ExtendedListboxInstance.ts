import Listbox = require("./Listbox");

class ExtendedListboxInstance {

    private listbox: Listbox;
    public target: JQuery;

    constructor(listbox: Listbox, target: JQuery) {
        this.listbox = listbox;
        this.target = target;

        var lb: any = this.listbox.baseListBox;
        var methods: string[] = ["addItem", "removeItem", "destroy", "clearSelection", "getItem", "getItems",
            "getSelection", "moveItemUp", "moveItemDown", "moveItemToTop", "moveItemToBottom", "enable"];

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
