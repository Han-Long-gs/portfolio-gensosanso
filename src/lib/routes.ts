// this file translates between the url and the app state (window + slug + language), so a link like /projects/portfolio?lang=zh can be shared
// url shape: /{window}/{slug}?lang=zh — window is kebab-case in the url; slug is omitted for the default "about" page; lang is omitted for english

import type { Language, WindowType } from "../state/types";

export const DEFAULT_SLUG = "about";

// internal window name -> url segment
export const WINDOW_TO_SEGMENT: { [window in Exclude<WindowType, null>]: string } = {
    aboutMe: "about-me",
    projects: "projects",
    wormDiary: "worm-diary",
    music: "music",
};

// url segment -> internal window name; returns null if the segment is not a known window
export function segmentToWindow(segment: string): WindowType {
    const windows = Object.keys(WINDOW_TO_SEGMENT) as Exclude<WindowType, null>[];
    return windows.find((window) => WINDOW_TO_SEGMENT[window] === segment) ?? null;
}

// e.g. ["projects", "portfolio"] -> { activeWindow: "projects", activeSlug: "portfolio" }; [] -> desktop with no window open
export function pathSegmentsToState(segments: string[]): { activeWindow: WindowType; activeSlug: string } {
    const [windowSegment, slug] = segments;
    return {
        activeWindow: windowSegment ? segmentToWindow(windowSegment) : null,
        activeSlug: slug ?? DEFAULT_SLUG,
    };
}

// e.g. ("projects", "portfolio", "zh") -> "/projects/portfolio?lang=zh"; (null, ..., "en") -> "/"
export function buildUrl(window: WindowType, slug: string, language: Language): string {
    let path = "/";
    if (window !== null) {
        path += WINDOW_TO_SEGMENT[window];
        if (slug !== DEFAULT_SLUG) {
            path += `/${slug}`;
        }
    }
    return language === "zh" ? `${path}?lang=zh` : path;
}
