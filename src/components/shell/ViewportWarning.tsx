"use client";

import { useState, useEffect } from "react";
import { useDict } from "../../i18n/useDict";

const MIN_WIDTH = 768;
const MIN_HEIGHT = 500;

export function ViewportWarning() {
    const dict = useDict();
    const [unsupported, setUnsupported] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        function check() {
            setUnsupported(window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT);
        }
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (!unsupported || dismissed) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8">
            <div className="bg-grey border-2 border-darkgreen p-8 max-w-sm w-full flex flex-col gap-4">
                <h1 className="text-base font-bold text-darkgreen">{dict.viewport.warning.title}</h1>
                <p className="text-sm text-darkgreen leading-relaxed">{dict.viewport.warning.message}</p>
                <button
                    onClick={() => setDismissed(true)}
                    className="taskbar-btn-base self-start px-4 py-1 text-sm"
                >
                    {dict.viewport.warning.continueButton}
                </button>
            </div>
        </div>
    );
}
