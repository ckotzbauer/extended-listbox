interface ListboxEvent {
    /* unique event name */
    eventName: string;

    /* target object for which event is triggered */
    target: JQuery;

    /* any object */
    args: any;
}
