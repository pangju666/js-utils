import {TreeProp} from "../core/TypeAlias";
import { ArrayUtils } from "./ArrayUtils";

/**
 * 树形结构工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class TreeUtils {
    /**
     * 转换成树形结构
     *
     * @param source 源数据
     * @param props 节点属性
     * @param root 根节点id
     * @return 转换后结果
     */
    public static toTree<T>(source: T[], props: TreeProp, root?: unknown): T[] {
        if (ArrayUtils.isEmpty(source)) {
            return [];
        }
        const treeNodes = source.filter((node) => node[props.parentId] === root);
        this.setChildNodes(source, treeNodes, props);
        return treeNodes;
    }

    /**
     * 开始转换
     *
     * @param source 源数据
     * @param parentNodes 父节点
     * @param props 节点属性
     */
    protected static setChildNodes<T>(source: T[], parentNodes: T[], props: TreeProp): void {
        if (ArrayUtils.isNotEmpty(parentNodes)) {
            parentNodes.forEach((parentNode) => {
                parentNode[props.children] = source.filter((node) => node[props.parentId] === parentNode[props.id]);
                this.setChildNodes(source, parentNode[props.children], props);
            });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private TreeUtils() {}
}
