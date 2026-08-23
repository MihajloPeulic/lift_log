"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tooltip } from "@/components/Tooltip";

export default function DateSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDate = searchParams.get("date")
    ? new Date(searchParams.get("date")!)
    : new Date();

  function changeDay(amount: number) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + amount);
    router.push(`/nutrition?date=${newDate.toISOString().split("T")[0]}`);
  }

  function formatDate() {
    return currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function openCalendar() {
    inputRef.current?.showPicker();
  }

  return (
    <div className="card-main relative flex w-full items-center justify-between gap-3 p-3 sm:p-4">
      <Tooltip text="Yesterday">
        <button
          onClick={() => changeDay(-1)}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 cursor-pointer items-center justify-center rounded-button bg-surface-light hover:bg-border transition-colors text-text font-bold"
        >
          ←
        </button>
      </Tooltip>

      <button
        onClick={openCalendar}
        className="min-w-0 flex-1 cursor-pointer text-center px-2 group"
      >
        <p className="text-caption">Today</p>
        <p className="truncate text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors">
          {formatDate()}
        </p>
      </button>

      <Tooltip text="Tomorrow">
        <button
          onClick={() => changeDay(1)}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 cursor-pointer items-center justify-center rounded-button bg-surface-light hover:bg-border transition-colors text-text font-bold"
        >
          →
        </button>
      </Tooltip>

      <input
        ref={inputRef}
        type="date"
        value={currentDate.toISOString().split("T")[0]}
        onChange={(e) => {
          router.push(`/nutrition?date=${e.target.value}`);
        }}
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}