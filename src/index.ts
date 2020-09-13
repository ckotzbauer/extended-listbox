import { Instance, ListBoxFn, ListBoxNameMap } from "./types/instance";
import { Options, ComponentMode } from "./types/options";
import { createListBox } from "./factory";

// eslint-disable-next-line @typescript-eslint/naming-convention
function _listBox<K extends keyof ListBoxNameMap>(
    nodeList: ArrayLike<Node>,
    mode: K,
    config?: Options
): Instance<K> | Instance<K>[] {
    // static list
    const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement) as HTMLElement[];

    const instances: Instance<K>[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const node: any = nodes[i];
        try {
            if (node._listBox !== undefined) {
                node._listBox.destroy();
                node._listBox = undefined;
            }

            node._listBox = createListBox(node, mode, config || {});
            instances.push(node._listBox);
        } catch (e) {
            console.error(e);
        }
    }

    return instances.length === 1 ? instances[0] : instances;
}

const listBox = function (selector: ArrayLike<Node> | Node | string, mode: ComponentMode, config?: Options) {
    if (typeof selector === "string") {
        return _listBox(window.document.querySelectorAll(selector), mode, config);
    } else if (selector instanceof Node) {
        return _listBox([selector], mode, config);
    } else {
        return _listBox(selector, mode, config);
    }
} as ListBoxFn;

export default listBox;
