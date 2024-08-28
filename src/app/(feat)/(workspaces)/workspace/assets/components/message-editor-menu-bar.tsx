import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
} from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { Typography } from "@/components/ui/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MessageEditorMenubar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center flex-wrap gap-2 absolute z-10 top-0 left-0 w-full p-2 h-[38px] border-b border-[#dfdfdf]">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "border-white" : "border-black"}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "border-white" : "border-black"}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "border-white" : "border-black"}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <Typography variant="h6" className="m-0 font-thin">
        {" "}
        |{" "}
      </Typography>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "border-white" : "border-black"
        }
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? "border-white" : "border-black"
        }
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <Typography variant="h6" className="m-0 font-thin">
        {" "}
        |{" "}
      </Typography>
      <Popover>
        <PopoverTrigger>
          <BsEmojiSmile size={14} />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Picker
            theme={"light"}
            data={data}
            onEmojiSelect={(emoji: any) =>
              editor.chain().focus().insertContent(emoji.native).run()
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MessageEditorMenubar;
