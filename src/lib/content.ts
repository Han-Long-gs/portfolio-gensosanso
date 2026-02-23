// this file fetches the content and its metadata from the content folder to be displayed in the window

import { WindowType, Language } from "../state/types";
import matter from 'gray-matter';
import fs from "fs";
import path from "path";

export type ContentDetail = {
    slug: string;
    title: string;
    date: string;
    readTimeMinutes: number;
    content: string;
}

export type ContentMap = {
    [language in Language]: {
        [window in Exclude<WindowType, null>]: ContentDetail[]
    };
}

export function fetchAllContent(): ContentMap {
    const contentDir = path.join(process.cwd(), "content");

    const contentMap: ContentMap = {
        en: {
            aboutMe: [],
            projects: [],
            wormDiary: [],
            music: [],
        },
        zh: {
            aboutMe: [],
            projects: [],
            wormDiary: [],
            music: [],
        },
    };

    for (const language of Object.keys(contentMap) as Language[]) {
        for (const windowType of Object.keys(contentMap[language]) as Exclude<WindowType, null>[]) {
            const dir = path.join(contentDir, windowType);
            const files = fs.readdirSync(dir).filter((file) => file.endsWith(`.${language}.md`));

            contentMap[language][windowType] = files.map((file) => {
                const filePath = path.join(dir, file);
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const { data, content } = matter(fileContent);

                return {
                    slug: file.split(".")[0].replace(/^\d+-/, ""),
                    title: data.title || "Untitled",
                    date: data.date || "Unknown date",
                    readTimeMinutes: data.readTimeMinutes || 0,
                    content: content,
                };
            });
        }
    }

    return contentMap;
}