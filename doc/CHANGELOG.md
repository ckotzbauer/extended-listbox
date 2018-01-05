# Changelog


Here you can see the full list of changes between each Extended Listbox
release.

## Version 4.0.2

Released on January 5, 2018.

- Fixed width of searchbar (100% now). [(#103)](https://github.com/code-chris/extended-listbox/pull/103)


## Version 4.0.1

Released on December 10, 2017.

- Fixed calculation of list height. [(#102)](https://github.com/code-chris/extended-listbox/pull/102)


## Version 4.0.0

Released on September 26, 2017.

- Removed jquery
- Change behavior of multiselect mode [(#82)](https://github.com/code-chris/extended-listbox/issues/82)
- Emit `filterChanged` event on MultiSelectListBoxes
- Find items too if item text does not start with entered search query
- Wrong items moved with arrow up and down in MultiSelect [(#84)](https://github.com/code-chris/extended-listbox/issues/84)
- Fix several typing mismatches
- Remove `change` event on Element target


## Version 3.0.0

Released on May 29, 2017.

- Dropped Support for JQuery 2.x
- New API-Method `addItems` added
- New API-Method `removeItems` added
- Reduced distribution size
- Clarified type definitions
- Improved unit-tests


## Version 2.1.0

Released on May 27, 2017.

-   Switched from LESS to SASS internally.
-   Added SASS file to dist folder.
-   Several devDependency updates.


## Version 2.0.2

Released on May 14, 2017.

-   Improved distribution size.
-   Fixed unit tests in IE.
-   Several devDependency updates.


## Version 2.0.1

Released on March 18, 2017.

-   Improved distribution size.
-   Fixed wrong dependency range for jquery.
-   Several devDependency updates.


## Version 2.0.0

Released on February 4, 2017.

-   Dropped Bower Supported.
-   Updated JQuery to 2.x.
-   Dropped Support for IE 9 and 10.
-   Use MIT License.
-   Removed methods marked as deprecated.
-   Internal: Major build system update
-   Internal: Replaced Karma with Testem


## Version 1.1.3

Released on June 19, 2016.

-   Added support for Typings
-   Bugfix: `getSelection()` returns wrong values for child items.


## Version 1.1.2

Released on January 24, 2016.

-   Specified files to put into npm and bower packages
-   Added automated cross browser testing with Saucelabs
-   Bugfix: Fixed bad behavior with arrow key usage (arrow up and down)


## Version 1.1.1

Released on January 14, 2016.

-   Fixed npm package


## Version 1.1.0

Released on January 13, 2016.

### Features
-   Added new public API interface (`ExtendedListboxInstance`)
-   Public function `moveItemToTop` to move item to the top of the list
-   Public function `moveItemToBottom` to move item to the bottom of the list
-   Public function `getSelection` that returns a array of currently selected items.
-   New callback: `onItemEnterPressed` to notify enter events on items
-   New callback: `onItemDoubleClicked` to notify double click events on items
-   Change selection of item with cursor keys (up and down)
-   Return existing `ExtendedListboxInstance` if `listbox()` function is called without any arguments
-   Internal refactoring
-	Updated devDependencies
-   Use Karma as unit test runner
-   Added code coverage
-   Added unit tests

### Bugfixes
-   Prevent multiple listbox creations on one DOM item.

### Potentially breaking changes
-   Constructor function `listbox()` returns now a instance of class `ExtendedListboxInstance` (Access `target` variable on returned instance to get JQuery object as in 1.0.x)


## Version 1.0.6

Released on January 03, 2016.

-   Refactored unit tests
-   Published new documentation site
-	Removed old demo sites
-	Updated devDependencies
-   Internal refactorings
-   Added missing classes to definition file


## Version 1.0.5

Released on December 23, 2015.

-   Added missing jquery dependency to `package.json`
-   Removed wrong jquery reference from `extended-listbox.d.ts` file.


## Version 1.0.4

Released on December 21, 2015.

-   Fixed TSLint errors
-   Added TypeScript Definition file
-   New public API function `enable` to enable and disable the complete component


## Version 1.0.3

Released on December 20, 2015.

-   Applied new folder structure
-   Added build infrastructure (gulp)
-   Replaced CSS with LESS internally
-   Replaced JavaScript with TypeScript internally
-   Added minified distribution files (JavaScript and CSS)


## Version 1.0.2

Released on December 16, 2015.

-   Moved repository to <https://github.com/code-chris/extended-listbox>
-   Replaced rst-files with markdown files


## Version 1.0.1

Released on December 16, 2015.

-   Fixed: JavaScript error occurs, if no items where found for given
    search query.


## Version 1.0.0

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


## Version 0.2.0

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


## Version 0.1.3

Released on August 4, 2013.

-   Changed license from LGPLv3 to BSD.
-   Declared each method as prototype property.
-   Added JSDoc comments.
-   Added new tip to FAQ.


## Version 0.1.2

Released on January 29, 2013.

-   Use semicolons in plugin sources.
-   Removed build tool from repo.
-   Added new tip to FAQ.
-   Fixed path to the LICENSE file.


## Version 0.1.1

Released on January 18, 2013.

-   «jQuery Listbox» got renamed to «Listbox.js».


## Version 0.1.0

Released on January 17, 2013.

-   First public release.
