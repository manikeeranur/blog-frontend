const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-slate-300 rounded-lg p-5 sticky top-3 left-0 right-0 bg-white z-10 flex gap-0.5 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`editor-btn font-black ${
          editor.isActive("heading", { level: 1 }) && "active-editor-btn"
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`editor-btn font-extrabold ${
          editor.isActive("heading", { level: 2 }) && "active-editor-btn"
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`editor-btn font-semibold ${
          editor.isActive("heading", { level: 3 }) && "active-editor-btn"
        }`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`editor-btn font-medium ${
          editor.isActive("heading", { level: 4 }) && "active-editor-btn"
        }`}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`editor-btn font-normal ${
          editor.isActive("heading", { level: 5 }) && "active-editor-btn"
        }`}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`editor-btn font-normal ${
          editor.isActive("heading", { level: 6 }) && "active-editor-btn"
        }`}
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`editor-btn ${
          editor.isActive("bold") && "active-editor-btn"
        }`}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`editor-btn ${
          editor.isActive("italic") && "active-editor-btn"
        }`}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`editor-btn ${
          editor.isActive("strike") && "active-editor-btn"
        }`}
      >
        S
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`editor-btn ${
          editor.isActive("code") && "active-editor-btn"
        }`}
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`editor-btn`}
      >
        clear
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={`editor-btn`}
      >
        close
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`editor-btn ${
          editor.isActive("paragraph") && "active-editor-btn"
        }`}
      >
        Para
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`editor-btn ${
          editor.isActive("bulletList") && "active-editor-btn"
        }`}
      >
        UL
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`editor-btn ${
          editor.isActive("orderedList") && "active-editor-btn"
        }`}
      >
        OL
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`editor-btn ${
          editor.isActive("codeBlock") && "active-editor-btn"
        }`}
      >
        Code Block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`editor-btn ${
          editor.isActive("blockquote") && "active-editor-btn"
        }`}
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`editor-btn`}
      >
        hr
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`editor-btn`}
      >
        AiOutlineEnter
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`editor-btn`}
      >
        AiOutlineUndo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`editor-btn`}
      >
        AiOutlineRedo
      </button>
    </div>
  );
};

export default MenuBar;
