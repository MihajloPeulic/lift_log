import { NutritionTotals } from "@/app/types/food";
import { calculateMealNutrition } from "../data/calculateNutrition";

export function CalculateDailyNutrition(meals: any[]) {
    
    const dailyTotals = meals.reduce(
    
        (total, meal) => {
    
            const mealTotals = calculateMealNutrition(
                meal.meal_items ?? []
            );
    
    
            return {
                calories: total.calories + mealTotals.calories,
                protein: total.protein + mealTotals.protein,
                carbs: total.carbs + mealTotals.carbs,
                fat: total.fat + mealTotals.fat,
    
                fiber: total.fiber + mealTotals.fiber,
                sugar: total.sugar + mealTotals.sugar,
                sodium: total.sodium + mealTotals.sodium,
                cholesterol: total.cholesterol + mealTotals.cholesterol,
    
                vitamin_a: total.vitamin_a + mealTotals.vitamin_a,
                vitamin_c: total.vitamin_c + mealTotals.vitamin_c,
                vitamin_d: total.vitamin_d + mealTotals.vitamin_d,
                vitamin_e: total.vitamin_e + mealTotals.vitamin_e,
                vitamin_k: total.vitamin_k + mealTotals.vitamin_k,
    
                vitamin_b1: total.vitamin_b1 + mealTotals.vitamin_b1,
                vitamin_b2: total.vitamin_b2 + mealTotals.vitamin_b2,
                vitamin_b3: total.vitamin_b3 + mealTotals.vitamin_b3,
                vitamin_b5: total.vitamin_b5 + mealTotals.vitamin_b5,
                vitamin_b6: total.vitamin_b6 + mealTotals.vitamin_b6,
                vitamin_b7: total.vitamin_b7 + mealTotals.vitamin_b7,
                vitamin_b9: total.vitamin_b9 + mealTotals.vitamin_b9,
                vitamin_b12: total.vitamin_b12 + mealTotals.vitamin_b12,
    
                calcium: total.calcium + mealTotals.calcium,
                iron: total.iron + mealTotals.iron,
                magnesium: total.magnesium + mealTotals.magnesium,
                phosphorus: total.phosphorus + mealTotals.phosphorus,
                potassium: total.potassium + mealTotals.potassium,
                zinc: total.zinc + mealTotals.zinc,
                copper: total.copper + mealTotals.copper,
                manganese: total.manganese + mealTotals.manganese,
                selenium: total.selenium + mealTotals.selenium,
    
                iodine: total.iodine + mealTotals.iodine,
                chromium: total.chromium + mealTotals.chromium,
                molybdenum: total.molybdenum + mealTotals.molybdenum,
                choline: total.choline + mealTotals.choline,
    
                omega_3: total.omega_3 + mealTotals.omega_3,
                omega_6: total.omega_6 + mealTotals.omega_6,
            };
    
        },
    
        {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
    
            fiber: 0,
            sugar: 0,
            sodium: 0,
            cholesterol: 0,
    
            vitamin_a: 0,
            vitamin_c: 0,
            vitamin_d: 0,
            vitamin_e: 0,
            vitamin_k: 0,
    
            vitamin_b1: 0,
            vitamin_b2: 0,
            vitamin_b3: 0,
            vitamin_b5: 0,
            vitamin_b6: 0,
            vitamin_b7: 0,
            vitamin_b9: 0,
            vitamin_b12: 0,
    
            calcium: 0,
            iron: 0,
            magnesium: 0,
            phosphorus: 0,
            potassium: 0,
            zinc: 0,
            copper: 0,
            manganese: 0,
            selenium: 0,
    
            iodine: 0,
            chromium: 0,
            molybdenum: 0,
            choline: 0,
    
            omega_3: 0,
            omega_6: 0,
        }
    
    );

    return dailyTotals
}


