import AppLayout from '@/layouts/app-layout';
import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// --- Interfaces
// Convert to LazyIcon array
interface LazyIcon {
    name: string;
    label: string;
    loader: () => Promise<string>;
}
// --- Utility: kebab-case → PascalCase
function toPascalCase(str: string, sp: string = "") {
    return str
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(sp);
}

// --- Lazy-load all icons
// Use a type assertion to promise the default export is string
const allIconsLazy = import.meta.glob<{ default: string }>("../../../icons-files/*.svg");
const iconsArray: LazyIcon[] = Object.entries(allIconsLazy).map(([path, loaderFn]) => {
    const fileName = path.split("/").pop()?.replace(".svg", "") ?? "";
    return {
        name: toPascalCase(fileName),
        label: fileName,
        loader: () => loaderFn().then(mod => mod.default), // extract default export
    };
});
// --- Highlight matched search term
function highlightMatch(name: string, search: string) {
    if (!search) return name;
    const regex = new RegExp(`(${search})`, "gi");
    return name.split(regex).map((part, i) =>
        regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
    );
}
// --- Single Icon Item
function IconItem({ icon, search, index }: { icon: LazyIcon; search: string, index: number }) {
    const [src, setSrc] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        let isMounted = true;
        icon.loader().then(res => {
            if (isMounted) setSrc(res);
        });
        return () => { isMounted = false; };
    }, [icon]);
    const handleClick = () => {
        if (icon.name) {
            navigator.clipboard.writeText(icon.name);

            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };


    return (
        <div className="text-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="focus:outline-none p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition relative"
                            onClick={handleClick}
                        >
                            {src ? (

                                <img src={src} alt={icon.name} className="w-9 h-9 rounded-lg" />
                            ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                            )}
                            {/* Copy checkmark overlay */}
                            {copied && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                                    <span className="text-green-400 text-2xl font-bold">✓</span>
                                </div>
                            )}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent bgTheme='destructive'>
                        <p>{copied ? "Copied!" : icon.name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="mt-1 text-xs text-center break-words">
                {toPascalCase(icon.label, " ")}
            </div>
        </div>
    );
}
export default function IconsIndex() {
    const maxVisible = 100;
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(50);
    const filteredIcons = iconsArray.filter(icon =>
        icon.name.toLowerCase().includes(search.toLowerCase())
    );
    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                setVisibleCount(prev => Math.min(prev + maxVisible, filteredIcons.length));
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [filteredIcons.length]);
    return (
        <AppLayout >

            <div className="p-4">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search icons..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="mb-4 px-3 py-1 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                />

                {/* Icons grid */}
                <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12  gap-2 text-center">
                    {filteredIcons.slice(0, visibleCount).map((icon, i) => (
                        <IconItem key={i} index={i} icon={icon} search={search} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
