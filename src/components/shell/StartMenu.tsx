"use client";

import { useDict } from "../../i18n/useDict";
import { StartMenuItem } from "./StartMenuItem";

export function StartMenu() {
    const dict = useDict();

    return (
        <div className="absolute bottom-full left-4 w-[var(--startmenu-width)] z-40 bg-grey border border-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col p-2">
                <StartMenuItem icon="/list-icons/download-alt.png" label={dict.taskBar.startMenu.resumeDownload} href="/resume.pdf" download="Han-Long_Resume.pdf" />
                <hr className="border-t border-black border-dashed my-1"></hr>
                <StartMenuItem icon="/list-icons/linkedin.png" label={dict.taskBar.startMenu.linkedin} href="https://www.linkedin.com/in/han-long-98a650230/" />
                <hr className="border-t border-black border-dashed my-1"></hr>
                <StartMenuItem icon="/list-icons/github.png" label={dict.taskBar.startMenu.github} href="https://github.com/Han-Long-gs" />
                <hr className="border-t border-black my-1"></hr>
                <StartMenuItem icon="/list-icons/info-circle.png" label={dict.taskBar.startMenu.email} onClick={() => window.open("mailto:hanlong.gensosanso@gmail.com", "_blank")} />
            </div>
        </div>
    )
}