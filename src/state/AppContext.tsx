"use client";

import { createContext, useContext, useState } from "react";
import type { Language, WindowType, IconType, StartMenuOpened, UIActions, UIState } from "./types";

// default state: desktop view with English language and start menu closed; no icon selected; no window open (See Figma Frame: Homepage_Default for UI reference)
const defaultState: UIState = {
    language: "en",
    activeWindow: null,
    selectedIcon: null,
    startMenuOpened: false,
};

type UIStore = (UIState & UIActions) | undefined;

const AppContext = createContext<UIStore>(undefined);

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<UIState>(defaultState);

    // prev is the current state before the update
    const setLanguage = (language: Language) => {
        setState((prev) => ({ ...prev, language }));
    };

    const selectIcon = (icon: IconType) => {
        setState((prev) => ({ ...prev, selectedIcon: icon }));
    };

    const deselectIcon = () => {
        setState((prev) => ({ ...prev, selectedIcon: null }));
    };

    const openWindow = (view: Exclude<WindowType, null>) => {
        setState((prev) => ({ ...prev, activeWindow: view }));
    };

    // when the window is closed, we also want to deselect the icon associated with the window
    const closeWindow = () => {
        setState((prev) => ({ ...prev, activeWindow: null, selectedIcon: null }));
    };

    // for the scenario where user clicks the start menu button to open the start menu, then clicks the button again to close it; or clicks outside the start menu to close it
    const toggleStartMenu = () => {
        setState((prev) => ({ ...prev, startMenuOpened: !prev.startMenuOpened }));
    };

    // for the scenario where user clicks the desktop area to close the start menu if it's open
    const closeStartMenu = () => {
        setState((prev) => ({ ...prev, startMenuOpened: false }));
    };

    return (
        <AppContext.Provider value={{ ...state, setLanguage, selectIcon, deselectIcon, openWindow, closeWindow, toggleStartMenu, closeStartMenu }}>
            {children}
        </AppContext.Provider>
    );
}