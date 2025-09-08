// components/chat/input/Input.tsx
"use client";

import { useDrawer } from "@/app/(shared)/providers/drawerProvider";
import { ModelInfo, MODELS } from "@/app/types/model";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import useChat from "../../../hooks/useChat";
import RightDrawer from "../../rightDrawer";

export interface ActionButton {
  id: string;
  icon: string; // Iconify icon name
  onClick: () => void;
  tooltip?: string; // Optional tooltip text
}

// Default dynamic buttons
const defaultActions: ActionButton[] = [
  {
    id: "Voice",
    icon: "material-symbols:mic-outline",
    onClick: () => console.log("mic clicked"),
    tooltip: "Voice Input",
  },
  {
    id: "send",
    icon: "material-symbols:send",
    onClick: () => console.log("Send clicked"),
    tooltip: "Send (Enter)",
  },
];

/* -------------------------------------------------------------------------- */
/*                               Subcomponents                               */
/* -------------------------------------------------------------------------- */

const ModelSelector = ({
  selectedModel,
  onClick,
  isOpen,
}: {
  selectedModel: ModelInfo;
  onClick: () => void;
  isOpen: boolean;
}) => (
  <button
    aria-label="Select Model"
    aria-expanded={isOpen}
    className="flex items-center justify-between px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-nav)] rounded-full mb-2 cursor-pointer text-white max-w-full"
    onClick={onClick}>
    <div className="flex items-center space-x-2 min-w-0">
      <img
        src={selectedModel.logo}
        alt={selectedModel.name}
        className="w-5 h-5 rounded flex-shrink-0"
      />
      <span className="truncate max-w-[160px] text-sm text-[var(--text-primary)]">
        {selectedModel?.name || "Select Model"}
      </span>
    </div>
    <Icon
      icon={isOpen ? "icon-park-outline:up" : "icon-park-outline:down"}
      className="w-5 h-5 text-[var(--text-primary)]"
    />
  </button>
);

const ActionButtons = ({
  actions,
  onSend,
  canSend,
  isLoading,
}: {
  actions: ActionButton[];
  onSend: () => void;
  canSend: boolean;
  isLoading: boolean;
}) => (
  <div className="flex items-center space-x-2 ml-auto">
    {actions.map((action) => (
      <div
        key={action.id}
        className="relative group">
        <button
          aria-label={action.tooltip || action.id}
          onClick={action.id === "send" ? onSend : action.onClick}
          disabled={action.id === "send" ? !canSend || isLoading : false}
          className="p-1 hover:bg-[var(--bg-hover)] rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
          <Icon
            icon={action.icon}
            className="w-5 h-5"
          />
        </button>

        {action.tooltip && (
          <span className="absolute bottom-full mb-1 hidden group-hover:block whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
            {action.tooltip}
          </span>
        )}
      </div>
    ))}
  </div>
);

const ChatTextarea = ({
  value,
  onChange,
  onSend,
  isLoading,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask Me Question..."
        disabled={isLoading}
        className="w-full min-h-[60px] max-h-[120px] px-4 pt-2 rounded-t-lg bg-transparent text-white resize-none focus:outline-none disabled:opacity-50"
      />
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

const ModelDrawer = ({
  isOpen,
  onClose,
  modelList,
  selectedModel,
  onSelectModel,
}: {
  isOpen: boolean;
  onClose: () => void;
  modelList: ModelInfo[];
  selectedModel?: ModelInfo;
  onSelectModel?: (model: ModelInfo) => void;
}) => (
  <RightDrawer
    isOpen={isOpen}
    onClose={onClose}
    title="Model Selection">
    <div className="flex flex-col space-y-2 overflow-y-auto">
      {modelList.map((model) => (
        <button
          key={model.id}
          className={clsx(
            "flex items-center space-x-2 px-3 py-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-hover)]",
            selectedModel?.id === model.id
              ? "bg-[var(--bg-secondary)]"
              : "bg-[var(--bg-primary)]"
          )}
          onClick={() => {
            onSelectModel?.(model);
            onClose();
          }}>
          <Image
            src={model.logo}
            alt={model.name}
            className="rounded"
            width={24}
            height={24}
          />
          <span>{model.name}</span>
          {model.badge && (
            <span className="ml-auto text-xs bg-[var(--bg-secondary)] px-2 py-1 rounded-full">
              {model.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  </RightDrawer>
);
export const Input = ({
  modelList = MODELS,
  actions = defaultActions,
  handlerDrawer,
  onSendMessage,
  isLoading = false,
}: {
  modelList?: ModelInfo[];
  actions?: ActionButton[];
  handlerDrawer?: (modelId?: string) => void | Promise<void>;
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}) => {
  const { isOpen, isSecondaryOpen } = useDrawer();
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Use useChat hook to get current model and navigation function
  const { currentModel, navigateToModel } = useChat();

  // Use currentModel from useChat hook, fallback to first model in list
  const selectedModel = currentModel || modelList?.[0] || MODELS[0];

  const containerClass = clsx(
    "fixed bottom-0 right-0 bg-[var(--bg-primary)] px-10 pt-2",
    isOpen
      ? isSecondaryOpen
        ? "left-[420px]"
        : "left-[360px]"
      : isSecondaryOpen
      ? "left-[300px]"
      : "left-[180px]"
  );

  const handleSelectModel = (model: ModelInfo) => {
    // Use the navigateToModel from useChat hook
    try {
      navigateToModel(model.id);
    } catch (err) {
      console.error("navigateToModel error:", err);
    }

    // Also call the provided handlerDrawer if it exists
    try {
      handlerDrawer?.(model.id);
    } catch (err) {
      console.error("handlerDrawer error:", err);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() && !isLoading && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue(""); // Clear input after sending
    }
  };

  const canSend = inputValue.trim().length > 0 && !isLoading;

  return (
    <>
      <div className={containerClass}>
        <div className="flex flex-col max-w-full mx-auto rounded-lg h-[180px] items-center focus:outline-none focus:ring-1 focus:ring-white">
          {/* Model Selection */}
          <div className="flex flex-row bg-[var(--bg-primary)] h-10 w-full space-x-4">
            <ModelSelector
              selectedModel={selectedModel}
              onClick={() => setOpenDrawer(true)}
              isOpen={isOpenDrawer}
            />
          </div>

          {/* Chat Input Area */}
          <div className="flex flex-col w-full rounded-lg border border-[var(--border-nav)] bg-[var(--bg-primary)] focus-within:ring-1 focus-within:ring-white">
            <ChatTextarea
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />

            {/* Action Buttons */}
            <div className="flex flex-row items-center px-3 bg-[var(--bg-primary)] text-white rounded-b-lg">
              <ActionButtons
                actions={actions}
                onSend={handleSendMessage}
                canSend={canSend}
                isLoading={isLoading}
              />
            </div>

            {/* Footer Placeholder */}
            <div className="px-3 bg-[var(--bg-secondary)] text-white rounded-b-lg">
              name
            </div>
          </div>
        </div>
      </div>

      {/* Model Drawer */}
      <ModelDrawer
        isOpen={isOpenDrawer}
        onClose={() => setOpenDrawer(false)}
        modelList={modelList ?? MODELS}
        selectedModel={selectedModel}
        onSelectModel={(m) => handleSelectModel(m)}
      />
    </>
  );
};
