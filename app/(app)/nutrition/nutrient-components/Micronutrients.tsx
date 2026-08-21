"use client";

export default function Micronutrients({
  micros = [],
  maxHeight
}: {
  micros: any[];
  maxHeight?: number | null;
}) {
  // Oduzimamo visinu naslova i margina (~40px) da lista stane tačno unutar izmerenog prostora
  const listMaxHeight = maxHeight ? `${maxHeight - 40}px` : "360px";

  return (
    <section className="flex w-full min-w-0 flex-col">
      <div className="flex shrink-0 items-center justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Micronutrients</h2>
      </div>

      <div
        style={{ maxHeight: listMaxHeight }}
        className="custom-scrollbar mt-3 w-full min-w-0 space-y-2 overflow-y-auto pr-1 sm:mt-5 sm:space-y-2.5 sm:pr-2"
      >
        {micros.map((micro) => {
          const safeMicroPercent = Math.min(Math.max(micro.percent, 0), 100);

          return (
            <article
              key={micro.name}
              className="w-full min-w-0 rounded-card border border-border bg-surface px-3 py-2.5 sm:px-4 sm:py-3"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2 sm:justify-start">
                  <p className="truncate text-xs font-medium sm:text-sm">
                    {
                      micro.name.includes("_") ? 
                        String(micro.name)
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                          .join(" ")
                        : micro.name.charAt(0).toUpperCase() + micro.name.slice(1).toLowerCase()
                      
                    }
                  </p>
                  <span className="shrink-0 text-xs text-text-secondary">
                    {micro.value} / {micro.daily_target} {micro.unit}
                  </span>
                </div>

                <span className="shrink-0 text-xs font-semibold text-primary sm:text-sm">
                  {micro.percent}%
                </span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-light sm:h-2">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${safeMicroPercent}%`
                  }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}