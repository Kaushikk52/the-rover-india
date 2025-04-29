"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { extractYoutubeId } from "@/lib/youtube-extension";

interface YouTubeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    src: string;
    width: number;
    height: number;
    start: number;
  }) => void;
}

export function YouTubeDialog({
  open,
  onOpenChange,
  onSubmit,
}: YouTubeDialogProps) {
  const [src, setSrc] = useState("");
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(360);
  const [start, setStart] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSrc("");
      setWidth(640);
      setHeight(360);
      setStart(0);
      setIsValid(false);
      setVideoId(null);
    }
  }, [open]);

  useEffect(() => {
    const extractedId = extractYoutubeId(src);
    setVideoId(extractedId);
    setIsValid(!!extractedId);
  }, [src]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ src, width, height, start });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert YouTube Video</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="youtube-url" className="text-right">
                YouTube URL
              </Label>
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtube.com/shorts/..."
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                className="col-span-3"
              />
            </div>
            {src && !isValid && (
              <div className="col-span-4 text-sm text-red-500 ml-[calc(25%+0.5rem)]">
                Invalid YouTube URL. Please enter a valid YouTube URL or YouTube
                Shorts URL.
              </div>
            )}
            {isValid && videoId && (
              <div className="col-span-4 text-sm text-green-600 ml-[calc(25%+0.5rem)]">
                Valid YouTube video ID: {videoId}
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dimensions</Label>
              <div className="col-span-3 flex gap-2">
                <div className="w-1/2">
                  <Label htmlFor="width" className="text-xs">
                    Width
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    min="320"
                    max="1280"
                    value={width}
                    onChange={(e) =>
                      setWidth(Number.parseInt(e.target.value) || 640)
                    }
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="height" className="text-xs">
                    Height
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    min="180"
                    max="720"
                    value={height}
                    onChange={(e) =>
                      setHeight(Number.parseInt(e.target.value) || 360)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-time" className="text-right">
                Start Time (s)
              </Label>
              <Input
                id="start-time"
                type="number"
                min="0"
                placeholder="0"
                value={start}
                onChange={(e) => setStart(Number.parseInt(e.target.value) || 0)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Insert Video
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
