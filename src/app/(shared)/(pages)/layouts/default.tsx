"use client";
import { LeftDrawer } from "@/components/leftDrawer";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useDrawer } from "../../providers/drawerProvider";

type DefaultLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function DefaultLayout({
  children,
  title = "Monica | Dashboard",
  description = "Default layout for Monica application",
}: DefaultLayoutProps) {
  const { isOpen, isSecondaryOpen } = useDrawer();

  useEffect(() => {
    if (title) {
      document.title = `${title}`;
    }
  }, [title]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex min-h-screen overflow-hidden">
        <LeftDrawer />
        {children}
      </div>
    </>
  );
}
