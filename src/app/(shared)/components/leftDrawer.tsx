"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useTheme from "../hooks/useTheme";
import useDrawer from "../providers/drawerProvider";

type NavItem = {
  label: string;
  icon: string;
  path?: string;
};

type MenuList = {
  title: string;
  items: NavItem[];
};

const bottomNavItems: NavItem[] = [
  { label: "Home", icon: "jam:home", path: "/chats" },
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
      { label: "Chat", icon: "jam:message-writing", path: "/chats" },
      { label: "Image", icon: "uil:image-v", path: "/images" },
      { label: "Video", icon: "proicons:video", path: "/videos" },
      {
        label: "Audio",
        icon: "mingcute:voice-line",
        path: "/audios",
      },
    ],
  },
  {
    title: "second",
    items: [
      { label: "Memo", icon: "jam:document", path: "/memos" },
      { label: "More", icon: "gridicons:add" },
    ],
  },
];

export const LeftDrawer = () => {
  const drawerRef = useRef<HTMLElement>(null);
  const { isOpen, toggleDrawer, isActiveItem, setIsActiveItem } = useDrawer();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleBottomNavClick = (item: NavItem) => {
    switch (item.label) {
      case "Theme":
        toggleTheme();
        break;

      case "Home":
        router.push(item.path ?? "");
        break;
      case "Setting":
        router.push(item.path ?? "");
        break;
      case "Question":
        router.push(item.path ?? "");
        break;

      default:
        console.warn(`No action defined for: ${item.label}`);
    }
  };

  return (
    <>
      <nav
        ref={drawerRef}
        className={`
          fixed inset-y-0 start-0 z-[39]
          ${isOpen ? "w-[180px]" : "w-[60px]"}
          overflow-hidden shadow-xl transition-all duration-300 ease-in-out
          px-2 pt-4 bg-[var(--bg-secondary)]
        `}>
        {/* Header */}
        <div className="fixed flex flex-col items-center gap-2 pl-2">
          <div
            className={`flex ${
              isOpen ? "flex-row" : "flex-col-reverse"
            } items-center gap-2 justify-between`}>
            <div
              className={`text-[20px] font-bold pr-4 text-[var(--text-primary)] ${
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
              onClick={toggleDrawer}>
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
              {/* divider*/}
              {idx > 0 && (
                <div className="my-2 border-t border-[var(--border-light)] dark:border-[var(--border-dark)]" />
              )}
              <div className="flex flex-col gap-2">
                {menu.items.map((item, subIdx) => {
                  const isItemActive = isActiveItem === item.label;
                  return (
                    <button
                      key={subIdx}
                      onClick={() => {
                        setIsActiveItem(item.label);
                        router.push(item.path ?? "");
                      }}
                      className={`
                        flex rounded-md transition-colors cursor-pointer
                        ${
                          isOpen
                            ? "flex-row items-center gap-4 p-2"
                            : "flex-col items-center justify-center p-2"
                        }
                        ${
                          isItemActive
                            ? "bg-blue-100  dark:bg-blue-900 "
                            : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }
                       
                      `}>
                      <Icon
                        icon={item.icon}
                        className={`w-5 h-5 ${
                          isItemActive
                            ? "text-[var(--text-primary)] dark:text-[#f9fafb]"
                            : "dark:text-[var(--text-primary)] text-[#f9fafb]"
                        }`}
                      />
                      <span
                        className={`
                          transition-all
                          ${
                            isOpen
                              ? "text-md font-semibold opacity-100"
                              : "text-xs pt-2"
                          }
                          ${
                            isItemActive
                              ? "text-[var(--text-primary)] dark:text-[#f9fafb]"
                              : "dark:text-[var(--text-primary)] text-[#f9fafb]"
                          }
                        `}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div
          className={`
            fixed bottom-0 left-0 z-50
            flex justify-around items-center
            shadow-md h-auto transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "w-[180px] flex-row h-14 pb-2"
                : "w-[60px] flex-col h-auto "
            }
          `}>
          {/* Divider above bottom nav */}
          <div
            className={`absolute -top-10 left-2 right-2 border-t border-[var(--border-light)] dark:border-[var(--border-dark)]  ${
              isOpen ? "block" : "hidden"
            }`}
          />
          <div
            className={`
              fixed bottom-0 left-0 z-50
              flex justify-around items-center
              shadow-md h-auto pb-2 transition-all duration-300 ease-in-out
              ${
                isOpen
                  ? "w-[180px] flex-row h-14"
                  : "w-[60px] flex-col h-auto py-2"
              }
            `}>
            {bottomNavItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleBottomNavClick(item)}
                className="flex flex-col items-center justify-center text-sm py-2
                 text-[var(--text-primary)] cursor-pointer
                 ">
                <Icon
                  icon={
                    item.label === "Theme"
                      ? isDark
                        ? "jam:moon"
                        : "jam:sun"
                      : item.icon
                  }
                  width={22}
                  height={22}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
