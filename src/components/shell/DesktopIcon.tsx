"use client";

export function DesktopIcon({ name, icon, onClick, isSelected }: { name: string; icon: string; onClick: () => void; isSelected: boolean }) {
    return (
        <button className={`w-[100px] h-[100px] flex flex-col items-center justify-center p-3 cursor-pointer ${isSelected ? "desktop-icon-selected" : ""}`} onClick={onClick}>
            <img src={icon} alt={name} className="w-[64px] h-[64px]" />
            <span className="text-xs mt-1 font-bold text-white">{name}</span>
        </button>
    );
}