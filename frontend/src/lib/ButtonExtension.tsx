import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ButtonComponent } from "@/components/tiptap-editors/ButtonComponent";

export interface ButtonOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    button: {
      setButton: (options: {
        text: string;
        url: string;
        bgColor: string;
        textColor: string;
        borderRadius: number;
        paddingX: number;
        paddingY: number;
      }) => ReturnType;
    };
  }
}

export const ButtonExtension = Node.create<ButtonOptions>({
  name: "button",

  group: "inline",

  inline: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      text: {
        default: "Button",
      },
      url: {
        default: "https://example.com",
      },
      bgColor: {
        default: "#2563eb",
      },
      textColor: {
        default: "#ffffff",
      },
      borderRadius: {
        default: 4,
        parseHTML: (element) =>
          Number.parseInt(element.getAttribute("data-border-radius") || "4"),
        renderHTML: (attributes) => {
          return {
            "data-border-radius": attributes.borderRadius,
          };
        },
      },
      paddingX: {
        default: 16,
        parseHTML: (element) =>
          Number.parseInt(element.getAttribute("data-padding-x") || "16"),
        renderHTML: (attributes) => {
          return {
            "data-padding-x": attributes.paddingX,
          };
        },
      },
      paddingY: {
        default: 8,
        parseHTML: (element) =>
          Number.parseInt(element.getAttribute("data-padding-y") || "8"),
        renderHTML: (attributes) => {
          return {
            "data-padding-y": attributes.paddingY,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="button"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes({ "data-type": "button" }, HTMLAttributes, {
        href: HTMLAttributes.url,
        style: `
            display: inline-block;
            background-color: ${HTMLAttributes.bgColor};
            color: ${HTMLAttributes.textColor};
            border-radius: ${HTMLAttributes.borderRadius}px;
            padding: ${HTMLAttributes.paddingY}px ${HTMLAttributes.paddingX}px;
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;
          `,
      }),
      HTMLAttributes.text,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonComponent);
  },

  addCommands() {
    return {
      setButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
