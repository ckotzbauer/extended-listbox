export interface ListBoxEvent {
    /** unique event name */
    eventName: string;

    /** target object for which event is triggered */
    target: Element;

    /** any object */
    args: any;
}
