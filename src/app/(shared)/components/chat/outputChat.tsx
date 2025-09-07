import { ModelInfo } from "@/app/types/model";
import { Loader2 } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface OutputChatProps {
  selectedModel: ModelInfo;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  isLoading: boolean;
}

export default function OutputChat({
  selectedModel,
  messages,
  isLoading,
}: OutputChatProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Messages - No background, full width */}
      <div className="flex-1 space-y-4 px-4 py-4 overflow-y-auto">
        {messages.length === 0 ? (
          // <div className="flex-1 flex items-center justify-center">
          //   <p className="text-center text-[var(--text-secondary)] text-sm">
          //     No messages yet. Start the conversation!
          //   </p>
          // </div>
          <></>
        ) : (
          messages.map(
            (
              msg: { role: "user" | "assistant"; content: string },
              idx: number
            ) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                    msg.role === "user"
                      ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                      : "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                  }`}>
                  <MarkdownRenderer content={msg.content} />
                </div>
              </div>
            )
          )
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-start items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              Thinking...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
