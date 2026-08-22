import { Food, NutritionTotals } from "@/app/types/food";
import { calculateMealNutrition } from "../data/calculateNutrition";
import { micronutrientTargets } from "@/app/constants/nutrition";

export function CalculateDailyNutrition(
    meals: any[] | null, 
    food: Food | null, 
    multiplier : number | null
) {
    if (meals) {
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
                calories: 0, protein: 0, carbs: 0, fat: 0,
                fiber: 0, sugar: 0, sodium: 0, cholesterol: 0,
                vitamin_a: 0, vitamin_c: 0, vitamin_d: 0, vitamin_e: 0, vitamin_k: 0,
                vitamin_b1: 0, vitamin_b2: 0, vitamin_b3: 0, vitamin_b5: 0, vitamin_b6: 0, vitamin_b7: 0, vitamin_b9: 0, vitamin_b12: 0,
                calcium: 0, iron: 0, magnesium: 0, phosphorus: 0, potassium: 0, zinc: 0, copper: 0, manganese: 0, selenium: 0,
                iodine: 0, chromium: 0, molybdenum: 0, choline: 0,
                omega_3: 0, omega_6: 0,
            }
        );
        return dailyTotals;
    } 
    
    // Provjeravamo da li je food prisutan, a multiplier tretiramo bezbjedno (ako je null/0, biće 0)
    if (food) {
        const mult = multiplier ?? 0;

        return {
            calories: Number(((food.calories ?? 0) * mult).toFixed(1)),
            protein: Number(((food.protein ?? 0) * mult).toFixed(1)),
            carbs: Number(((food.carbs ?? 0) * mult).toFixed(1)),
            fat: Number(((food.fat ?? 0) * mult).toFixed(1)),

            fiber: Number(((food.fiber ?? 0) * mult).toFixed(2)),
            sugar: Number(((food.sugar ?? 0) * mult).toFixed(2)),
            sodium: Number(((food.sodium ?? 0) * mult).toFixed(2)),
            cholesterol: Number(((food.cholesterol ?? 0) * mult).toFixed(2)),

            vitamin_a: Number(((food.vitamin_a ?? 0) * mult).toFixed(4)),
            vitamin_c: Number(((food.vitamin_c ?? 0) * mult).toFixed(2)),
            vitamin_d: Number(((food.vitamin_d ?? 0) * mult).toFixed(4)),
            vitamin_e: Number(((food.vitamin_e ?? 0) * mult).toFixed(2)),
            vitamin_k: Number(((food.vitamin_k ?? 0) * mult).toFixed(4)),

            vitamin_b1: Number(((food.vitamin_b1 ?? 0) * mult).toFixed(3)),
            vitamin_b2: Number(((food.vitamin_b2 ?? 0) * mult).toFixed(3)),
            vitamin_b3: Number(((food.vitamin_b3 ?? 0) * mult).toFixed(2)),
            vitamin_b5: Number(((food.vitamin_b5 ?? 0) * mult).toFixed(2)),
            vitamin_b6: Number(((food.vitamin_b6 ?? 0) * mult).toFixed(3)),
            vitamin_b7: Number(((food.vitamin_b7 ?? 0) * mult).toFixed(4)),
            vitamin_b9: Number(((food.vitamin_b9 ?? 0) * mult).toFixed(4)),
            vitamin_b12: Number(((food.vitamin_b12 ?? 0) * mult).toFixed(4)),

            calcium: Number(((food.calcium ?? 0) * mult).toFixed(2)),
            iron: Number(((food.iron ?? 0) * mult).toFixed(2)),
            magnesium: Number(((food.magnesium ?? 0) * mult).toFixed(2)),
            phosphorus: Number(((food.phosphorus ?? 0) * mult).toFixed(2)),
            potassium: Number(((food.potassium ?? 0) * mult).toFixed(2)),
            zinc: Number(((food.zinc ?? 0) * mult).toFixed(2)),
            copper: Number(((food.copper ?? 0) * mult).toFixed(3)),
            manganese: Number(((food.manganese ?? 0) * mult).toFixed(3)),
            selenium: Number(((food.selenium ?? 0) * mult).toFixed(4)),

            iodine: Number(((food.iodine ?? 0) * mult).toFixed(4)),
            chromium: Number(((food.chromium ?? 0) * mult).toFixed(4)),
            molybdenum: Number(((food.molybdenum ?? 0) * mult).toFixed(4)),
            choline: Number(((food.choline ?? 0) * mult).toFixed(2)),

            omega_3: Number(((food.omega_3 ?? 0) * mult).toFixed(3)),
            omega_6: Number(((food.omega_6 ?? 0) * mult).toFixed(3)),
        };
    }

    // Siguran povratni objekat sa nulama ako ništa od gore nije proslijeđeno
    return {
        calories: 0, protein: 0, carbs: 0, fat: 0,
        fiber: 0, sugar: 0, sodium: 0, cholesterol: 0,
        vitamin_a: 0, vitamin_c: 0, vitamin_d: 0, vitamin_e: 0, vitamin_k: 0,
        vitamin_b1: 0, vitamin_b2: 0, vitamin_b3: 0, vitamin_b5: 0, vitamin_b6: 0, vitamin_b7: 0, vitamin_b9: 0, vitamin_b12: 0,
        calcium: 0, iron: 0, magnesium: 0, phosphorus: 0, potassium: 0, zinc: 0, copper: 0, manganese: 0, selenium: 0,
        iodine: 0, chromium: 0, molybdenum: 0, choline: 0,
        omega_3: 0, omega_6: 0,
    };
}

