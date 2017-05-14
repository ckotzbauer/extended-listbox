import BaseListBox = require("../BaseListBox");
import ListboxEvent = require("./ListboxEvent");

class ListboxEventHandler {

    private listBox: BaseListBox;

    constructor(listBox: BaseListBox) {
        this.listBox = listBox;
    }

    public fire(name: string, args: any): void {
        let delegate: Function = this.listBox._settings["on" + name[0].toUpperCase() + name.substr(1)];

        if (delegate) {
            var event: ListboxEvent = new ListboxEvent(name, this.listBox._target, args);
            delegate(event);
        }
    }
}

export = ListboxEventHandler;
