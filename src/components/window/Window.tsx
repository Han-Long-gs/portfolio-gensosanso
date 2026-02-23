"use client";

import { useAppContext } from "@/src/state/AppContext";
import { WindowContent } from "./WindowContent";
import { WindowHeader } from "./WindowHeader";
import { WindowSidebar } from "./WindowSidebar";
import { WindowType } from "@/src/state/types";
import { useState } from "react";
import { useDict } from "@/src/i18n/useDict";
import { useContentContext } from "@/src/state/ContentContext";

export function Window() {
    const dict = useDict();
    const { language, activeWindow, closeWindow } = useAppContext();
    const contentMap = useContentContext();
    const [selectedSlug, setSelectedSlug] = useState<string>("about"); // default to the about.md content when the window is first opened; when user clicks different sidebar item, update the selectedSlug accordingly

    if (activeWindow === null) {
        return null;
    }

    // sidebar config for each window; if the value is true, it means the sidebar should be rendered; if false, it means the sidebar should not be rendered
    const windowSidebarConfig = {
        aboutMe: false,
        projects: true,
        wormDiary: true,
        music: true,
    }

    function isWindowSidebarEnabled(window: Exclude<WindowType, null>) {
        return windowSidebarConfig[window];
    }

    function getSlugsAndTitles(window: Exclude<WindowType, null>) {
        if (!isWindowSidebarEnabled(window)) {
            return [];
        }
        return contentMap[language][window].map((content) => ({ slug: content.slug, title: content.title }));
    }

    function getContentDetailBySlug(window: Exclude<WindowType, null>, slug: string) {
        const contentDetail = contentMap[language][window].find((content) => content.slug === slug);
        return contentDetail || null;
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90vw] max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] h-[85vh] max-h-[760px] xl:max-h-[860px] 2xl:max-h-[960px] bg-grey border-darkgreen border-2">
            <div className="flex flex-col w-full h-full p-1">
                <WindowHeader header={dict.window.header[activeWindow]} onClose={() => closeWindow()} />
                <div className="flex gap-2 w-full flex-1 min-h-0 mt-2 bg-lightgrey">
                    {/* note: the sidebar is fixed width and the content is flex-1 */}
                    {isWindowSidebarEnabled(activeWindow) && <WindowSidebar items={getSlugsAndTitles(activeWindow)} selectedSlug={selectedSlug} setSelectedSlug={setSelectedSlug} />}
                    <WindowContent contentDetail={getContentDetailBySlug(activeWindow, selectedSlug)} />
                </div>
            </div>
        </div>
    )
}