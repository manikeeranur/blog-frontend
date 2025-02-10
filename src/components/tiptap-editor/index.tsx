"use client";
import React from "react";
import "./tiptap-editor.scss";
import TableExt from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LinkIcon,
  Highlighter,
  Table,
} from "lucide-react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import "highlight.js/styles/atom-one-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import { createLowlight } from "lowlight";

const lowlight = createLowlight();
lowlight.register({ javascript, typescript, html, css });

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  return (
    <div className="tiptap-control-group flex flex-wrap items-center gap-2">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`editor-btn font-black ${
          editor.isActive("heading", { level: 1 }) && "is-active"
        }`}
      >
        <Heading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`editor-btn font-extrabold ${
          editor.isActive("heading", { level: 2 }) && "is-active"
        }`}
      >
        <Heading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`editor-btn font-semibold ${
          editor.isActive("heading", { level: 3 }) && "is-active"
        }`}
      >
        <Heading3 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`editor-btn font-medium ${
          editor.isActive("heading", { level: 4 }) && "is-active"
        }`}
      >
        <Heading4 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`editor-btn font-normal ${
          editor.isActive("heading", { level: 5 }) && "is-active"
        }`}
      >
        <Heading5 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`editor-btn font-normal ${
          editor.isActive("heading", { level: 6 }) && "is-active"
        }`}
      >
        <Heading6 />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`editor-btn ${
          editor.isActive("highlight") ? "is-active" : ""
        }`}
      >
        <Highlighter />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`editor-btn ${
          editor.isActive({ textAlign: "left" }) ? "is-active" : ""
        }`}
      >
        <AlignLeft />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`editor-btn ${
          editor.isActive({ textAlign: "center" }) ? "is-active" : ""
        }`}
      >
        <AlignCenter />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`editor-btn ${
          editor.isActive({ textAlign: "right" }) ? "is-active" : ""
        }`}
      >
        <AlignRight />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`editor-btn ${
          editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
        }`}
      >
        <AlignJustify />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`editor-btn ${editor.isActive("bold") && "is-active"}`}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`editor-btn ${editor.isActive("italic") && "is-active"}`}
      >
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`editor-btn ${editor.isActive("strike") && "is-active"}`}
      >
        <Strikethrough />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`editor-btn ${editor.isActive("code") && "is-active"}`}
      >
        <Code />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`editor-btn ${editor.isActive("bulletList") && "is-active"}`}
      >
        <List />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`editor-btn ${
          editor.isActive("orderedList") && "is-active"
        }`}
      >
        <ListOrdered />
      </button>

      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`editor-btn`}
      >
        <Minus />
      </button>

      {/* Text Color */}
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
      />

      {/* Background Color */}
      <input
        type="color"
        onChange={(e) => {
          const color = e.target.value;
          editor
            .chain()
            .focus()
            .setMark("textStyle", { backgroundColor: color })
            .run();
        }}
      />

      <button
        onClick={() => {
          const url = prompt("Enter the URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`editor-btn ${editor.isActive("link") && "is-active"}`}
      >
        <LinkIcon />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
        }
        className="editor-btn"
      >
        <Table />
      </button>
      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        className="editor-btn !w-fit"
      >
        Inser Row Top
      </button>
      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className="editor-btn !w-fit"
      >
        Insert Row Bottom
      </button>
      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        className="editor-btn !w-fit"
      >
        Delete Row
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        className="editor-btn !w-fit"
      >
        Insert Column Left
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className="editor-btn !w-fit"
      >
        Insert Column Right
      </button>
      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        className="editor-btn !w-fit"
      >
        Column Remove
      </button>
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="editor-btn !w-fit"
      >
        Delete Table
      </button>
    </div>
  );
};

const TiptapEditor = ({ value, onChange }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      TableExt.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      TextStyle.extend({
        addAttributes() {
          return {
            backgroundColor: {
              default: null,
              parseHTML: (element) => element.style.backgroundColor || null,
              renderHTML: (attributes) => {
                if (!attributes.backgroundColor) {
                  return {};
                }
                return {
                  style: `background-color: ${attributes.backgroundColor}`,
                };
              },
            },
          };
        },
      }),
      Link.configure({ openOnClick: true }),
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="tiptap-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
