// this file defines the global state types and UIActions for the application
export type Language = "en" | "zh";
export type WindowType = "aboutMe" | "projects" | "wormDiary" | "music" | null;
export type IconType = "aboutMe" | "projects" | "wormDiary" | "music" | null;
export type StartMenuOpened = boolean;

export type UIState = {
    language: Language;
    activeWindow: WindowType;
    activeSlug: string; // the article shown in the active window; "about" is the default page of each window
    selectedIcon: IconType;
    startMenuOpened: StartMenuOpened;
}

export type UIActions = {
    setLanguage: (language: Language) => void;

    selectIcon: (icon: IconType) => void;
    deselectIcon: () => void;
    openWindow: (view: Exclude<WindowType, null>) => void;
    closeWindow: () => void;
    selectSlug: (slug: string) => void;

    toggleStartMenu: () => void;
    closeStartMenu: () => void;
}
