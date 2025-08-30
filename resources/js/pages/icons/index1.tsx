
import AppLayout from '@/layouts/app-layout';
import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface IconsProps {
    name: string;
    label: string;
    src?: string;
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


const allIcons = import.meta.glob("../../../icons-files/*.svg", { eager: true, import: "default" });


const iconsArray: IconsProps[] = Object.entries(allIcons).map(([path, svg]) => {
    const fileName = path.split("/").pop()?.replace(".svg", "") ?? "";
    return {
        name: toPascalCase(fileName),
        label: fileName,
        src: svg as string,
    };
});


// --- Single Icon Item
function IconItem({ icon, search, index }: { icon: IconsProps; search: string, index: number }) {

    const [copied, setCopied] = useState(false);



    const handleClick = () => {
        if (icon.name) {
            navigator.clipboard.writeText(icon.name);
            console.log(icon.name);

            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="flex flex-col items-center relative">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="focus:outline-none p-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition relative"
                            onClick={handleClick}
                        >
                            {icon.src ? (
                                <img src={icon.src} alt={icon.name} className="w-12 h-12 rounded-lg" />
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

            {/* Highlight search match under icon */}

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
                <div className="grid grid-cols-8 gap-6">
                    {filteredIcons.slice(0, visibleCount).map((icon, i) => (
                        <IconItem key={i} index={i} icon={icon} search={search} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
