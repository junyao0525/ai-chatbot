// chats/page.tsx
"use client";

import { MODELS } from "@/app/types/model";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Chats() {
  const router = useRouter();

  useEffect(() => {
    const firstModelId = MODELS[0]?.id;
    if (firstModelId) {
      router.push(`/chats/${firstModelId}`);
    }
  }, [router]);
}
