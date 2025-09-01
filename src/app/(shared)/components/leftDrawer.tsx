import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { ReactNode } from "react";

type NavItem = {
  label: string;
  icon: string;
  path?: string;
  children?: ReactNode;
};

type MenuList = {
  title: string;
  items: NavItem[];
};

const bottomNavItems: NavItem[] = [
  { label: "Home", icon: "jam:home", path: "/chat" },
  { label: "Question", icon: "mingcute:question-line" },
  {
    label: "Setting",
    icon: "tabler:settings",
    path: "/setting",
  },
  { label: "Theme", icon: "jam:brightness-down-f" },
];

const menuList: MenuList[] = [
  {
    title: "first",
    items: [
      { label: "Chat", icon: "jam:message-writing", path: "/chat" },
      { label: "Image", icon: "uil:image-v", path: "/image" },
      { label: "Video", icon: "proicons:video", path: "/video" },
      {
        label: "Audio",
        icon: "mingcute:voice-line",
        path: "/audio",
      },
    ],
  },
  {
    title: "second",
    items: [
      { label: "Memo", icon: "jam:document", path: "/memo" },
      { label: "More", icon: "gridicons:add" },
    ],
  },
];

export const LeftDrawer = () => {
  const drawerRef = React.useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const handleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        ref={drawerRef}
        className={`
          fixed inset-y-0 start-0 z-[39] 
          ${isOpen ? "w-[180px]" : "w-[60px]"} 
          overflow-y-auto shadow-xl transition-all duration-300 ease-in-out 
          bg-gray-50 pl-2 pt-4 pr-2
        `}>
        {/* Header */}
        <div className="fixed flex flex-col items-center gap-2 pl-2">
          <div
            className={`flex ${
              isOpen ? "flex-row" : "flex-col-reverse"
            } items-center gap-2`}>
            <div
              className={`text-[20px] font-bold pr-1 ${
                isOpen ? "block" : "hidden"
              }`}>
              Monica
            </div>
            <button className="cursor-pointer p-1 bg-gray-300 rounded-full">
              <Icon
                icon="jam:user"
                className="w-4 h-4"
              />
            </button>
            <button
              className="cursor-pointer bg-gray-300 p-1 rounded-full"
              onClick={handleDrawer}>
              <Icon
                icon={isOpen ? "jam:log-out" : "jam:log-in"}
                className="w-3 h-3"
              />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`flex flex-col ${isOpen ? "pt-10" : "pt-16"}`}>
          {menuList.map((menu, idx) => (
            <div key={idx}>
              {idx > 0 && <div className="my-2 border-t border-gray-300" />}
              <div className="flex flex-col gap-2">
                {menu.items.map((item, subIdx) => (
                  <a
                    key={subIdx}
                    href={item.path}
                    className={`flex rounded-md hover:bg-gray-200 transition-colors ${
                      isOpen
                        ? "flex-row items-center gap-4 p-2"
                        : "flex-col items-center justify-center p-2"
                    }`}>
                    <Icon
                      icon={item.icon}
                      className="w-5 h-5"
                    />
                    <span
                      className={`transition-all ${
                        isOpen
                          ? "text-md font-semibold opacity-100"
                          : "text-xs pt-2"
                      }`}>
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div
          className={`
            fixed bottom-0 left-0 z-50
            flex justify-around items-center
            shadow-md h-auto
            ${
              isOpen
                ? "w-[180px] flex-row h-14"
                : "w-[60px] flex-col h-auto py-2"
            }
          `}>
          {bottomNavItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path ?? ""}
              className={`flex ${
                isOpen ? "flex-col" : "flex-col"
              } items-center justify-center text-sm text-gray-600 hover:text-black transition-colors py-2`}>
              <Icon
                icon={item.icon}
                width={22}
                height={22}
              />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
