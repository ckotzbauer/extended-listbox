/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../dist/extended-listbox.d.ts" />

function child(element, index = null) {
    if (!index) {
        index = 0;
    }

    return $(element.children()[index]);
}

function generateMultipleList(options: ListBoxOptions = null, items = null): JQuery {
    options = $.extend({
        multiple: true,
        getItems: function () {
            return items;
        }
    }, options);

    return $('#test').listbox(options);
}

function itemsToVal(items) {
    var result = '';
    for (var i = 0; i < items.length; ++i) {
        if (i != 0) {
            result += ',';
        }

        result += $(items[i]).data("dataItem").text;
    }
    return result;
}

function jsonToVal(items) {
    var result = '';
    for (var i = 0; i < items.length; ++i) {
        if (i != 0) {
            result += ',';
        }

        result += JSON.parse(items[i]).text;
    }
    return result;
}

function arrayToVal(items) {
    var result = '';
    for (var i = 0; i < items.length; ++i) {
        if (i != 0) {
            result += ',';
        }

        result += JSON.parse(items[i]).text;
    }
    return result;
}


test('construct default', function () {
    var root = generateMultipleList();

    equal(root.attr('class'), 'listbox-root');

    var listbox = child(root);
    equal(listbox.attr('class'), 'listbox');

    var searchbar = listbox.find('.listbox-searchbar');
    notEqual(searchbar.attr('class'), 'listbox-searchbar');
});


test('construct with searchbar', function () {
    var root = generateMultipleList({ searchBar: true });

    var searchbar = child(root);
    equal(searchbar.attr('class'), 'listbox-searchbar-wrapper');
    equal(child(searchbar).attr('placeholder'), 'Search...');

    var listbox = child(root, 1);
    equal(listbox.attr('class'), 'listbox');
});

test('construct with searchbar watermark', function () {
    var root = generateMultipleList({ searchBar: true, searchBarWatermark: "Suche..." });

    var searchbar = child(root);
    equal(child(searchbar).attr('placeholder'), 'Suche...');
});

// TODO implement implicit default value
/*test('implicit default value', function () {
 var select = $('#test')
 .append('<option>A</option>')
 .append('<option>B</option>')
 .append('<option>C</option>')
 .listbox();

 var list = select.next().find('.lbjs-list');
 var selectedItems = list.children('[selected]');

 equal(selectedItems.length, 1);
 equal(selectedItems.text(), 'A');
 equal(selectedItems.text(), select.val());
 });*/


test('explicit default value', function () {
    var select = generateMultipleList({}, [
        "A",
        "B",
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems = select.find(".listbox-item-selected");

    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'C');
    equal(selectedItems.data("dataItem").text, jsonToVal(select.val()));
});


test('two explicit default values', function () {
    var select = generateMultipleList({}, [
        "A",
        { text: "B", selected: true },
        { text: "C", selected: true },
        "D"
    ]);

    var selectedItems = select.find(".listbox-item-selected");

    equal(selectedItems.length, 2);
    equal(itemsToVal(selectedItems), 'B,C');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));
});


test('one click', function () {
    var select = generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items = select.find(".listbox-item");

    $(items[1]).click();     // click on 'B'

    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(selectedItems.text(), 'B');
    equal(selectedItems.data("dataItem").text, jsonToVal(select.val()));
});


test('two clicks', function () {
    var select = generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items = select.find(".listbox-item");

    $(items[1]).click();     // click on 'B'
    $(items[1]).click();     // click on 'B'

    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 0);
    // TODO equal(select.val(), []);
});


test('two clicks on different items', function () {
    var select = generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items = select.find(".listbox-item");

    $(items[0]).click();     // click on 'A'
    $(items[2]).click();     // click on 'C'

    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(itemsToVal(selectedItems), 'A,C');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));
});


test('multiple clicks', function () {
    var select = generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items = select.find(".listbox-item");

    $(items[0]).click();     // click on 'A'

    var selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(itemsToVal(selectedItems), 'A');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));

    $(items[1]).click();     // click on 'B'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(itemsToVal(selectedItems), 'A,B');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));

    $(items[0]).click();     // click on 'A'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(itemsToVal(selectedItems), 'B');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));

    $(items[2]).click();     // click on 'C'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(itemsToVal(selectedItems), 'B,C');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));

    $(items[0]).click();     // click on 'A'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 3);
    equal(itemsToVal(selectedItems), 'A,B,C');
    //equal(itemsToVal(selectedItems), arrayToVal(select.val())); TODO fix sorting

    $(items[1]).click();     // click on 'B'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(itemsToVal(selectedItems), 'A,C');
    //equal(itemsToVal(selectedItems), arrayToVal(select.val())); TODO fix sorting

    $(items[0]).click();     // click on 'A'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(itemsToVal(selectedItems), 'C');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));

    $(items[1]).click();     // click on 'B'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 2);
    equal(itemsToVal(selectedItems), 'B,C');
    //equal(itemsToVal(selectedItems), arrayToVal(select.val())); TODO fix sorting

    $(items[2]).click();     // click on 'C'

    selectedItems = select.find(".listbox-item-selected");
    equal(selectedItems.length, 1);
    equal(itemsToVal(selectedItems), 'B');
    equal(itemsToVal(selectedItems), jsonToVal(select.val()));
});


test('change event', function () {
    var select = generateMultipleList({}, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var receiveCounter = 0;
    select.on('change', function() {
        receiveCounter++;
    });

    var items = select.find(".listbox-item");

    $(items[0]).click();
    equal(receiveCounter, 1);

    $(items[1]).click();
    $(items[2]).click();

    equal(receiveCounter, 3);
});

test('onValueChanged callback', function () {
    var receiveCounter = 0;
    var lastValue = null;
    var callback = function(newValue) {
        receiveCounter++;
        lastValue = newValue;
    };

    var select = generateMultipleList({ onValueChanged: callback }, [
        "A",
        "B",
        "C",
        "D"
    ]);

    var items = select.find(".listbox-item");

    $(items[0]).click();
    equal(receiveCounter, 1);
    equal(arrayToVal(lastValue), "A");

    $(items[1]).click();
    $(items[2]).click();

    equal(receiveCounter, 3);
    equal(arrayToVal(lastValue), ["A", "B", "C"]);
});