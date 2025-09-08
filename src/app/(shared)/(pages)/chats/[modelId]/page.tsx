"use client";

// Imports - Components
import { Default } from "@/app/(shared)/components/chat/default";
import { Input } from "@/app/(shared)/components/chat/input/input";
import OutputChat from "@/app/(shared)/components/chat/outputChat";
import { HistoryDrawer } from "@/app/(shared)/components/historyDrawer";

// Imports - Providers & Hooks
import { useDrawer } from "@/app/(shared)/providers/drawerProvider";
import useChat from "../../../hooks/useChat";

// Imports - Models
import { DEFAULT_MODEL, MODELS, getModelById } from "@/app/types/model";

// Imports - Layout & Utils
import FileDropzone from "@/app/(shared)/components/fileDropzone";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { default as DefaultLayout } from "../../layouts/default";

export default function ChatModel() {
  /** ----------------------------
   * Hooks & State
   * ---------------------------- */
  const params = useParams();
  const router = useRouter();
  const { navigateToModel, currentModel } = useChat();
  const { isOpen, isSecondaryOpen } = useDrawer();

  // Get model info from URL parameter (fallback to default)
  const modelId = params.modelId as string;
  const selectedModel = getModelById(modelId) ?? DEFAULT_MODEL;

  // Messages state (seeded with initial conversation)
  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "assistant";
      content: string;
    }>
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // inside ChatModel component
  const handleFiles = (files: File[]) => {
    // Allow multiple images only; dedupe by name+size+mtime
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    setAttachedFiles((prev) => {
      const existingKeys = new Set(
        prev.map((f) => f.name + f.size + f.lastModified)
      );
      const toAdd = imageFiles.filter(
        (f) => !existingKeys.has(f.name + f.size + f.lastModified)
      );
      return [...prev, ...toAdd];
    });
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Previews are rendered inside the Input component

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isLoading) return;

      // Add user message immediately for instant feedback
      const userMessage = { role: "user" as const, content: message };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch("/apis/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const assistantText = data?.output ?? data?.message ?? "";
        const aiMessage = {
          role: "assistant" as const,
          content: assistantText || "",
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error sending message:", error);

        const errorMessage = {
          role: "assistant" as const,
          content: "Sorry, I encountered an error. Please try again.",
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  console.log(messages);

  const mainMargin = isSecondaryOpen ? "ml-[240px]" : "ml-[180px]";
  const inputLeftClass = isOpen
    ? isSecondaryOpen
      ? "left-[420px]"
      : "left-[360px]"
    : isSecondaryOpen
    ? "left-[300px]"
    : "left-[180px]";

  return (
    <DefaultLayout
      title={`${selectedModel?.name || "Chat"} | Monica`}
      description="Chat dashboard for Monica AI">
      <HistoryDrawer />

      <div
        className={`flex-1 ${
          isOpen ? "ml-[180px]" : isSecondaryOpen ? "ml-[60px]" : ""
        }`}>
        <div className={`flex flex-col min-h-screen ${mainMargin} relative`}>
          {/* Show messages for any model when they exist */}

          {messages.length > 0 ? (
            <>
              <div className="flex flex-row gap-2 items-center pt-6 px-[40px]">
                <Icon
                  icon="material-symbols:arrow-back"
                  className="w-6 h-6 text-[var(--text-primary)] cursor-pointer"
                  onClick={() => router.push("/chats")}
                />
                <span className="text-[var(--text-primary)] text-sm font-semibold">
                  {selectedModel.name}
                </span>
              </div>

              <div className="flex-1 flex flex-col px-[40px] pb-[200px]">
                <OutputChat
                  selectedModel={selectedModel}
                  messages={messages}
                  isLoading={isLoading}
                />
              </div>
            </>
          ) : (
            /* Show landing page or model info when no messages */
            <>
              {/* Default model landing */}
              {selectedModel === DEFAULT_MODEL ? (
                <div className="px-[40px]">
                  <Default />
                </div>
              ) : (
                /* Non-default model info */
                <>
                  {/* Header for non-default model */}
                  <div className="flex flex-row gap-2 items-center pt-6 px-[40px]">
                    <Icon
                      icon="material-symbols:arrow-back"
                      className="w-6 h-6 text-[var(--text-primary)] cursor-pointer"
                      onClick={() => router.push("/chats")}
                    />
                    <span className="text-[var(--text-primary)] text-sm font-semibold">
                      {selectedModel.name}
                    </span>
                  </div>
                  {/* Model info display */}
                  <div className="flex-grow flex items-center justify-center px-[40px] py-4">
                    <div className="flex flex-col justify-center items-center space-y-4 py-4">
                      <img
                        src={selectedModel.logo}
                        alt={selectedModel.name}
                        className="w-10 h-10 rounded"
                      />
                      <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                        {selectedModel.name}
                      </h1>
                      <p className="text-sm text-center text-[var(--text-secondary)]">
                        {selectedModel.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Image previews are rendered inside Input (below model selection) */}

          <FileDropzone onFiles={handleFiles} />
          <Input
            modelList={MODELS}
            handlerDrawer={navigateToModel}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            imageAttachments={attachedFiles}
            onRemoveAttachment={removeAttachedFile}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
