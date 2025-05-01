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
import { Slider } from "@/components/ui/slider";

interface DividerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { color: string; thickness: string }) => void;
}

export function DividerDialog({
  open,
  onOpenChange,
  onSubmit,
}: DividerDialogProps) {
  const [color, setColor] = useState("#e5e7eb");
  const [thickness, setThickness] = useState(2);

  useEffect(() => {
    if (open) {
      setColor("#e5e7eb");
      setThickness(2);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      color,
      thickness: `${thickness}px`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Divider</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="divider-color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="divider-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="divider-thickness" className="text-right">
                Thickness
              </Label>
              <div className="col-span-3 flex items-center gap-4">
                <Slider
                  id="divider-thickness"
                  min={1}
                  max={10}
                  step={1}
                  value={[thickness]}
                  onValueChange={(value) => setThickness(value[0])}
                  className="flex-1"
                />
                <span className="w-12 text-center">{thickness}px</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Preview</Label>
              <div className="col-span-3">
                <div
                  className="w-full"
                  style={{
                    height: `${thickness}px`,
                    backgroundColor: color,
                  }}
                />
              </div>
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
            <Button type="submit">Insert Divider</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
