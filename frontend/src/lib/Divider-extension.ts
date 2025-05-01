"use client"

import { Node, mergeAttributes } from "@tiptap/core"

export interface DividerOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    divider: {
      /**
       * Add a custom divider
       */
      setDivider: (options: { color?: string; thickness?: string }) => ReturnType
    }
  }
}

export const DividerExtension = Node.create<DividerOptions>({
  name: "customDivider",

  group: "block",

  parseHTML() {
    return [
      {
        tag: "hr[data-custom-divider]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { color = "#e5e7eb", thickness = "2px" } = HTMLAttributes

    return [
      "hr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-custom-divider": "",
        style: `border: 0; height: ${thickness}; background-color: ${color};`,
      }),
    ]
  },

  addAttributes() {
    return {
      color: {
        default: "#e5e7eb",
        parseHTML: (element) => element.getAttribute("data-color") || element.style.backgroundColor,
      },
      thickness: {
        default: "2px",
        parseHTML: (element) => element.getAttribute("data-thickness") || element.style.height,
      },
    }
  },

  addCommands() {
    return {
      setDivider:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
