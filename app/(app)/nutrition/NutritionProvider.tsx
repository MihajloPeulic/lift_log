"use client";

import { createContext, useContext } from "react";

const NutritionContext = createContext<any>(null);

export function NutritionProvider({
    children,
    dailyTotals,
}: {
    children: React.ReactNode;
    dailyTotals: any;
}) {
    return (
        <NutritionContext.Provider value={dailyTotals}>
            {children}
        </NutritionContext.Provider>
    );
}


export function useNutrition() {
    return useContext(NutritionContext);
}