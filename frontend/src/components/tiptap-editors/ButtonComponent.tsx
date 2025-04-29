import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";

export function ButtonComponent(props: NodeViewProps) {
  const { node } = props;
  const attrs = node.attrs;

  return (
    <NodeViewWrapper>
      <a
        href={attrs.url}
        data-type="button"
        style={{
          display: "inline-block",
          backgroundColor: attrs.bgColor,
          color: attrs.textColor,
          borderRadius: `${attrs.borderRadius}px`,
          padding: `${attrs.paddingY}px ${attrs.paddingX}px`,
          textDecoration: "none",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        {attrs.text}
      </a>
    </NodeViewWrapper>
  );
}
