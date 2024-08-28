"use client";

import { cn } from "@/lib/utils";
import PlaceHolder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CircleDashed, Send } from "lucide-react";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import useMessageCreate from "../hooks/useMessageCreate";
import MessageEditorMenubar from "./message-editor-menu-bar";
import useMessageUpdate from "../hooks/useMessageUpdate";

type MessageEditorProps = {
  channelId: string;
  workspaceId: string;
  messageId?: string;
  type: "create" | "edit";
  initialContent?: string;
  onUpdateSuccess?: () => void;
};

const MessageEditor: FC<MessageEditorProps> = ({
  channelId,
  workspaceId,
  messageId,
  initialContent,
  type,
  onUpdateSuccess,
}) => {
  const { addMessage, submitting } = useMessageCreate({
    channelId,
    workspaceId,
  });

  const { updateMessage, submitting: updating } = useMessageUpdate({
    channelId,
    workspaceId,
    messageId,
    onUpdateSuccess,
  });

  const [content, setContent] = useState(initialContent ?? "");

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #`,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const handleSend = useCallback(async () => {
    if (content.length < 2) return;

    try {
      if (type === "create") {
        await addMessage(content);
        editor?.commands.setContent("");
      } else await updateMessage(content);
    } catch (error) {
      console.log(error);
    }
  }, [addMessage, content, editor?.commands, updateMessage, type]);

  const isDisabledEditor = useMemo(() => {
    return content.length < 2 || updating || submitting;
  }, [content, updating, submitting]);

  const Wrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (type === "create")
        return (
          <section className="sticky bottom-[-10px] bg-white px-[20px] pb-[10px]">
            {children}
          </section>
        );

      return <div className="pr-[10px]">{children}</div>;
    },
    [type]
  );

  return (
    <Wrapper>
      <div className="relative border border-[#dfdfdf] rounded-md overflow-hidden bg-white">
        <div className="sticky top-0 z-10">
          {editor && <MessageEditorMenubar editor={editor} />}
        </div>
        <div className="pt-[38px] flex w-full grow-1 px-[10px] max-h-[200px] min-h-[40px]">
          <EditorContent
            className="w-full h-auto min-h-[38px] overflow-y-auto whitespace-pre-wrap"
            editor={editor}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={isDisabledEditor}
          className={cn(
            "absolute bottom-1 right-1 cursor-pointer w-[28px] h-[28px] rounded-[6px] flex justify-center items-center",
            isDisabledEditor
              ? "bg-[#dfdfdf] opacity-50"
              : "bg-white text-purple-600"
          )}
        >
          {submitting || updating ? (
            <CircleDashed size={15} className="animate-spin" />
          ) : (
            <Send size={15} />
          )}
        </button>
      </div>
    </Wrapper>
  );
};

export default MessageEditor;
