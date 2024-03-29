import { TreeProp } from "../interface/TreeProp";
import { ArrayUtils } from "./ArrayUtils";
import { ObjectUtils } from "./ObjectUtils";

/**
 * 树型结构工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class TreeUtils {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * 转换成树型结构
   *
   * @param sourceItems 源数据
   * @param props 属性，定义了节点id的属性名，父节点的属性名，子节点的属性名
   * @return {} 树型数据，如果源数据为 null、undefined 或空则返回空数组
   */
  public static toTree<T>(
    sourceItems: T[],
    props: TreeProp = {
      id: "id",
      parentId: "parentId",
      children: "children",
    }
  ): T[] {
    if (ArrayUtils.isEmpty(sourceItems)) {
      return [];
    }

    const treeNodes = [];

    const treeNodeMap = new Map();
    sourceItems.forEach((sourceNode) =>
      treeNodeMap.set(sourceNode[props.id], sourceNode)
    );

    for (const sourceItem of sourceItems) {
      const parentId = sourceItem[props.parentId];
      if (ObjectUtils.isNull(parentId) || !treeNodeMap.has(parentId)) {
        treeNodes.push(sourceItem);
        continue;
      }
      const parentNode = treeNodeMap.get(parentId);
      if (ArrayUtils.isEmpty(parentNode[props.children])) {
        parentNode[props.children] = [sourceItem];
      } else {
        parentNode[props.children].push(sourceItem);
      }
    }
    return treeNodes;
  }

  /**
   * 获取节点数组
   *
   * @param nodes 树型数据
   * @param props 属性，定义了节点id的属性名，父节点的属性名，子节点的属性名
   * @return {} 节点数组，如果源数据为 null、undefined 或空则返回空数组
   */
  public static getNodes<T>(
    nodes: T[],
    props: TreeProp = {
      id: "id",
      parentId: "parentId",
      children: "children",
    }
  ): T[] {
    if (ArrayUtils.isEmpty(nodes)) {
      return [];
    }

    const treeNodes = [];
    const queue = [...nodes];
    while (queue.length !== 0) {
      const node = queue.shift();
      treeNodes.push(node);
      const childNodes = node[props.children];
      queue.push(...(ArrayUtils.emptyIfNull(childNodes) as T[]));
    }
    return treeNodes;
  }

  /**
   * 遍历全部树节点
   *
   * @param nodes 节点数组
   * @param childrenKey 子节点key
   * @param callback 节点回调函数
   * @throws {TypeError} 如果子节点不为数组则抛出
   */
  public static forEach<T>(
    nodes: T[],
    childrenKey: string,
    callback: (node: T, nodes: T[]) => void
  ): void {
    for (const node of nodes) {
      callback(node, nodes);
      if (ObjectUtils.nonNull(node[childrenKey])) {
        if (!Array.isArray(node[childrenKey])) {
          throw new TypeError("子节点必须为数组");
        }
        this.forEach(node[childrenKey], childrenKey, callback);
      }
    }
  }
}
