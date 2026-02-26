"use client";

import { DesktopIcon } from "./DesktopIcon";
import { TaskBar } from "./TaskBar";
import { useDict } from "../../i18n/useDict";
import { useAppContext } from "@/src/state/AppContext";
import { IconType, WindowType } from "../../state/types"
import { Overlay } from "./Overlay";
import { Window } from "../window/Window";
import { ViewportWarning } from "./ViewportWarning";

export function DesktopShell() {
    const dict = useDict();
    const { selectedIcon, selectIcon, deselectIcon, activeWindow, openWindow, startMenuOpened, closeStartMenu } = useAppContext();

    function desktopIconClickHandler(icon: Exclude<IconType, null>) {
        // if there is currently a window opened, the desktop icon should be disabled
        if (activeWindow !== null) {
            return
        }

        // if there is no window opend, set the icon as selected on 1st click; open the window on 2nd click
        if (icon !== selectedIcon) {
            selectIcon(icon)
        } else {
            const correspondingWindow: WindowType = icon; // in this app, the window name is the same as the icon name
            openWindow(correspondingWindow)
        }
    }

    function desktopBackgroundClickHandler() {
        // when a window is open, the overlay blocks desktop clicks — this guard is a safety net
        if (activeWindow !== null) return;
        deselectIcon();
    }

    function overlayClickHandler() {
        // when the start menu is open, clicking the overlay should close the start menu; when a window is open, do nothing (the overlay is just to prevent user from clicking the desktop icons, but not to close the window)
        if (startMenuOpened) {
            closeStartMenu()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center overflow-auto min-h-screen bg-darkgreen">
            <div className="flex flex-col w-full h-screen">
                {/* Desktop Area — flex-1 so it ends exactly where TaskBar begins; relative so absolute children are bounded here */}
                <div className="flex-1 relative bg-black bg-cover bg-center" onClick={desktopBackgroundClickHandler}>
                    {/* Icons Container */}
                    {/* note icon has 100x100 fix size */}
                    <div className="flex flex-col max-w-[132px] p-4 gap-6" onClick={e => e.stopPropagation()}>
                        <DesktopIcon name={dict.desktop.icon.aboutMe} icon="/desktop-icons/file.png" onClick={() => desktopIconClickHandler("aboutMe")} isSelected={selectedIcon === "aboutMe"} />
                        <DesktopIcon name={dict.desktop.icon.projects} icon="/desktop-icons/folder.png" onClick={() => desktopIconClickHandler("projects")} isSelected={selectedIcon === "projects"} />
                        <DesktopIcon name={dict.desktop.icon.wormDiary} icon="/desktop-icons/worm-diary.png" onClick={() => desktopIconClickHandler("wormDiary")} isSelected={selectedIcon === "wormDiary"} />
                        <DesktopIcon name={dict.desktop.icon.music} icon="/desktop-icons/music.png" onClick={() => desktopIconClickHandler("music")} isSelected={selectedIcon === "music"} />
                    </div>
                    {/* Logo */}
                    <img src="/logo.png" alt="Logo" className="absolute bottom-4 right-4 w-[55%] h-auto" />
                    {activeWindow !== null && <Window />}
                    {/* to understand this expression: note start menu is z-40; window is z-20 */}
                    <Overlay zLevel={startMenuOpened ? 30 : activeWindow !== null ? 10 : -1} onClick={overlayClickHandler} />
                </div>
                <TaskBar />
            </div>
            {/* <ViewportWarning /> */}
        </div>
    );
}