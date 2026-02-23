"use client";

export function WindowHeader({ header, onClose }: { header: string, onClose: () => void }) {
    return (
        <div className="flex justify-between items-center border-darkgreen border-2 p-1">
            <p className="text-sm text-darkgreen font-bold">▲ {header}</p>
            {/* TODO: retro tooltip near close button — triggered when user clicks the overlay while this window is open
                - show a nostalgic speech-bubble/textbox style popup pointing to the close button
                - text: e.g. "To return to desktop, click ✕"
                - needs an `overlayClicked` signal passed down from Window (or via a state flag)
                - auto-dismiss after a few seconds or on close button click */}
            <button className="flex items-center justify-center w-6 h-6 close-btn-base hover:bg-purplegrey" onClick={onClose}>✕</button>
        </div>
    )
}