
module EL {
    "use strict";

    export class Util {

        public static deprecatedMethod(method: string, version: string, replacement: string = null): void {
            var warning: string;
            if (replacement) {
                warning = `ExtendedListbox: Method ${method} is deprecated and ` +
                    `will be replaced with ${replacement} in ${version}.`;
            } else {
                warning = `ExtendedListbox: Method ${method} is deprecated and will be removed in ${version}.`;
            }

            console.warn(warning);
        }
    }
}
