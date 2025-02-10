import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import React from "react";
import { Extensions } from "@/src/components/tiptap-editor-new/tiptapExtensions";

const Editor = ({ onDataChange, content, editable }: any) => {
  const editor = useEditor({
    editable,
    extensions: Extensions,
    editorProps: {
      attributes: {
        class:
          "tw-prose dark:tw-prose-invert tw-prose-sm sm:tw-prose-base lg:tw-prose-lg tw-max-w-none tw-m-5 focus:tw-outline-none prose-pre:tw-bg-[#282c34] prose-pre:tw-text-[#abb2bf]",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className="w-full relative">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
