import { getCalorieNeeds } from "@/app/lib/data/food";
import { getCurrentUser } from "@/app/lib/data/user";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/dist/server/api-utils";
import { ReactNode } from "react";

import { NutritionProvider } from "./NutritionProvider";


export default async function NutritionLayout({
    children,
}: {
    children: ReactNode;
}) {

    const supabase = await createServerSupabaseClient()
    const user= await getCurrentUser()

     if (!user) {
        return null;
    }


    const dailyTotals = await getCalorieNeeds(user.id)

    

    return (
        <NutritionProvider dailyTotals={dailyTotals}>
            {children}
        </NutritionProvider>
    );
}