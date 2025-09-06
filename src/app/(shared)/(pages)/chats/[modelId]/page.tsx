"use client";
import { Input } from "@/app/(shared)/components/chat/input/input";
import { HistoryDrawer } from "@/app/(shared)/components/historyDrawer";
import { useDrawer } from "@/app/(shared)/providers/drawerProvider";
import { MODELS, getModelById } from "@/app/types/model";
import { useParams } from "next/navigation";
import useChat from "../../../hooks/useChat";
import { default as DefaultLayout } from "../../layouts/default";

export default function ChatModel() {
  const params = useParams();
  const modelId = params.modelId as string;
  const { navigateToModel, currentModel } = useChat();
  const { isOpen, isSecondaryOpen } = useDrawer();

  // Get model info from URL parameter
  const selectedModel = getModelById(modelId);

  // adjust main margin depending on whether secondary drawer is open
  const className = isSecondaryOpen ? "ml-[240px]" : "ml-[180px]";

  return (
    <DefaultLayout
      title={`${selectedModel?.name || "Chat"} | Monica`}
      description="Chat dashboard for Monica AI">
      <HistoryDrawer />
      <div
        className={`flex-1 pt-4 ${
          isOpen ? "ml-[180px]" : isSecondaryOpen ? "ml-[60px]" : ""
        }`}>
        <div className={`flex flex-col min-h-screen ${className} relative`}>
          <div className="flex-1 px-[40px]">
            {/* Model Info Display */}
            {selectedModel && (
              <div className="flex items-center space-x-3 py-4">
                <img
                  src={selectedModel.logo}
                  alt={selectedModel.name}
                  className="w-8 h-8 rounded"
                />
                <div>
                  <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                    {selectedModel.name}
                  </h1>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {selectedModel.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Input
            modelList={MODELS}
            handlerDrawer={navigateToModel}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
