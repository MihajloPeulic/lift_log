

export default function Micronutrients(
    {
        micros = []
    }: {
        micros: any[]
    }
) {
    return (
        <section className="">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    Micronutrients
                </h2>
            </div>

            {/* Fiksne klase za max-height i scrollbar */}
            <div className="mt-5 space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {micros.map((micro) => (
                    <article
                        key={micro.name}
                        className="
                        w-full
                        rounded-card
                        border
                        border-border
                        bg-surface
                        px-4
                        py-2.5
                        "
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">
                                    {micro.name}
                                </p>
                                <span className="text-sm text-text-secondary">
                                    {micro.value} / {micro.daily_target} {micro.unit}
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-primary">
                                {micro.percent}%
                            </span>
                        </div>

                        <div className="mt-1.5 h-2 rounded-full bg-surface-light">
                            <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                    width: `${micro.percent}%`,
                                    maxWidth: "100%"
                                }}
                            />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}