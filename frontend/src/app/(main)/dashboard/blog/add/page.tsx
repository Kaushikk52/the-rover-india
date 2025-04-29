"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
// import './AuthurBlog.css'

import Underline from "@tiptap/extension-underline";
import { Link as ExLink } from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import { Superscript as Sup } from "@tiptap/extension-superscript";
import { Subscript as Sub } from "@tiptap/extension-subscript";
import FontSize from "@/components/FontSize";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";

import {
  Bold,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Highlighter,
  Italic,
  Link,
  Palette,
  Pilcrow,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
  TextQuote,
  EllipsisVertical,
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
  Superscript,
  Subscript,
  List,
  ListOrdered,
  X,
  ImageIcon,
  Youtube,
  Square,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomImageExtension } from "@/lib/custom-image-extension";
import { YouTubeExtension } from "@/lib/youtube-extension";
import { ImageDialog } from "@/components/tiptap-editors/ImageDialog";
import { YouTubeDialog } from "@/components/tiptap-editors/YoutubeDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ButtonExtension } from "@/lib/ButtonExtension";

const AddBlog = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    tags: [] as string[],
  });

  const [toggleColor, setToggleColor] = useState(false);

  const [openPopOver, setOpenPopOver] = useState(false);
  const [fontsDropdown, setFontsDropdown] = useState(false);
  const [sizeDropdown, setSizeDropdown] = useState(false);
  const [alignDropdown, setAlignDropdown] = useState(false);
  const [activeIcon, setActiveIcon] = useState<any>(Pilcrow);
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState<string | null>(null);
  const [savedContent, setSavedContent] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState({ words: 0, characters: 0 });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [buttonSettings, setButtonSettings] = useState({
    text: "Button Text",
    url: "https://example.com",
    bgColor: "#2563eb",
    textColor: "#ffffff",
    borderRadius: 4,
    paddingX: 16,
    paddingY: 8,
  });

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    const token = localStorage.getItem("accessToken");
    setToken(token);
    setSavedContent(savedContent);
  }, []);

  let parsedContent = "";
  try {
    parsedContent = savedContent ? JSON.parse(savedContent) : "";
  } catch (error) {
    console.error("Error parsing saved content:", error);
  }

  // const editorImage = useEditor({
  //   extensions: [
  //     StarterKit,
  //     //   ColoredLinkExtension,
  //     CustomImageExtension,
  //     YouTubeExtension,
  //   ],
  //   content: `
  //       <h2>Welcome to the Enhanced Tiptap Editor!</h2>
  //       <p>Try adding a link with custom text and background color using the link button in the toolbar.</p>
  //       <p>You can also insert images with captions and alignment options, or embed YouTube videos (including Shorts).</p>
  //       <blockquote>Use the blockquote button to create quotes like this one.</blockquote>
  //     `,
  // });

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "start you blog from here",
        emptyEditorClass: "is-editor-empty",
      }),
      StarterKit,
      Underline,
      FontFamily,
      FontSize,
      CustomImageExtension,
      ButtonExtension,
      YouTubeExtension,
      Sup,
      Sub,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.extend({
        addOptions() {
          return {
            ...this.parent?.(),
            types: [ListItem.name],
          };
        },
      }),
      ExLink.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: () => true,
        shouldAutoLink: () => true,
      }),
      Highlight.configure({ multicolor: true }),
    ],
    content: parsedContent,
    onUpdate: ({ editor }) => {
      localStorage.setItem("editorContent", JSON.stringify(editor.getJSON()));
      const text = editor.getText();
      setWordCount({
        words: text.split(/\s+/).filter((word) => word !== "").length,
        characters: text.length,
      });
    },
  });

  const handleImageSubmit = useCallback(
    (imageData: {
      src: string;
      alt: string;
      title: string;
      width: string;
      height: string;
      alignment: string;
      caption: string;
    }) => {
      if (!editor) return;

      editor.commands.setCustomImage(imageData);
      setImageDialogOpen(false);
    },
    [editor]
  );

  const handleYoutubeSubmit = useCallback(
    (youtubeData: {
      src: string;
      width: number;
      height: number;
      start: number;
    }) => {
      if (!editor) return;

      editor.commands.setYouTube(youtubeData);
      setYoutubeDialogOpen(false);
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  const addButton = () => {
    editor
      ?.chain()
      ?.focus()
      ?.setButton({
        text: buttonSettings.text,
        url: buttonSettings.url,
        bgColor: buttonSettings.bgColor,
        textColor: buttonSettings.textColor,
        borderRadius: buttonSettings.borderRadius,
        paddingX: buttonSettings.paddingX,
        paddingY: buttonSettings.paddingY,
      })
      .run();
  };

  const textButtons = [
    {
      text: "Paragraph",
      icon: Pilcrow,
      onClick: () => {
        editor.chain().focus().setParagraph().run();
      },
    },
    {
      text: "Heading 1",
      icon: Heading1,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
    },
    {
      text: "Heading 2",
      icon: Heading2,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
    },
    {
      text: "Heading 3",
      icon: Heading3,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
    },
    {
      text: "Heading 4",
      icon: Heading4,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 4 }).run();
      },
    },
    {
      text: "Heading 5",
      icon: Heading5,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 5 }).run();
      },
    },
    {
      text: "Numbered List",
      icon: ListOrdered,
      onClick: () => {
        editor.chain().focus().toggleOrderedList().run();
      },
    },
    {
      text: "Bullet List",
      icon: List,
      onClick: () => {
        editor.chain().focus().toggleBulletList().run();
      },
    },
  ];

  const fonts = [
    { fontName: "Normal", fontFamily: "sans-serif" },
    { fontName: "Comic Sans", fontFamily: '"Comic Sans MS", "Comic Sans"' },
    { fontName: "Inter", fontFamily: "Inter" },
    { fontName: "Serif", fontFamily: "serif" },
    { fontName: "Monospace", fontFamily: "monospace" },
    { fontName: "Cursive", fontFamily: "cursive" },
    { fontName: "Exo 2", fontFamily: '"Exo 2"' },
  ];

  const textSizes = [
    { sizeName: "Smaller", fontSize: "12px" },
    { sizeName: "Small", fontSize: "14px" },
    { sizeName: "Medium", fontSize: "16px" }, // Default
    { sizeName: "Large", fontSize: "20px" },
    { sizeName: "Extra Large", fontSize: "24px" },
  ];

  const alignItems = [
    {
      identity: "subscript",
      icon: Subscript,
      toolTipID: "sub-tooltip",
      onClick: () => editor.chain().focus().toggleSubscript().run(),
    },
    {
      identity: "superscript",
      icon: Superscript,
      toolTipID: "sup-tooltip",
      onClick: () => editor.chain().focus().toggleSuperscript().run(),
    },
    {
      textAlign: "left",
      icon: AlignLeft,
      toolTipID: "align-left-tooltip",
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      textAlign: "center",
      icon: AlignCenter,
      toolTipID: "align-center-tooltip",
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      textAlign: "right",
      icon: AlignRight,
      toolTipID: "align-right-tooltip",
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      textAlign: "justify",
      icon: AlignJustify,
      toolTipID: "align-justify-tooltip",
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
    },
  ];

  const getActiveHeading = () => {
    for (let i = 1; i <= 5; i++) {
      if (editor.isActive("heading", { level: i })) return i;
    }
    return null;
  };

  const activeHeading = getActiveHeading();

  const getActiveIcon = () => {
    if (editor.isActive("heading", { level: 1 })) return Heading1;
    if (editor.isActive("heading", { level: 2 })) return Heading2;
    if (editor.isActive("heading", { level: 3 })) return Heading3;
    if (editor.isActive("heading", { level: 4 })) return Heading4;
    if (editor.isActive("heading", { level: 5 })) return Heading5;
    if (editor.isActive("orderedList")) return ListOrdered;
    if (editor.isActive("bulletList")) return List;
    return Pilcrow; // Default: Paragraph
  };

  // useEffect(() => {
  //     if (editor?.state) {
  //       setActiveIcon(getActiveIcon());
  //     }
  //   }, [editor]);

  // Function to get the currently active text size or default to "Medium"
  const getActiveTextSize = () => {
    const textStyle = editor.getAttributes("fontSize");
    return (
      textSizes.find((size) => size.fontSize === textStyle.fontSize)
        ?.sizeName || "Medium"
    ); // Default to Medium
  };

  const getActiveFont = () => {
    const textStyle = editor.getAttributes("textStyle");
    return textStyle.fontFamily
      ? fonts.find((font) => font.fontFamily === textStyle.fontFamily)
          ?.fontName || "Normal"
      : "Normal";
  };

  // const setLink = useCallback(() => {
  //     const previousUrl = editor?.getAttributes('link').href
  //     const url = window.prompt('URL', previousUrl)

  //     // cancelled
  //     if (url === null) {
  //         return
  //     }

  //     // empty
  //     if (url === '') {
  //         editor?.chain().focus().extendMarkRange('link').unsetLink()
  //             .run()

  //         return
  //     }

  //     // update link
  //     try {
  //         editor?.chain().focus().extendMarkRange('link').setLink({ href: url })
  //             .run()
  //     } catch (e: any) {
  //         alert(e.message)
  //     }
  // }, [editor])

  // Handle Tag Input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setFormData({ ...formData, tags: newTags });
      }
      setInputValue("");
    }
  };

  // Remove Tag
  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      const file: File = e.target.files[0];
      console.log("type of file", typeof file);
      setImage(file);
      setPreview(URL.createObjectURL(file));
      console.log(preview);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!editor) {
      alert("Editor is not loaded yet!");
      return;
    }

    const content = editor.getHTML().trim(); // Get the editor content

    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }

    // Convert HTML content to plain text and count words
    const plainText = content.replace(/<[^>]+>/g, " ").trim(); // Remove HTML tags
    const wordCount = plainText
      .split(/\s+/)
      .filter((word) => word.length > 0).length; // Count words

    if (!content || wordCount < 80) {
      alert(`Content must be at least 80 words! Current: ${wordCount} words.`);
      return;
    }

    if (tags.length === 0) {
      alert("Please add at least one tag!");
      return;
    }

    const userId = localStorage.getItem("userId") || "";

    const finalData = {
      title: formData.title.trim(),
      content: content, // Include the editor content
      tags: tags,
      image: image || "",
      userId: userId,
    };

    try {
      const formdata = new FormData();
      formdata.append("title", finalData.title);
      formdata.append("content", finalData.content);
      formdata.append("tags", JSON.stringify(finalData.tags));
      if (finalData.image) {
        formdata.append("image", finalData.image); // ✅ Only append if not null
      }
      formdata.append("userId", finalData.userId);

      const response = await axios.post(
        "http://localhost:5000/api/blogs/create-blog",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog submitted successfully!");

      // Reset form fields after successful submission
      setTags([]);
      setInputValue("");
      setPreview(null);

      setFormData({ title: "", tags: [] });
      editor.commands.clearContent();
      localStorage.removeItem("editorContent");
      e.target.files = [];
    } catch (error: any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to submit blog. Please try again.");
    }
  };

  return (
    <>
      <h1>Post Blogs</h1>
      <Tooltip id="undo-tooltip" place="top" content="Undo" />
      <Tooltip id="redo-tooltip" place="top" content="Redo" />
      <Tooltip id="bold-tooltip" place="top" content="Bold" />
      <Tooltip id="italic-tooltip" place="top" content="Italic" />
      <Tooltip id="strike-tooltip" place="top" content="Strike Through" />
      <Tooltip id="underline-tooltip" place="top" content="Underline" />
      <Tooltip id="blockquote-tooltip" place="top" content="Blockquote" />
      <Tooltip id="link-tooltip" place="top" content="Link" />
      <Tooltip id="highlighter-tooltip" place="top" content="Highlighter" />
      <Tooltip id="color-tooltip" place="top" content="Text Color" />
      <Tooltip id="more-tooltip" place="top" content="More Options" />

      <Tooltip
        className="z-50"
        id="sup-tooltip"
        place="top"
        content="Super Script"
      />
      <Tooltip
        className="z-50"
        id="sub-tooltip"
        place="top"
        content="Sub Script"
      />
      <Tooltip
        className="z-50"
        id="align-left-tooltip"
        place="top"
        content="Align Left"
      />
      <Tooltip
        className="z-50"
        id="align-center-tooltip"
        place="top"
        content="Align Center"
      />
      <Tooltip
        className="z-50"
        id="align-right-tooltip"
        place="top"
        content="Align Right"
      />
      <Tooltip
        className="z-50"
        id="align-justify-tooltip"
        place="top"
        content="Align Justify"
      />

      <div className="w-full py-10">
        <div className="max-w-7xl mx-auto px-4 py-4 bg-white">
          <form
            onKeyDown={preventEnterSubmit}
            onSubmit={handleSubmit}
            className="w-full bg-gray-100 rounded py-4 px-8 mb-8"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-1.5 px-4 mb-2"
              placeholder="Enter Blog Title"
              required
            />
            <input
              type="text"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full py-1.5 px-4 mb-0"
              placeholder="Enter tags"
            />
            <div className="flex flex-wrap py-4">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-200 pl-4 pr-1 py-1 rounded-full mr-3 mb-2"
                >
                  <span className="text-black">{tag}</span>
                  <button
                    onClick={() => removeTag(index)}
                    className="bg-red-500 py-1 px-1 rounded-full text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="bg-white w-full py-1.5 px-2 mb-2"
            />

            <div className="flex w-full justify-end">
              <button
                type="submit"
                className={`py-2 px-10 text-white rounded
                                        ${
                                          formData.title.trim() &&
                                          tags.length > 0
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-gray-400 cursor-not-allowed"
                                        }`}
                disabled={!formData.title.trim() || tags.length === 0}
              >
                Publish
              </button>
            </div>
          </form>

          <div className="max-w-7xl text-4xl font-semibold text-center break-words">
            {formData.title}
          </div>

          {preview && (
            <div className="mt-2 w-full ">
              <img
                src={preview}
                alt="Preview"
                className="w-full aspect -[7/4] object-top object-contain rounded"
              />
            </div>
          )}

          <div className="flex flex-col mt-8">
            <div className="flex justify-end gap-2 text-slate-400 p-2">
              <h1>{wordCount.words} words</h1>•
              <h1>{wordCount.characters} characters</h1>
            </div>
            <div className="w-full flex flex-col items-center justify-start py-2 px-2 space-x-1 border-2 rounded">
              <div className="w-full flex items-center justify-start py-2 px-2 space-x-1">
                <button
                  data-tooltip-id="bold-tooltip"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`${
                    editor?.isActive("bold")
                      ? "bg-gray-200 text-black rounded"
                      : "text-gray-500 hover:bg-gray-100 rounded"
                  } px-4 py-2`}
                >
                  <Bold strokeWidth={3} color={"currentColor"} size={19} />
                </button>
                <button
                  data-tooltip-id="italic-tooltip"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`${
                    editor?.isActive("italic")
                      ? "bg-gray-200 text-black rounded"
                      : "text-gray-500 hover:bg-gray-100 rounded"
                  } px-4 py-2`}
                >
                  <Italic strokeWidth={3} color={"currentColor"} size={19} />
                </button>
                <button
                  data-tooltip-id="strike-tooltip"
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={`${
                    editor?.isActive("strike")
                      ? "bg-gray-200 text-black rounded"
                      : "text-gray-500 hover:bg-gray-100 rounded"
                  } px-4 py-2`}
                >
                  <Strikethrough
                    strokeWidth={3}
                    color={"currentColor"}
                    size={19}
                  />
                </button>
                <button
                  data-tooltip-id="underline-tooltip"
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  className={`${
                    editor?.isActive("underline")
                      ? "bg-gray-200 text-black rounded"
                      : "text-gray-500 hover:bg-gray-100 rounded"
                  } px-4 py-2`}
                >
                  <UnderlineIcon
                    strokeWidth={3}
                    color={"currentColor"}
                    size={19}
                  />
                </button>

                <div className="relative">
                  <button
                    onClick={() => {
                      setOpenPopOver(!openPopOver);
                      setFontsDropdown(false);
                      setSizeDropdown(false);
                      setAlignDropdown(false);
                    }}
                    className="flex items-center bg-gray-100  py-[5.2px] px-2 space-x-2 rounded"
                  >
                    {React.createElement(activeIcon, {
                      strokeWidth: 2,
                      color: "currentColor",
                      size: 19,
                    })}
                    <ChevronDown
                      className={`${
                        openPopOver ? "rotate-180" : "rotate-0"
                      } transition-all`}
                    />
                  </button>

                  {openPopOver && (
                    <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow w-48">
                      <div>
                        {textButtons.map((item, index) => {
                          const Icon = item.icon;
                          const isActive =
                            item.text === "Paragraph"
                              ? !activeHeading &&
                                !editor.isActive("orderedList") &&
                                !editor.isActive("bulletList")
                              : item.text.includes("Heading")
                              ? editor.isActive("heading", {
                                  level: parseInt(item.text.split(" ")[1]),
                                })
                              : item.text === "Numbered List"
                              ? editor.isActive("orderedList")
                              : item.text === "Bullet List"
                              ? editor.isActive("bulletList")
                              : false;

                          return (
                            <div key={index} className="w-full rounded">
                              <button
                                onClick={() => {
                                  item.onClick();
                                  setActiveIcon(item.icon);
                                  setOpenPopOver(false);
                                }}
                                className={`w-full px-2 py-2 flex items-center justify-start rounded ${
                                  isActive
                                    ? "bg-gray-100 text-black"
                                    : "text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {React.createElement(Icon, {
                                  strokeWidth: 2,
                                  color: "currentColor",
                                  size: 20,
                                })}
                                <span className="ml-2">{item.text}</span>
                              </button>
                              {index === 5 && <hr className="my-1 border" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setFontsDropdown(!fontsDropdown);
                      setOpenPopOver(false);
                      setSizeDropdown(false);
                      setAlignDropdown(false);
                    }}
                    className="text-nowrap flex items-center bg-gray-100  py-[5.2px] px-2 space-x-2 rounded"
                  >
                    <span>{getActiveFont()}</span>
                    <ChevronDown
                      className={`${
                        fontsDropdown ? "rotate-180" : "rotate-0"
                      } transition-all`}
                    />
                  </button>

                  {fontsDropdown && (
                    <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow w-44">
                      {fonts.map((font, index) => {
                        const isActive =
                          font.fontName === "Normal"
                            ? !editor.getAttributes("textStyle").fontFamily
                            : editor.isActive("textStyle", {
                                fontFamily: font.fontFamily,
                              });

                        return (
                          <div key={index} className="w-full rounded">
                            <button
                              onClick={() => {
                                if (font.fontName === "Normal") {
                                  editor
                                    .chain()
                                    .focus()
                                    .unsetFontFamily()
                                    .run(); // Reset font
                                } else {
                                  editor
                                    .chain()
                                    .focus()
                                    .setFontFamily(font.fontFamily)
                                    .run();
                                }
                                setFontsDropdown(false);
                              }}
                              className={`w-full px-2 py-2 flex items-center justify-start rounded ${
                                isActive
                                  ? "bg-gray-100 text-black"
                                  : "text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              <span style={{ fontFamily: font.fontFamily }}>
                                {font.fontName}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setSizeDropdown(!sizeDropdown);
                      setFontsDropdown(false);
                      setOpenPopOver(false);
                      setAlignDropdown(false);
                    }}
                    className="flex items-center bg-gray-100 py-[5.2px] px-2 space-x-2 rounded"
                  >
                    <span className="text-nowrap">{getActiveTextSize()}</span>{" "}
                    {/* Show active text size */}
                    <ChevronDown
                      className={`${
                        sizeDropdown ? "rotate-180" : "rotate-0"
                      } transition-all`}
                    />
                  </button>

                  {sizeDropdown && (
                    <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white border p-2 rounded shadow w-44">
                      {textSizes.map((size, index) => {
                        const textStyle = editor.getAttributes("fontSize");
                        const currentSize = textStyle.fontSize || "16px"; // Default to 16px (Medium)
                        const isActive = currentSize === size.fontSize;

                        return (
                          <div key={index} className="w-full rounded">
                            <button
                              onClick={() => {
                                editor
                                  .chain()
                                  .focus()
                                  .setFontSize(size.fontSize)
                                  .run();
                                setSizeDropdown(false);
                              }}
                              className={`w-full px-2 py-2 flex items-center justify-start rounded ${
                                isActive
                                  ? "bg-gray-100 text-black"
                                  : "text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              <span
                                style={{ fontSize: size.fontSize }}
                                className={`ml-2`}
                              >
                                {size.sizeName}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <button
                  data-tooltip-id="blockquote-tooltip"
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                  className={`${
                    editor?.isActive("blockquote")
                      ? "bg-gray-200 text-black rounded"
                      : "text-gray-500 hover:bg-gray-100 rounded"
                  } px-4 py-2`}
                >
                  <TextQuote strokeWidth={3} color={"currentColor"} size={19} />
                </button>
                {/* <button data-tooltip-id="link-tooltip" onClick={setLink} className={`${editor?.isActive('link') ? 'bg-gray-200 text-black rounded' : 'text-gray-500 hover:bg-gray-100 rounded'} px-4 py-2`}><Link strokeWidth={3} color={'currentColor'} size={19} /></button> */}
                <button
                  data-tooltip-id="highlighter-tooltip"
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .toggleHighlight({ color: "#ffc078" })
                      .run()
                  }
                  className={`${
                    editor?.isActive("highlight")
                      ? "bg-gray-200 text-black rounded"
                      : "text-gray-500 hover:bg-gray-100 rounded"
                  } px-4 py-2`}
                >
                  <Highlighter
                    strokeWidth={3}
                    color={"currentColor"}
                    size={19}
                  />
                </button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Text Color"
                    >
                      <Type className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          "#000000",
                          "#FF0000",
                          "#00FF00",
                          "#0000FF",
                          "#FFFF00",
                          "#FF00FF",
                          "#00FFFF",
                          "#FFA500",
                          "#800080",
                          "#008000",
                        ].map((color) => (
                          <Button
                            key={color}
                            variant="outline"
                            className="w-8 h-8 p-0"
                            style={{ backgroundColor: color }}
                            onClick={() =>
                              editor.chain().focus().setColor(color).run()
                            }
                          />
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          className="w-12 h-8 p-1"
                          onChange={(e) =>
                            editor
                              .chain()
                              .focus()
                              .setColor(e.target.value)
                              .run()
                          }
                        />
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            editor.chain().focus().unsetColor().run()
                          }
                        >
                          Reset color
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setImageDialogOpen(true)}
                  className={editor.isActive("customImage") ? "bg-muted" : ""}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <ImageDialog
                  open={imageDialogOpen}
                  onOpenChange={setImageDialogOpen}
                  onSubmit={handleImageSubmit}
                  initialValues={
                    editor.isActive("customImage")
                      ? editor.getAttributes("customImage")
                      : {}
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setYoutubeDialogOpen(true)}
                  className={editor.isActive("youtube") ? "bg-muted" : ""}
                >
                  <Youtube className="h-4 w-4" />
                </Button>

                <YouTubeDialog
                  open={youtubeDialogOpen}
                  onOpenChange={setYoutubeDialogOpen}
                  onSubmit={handleYoutubeSubmit}
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Add Button"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96">
                    <Tabs defaultValue="content">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="style">Style</TabsTrigger>
                      </TabsList>
                      <TabsContent value="content" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="button-text">Button Text</Label>
                          <Input
                            id="button-text"
                            value={buttonSettings.text}
                            onChange={(e) =>
                              setButtonSettings({
                                ...buttonSettings,
                                text: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="button-url">URL</Label>
                          <Input
                            id="button-url"
                            value={buttonSettings.url}
                            onChange={(e) =>
                              setButtonSettings({
                                ...buttonSettings,
                                url: e.target.value,
                              })
                            }
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="style" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bg-color">Background Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="bg-color"
                              type="color"
                              className="w-12 h-8 p-1"
                              value={buttonSettings.bgColor}
                              onChange={(e) =>
                                setButtonSettings({
                                  ...buttonSettings,
                                  bgColor: e.target.value,
                                })
                              }
                            />
                            <Input
                              value={buttonSettings.bgColor}
                              onChange={(e) =>
                                setButtonSettings({
                                  ...buttonSettings,
                                  bgColor: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="text-color">Text Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="text-color"
                              type="color"
                              className="w-12 h-8 p-1"
                              value={buttonSettings.textColor}
                              onChange={(e) =>
                                setButtonSettings({
                                  ...buttonSettings,
                                  textColor: e.target.value,
                                })
                              }
                            />
                            <Input
                              value={buttonSettings.textColor}
                              onChange={(e) =>
                                setButtonSettings({
                                  ...buttonSettings,
                                  textColor: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>
                            Border Radius: {buttonSettings.borderRadius}px
                          </Label>
                          <Slider
                            value={[buttonSettings.borderRadius]}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(value) =>
                              setButtonSettings({
                                ...buttonSettings,
                                borderRadius: value[0],
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Padding X: {buttonSettings.paddingX}px</Label>
                          <Slider
                            value={[buttonSettings.paddingX]}
                            min={4}
                            max={48}
                            step={2}
                            onValueChange={(value) =>
                              setButtonSettings({
                                ...buttonSettings,
                                paddingX: value[0],
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Padding Y: {buttonSettings.paddingY}px</Label>
                          <Slider
                            value={[buttonSettings.paddingY]}
                            min={2}
                            max={24}
                            step={2}
                            onValueChange={(value) =>
                              setButtonSettings({
                                ...buttonSettings,
                                paddingY: value[0],
                              })
                            }
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="mt-4">
                      <div
                        className="mb-4 flex justify-center"
                        style={{
                          backgroundColor: buttonSettings.bgColor,
                          color: buttonSettings.textColor,
                          borderRadius: `${buttonSettings.borderRadius}px`,
                          padding: `${buttonSettings.paddingY}px ${buttonSettings.paddingX}px`,
                          display: "inline-block",
                        }}
                      >
                        {buttonSettings.text}
                      </div>
                      <Button className="w-full" onClick={addButton}>
                        Insert Button
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="relative">
                  <button
                    onClick={() => {
                      setAlignDropdown(!alignDropdown);
                      setOpenPopOver(false);
                      setFontsDropdown(false);
                      setSizeDropdown(false);
                    }}
                    data-tooltip-id="more-tooltip"
                    className="text-gray-500 pr-2 py-2"
                  >
                    <EllipsisVertical
                      strokeWidth={3}
                      color={"currentColor"}
                      size={19}
                    />
                  </button>
                  {alignDropdown && (
                    <>
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white shadow border flex justify-start items-center rounded p-1 space-x-2">
                        <div className="flex items-center justify-start">
                          {alignItems.slice(0, 2).map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <>
                                <button
                                  onClick={item.onClick}
                                  data-tooltip-id={item.toolTipID}
                                  key={index}
                                  className={`w-full px-2 py-2 flex items-center justify-start rounded ${
                                    editor.isActive(`${item.identity}`)
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-500 hover:bg-gray-50"
                                  }`}
                                >
                                  <Icon />
                                </button>
                              </>
                            );
                          })}
                        </div>

                        <div className="h-10 border"></div>

                        <div className="flex items-center justify-start">
                          {alignItems.slice(2).map((item, index) => {
                            const Icon = item.icon;
                            const isActive = item.textAlign
                              ? editor.isActive({ textAlign: item.textAlign })
                              : false;
                            return (
                              <>
                                <button
                                  onClick={item.onClick}
                                  data-tooltip-id={item.toolTipID}
                                  key={index}
                                  className={`w-full px-2 py-2 flex items-center justify-start rounded ${
                                    isActive
                                      ? "bg-gray-100 text-black"
                                      : "text-gray-500 hover:bg-gray-50"
                                  }`}
                                >
                                  <Icon />
                                </button>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex w-full justify-end">
                  <button
                    data-tooltip-id="undo-tooltip"
                    onClick={() => editor?.chain().focus().undo().run()}
                    disabled={!editor?.can().undo()}
                    className={`pl-3.5 py-2 rounded ${
                      editor?.can().undo()
                        ? "text-black"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Undo strokeWidth={3} color={"currentColor"} size={19} />
                  </button>

                  <button
                    data-tooltip-id="redo-tooltip"
                    onClick={() => editor?.chain().focus().redo().run()}
                    disabled={!editor?.can().redo()}
                    className={`pl-3.5 pr-3 py-2 rounded ${
                      editor?.can().redo()
                        ? "text-black "
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Redo strokeWidth={3} color={"currentColor"} size={19} />
                  </button>
                </div>
              </div>
            </div>
            {/* <hr className='my-2 border'/> */}
            <div className="my-4 tiptap-editor overflow-auto h-[500px]">
              {editor && <EditorContent editor={editor} className="" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
