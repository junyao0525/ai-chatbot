"use client";
import { useDrawer } from "@/app/(shared)/providers/drawerProvider";
import { DEFAULT_MODEL, getModelById } from "@/app/types/model";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useChat() {
  const router = useRouter();
  const params = useParams();
  const { isOpen } = useDrawer();

  // Get model ID from URL params
  const urlModelId = params?.modelId as string;

  const [currentModelId, setCurrentModelId] = useState<string | null>(
    urlModelId || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Sync with URL changes
  useEffect(() => {
    if (urlModelId && urlModelId !== currentModelId) {
      setCurrentModelId(urlModelId);
    }
  }, [urlModelId, currentModelId]);

  const navigateToModel = useCallback(
    async (modelId?: string) => {
      const id = modelId ?? currentModelId;
      if (!id) {
        setError(new Error("No model id provided"));
        return;
      }

      // Don't navigate if already on the same model
      if (id === urlModelId) {
        return;
      }

      setLoading(true);
      setError(null);
      try {
        await router.push(`/chats/${encodeURIComponent(id)}`);
        setCurrentModelId(id);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [router, currentModelId, urlModelId]
  );

  const setModel = useCallback((id: string) => {
    setCurrentModelId(id);
  }, []);

  // Get current model info
  const getCurrentModel = useCallback(() => {
    return currentModelId ? getModelById(currentModelId) : DEFAULT_MODEL;
  }, [currentModelId]);

  // sendMessage / other chat helpers could go here
  const sendMessage = useCallback(async (text: string) => {
    // implement API call or local state update
  }, []);

  return {
    currentModelId,
    currentModel: getCurrentModel(),
    setModel,
    navigateToModel,
    sendMessage,
    loading,
    error,
    isOpen,
  };
}
