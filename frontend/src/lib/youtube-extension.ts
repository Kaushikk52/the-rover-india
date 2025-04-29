    "use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { YouTubeComponent } from "@/components/tiptap-editors/YoutubeComponent"

export interface YouTubeOptions {
  HTMLAttributes: Record<string, any>
  width: number
  height: number
  nocookie: boolean
  allowFullscreen: boolean
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    youtube: {
      /**
       * Add a YouTube video
       */
      setYouTube: (options: { src: string; width?: number; height?: number; start?: number }) => ReturnType
    }
  }
}

export const YouTubeExtension = Node.create<YouTubeOptions>({
  name: "youtube",

  group: "block",

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      width: 640,
      height: 360,
      nocookie: false,
      allowFullscreen: true,
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-youtube-video] iframe",
        getAttrs: (node) => {
          if (typeof node === "string" || !(node instanceof HTMLElement)) {
            return false
          }

          const iframe = node as HTMLIFrameElement
          const src = iframe.getAttribute("src")

          if (!src) {
            return false
          }

          return {
            src,
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = this.options.nocookie
      ? "https://www.youtube-nocookie.com/embed/"
      : "https://www.youtube.com/embed/"

    const videoId = extractYoutubeId(HTMLAttributes.src || "")

    if (!videoId) {
      return ["div", { class: "youtube-invalid" }, "Invalid YouTube URL"]
    }

    let url = `${embedUrl}${videoId}`

    if (HTMLAttributes.start) {
      url += `?start=${HTMLAttributes.start}`
    }

    const attributes = {
      src: url,
      width: HTMLAttributes.width || this.options.width,
      height: HTMLAttributes.height || this.options.height,
      allowfullscreen: this.options.allowFullscreen,
      frameborder: 0,
    }

    return ["div", { "data-youtube-video": "" }, ["iframe", mergeAttributes(this.options.HTMLAttributes, attributes)]]
  },

  addNodeView() {
    return ReactNodeViewRenderer(YouTubeComponent)
  },

  addCommands() {
    return {
      setYouTube:
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

// Helper function to extract YouTube video ID from various URL formats
export function extractYoutubeId(url: string): string | null {
  if (!url) return null

  // Handle YouTube Shorts URLs
  const shortsRegExp = /^.*(youtube.com\/shorts\/)([^#&?]*).*/
  const shortsMatch = url.match(shortsRegExp)
  if (shortsMatch && shortsMatch[2].length === 11) {
    return shortsMatch[2]
  }

  // Regular YouTube URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  if (match && match[2].length === 11) {
    return match[2]
  }

  return null
}
