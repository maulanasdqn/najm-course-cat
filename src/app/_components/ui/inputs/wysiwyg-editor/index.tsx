import { ReactElement } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import clsx from "clsx";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Image as ImageIcon,
} from "lucide-react";
import "./index.css"; // Import the new CSS file

// Add TypeScript interface for editor props
interface WysiwygEditorProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  className?: string;
}

export const WysiwygEditor = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  className = "",
}: WysiwygEditorProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, rules });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "wysiwyg-image",
        },
      }),
      Underline,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: clsx(
          "w-full p-3 font-medium transition-colors focus:outline-none text-sm",
          "bg-white",
          {
            "mt-1": !label,
            "border-red-500 bg-red-50": error?.message,
          },
        ),
      },
    },
  });

  const handleAddImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return <></>;
  }

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && <label className="text-gray-600 text-xs font-medium">{label}</label>}

      <div className="border border-gray-300 focus-within:border-gray-400 rounded-lg overflow-hidden transition-colors">
        <div className="toolbar flex items-center space-x-2 p-1 bg-gray-50 border-b border-gray-200">
          <button
            className={clsx(
              "p-1.5 rounded transition-colors",
              editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200",
            )}
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
            type="button"
          >
            <BoldIcon className="w-4 h-4" />
          </button>
          <button
            className={clsx(
              "p-1.5 rounded transition-colors",
              editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200",
            )}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
            type="button"
          >
            <ItalicIcon className="w-4 h-4" />
          </button>
          <button
            className={clsx(
              "p-1.5 rounded transition-colors",
              editor.isActive("underline") ? "bg-gray-300" : "hover:bg-gray-200",
            )}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            aria-label="Underline"
            type="button"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <span className="h-4 w-px bg-gray-300 mx-1" />
          <button
            className={clsx(
              "p-1.5 rounded transition-colors",
              editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200",
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet List"
            type="button"
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <button
            className={clsx(
              "p-1.5 rounded transition-colors",
              editor.isActive("orderedList") ? "bg-gray-300" : "hover:bg-gray-200",
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Numbered List"
            type="button"
          >
            <ListOrderedIcon className="w-4 h-4" />
          </button>
          <span className="h-4 w-px bg-gray-300 mx-1" />
          <button
            className={clsx(
              "p-1.5 rounded transition-colors",
              editor.isActive("image") ? "bg-gray-300" : "hover:bg-gray-200",
            )}
            onClick={handleAddImage}
            aria-label="Add Image"
            type="button"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        <EditorContent editor={editor} className="wysiwyg-editor" />
        {error && <span className="text-red-500 text-xs">{error.message}</span>}
      </div>
    </div>
  );
};
