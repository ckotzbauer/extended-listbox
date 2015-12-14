ListboxJS
=========
.. image:: https://travis-ci.org/code-chris/listbox.js.svg?branch=master
   :target: https://travis-ci.org/code-chris/listbox.js

:Author:   Christian Kotzbauer
:License:  `BSD 3-clause`_
:Version:  1.0.0-beta.3


**ListboxJS** is a simple jQuery plugin that provides a more powerful
alternative to the standard ``<select>`` tag. The main problem of ``<select>``
tag is that last one isn't flexible for customization with *CSS*. ListboxJS
solves this problem. This component creates a list structure based on ``<div>``
tags. The configuration is completely in JavaScript. It opens up
great possibilities for customization.

In addition, this component provides other useful features like a search bar
or group items.


Usage
-----

Link the component and a stylesheet from your page.

.. code:: html

    <!-- make sure that jQuery is already included -->
    <script src="/path/to/jquery.js"></script>

    <!-- include listbox plugin and default stylesheet -->
    <link href="/path/to/listbox.css" rel="stylesheet">
    <script src="/path/to/listbox.js"></script>


Create simple Listbox.

.. code:: html

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



Add or remove Item manually after initialization.

.. code:: html

    <div id="myListBox"></div>

    <script>
        $(function() {
            $('#myListBox').listbox("addItem", "New Item");
            $('#myListBox').listbox("addItem", { text: "My Item", disabled: true });

            $('#myListBox').listbox("removeItem", "Item #2");
        });
    </script>



Destroy listbox (reverts all changes on the DOM).

.. code:: html

    <div id="myListBox"></div>

    <script>
        $(function() {
            $('#myListBox').listbox("destroy");
        });
    </script>


Customization
-------------

ListboxJS uses following ``CSS`` classes.

.. code:: css

    .listbox-root {}                        /* <div>: root element, you declared in the DOM */
    .listbox {}                             /* <div>: container for list items */
    .listbox-item {}                        /* <div>: list item (enabled by default) */
    .listbox-item.listbox-item-selected {}  /* <div>: selected list item */
    .listbox-item.listbox-item-disabled {}  /* <div>: disabled list item */
    .listbox-item.listbox-item-group {}     /* <div>: group item */
    .listbox-searchbar {}                   /* <input>: search query input */
    .listbox-searchbar-button {}            /* <button> button in search input field */


You can configure ListboxJS with following JS-Parameters (this shows the defaults):

.. code:: js

    {
        searchBar: false,                   /* If the searchBar is visible */
        searchBarWatermark: 'Search...',    /* Watermark text for search input */
        searchBarButton: {                  /* Button configuration */
            visible: false,                 /* If Button is visible */
            icon: null,                     /* CSS class for button icon (``<i>`` tag) */
            onClick: null                   /* Delegate for button click */
        },
        multiple: false,                    /* If multi selection is enabled */
        getItems: null,                     /* Function which should return a array of items (see below) */
        onValueChanged: null,               /* Delegate which is called on selection changes */
        onFilterChanged: null               /* Delegate which is called on search query changes */
    }


Specification for item objects returned by getItems:

.. code:: js

    {
        text: "Item #1",
        id: null,
        disabled: false,
        selected: false,
        groupHeader: false
    }

You can return simple strings or numbers too. They will be converted to the above object.


FAQ
---

- **How to make disabled item?**

  You have to set the ``disabled`` Property from the item to true.

  .. code:: js

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



.. _BSD 3-clause: https://raw.github.com/code-chris/listbox.js/master/LICENSE
