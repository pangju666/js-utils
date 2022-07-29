import {TreeProp} from "../interface/TreeProp";
import {ArrayUtils} from "./ArrayUtils";
import {ObjectUtils} from "./ObjectUtils";

/**
 * 树型结构工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class TreeUtils {
    public static toTree<T>(
        sourceNodes: T[],
        props: TreeProp = {
            id: "id",
            parentId: "parentId",
            children: "children",
        }
    ): T[] {
        if (ArrayUtils.isEmpty(sourceNodes)) {
            return [];
        }

        const treeNodes = [];

        const treeNodeMap = new Map();
        sourceNodes.forEach((sourceNode) => {
            treeNodeMap.set(sourceNode[props.id], sourceNode);
        });

        for (const sourceNode of sourceNodes) {
            const parentId = sourceNode[props.parentId];
            if (ObjectUtils.isNull(parentId) || !treeNodeMap.has(parentId)) {
                treeNodes.push(sourceNode);
                continue;
            }
            const parentNode = treeNodeMap.get(parentId);
            if (ArrayUtils.isEmpty(parentNode[props.children])) {
                parentNode[props.children] = [sourceNode];
            } else {
                parentNode[props.children].push(sourceNode);
            }
        }
        return treeNodes;
    }

    public static toNodes<T>(
        sourceTree: T[],
        props: TreeProp = {
            id: "id",
            parentId: "parentId",
            children: "children",
        }
    ): T[] {
        if (ArrayUtils.isEmpty(sourceTree)) {
            return [];
        }

        const treeNodes = [];
        const queue = [...sourceTree];
        while (queue.length !== 0) {
            const node = queue.shift();
            treeNodes.push(node);
            const childNodes = node[props.children];
            queue.push(...(ArrayUtils.emptyIfNull(childNodes) as T[]));
        }
        return treeNodes;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private TreeUtils() {
    }
}
