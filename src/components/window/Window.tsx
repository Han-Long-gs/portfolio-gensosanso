"use client";

import { useAppContext } from "@/src/state/AppContext";
import { WindowContent } from "./WindowContent";
import { WindowHeader } from "./WindowHeader";
import { WindowSidebar } from "./WindowSidebar";
import { WindowType } from "@/src/state/types";
import { useEffect, useState } from "react";
import { useDict } from "@/src/i18n/useDict";
import { useContentContext } from "@/src/state/ContentContext";

const MIN_WIDTH = 768;
const MIN_HEIGHT = 500;

export function Window() {
    const dict = useDict();
    // activeSlug comes from the url (e.g. /projects/portfolio -> "portfolio"); when user clicks a different sidebar item, selectSlug updates the url
    const { language, activeWindow, activeSlug, selectSlug, closeWindow } = useAppContext();
    const contentMap = useContentContext();
    // default to desktop: with deep links this component is also rendered on the server, where `window` does not exist; the real value is measured in the effect below
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    useEffect(() => {
        const handler = () => {
            setIsDesktop(window.innerWidth >= MIN_WIDTH && window.innerHeight >= MIN_HEIGHT);
        }

        handler(); // measure once on mount
        window.addEventListener("resize", handler);

        return () => {
            window.removeEventListener("resize", handler);
        }
    }, []);

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

    function isDropdownEnabled(window: Exclude<WindowType, null>) {
        // on desktop version, we show the sidebar and hide the dropdown; on mobile version, we hide the sidebar and show the dropdown (if the window supports sidebar)
        return !isDesktop && isWindowSidebarEnabled(window);
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
                <WindowHeader header={dict.window.header[activeWindow]} isDropdownEnabled={isDropdownEnabled(activeWindow)} items={getSlugsAndTitles(activeWindow)} selectedSlug={activeSlug} setSelectedSlug={selectSlug} onClose={() => closeWindow()} />
                <div className="flex gap-2 w-full flex-1 min-h-0 mt-2 bg-lightgrey">
                    {/* note: the sidebar is fixed width and the content is flex-1 */}
                    {isDesktop && isWindowSidebarEnabled(activeWindow) && <WindowSidebar items={getSlugsAndTitles(activeWindow)} selectedSlug={activeSlug} setSelectedSlug={selectSlug} />}
                    <WindowContent contentDetail={getContentDetailBySlug(activeWindow, activeSlug)} />
                </div>
            </div>
        </div>
    )
}