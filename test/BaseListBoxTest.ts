/// <reference path="./test-typings.d.ts" />
/// <amd-module name="BaseListBoxTest"/>

import {TestHelper} from "./infrastructure/TestHelper";

QUnit.module( "BaseListBoxTest", {
    beforeEach: function(): void {
        TestHelper.beforeEach();
    },
    afterEach: function(): void {
        TestHelper.afterEach();
    }
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
    var items: any[] = [{ text: "Item#1", id: "id01" }, { text: "Item#2", id: "id03" }, { text: "Item#3", id: "id03" }];

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
