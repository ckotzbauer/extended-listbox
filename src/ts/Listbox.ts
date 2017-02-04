
import BaseListBox = require("./BaseListBox");

interface Listbox {

    onItemClick(domItem: JQuery): void;
    onFilterChange(): void;
    baseListBox: BaseListBox;
}

export = Listbox;
