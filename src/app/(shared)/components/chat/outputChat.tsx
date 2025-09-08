import { ModelInfo } from "@/app/types/model";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ReasoningPartView } from "./reasonningPart";

interface OutputChatProps {
  selectedModel: ModelInfo;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    reasoningParts?: Array<any>;
    isComplete?: boolean;
  }>;
  isLoading: boolean;
}

export default function OutputChat({
  selectedModel,
  messages,
  isLoading,
}: OutputChatProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [renderedMessages, setRenderedMessages] = useState<string[]>([]);

  // Show messages one by one
  useEffect(() => {
    if (messages.length > visibleCount) {
      setRenderedMessages((prev) => [...prev, ""]); // prepare slot
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 300); // delay between messages
      return () => clearTimeout(timer);
    }
  }, [messages, visibleCount]);

  // Handle typewriter effect for assistant only
  useEffect(() => {
    if (visibleCount === 0) return;

    const currentIndex = visibleCount - 1;
    const msg = messages[currentIndex];

    if (msg.role === "user") {
      // Instantly render user messages
      setRenderedMessages((prev) => {
        const updated = [...prev];
        updated[currentIndex] = msg.content;
        return updated;
      });
      return;
    }

    // Typewriter effect for assistant
    const words = msg.content.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      setRenderedMessages((prev) => {
        const updated = [...prev];
        updated[currentIndex] = words.slice(0, i + 1).join(" ");
        return updated;
      });
      i++;
      if (i >= words.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [visibleCount, messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-4 pb-4 overflow-y-auto">
        {renderedMessages.map((content, idx) => {
          const msg = messages[idx];
          return (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`px-4 rounded-2xl max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                    : "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                }`}>
                <MarkdownRenderer content={content} />

                {msg.reasoningParts?.map((part, i) => {
                  const sectionKey = `${idx}-${i}`;
                  return (
                    <div
                      className="mt-3"
                      key={sectionKey}>
                      <ReasoningPartView
                        part={part}
                        sectionKey={sectionKey}
                        isComplete={Boolean(msg.isComplete ?? true)}
                        duration={null}
                        parallelTool={null}
                        isExpanded={false}
                        isFullscreen={false}
                        setIsExpanded={() => {}}
                        setIsFullscreen={() => {}}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

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
