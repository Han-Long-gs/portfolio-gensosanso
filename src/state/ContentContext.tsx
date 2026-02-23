"use client";

import { createContext, useContext } from "react";
import type { ContentMap } from "../lib/content";

type ContentStore = ContentMap | undefined;

const ContentContext = createContext<ContentStore>(undefined);

export function useContentContext() {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error("useContentContext must be used within a ContentProvider");
    }
    return context;
}

export function ContentProvider({ children, initialContent }: { children: React.ReactNode; initialContent: ContentMap }) {
    return (
        <ContentContext.Provider value={initialContent}>
            {children}
        </ContentContext.Provider>
    );
}
