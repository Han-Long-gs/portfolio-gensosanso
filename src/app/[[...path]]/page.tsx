// optional catch-all route: "/", "/projects" and "/projects/portfolio" all render this same page
// the page itself does not read the path — AppProvider derives the open window + article from the url on the client; this file only decides which urls exist and their link previews
import type { Metadata } from "next";
import { DesktopShell } from "../../components/shell/DesktopShell";
import { ContentMap, fetchAllContent } from "../../lib/content";
import { DEFAULT_SLUG, pathSegmentsToState, WINDOW_TO_SEGMENT } from "../../lib/routes";
import { ContentProvider } from "../../state/ContentContext";
import { WindowType } from "../../state/types";
import dict_en from "../../i18n/dict.en";

type PageProps = { params: Promise<{ path?: string[] }> };

// only the urls returned by generateStaticParams exist; anything else (e.g. /projects/nope, /about-me/anything) is a 404
export const dynamicParams = false;

// pre-render every valid url at build time: "/", one per window, one per article
// e.g. [], ["projects"], ["projects", "portfolio"], ["worm-diary", "bike-worm-one"], ...
export function generateStaticParams() {
    const contentMap = fetchAllContent();
    const params: { path: string[] }[] = [{ path: [] }];

    for (const window of Object.keys(WINDOW_TO_SEGMENT) as Exclude<WindowType, null>[]) {
        const segment = WINDOW_TO_SEGMENT[window];
        params.push({ path: [segment] });

        // slugs are the same in both languages, so the english list is enough; the "about" page is the window url itself, so it gets no slug url
        for (const content of contentMap.en[window]) {
            if (content.slug !== DEFAULT_SLUG) {
                params.push({ path: [segment, content.slug] });
            }
        }
    }

    return params;
}

// title for link previews (Slack, LinkedIn, iMessage...); the preview text is the title too; always english, because reading ?lang= here would stop the page from being static
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { path = [] } = await params;
    const { activeWindow, activeSlug } = pathSegmentsToState(path);

    // desktop with no window open: keep the defaults from layout.tsx
    if (activeWindow === null) {
        return {};
    }

    const contentDetail = fetchAllContent().en[activeWindow].find((content) => content.slug === activeSlug);
    // for the window's own url (e.g. /projects), use the window name instead of "About ..." page title
    const pageTitle = activeSlug === DEFAULT_SLUG ? dict_en.window.header[activeWindow] : contentDetail?.title;
    const title = `${pageTitle} · gensosanso`;
    const description = pageTitle;

    return {
        title,
        description,
        openGraph: { title, description },
    };
}

export default function Home() {
    const contentMap: ContentMap = fetchAllContent();
    return (
        <>
            <ContentProvider initialContent={contentMap}>
                <DesktopShell />
            </ContentProvider>
        </>
    );
}
