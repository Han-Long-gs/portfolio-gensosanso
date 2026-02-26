"use client";

// this is a window component exclusively for the mobile version

export function WindowDropdown({ items, selectedSlug, setSelectedSlug }: { items: { slug: string, title: string }[], selectedSlug: string, setSelectedSlug: (slug: string) => void }) {
    return (
        <select className="bg-lightgrey h-6 border border-darkgreen border-2 text-xxs" value={selectedSlug} onChange={(e) => setSelectedSlug(e.target.value)}>
            {items.map((item) => (
                <option key={item.slug} value={item.slug}>{item.title}</option>
            ))}
        </select>
    )
}