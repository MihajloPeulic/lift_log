import React from "react";

type TooltipProps = {
    text: string;
    children: React.ReactNode;
    position?: "top" | "bottom"; // Dodana opcija za poziciju
};

export function Tooltip({
    text,
    children,
    position = "bottom" // Podrazumijevana vrijednost je 'bottom' da ne pokvari ostale tooltipove u aplikaciji
}: TooltipProps) {
    return (
        <div className="group relative flex items-center justify-center">
            {children}

            {/* Renderuje se samo ako ima teksta, tako da nema prazne crne kocke */}
            {text && (
                <div
                    className={`
                    pointer-events-none
                    absolute
                    left-1/2
                    -translate-x-1/2
                    rounded-button
                    bg-black
                    px-3
                    py-2
                    text-sm
                    text-white
                    whitespace-nowrap
                    opacity-0
                    transition-opacity
                    group-hover:opacity-100
                    z-[9999]
                    ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}
                    `}
                >
                    {text}
                </div>
            )}
        </div>
    );
}