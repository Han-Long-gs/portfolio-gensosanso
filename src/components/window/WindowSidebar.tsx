"use client";

import { Fragment } from "react";

// this is a window component exclusively for the desktop version
export function WindowSidebar({ items, selectedSlug, setSelectedSlug }: { items: { slug: string, title: string }[], selectedSlug: string, setSelectedSlug: (slug: string) => void }) {
    // note: items is an array of objects with slug and title properties; e.g. [{ slug: "project1", title: "Project 1" }, { slug: "project2", title: "Project 2" }]

    return (
        <div className="flex flex-col w-48 h-full overflow-y-auto p-3 border-darkgreen border-2">
            {items.map((item) => (
                <Fragment key={item.slug}>
                    {/* note: now my use case is only to display less than 6 items in the sidebar, so I can afford to show the full title and use line-clamp-2 to limit it to 2 lines */}
                    <button title={item.title} className={`group w-full overflow-hidden p-3 text-left text-xs font-bold cursor-pointer ${selectedSlug === item.slug ? "bg-darkgreen text-white" : "hover:bg-lightgreen/30"}`} onClick={() => setSelectedSlug(item.slug)}>
                    <span className="flex items-start">
                        {selectedSlug !== item.slug && <span className="hidden group-hover:inline shrink-0 mr-1 text-darkgreen">▶</span>}
                        <span className="line-clamp-2">{item.title}</span>
                    </span>
                    </button>
                    <hr className="border-t border-black border-dashed my-1"></hr>
                </Fragment>
            ))}
        </div>
    )
}