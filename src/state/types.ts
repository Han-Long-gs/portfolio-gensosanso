// this file defines the global state types and UIActions for the application
export type Language = "en" | "zh";
export type WindowType = "aboutMe" | "projects" | "wormDiary" | "music" | null;
export type IconType = "aboutMe" | "projects" | "wormDiary" | "music" | null;
export type StartMenuOpened = boolean;

export type UIState = {
    language: Language;
    activeWindow: WindowType;
    selectedIcon: IconType;
    startMenuOpened: StartMenuOpened;
}

export type UIActions = {
    setLanguage: (language: Language) => void;

    selectIcon: (icon: IconType) => void;
    deselectIcon: () => void;
    openWindow: (view: Exclude<WindowType, null>) => void;
    closeWindow: () => void;

    toggleStartMenu: () => void;
    closeStartMenu: () => void;
}
