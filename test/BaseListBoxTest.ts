/// <reference path="./test-typings.d.ts" />
/// <amd-module name="BaseListBoxTest"/>

/// <reference path="./infrastructure/TestHelper" />

module EL {
    "use strict";

    QUnit.module( "BaseListBoxTest", {
        beforeEach: function(): void {
            TestHelper.beforeEach();
        },
        afterEach: function(): void {
            TestHelper.afterEach();
        }
    });

    test("check multiple creations", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList();
        var instance: ExtendedListboxInstance = <ExtendedListboxInstance>root.target.listbox();

        equal(root, instance);
    });

    test("check root css class", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList();

        equal(root.target.attr('class'), 'listbox-root');
    });

    test("check list css class", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList();

        var listbox: JQuery = TestHelper.child(root.target);
        equal(listbox.attr('class'), 'listbox');
    });

    test("check non existent searchbar", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList();
        var searchbar: JQuery = root.target.find('.listbox-searchbar');

        equal(searchbar.length, 0);
    });

    test("check searchbarwrapper css class", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
        var searchbarWrapper: JQuery = TestHelper.child(root.target);

        equal(searchbarWrapper.attr('class'), 'listbox-searchbar-wrapper');
    });

    test("check searchbar css class", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
        var searchbarWrapper: JQuery = TestHelper.child(root.target);
        var searchbar: JQuery = TestHelper.child(searchbarWrapper);

        equal(searchbar.attr('class'), 'listbox-searchbar');
    });

    test("check default searchbar watermark", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
        var searchbarWrapper: JQuery = TestHelper.child(root.target);
        var searchbar: JQuery = TestHelper.child(searchbarWrapper);

        equal(searchbar.attr('placeholder'), 'Search...');
    });

    test("check explicit searchbar watermark", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList(
            { searchBar: true, searchBarWatermark: "Suche ..." });
        var searchbarWrapper: JQuery = TestHelper.child(root.target);
        var searchbar: JQuery = TestHelper.child(searchbarWrapper);

        equal(searchbar.attr('placeholder'), 'Suche ...');
    });

    test("check non existent searchbar button", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true });
        var button: JQuery = root.target.find('.listbox-searchbar-button');

        equal(button.length, 0);
    });

    test("check existent searchbar button with icon", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true,
            searchBarButton: { visible: true, icon: "testIcon" } });
        var button: JQuery = root.target.find('.listbox-searchbar-button');
        var icon: JQuery = TestHelper.child(button);

        equal(icon.attr('class'), 'testIcon');
    });

    test("check searchbar button callback", function (): void {
        var count: number = 0;
        var callback: () => void = function(): void {
            count++;
        };

        var options: ListBoxOptions = <ListBoxOptions> {};
        options.searchBar = true;
        options.searchBarButton = <ListboxSearchBarButtonOptions> {};
        options.searchBarButton.visible = true;
        options.searchBarButton.onClick = callback;

        var root: ExtendedListboxInstance = TestHelper.generateSingleList(options);
        var button: JQuery = root.target.find('.listbox-searchbar-button');
        button.click();

        equal(count, 1);
    });

    test("check legacy addItem", function (): void {
        var items: any[] = ["Item#1", "Item#2", "Item#3"];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);

        var id: string = root.target.listbox("addItem", { text: "Item#4", id: "myId" });

        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 4);
        equal(id, "myId");
    });

    test("check simple items", function (): void {
        var items: any[] = ["Item#1", "Item#2", "Item#3"];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 3);

        for (var i: number = 0; i < itemElements.length; i++) {
            var element: JQuery = itemElements[i];
            var item: any = items[i];

            equal(element.attr("class"), "listbox-item");
            equal(element.text(), item);
            equal(element.attr("title"), item);
            ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
        }
    });

    test("check disabled items", function (): void {
        var items: any[] = [{ text: "Item#1", disabled: true },
            { text: "Item#2", disabled: true }, { text: "Item#3", disabled: true }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 3);

        for (var i: number = 0; i < itemElements.length; i++) {
            var element: JQuery = itemElements[i];
            var item: any = items[i];

            equal(element.attr("class"), "listbox-item listbox-item-disabled");
            equal(element.text(), item.text);
            equal(element.attr("title"), item.text);
            ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
        }
    });

    test("check selected item", function (): void {
        var items: any[] = [{ text: "Item#1", selected: true }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 1);

        for (var i: number = 0; i < itemElements.length; i++) {
            var element: JQuery = itemElements[i];
            var item: any = items[i];

            equal(element.attr("class"), "listbox-item listbox-item-selected");
            equal(element.text(), item.text);
            equal(element.attr("title"), item.text);
            ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
        }
    });

    test("check header item", function (): void {
        var items: any[] = [{ text: "Item#1", groupHeader: true }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 1);

        for (var i: number = 0; i < itemElements.length; i++) {
            var element: JQuery = itemElements[i];
            var item: any = items[i];

            equal(element.attr("class"), "listbox-item listbox-item-group");
            equal(element.text(), item.text);
            equal(element.attr("title"), item.text);
            ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));
        }
    });

    test("check item with id", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 3);

        for (var i: number = 0; i < itemElements.length; i++) {
            var element: JQuery = itemElements[i];
            var item: any = items[i];

            equal(element.attr("id"), item.id);
        }
    });

    test("check item with childs", function (): void {
        var items: any[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 1);

        for (var i: number = 0; i < itemElements.length; i++) {
            var element: JQuery = itemElements[i];
            var item: any = items[i];

            equal(element.attr("class"), "listbox-item listbox-item-group");
            equal(element.attr("title"), item.text);
            ok(TestHelper.startsWith(element.attr("id"), "listboxitem"));

            var childElements: JQuery[] = TestHelper.children(element);
            equal(childElements.length, 2);
            for (var j: number = 0; j < childElements.length; j++) {
                var childElement: JQuery = childElements[j];
                var childItem: any = items[0].childItems[j];

                equal(childElement.attr("class"), "listbox-item listbox-item-child");
                equal(childElement.text(), childItem);
                equal(childElement.attr("title"), childItem);
                ok(TestHelper.startsWith(childElement.attr("id"), "listboxitem"));
            }
        }
    });

    test("check item removal id", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        root.removeItem("id02");

        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 2);

        var found: boolean = false;
        itemElements.forEach(function ($elem: JQuery): void {
            var id: string = $elem.attr("id");
            if (id === "id02") {
                found = true;
            }
        });

        equal(found, false);
    });

    test("check item removal text", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        root.removeItem("Item#3");

        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 2);

        var found: boolean = false;
        itemElements.forEach(function ($elem: JQuery): void {
            var text: string = $elem.text();
            if (text === "Item#3") {
                found = true;
            }
        });

        equal(found, false);
    });

    test("check parent item removal", function (): void {
        var items: any[] = [{ text: "Item#1", childItems: ["SubItem #1", "SubItem #2"] }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        root.removeItem("Item#1");

        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        equal(itemElements.length, 0);
    });

    test("check destroy", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ searchBar: true }, items);

        root.destroy();

        var listbox: JQuery = TestHelper.child(root.target);
        var containerChilds: JQuery[] = TestHelper.children(listbox);

        notEqual(root.target.attr("class"), "listbox-root");
        equal(containerChilds.length, 0);
    });

    test("check clearSelection", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01", selected: true }, { text: "Item#2", id: "id02", selected: true }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        root.clearSelection();

        var listbox: JQuery = TestHelper.child(root.target);
        var itemElements: JQuery[] = TestHelper.children(listbox);

        var found: boolean = false;
        itemElements.forEach(function ($elem: JQuery): void {
            var text: string = $elem.attr("class");
            if (text.indexOf("listbox-item-selected") !== -1) {
                found = true;
            }
        });

        equal(found, false);
    });

    test("check getItem id", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var item: ListboxItem = root.getItem("id02");

        ok(item !== null);
        equal(item.id, "id02");
        equal(item.text, "Item#2");
    });

    test("check getItem text", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var item: ListboxItem = root.getItem("Item#1");

        ok(item !== null);
        equal(item.id, "id01");
        equal(item.text, "Item#1");
    });

    test("check getItems", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var listItems: ListboxItem[] = root.getItems();

        equal(listItems.length, 3);
    });

    test("check moveItemUp", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var originalIndex: number = root.getItem("id03").index;
        var newIndex: number = root.moveItemUp("id03");

        notEqual(originalIndex, newIndex);
        equal(newIndex, 1);
    });

    test("check moveItemUp (first item)", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01", index: 0 },
            { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var originalIndex: number = root.getItem("id01").index;
        var newIndex: number = root.moveItemUp("id01");

        equal(originalIndex, newIndex);
        equal(newIndex, 0);
    });

    test("check moveItemDown", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var originalIndex: number = root.getItem("id01").index;
        var newIndex: number = root.moveItemDown("id01");

        notEqual(originalIndex, newIndex);
        equal(newIndex, 1);
    });

    test("check moveItemDown (last item)", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" },
            { text: "Item#3", id: "id03", index: 2 }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ multiple: true }, items);

        var originalIndex: number = root.getItem("id03").index;
        var newIndex: number = root.moveItemDown("id03");

        equal(originalIndex, newIndex);
        equal(newIndex, 2);
    });

    test("check enable", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ });

        root.enable(true);

        notEqual(root.target.attr("class"), "listbox-root listbox-disabled");
    });

    test("check disable", function (): void {
        var root: ExtendedListboxInstance = TestHelper.generateSingleList({ });

        root.enable(false);

        equal(root.target.attr("class"), "listbox-root listbox-disabled");
    });

    test("check moveItemToBottom", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        var originalIndex: number = root.getItem("id01").index;
        var newIndex: number = root.moveItemToBottom("id01");

        notEqual(originalIndex, newIndex);
        equal(newIndex, 2);
    });

    test("check moveItemToTop", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        var originalIndex: number = root.getItem("id02").index;
        var newIndex: number = root.moveItemToTop("id02");

        notEqual(originalIndex, newIndex);
        equal(newIndex, 0);
    });

    test("check itemEnterPressed event", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var count: number = 0;

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        root.onItemEnterPressed(function (): void {
            count++;
        });

        var listbox: JQuery = TestHelper.child(root.target);
        var item: JQuery = TestHelper.child(listbox, 1); // id02

        var e: JQueryEventObject = jQuery.Event("keyup");
        e.which = 13;
        e.eventPhase = 2;
        item.trigger(e);

        equal(count, 1);
    });

    test("check itemDoubleClicked event", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id02" }, { text: "Item#3", id: "id03" }];

        var count: number = 0;

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        root.onItemDoubleClicked(function (): void {
            count++;
        });

        var listbox: JQuery = TestHelper.child(root.target);
        var item: JQuery = TestHelper.child(listbox, 1); // id02

        item.dblclick();

        equal(count, 1);
    });

    test("check itemArrowUp event", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        var listbox: JQuery = TestHelper.child(root.target);
        var item: JQuery = TestHelper.child(listbox, 1); // id02

        equal(root.getItem("id01").selected, false);
        equal(root.getItem("id02").selected, true);

        var e: JQueryEventObject = jQuery.Event("keyup");
        e.which = 38;
        e.eventPhase = 2;
        item.trigger(e);

        equal(root.getItem("id01").selected, true);
        equal(root.getItem("id02").selected, false);
    });

    test("check itemArrowDown event", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        var listbox: JQuery = TestHelper.child(root.target);
        var item: JQuery = TestHelper.child(listbox, 1); // id02

        equal(root.getItem("id02").selected, true);
        equal(root.getItem("id03").selected, false);

        var e: JQueryEventObject = jQuery.Event("keyup");
        e.which = 40;
        e.eventPhase = 2;
        item.trigger(e);

        equal(root.getItem("id02").selected, false);
        equal(root.getItem("id03").selected, true);
    });

    test("check illegal legacy api method", function (): void {
        var items: any[] = ["Item#1", "Item#2", "Item#3"];

        var logError = (message: any) => {
            equal(message, 'blub is no public API function.');
        };

        console.error = logError;

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);
        root.target.listbox("blub");
    });

    test("check getSelection", function (): void {
        var items: any[] = [{ text: "Item#1", id: "id01" },
            { text: "Item#2", id: "id02", selected: true }, { text: "Item#3", id: "id03" }];

        var root: ExtendedListboxInstance = TestHelper.generateSingleList({}, items);

        var selection: ListboxItem[] = root.getSelection();

        equal(selection.length, 1);
        equal(selection[0].id, "id02");
    });
}
