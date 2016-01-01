# Extended Listbox


[![Travis](https://img.shields.io/travis/code-chris/extended-listbox.svg?branch=master)](https://travis-ci.org/code-chris/extended-listbox)
[![NPM](https://img.shields.io/npm/v/extended-listbox.svg)](https://www.npmjs.com/package/extended-listbox)
[![Bower](https://img.shields.io/bower/v/extended-listbox.svg)](https://github.com/code-chris/extended-listbox)
[![David](https://img.shields.io/david/dev/code-chris/extended-listbox.svg)](https://david-dm.org/code-chris/extended-listbox)
[![Coverage Status](https://coveralls.io/repos/code-chris/extended-listbox/badge.svg?branch=master&service=github)](https://coveralls.io/github/code-chris/extended-listbox?branch=master)


**Extended Listbox** is a simple to use jQuery plugin as powerful
alternative to the HTML `<select>` tag. The main problem of
`<select>` tag is that last one isn’t flexible for customization with
*CSS*. Extended Listbox solves this problem. This component creates a list
structure based on `<div>` tags. The configuration is completely in
JavaScript. It opens up great possibilities for customization.

In addition, this component provides other useful features like a search
bar or group items.

## Installation

Install with bower:
```
bower install extended-listbox
```
Install with NPM:
```
npm install extended-listbox
```


## Usage

Link the component and a stylesheet from your page.

```html
<!-- make sure that jQuery is already included -->
<script src="/path/to/jquery.js"></script>

<!-- include listbox plugin and default stylesheet -->
<link href="/path/to/listbox.css" rel="stylesheet">
<script src="/path/to/listbox.js"></script>
```

Create simple Listbox.

```html
<div id="myListBox"></div>

<script>
	$(function() {
		$('#myListBox').listbox({
			searchBar:  true,
			getItems: function() {
				return [
					"Item #1",
					"Item #2",
					"Item #3",
					"Item #4"
				];
			}
		});
	});
</script>
```

Add or remove Item manually after initialization.

```html
<div id="myListBox"></div>

<script>
	$(function() {
		$('#myListBox').listbox("addItem", "New Item");
		$('#myListBox').listbox("addItem", { text: "My Item", disabled: true });
		$('#myListBox').listbox("addItem", { text: "My Item", parentGroupId: "My Parent" });

		$('#myListBox').listbox("removeItem", "Item #2");
	});
</script>
```

Change position of item inside the list by one.

```html
<div id="myListBox"></div>

<script>
	$(function() {
		$('#myListBox').listbox("moveItemUp", "My Item"); // Decreases the index based position by one.
		$('#myListBox').listbox("moveItemDown", "My Item"); // Increases the index based position by one.
	});
</script>
```

Get the dataItem object for one element.

```html
<div id="myListBox"></div>

<script>
	$(function() {
		$('#myListBox').listbox("getItem", "My Item");
	});
</script>
```

Clear all selections.

```html
<div id="myListBox"></div>

<script>
	$(function() {
		$('#myListBox').listbox("clearSelection");
	});
</script>
```

Get current selected items. Returns the complex data item for single
selection and a array of their JSON representation for multi selection.

```html
<div id="myListBox"></div>

<script>
	$(function() {
		$('#myListBox').val();
	});
</script>
```

Destroy listbox (reverts all changes on the DOM).

```html
<div id="myListBox"></div>

<script>
	$(function() {
  		$('#myListBox').listbox("destroy");
	});
</script>
```


## Customization


Extended Listbox uses following `CSS` classes.

```css
.listbox-root {}                        /* <div>: root element, you declared in the DOM */
.listbox {}                             /* <div>: container for list items */
.listbox-item {}                        /* <div>: list item (enabled by default) */
.listbox-item.listbox-item-selected {}  /* <div>: selected list item */
.listbox-item.listbox-item-disabled {}  /* <div>: disabled list item */
.listbox-item.listbox-item-group {}     /* <div>: group item */
.listbox-item.listbox-item-child {}     /* <div>: item under a group item */
.listbox-searchbar {}                   /* <input>: search query input */
.listbox-searchbar-button {}            /* <button> button in search input field */
```

You can configure Extended Listbox with following JS-Parameters (this shows the
defaults):

```javascript
{
	searchBar: false,                   /* If the searchBar is visible */
    searchBarWatermark: 'Search...',    /* Watermark text for search input */
    searchBarButton: {                  /* Button configuration */
        visible: false,                 /* If Button is visible */
        icon: null,                     /* CSS class for button icon (<i> tag) */
        onClick: null                   /* Delegate for button click */
    },
    multiple: false,                    /* If multi selection is enabled */
    getItems: null,                     /* Function which should return a array of items (see below) */
    onValueChanged: null,               /* Delegate which is called on selection changes */
    onFilterChanged: null,              /* Delegate which is called on search query changes */
    onItemsChanged: null                /* Called if items where added, removed or their position changed */
}
```

Specification for item objects returned by ``getItems``:

```javascript
{
	text: "Item #1",            /* Displayable item text */
    id: [generated],            /* Unique element id, if no set it will be generated like listboxitem8294854 */
    index: null,                /* Index position of item in the list; only used for manual addItem calls. */
    disabled: false,            /* true if the item should not be selectable */
    selected: false,            /* true if the item is selected */
    groupHeader: false,         /* true if the item has childs */
    parentGroupId: null,        /* ID or display text for parent item to use; only used for manual addItem calls. */
    childItems: []              /* list of child items */
}
```

You can return simple strings or numbers too. They will be converted to the above object.


## FAQ

- **How to make disabled item?**

You have to set the ``disabled`` Property from the item to true.

```javascript
$('#myListBox').listbox({
	getItems: function() {
		return [
			"Item #1",
			{ text: "Item #2", disabled: true },
			"Item #3",
			{ text: "Item #4", disabled: true }
		];
	}
});
```

[License](https://github.com/code-chris/extended-listbox/blob/master/LICENSE)
--------
[Changelog](https://github.com/code-chris/extended-listbox/blob/master/doc/CHANGELOG.md)
----------
[Roadmap](https://github.com/code-chris/extended-listbox/blob/master/doc/ROADMAP.md)
--------
