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
    /**
     * 转换成树型结构
     *
     * @param sourceData 源数据
     * @param props 属性，定义了节点id的属性名，父节点的属性名，子节点的属性名
     * @return {} 树型数据，如果源数据为 null、undefined 或空则返回空数组
     */
    public static toTree<T>(
        sourceData: T[],
        props: TreeProp = {
            id: "id",
            parentId: "parentId",
            children: "children",
        }
    ): T[] {
        if (ArrayUtils.isEmpty(sourceData)) {
            return [];
        }

        const treeNodes = [];

        const treeNodeMap = new Map();
        sourceData.forEach((sourceNode) => treeNodeMap.set(sourceNode[props.id], sourceNode));

        for (const sourceNode of sourceData) {
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

    /**
     * 获取节点数组
     *
     * @param treeData 树型数据
     * @param props 属性，定义了节点id的属性名，父节点的属性名，子节点的属性名
     * @return {} 节点数组，如果源数据为 null、undefined 或空则返回空数组
     */
    public static getNodes<T>(
        treeData: T[],
        props: TreeProp = {
            id: "id",
            parentId: "parentId",
            children: "children",
        }
    ): T[] {
        if (ArrayUtils.isEmpty(treeData)) {
            return [];
        }

        const treeNodes = [];
        const queue = [...treeData];
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
