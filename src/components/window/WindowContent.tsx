"use client";

import { ContentDetail } from "@/src/lib/content";
import { useDict } from "@/src/i18n/useDict";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function WindowContent({ contentDetail }: { contentDetail: ContentDetail | null }) {
    const dict = useDict();

    if (!contentDetail?.title || !contentDetail?.date || !contentDetail?.readTimeMinutes || !contentDetail?.content) {
        return (
            <div className="flex-1 border-darkgreen border-2 bg-readingbg p-10 flex items-center justify-center">
                <p className="text-xl text-darkgreen">{dict.window.content.underConstruction}</p>
            </div>
        )
    }

    return (
        <div className="flex-1 border-darkgreen border-2 bg-readingbg p-10 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-5">{contentDetail?.title}</h1>
            <p className="text-sm mb-5">
                <time dateTime={contentDetail?.date || ""}>{contentDetail?.date}</time>
                <span> · {contentDetail?.readTimeMinutes} {dict.window.content.readTimeMinutesLabel}</span>
            </p>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-darkgreen border-b-2 border-dashed border-darkgreen pb-1 mb-5">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold text-darkgreen mt-8 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold text-darkgreen mt-5 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-sm leading-relaxed mb-4">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-darkgreen">{children}</strong>,
                    em: ({ children }) => <em className="italic text-black/70">{children}</em>,
                    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-darkgreen underline underline-offset-2 hover:text-lightgreen">{children}</a>,
                    ul: ({ children }) => <ul className="list-none mb-4 space-y-1 [&>li]:before:content-['▶'] [&>li]:before:text-darkgreen [&>li]:before:mr-2 [&>li]:before:text-xxs">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-darkgreen pl-4 my-4 text-sm italic text-black/60 bg-purplegrey/20 py-2">{children}</blockquote>,
                    code: ({ children, className }) => className
                        ? <pre className="bg-black text-white font-mono text-xs p-4 my-4 overflow-x-auto border border-darkgreen"><code>{children}</code></pre>
                        : <code className="bg-purplegrey/40 text-darkgreen font-mono text-xs px-1 py-0.5">{children}</code>,
                    hr: () => <hr className="border-dashed border-darkgreen my-8" />,
                    img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full my-4 border-2 border-darkgreen" />,
                    table: ({ children }) => <table className="w-full text-xs border-collapse mb-4">{children}</table>,
                    th: ({ children }) => <th className="text-left font-bold text-darkgreen border border-darkgreen px-3 py-1 bg-purplegrey/30">{children}</th>,
                    td: ({ children }) => <td className="border border-darkgreen px-3 py-1">{children}</td>,
                }}
            >
                {contentDetail?.content || ""}
            </ReactMarkdown>
        </div>
    )
}