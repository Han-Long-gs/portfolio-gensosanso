"use client";

import { useAppContext } from "@/src/state/AppContext";
import { useDict } from "../../i18n/useDict";
import { StartMenu } from "./StartMenu";

export function TaskBar() {
    const dict = useDict();
    const { language, setLanguage, startMenuOpened, toggleStartMenu } = useAppContext();

    return (
        <div className="relative flex justify-between items-center bg-grey h-[var(--taskbar-height)] w-full">
            {/* Start Menu Button */}
            <button className={`ml-4 w-24 h-8 ${startMenuOpened ? "taskbar-btn-pressed" : "taskbar-btn-base"}`} onClick={toggleStartMenu}>
                {dict.taskBar.startMenuButton}
            </button>
            {startMenuOpened && <StartMenu />}
            {/* Language Toggle */}
            <div className="mr-4 flex justify-center items-center gap-2">
                <button className={`w-8 h-8 ${language === "zh" ? "taskbar-btn-pressed" : "taskbar-btn-base"}`} onClick={() => setLanguage("zh")}>
                    {dict.taskBar.languageToggle.chinese}
                </button>
                <button className={`w-8 h-8 ${language === "en" ? "taskbar-btn-pressed" : "taskbar-btn-base"}`} onClick={() => setLanguage("en")}>
                    {dict.taskBar.languageToggle.english}
                </button>
            </div>
        </div>
    );
}