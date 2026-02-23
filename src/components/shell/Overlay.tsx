// this is to render the overlay
// when a window is open: the overlay will cover the desktop and prevent user from clicking on the desktop icons (but not the taskbar)
// when a start menu is open: the overlay will cover the desktop but not the taskbar, and prevent user from clicking on the desktop icons or the window (if any)
"use client";

export function Overlay({ zLevel, onClick }: { zLevel: number; onClick?: () => void }) {
    // when the zLevel is -1, it means the overlay should not be rendered; otherwise, it should be rendered with the corresponding z-index
    return zLevel !== -1 ? <div className="absolute inset-0 bg-black/50" style={{ zIndex: zLevel }} onClick={onClick} /> : null;
}