export function CalculateMicros(dailyTotals: any) {
    const totals = dailyTotals || {};
    const micros = Object.entries(micronutrientTargets).map(
        ([name, target]) => {
            const current = totals[name as keyof NutritionTotals] ?? 0;

            return {
                name,
                daily_target: target.value * target.multiplier,
                unit: target.unit,
                value: Number((current * target.multiplier).toFixed(2)),
                percent: current === 0 ? 0 : Math.round((current / target.value) * 100)
            };
        }
    );

    return micros;
}

export function CalculateCaloriesAndMacros(dailyTargets: any, dailyTotals: any) {
    const targets = dailyTargets || {};
    const totals = dailyTotals || { calories: 0, protein: 0, fat: 0, carbs: 0 };

    const cal_exp = targets.custom_calorie_target !== null && targets.custom_calorie_target !== undefined 
        ? targets.custom_calorie_target 
        : (targets.calorie_expenditure ?? 2000);

    const calorieGoal = Number(cal_exp.toFixed(1));
    const dailyProtein = Number((targets.protein_needs ?? 0).toFixed(1));
    const dailyFat = Number((targets.fat_needs ?? 0).toFixed(1));
    const dailyCarbs = Number((targets.carbs_needs ?? 0).toFixed(1));

    const caloriePercent = calorieGoal === 0 ? 0 : Math.round((totals.calories / calorieGoal) * 100);

    const macros = [
        {
            name: "Protein",
            daily_target: dailyProtein,
            percent: dailyProtein === 0 ? 0 : Math.round((totals.protein / dailyProtein) * 100),
            value: Number((totals.protein ?? 0).toFixed(1))
        },
        {
            name: "Fat",
            daily_target: dailyFat,
            percent: dailyFat === 0 ? 0 : Math.round((totals.fat / dailyFat) * 100),
            value: Number((totals.fat ?? 0).toFixed(1))
        },
        {
            name: "Carbs",
            daily_target: dailyCarbs,
            percent: dailyCarbs === 0 ? 0 : Math.round((totals.carbs / dailyCarbs) * 100),
            value: Number((totals.carbs ?? 0).toFixed(1))
        }
    ];

    return {
        "calorieGoal": calorieGoal,
        "dailyProtein": dailyProtein,
        "dailyFat": dailyFat,
        "dailyCarbs": dailyCarbs,
        "caloriePercent": caloriePercent,
        "macros": macros
    };
}