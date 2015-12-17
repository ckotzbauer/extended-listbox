Changelog
=========
----------


Here you can see the full list of changes between each Extended Listbox
release.

Version 1.0.2
-------------

Released on December 16, 2015.

-   Moved repository to <https://github.com/code-chris/extended-listbox>
-   Replaced rst-files with markdown files


Version 1.0.1
-------------

Released on December 16, 2015.

-   Fixed: JavaScript error occurs, if no items where found for given
    search query.

	
Version 1.0.0
-------------

Released on December 15, 2015.

-   Forked from <https://github.com/ikalnitsky/listbox.js>
-   ListBoxes are created now below the given root DOM element. Without
    an hidden `<select>` element.
-   The Watermark in SearchBar is now configurable.
-   Items can be marked as “GroupHeader” to structure multiple items.
-   Custom Button in SearchBar with custom Icon is possible
-   Removed configuration with HTML-Attributes
-   Added some delegates for event handling
-   Added Tooltips for long items
-   Updated documentation
-   Public function `addItem` to add an item manually
-   Public function `removeItem` to remove an item manually
-   Public function `destroy` to revert all changes from the DOM
-   Public function `getItem` to get the complex data item
-   Public function `getItems` to get all complex data items
-   Public function `moveItemUp` to decrease the index base position of
    an item by one.
-   Public function `moveItemDown` to increase the index base position
    of an item by one.
-   Public function `clearSelection` to remove all selections in
    the list.
-   Published as bower package.


Version 0.2.0
-------------

Released on October 13, 2013.

-   Refactored the plugin core. There are two classes now:
    `SingleSelectLisbox` and `MultiSelectListbox`, which are inherited
    from the `Listbox` class.
-   Fixed \#1: use selection of the parent element
    during initialization.
-   `multiselect` option doesn’t used now. Use `multiple` attribute of
    the `<select>` tag instead.
-   `seachbar` option is `false` by default.
-   Added unit tests.


Version 0.1.3
-------------

Released on August 4, 2013.

-   Changed license from LGPLv3 to BSD.
-   Declared each method as prototype property.
-   Added JSDoc comments.
-   Added new tip to FAQ.


Version 0.1.2
-------------

Released on January 29, 2013.

-   Use semicolons in plugin sources.
-   Removed build tool from repo.
-   Added new tip to FAQ.
-   Fixed path to the LICENSE file.


Version 0.1.1
-------------

Released on January 18, 2013.

-   «jQuery Listbox» got renamed to «Listbox.js».


Version 0.1.0
-------------

Released on January 17, 2013.

-   First public release.