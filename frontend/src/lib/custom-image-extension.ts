"use client"

import { mergeAttributes } from "@tiptap/core"
import Image from "@tiptap/extension-image"

export const CustomImageExtension = Image.extend({
  name: "customImage",

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "custom-image",
      },
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      alt: {
        default: "",
        parseHTML: (element) => element.getAttribute("alt"),
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
      },
      width: {
        default: "auto",
        parseHTML: (element) => element.getAttribute("width") || "auto",
      },
      height: {
        default: "auto",
        parseHTML: (element) => element.getAttribute("height") || "auto",
      },
      alignment: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-alignment") || "center",
        renderHTML: (attributes) => {
          if (!attributes.alignment) {
            return {}
          }

          return {
            "data-alignment": attributes.alignment,
            style: `display: block; margin: ${
              attributes.alignment === "center"
                ? "0 auto"
                : attributes.alignment === "left"
                  ? "0 auto 0 0"
                  : "0 0 0 auto"
            };`,
          }
        },
      },
      caption: {
        default: "",
        parseHTML: (element) => {
          const captionEl = element.parentElement?.querySelector(".image-caption")
          return captionEl?.textContent || ""
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { caption, ...attrs } = HTMLAttributes

    if (caption) {
      return [
        "figure",
        { class: "image-figure" },
        ["img", mergeAttributes(this.options.HTMLAttributes, attrs)],
        ["figcaption", { class: "image-caption" }, caption],
      ]
    }

    return ["img", mergeAttributes(this.options.HTMLAttributes, attrs)]
  },

  addCommands() {
    return {
      setCustomImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
      updateImageAttributes:
        (attributes) =>
        ({ tr, state }) => {
          const { selection } = state
          const node = selection.$anchor.node()

          if (node.type.name !== this.name) {
            return false
          }

          const pos = selection.$anchor.pos
          const newAttrs = {
            ...node.attrs,
            ...attributes,
          }

          tr.setNodeMarkup(pos, undefined, newAttrs)
          return true
        },
    }
  },
})
