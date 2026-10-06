"use client";

import { createContext, Suspense, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { Language, WindowType, IconType, UIActions, UIState } from "./types";
import { buildUrl, DEFAULT_SLUG, pathSegmentsToState } from "../lib/routes";

// activeWindow, activeSlug and language live in the url (so links can be shared); only the pure UI state below lives in useState
type LocalState = Pick<UIState, "selectedIcon" | "startMenuOpened">;

// default state: no icon selected; start menu closed (See Figma Frame: Homepage_Default for UI reference)
const defaultState: LocalState = {
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

// reads ?lang= from the url and reports it up to AppProvider
// this is a separate component because useSearchParams needs a Suspense boundary in a statically generated page; keeping it small means only this component (which renders nothing) skips the server render, not the whole app
// trade-off: the pre-rendered html is always english, so a ?lang=zh link shows english for a moment before switching
function LanguageParamReader({ onLanguageChange }: { onLanguageChange: (language: Language) => void }) {
    const searchParams = useSearchParams();
    const language: Language = searchParams.get("lang") === "zh" ? "zh" : "en";

    useEffect(() => {
        onLanguageChange(language);
    }, [language, onLanguageChange]);

    return null;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<LocalState>(defaultState);
    const [language, setLanguageFromUrl] = useState<Language>("en");

    // the url is the source of truth for which window and article are open; e.g. /projects/portfolio -> projects window, portfolio article
    const pathname = usePathname();
    const { activeWindow, activeSlug } = pathSegmentsToState(pathname.split("/").filter(Boolean));

    // pushState changes the url without reloading the page; Next.js picks it up so usePathname / useSearchParams update and the app re-renders
    // every change gets its own history entry, so the browser back button steps back through what the visitor did
    function navigate(view: WindowType, slug: string, lang: Language) {
        const url = buildUrl(view, slug, lang);
        // skip if nothing changed, e.g. clicking the article that is already open, so we don't add duplicate history entries
        if (url === location.pathname + location.search) {
            return;
        }
        history.pushState(null, "", url);
    }

    const setLanguage = (language: Language) => {
        navigate(activeWindow, activeSlug, language);
    };

    // prev is the current state before the update
    const selectIcon = (icon: IconType) => {
        setState((prev) => ({ ...prev, selectedIcon: icon }));
    };

    const deselectIcon = () => {
        setState((prev) => ({ ...prev, selectedIcon: null }));
    };

    // opening a window always starts on its default "about" page
    const openWindow = (view: Exclude<WindowType, null>) => {
        navigate(view, DEFAULT_SLUG, language);
    };

    // when the window is closed, we also want to deselect the icon associated with the window
    const closeWindow = () => {
        navigate(null, DEFAULT_SLUG, language);
        setState((prev) => ({ ...prev, selectedIcon: null }));
    };

    // for the scenario where user clicks a different article in the sidebar / dropdown of the active window
    const selectSlug = (slug: string) => {
        navigate(activeWindow, slug, language);
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
        <AppContext.Provider value={{ ...state, language, activeWindow, activeSlug, setLanguage, selectIcon, deselectIcon, openWindow, closeWindow, selectSlug, toggleStartMenu, closeStartMenu }}>
            <Suspense fallback={null}>
                <LanguageParamReader onLanguageChange={setLanguageFromUrl} />
            </Suspense>
            {children}
        </AppContext.Provider>
    );
}
