"use client";

import { WindowDropdown } from "./WindowDropdown";

export function WindowHeader({ header, isMobileVersion, items, selectedSlug, setSelectedSlug, onClose }: { header: string, isMobileVersion: boolean, items: { slug: string, title: string }[], selectedSlug: string, setSelectedSlug: (slug: string) => void, onClose: () => void }) {
    return (
        <div className="flex justify-between items-center border-darkgreen border-2 p-1">
            <p className="text-sm text-darkgreen font-bold">▲ {header}</p>
            {/* TODO: retro tooltip near close button — triggered when user clicks the overlay while this window is open
                - show a nostalgic speech-bubble/textbox style popup pointing to the close button
                - text: e.g. "To return to desktop, click ✕"
                - needs an `overlayClicked` signal passed down from Window (or via a state flag)
                - auto-dismiss after a few seconds or on close button click */}
            <div className="flex flex-1 justify-end items-center gap-1">
                {isMobileVersion && <WindowDropdown items={items} selectedSlug={selectedSlug} setSelectedSlug={setSelectedSlug} />}
                <button className="flex items-center justify-center w-6 h-6 close-btn-base hover:bg-purplegrey" onClick={onClose}>✕</button>
            </div>
        </div>
    )
}