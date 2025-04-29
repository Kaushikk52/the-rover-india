"use client"

import { NodeViewWrapper } from "@tiptap/react"
import { extractYoutubeId } from "@/lib/youtube-extension"

interface YouTubeComponentProps {
  node: {
    attrs: {
      src: string
      width: number
      height: number
      start: number
    }
  }
}

export function YouTubeComponent({ node }: YouTubeComponentProps) {
  const { src, width, height, start } = node.attrs

  const videoId = extractYoutubeId(src)

  if (!videoId) {
    return (
      <NodeViewWrapper className="youtube-wrapper">
        <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded">Invalid YouTube URL: {src}</div>
      </NodeViewWrapper>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`

  return (
    <NodeViewWrapper className="youtube-wrapper my-4">
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-md"
        />
      </div>
    </NodeViewWrapper>
  )
}
