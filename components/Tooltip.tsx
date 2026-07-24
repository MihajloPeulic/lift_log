type TooltipProps = {
    text: string;
    children: React.ReactNode;
};


export function Tooltip({
    text,
    children
}: TooltipProps) {

    return (
        <div className="group relative">

            {children}

            <div
                className="
                pointer-events-none
                absolute
                left-1/2
                top-full
                mt-2
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
                "
            >
                {text}
            </div>

        </div>
    );
}