
class DragAndDropHandler {

    public static addItemDragAndDrop(item: JQuery, dragAndDropEnabled: boolean): JQuery {
        if (dragAndDropEnabled) {
            item = item
                .attr("draggable", "true")
                .on("dragstart", this.dragStart)
                .on("dragover", this.dragOverItem)
                .on("dragleave", this.dragLeaveItem)
                .on("drop", this.drop);
        }

        return item;
    }

    private static dragOverItem(event: any): void {
        event.preventDefault();
        event.stopPropagation();

        $(event.target).css("border-bottom", "1px solid black");
    }

    private static dragLeaveItem(event: any): void {
        event.preventDefault();
        event.stopPropagation();

        $(event.target).css("border-bottom", "none");
    }

    private static dragStart(event: any): void {
        event.originalEvent.dataTransfer.effectAllowed = 'move';
        event.originalEvent.dataTransfer.setData("text/html", event.target.id);
    }

    private static drop(event: any): void {
        event.stopPropagation();
        var id: string = event.originalEvent.dataTransfer.getData('text/html');

        var source: JQuery = $("#" + id);
        var target: JQuery = $(event.target);

        source.insertAfter(target);
    }

    public static addListDragAndDrop(list: JQuery, dragAndDropEnabled: boolean): JQuery {
        if (dragAndDropEnabled) {
            list = list
                .on("dragenter", this.dragEnter)
                .on("dragleave", this.dragLeave);
        }

        return list;
    }

    private static dragEnter(event: any): void {
        var $target: JQuery = $(event.target);
        if ($target.hasClass("listbox")) {
            $target.addClass("dropHover");
        }
    }

    private static dragLeave(event: any): void {
        var $target: JQuery = $(event.target);
        if ($target.hasClass("listbox")) {
            $target.removeClass("dropHover");
        }
    }
}

export = DragAndDropHandler;
