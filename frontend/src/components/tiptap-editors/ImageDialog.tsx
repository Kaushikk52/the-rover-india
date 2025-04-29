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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    src: string;
    alt: string;
    title: string;
    width: string;
    height: string;
    alignment: string;
    caption: string;
  }) => void;
  initialValues?: {
    src?: string;
    alt?: string;
    title?: string;
    width?: string;
    height?: string;
    alignment?: string;
    caption?: string;
  };
}

export function ImageDialog({
  open,
  onOpenChange,
  onSubmit,
  initialValues = {},
}: ImageDialogProps) {
  const [src, setSrc] = useState(initialValues.src || "");
  const [alt, setAlt] = useState(initialValues.alt || "");
  const [title, setTitle] = useState(initialValues.title || "");
  const [width, setWidth] = useState(initialValues.width || "auto");
  const [height, setHeight] = useState(initialValues.height || "auto");
  const [alignment, setAlignment] = useState(
    initialValues.alignment || "center"
  );
  const [caption, setCaption] = useState(initialValues.caption || "");

  useEffect(() => {
    if (open) {
      setSrc(initialValues.src || "");
      setAlt(initialValues.alt || "");
      setTitle(initialValues.title || "");
      setWidth(initialValues.width || "auto");
      setHeight(initialValues.height || "auto");
      setAlignment(initialValues.alignment || "center");
      setCaption(initialValues.caption || "");
    }
  }, [open, initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ src, alt, title, width, height, alignment, caption });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="src" className="text-right">
                Image URL
              </Label>
              <Input
                id="src"
                placeholder="https://example.com/image.jpg"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alt" className="text-right">
                Alt Text
              </Label>
              <Input
                id="alt"
                placeholder="Image description"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Image title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="caption" className="text-right">
                Caption
              </Label>
              <Input
                id="caption"
                placeholder="Image caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dimensions</Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="width"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-1/2"
                />
                <Input
                  id="height"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-1/2"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Alignment</Label>
              <RadioGroup
                value={alignment}
                onValueChange={setAlignment}
                className="col-span-3 flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="left" id="left" />
                  <Label htmlFor="left">Left</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="center" id="center" />
                  <Label htmlFor="center">Center</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="right" id="right" />
                  <Label htmlFor="right">Right</Label>
                </div>
              </RadioGroup>
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
            <Button type="submit" disabled={!src.trim()}>
              Insert Image
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
