import { ModelInfo } from "@/app/types/model";
import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize displayed messages
  useEffect(() => {
    setDisplayedMessages(messages.map((msg) => msg.content));
  }, [messages]);

  // Handle typewriter effect for assistant messages
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "assistant" || isLoading) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset the last message for typewriter effect
    setDisplayedMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = "";
      return updated;
    });

    setCurrentMessageIndex(messages.length - 1);

    // Typewriter effect word by word
    const words = lastMessage.content.split(" ");
    let wordIndex = 0;

    const typewriter = () => {
      if (isPaused) return;

      if (wordIndex < words.length) {
        setDisplayedMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = words.slice(0, wordIndex + 1).join(" ");
          return updated;
        });
        wordIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    intervalRef.current = setInterval(typewriter, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [messages, isLoading, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const isTyping =
    currentMessageIndex === messages.length - 1 &&
    messages[messages.length - 1]?.role === "assistant" &&
    displayedMessages[displayedMessages.length - 1] !==
      messages[messages.length - 1]?.content;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-4 px-4 py-4 pb-4 overflow-y-auto">
        {messages.map((msg, idx) => {
          // Use displayed content for typewriter effect
          const content = displayedMessages[idx] || msg.content;

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

        {isTyping && (
          <div className="flex justify-start items-center space-x-2">
            <button
              onClick={togglePause}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              title={isPaused ? "Resume typing" : "Pause typing"}>
              {isPaused ? (
                <Play className="w-4 h-4 text-[var(--text-secondary)]" />
              ) : (
                <Pause className="w-4 h-4 text-[var(--text-secondary)]" />
              )}
            </button>
            <span className="text-sm text-[var(--text-secondary)]">
              {isPaused ? "Paused" : "Typing..."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
