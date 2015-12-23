$('div#snippet1').listbox({
    multiple: true,
    getItems: function () {
        return [
            "Alderaan",
            "Corellia",
            "Endor",
            { text: "Kashyyyk", selected : true },
            "Mustafar",
            { text: "Naboo", disabled: true },
            "Nar Shaddaa",
            { text: "Tatooine", selected: true },
            "Yavin"
        ];
    }
});
