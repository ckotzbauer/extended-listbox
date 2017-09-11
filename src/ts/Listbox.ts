
import BaseListBox = require("./BaseListBox");

interface Listbox {

    onItemClick(domItem: HTMLElement): void;
    onFilterChange(): void;
    baseListBox: BaseListBox;
}

export = Listbox;
