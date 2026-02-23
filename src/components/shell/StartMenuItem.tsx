"use client";

 // for contact email, use onClick to open email client; for Resume Download, LinkedIn and GitHub, use href to open the link in a new tab
type StartMenuItemProps = {
    icon: string;
    label: string;
    href: string;
    download?: string; // optional prop to indicate if the link is for downloading a file
} | {
    icon: string;
    label: string;
    onClick: () => void;
}

export function StartMenuItem(props: StartMenuItemProps) {

    if ("href" in props) {
        return (
            <a href={props.href} target="_blank" rel="noopener noreferrer" download={props.download} className="flex items-center p-2 text-xxs font-bold hover:bg-purplegrey/50 cursor-pointer">
                <img src={props.icon} className="w-4 h-4 mr-2 inline-block" />
                {props.label}
            </a>
        )
    }

    return (
        <button className="flex items-center p-2 text-left text-xxs font-bold hover:bg-purplegrey/50 cursor-pointer" onClick={props.onClick}>
            <img src={props.icon} className="w-4 h-4 mr-2 inline-block" />
            {props.label}
        </button>
    )
}