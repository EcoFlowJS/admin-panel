import { TreeNode as RsuiteTreeNode } from "rsuite/esm/internals/Tree/types";

export default function TreeNode({
  children,
  ...rest
}: Omit<RsuiteTreeNode, "children"> & { children: any }) {
  return (
    <div {...rest} style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {children}
    </div>
  );
}
