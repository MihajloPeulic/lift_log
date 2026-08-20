import { Food, NutritionTotals } from "@/app/types/food";
import { calculateMealNutrition } from "../data/calculateNutrition";
import { micronutrientTargets } from "@/app/constants/nutrition";


export function CalculateDailyNutrition(
    meals: any[] | null, 
    food: Food | null, 
    multiplier : number | null
) {
    

    if(meals){
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
    
    if(food && multiplier) {
            const dailyTotals = {
            calories: Number((food.calories * multiplier).toFixed(1)),
            protein: Number((food.protein * multiplier).toFixed(1)),
            carbs: Number((food.carbs * multiplier).toFixed(1)),
            fat: Number((food.fat * multiplier).toFixed(1)),

            fiber: Number((food.fiber * multiplier).toFixed(2)),
            sugar: Number((food.sugar * multiplier).toFixed(2)),
            sodium: Number((food.sodium * multiplier).toFixed(2)),
            cholesterol: Number((food.cholesterol * multiplier).toFixed(2)),

            vitamin_a: Number((food.vitamin_a * multiplier).toFixed(4)),
            vitamin_c: Number((food.vitamin_c * multiplier).toFixed(2)),
            vitamin_d: Number((food.vitamin_d * multiplier).toFixed(4)),
            vitamin_e: Number((food.vitamin_e * multiplier).toFixed(2)),
            vitamin_k: Number((food.vitamin_k * multiplier).toFixed(4)),

            vitamin_b1: Number((food.vitamin_b1 * multiplier).toFixed(3)),
            vitamin_b2: Number((food.vitamin_b2 * multiplier).toFixed(3)),
            vitamin_b3: Number((food.vitamin_b3 * multiplier).toFixed(2)),
            vitamin_b5: Number((food.vitamin_b5 * multiplier).toFixed(2)),
            vitamin_b6: Number((food.vitamin_b6 * multiplier).toFixed(3)),
            vitamin_b7: Number((food.vitamin_b7 * multiplier).toFixed(4)),
            vitamin_b9: Number((food.vitamin_b9 * multiplier).toFixed(4)),
            vitamin_b12: Number((food.vitamin_b12 * multiplier).toFixed(4)),

            calcium: Number((food.calcium * multiplier).toFixed(2)),
            iron: Number((food.iron * multiplier).toFixed(2)),
            magnesium: Number((food.magnesium * multiplier).toFixed(2)),
            phosphorus: Number((food.phosphorus * multiplier).toFixed(2)),
            potassium: Number((food.potassium * multiplier).toFixed(2)),
            zinc: Number((food.zinc * multiplier).toFixed(2)),
            copper: Number((food.copper * multiplier).toFixed(3)),
            manganese: Number((food.manganese * multiplier).toFixed(3)),
            selenium: Number((food.selenium * multiplier).toFixed(4)),

            iodine: Number((food.iodine * multiplier).toFixed(4)),
            chromium: Number((food.chromium * multiplier).toFixed(4)),
            molybdenum: Number((food.molybdenum * multiplier).toFixed(4)),
            choline: Number((food.choline * multiplier).toFixed(2)),

            omega_3: Number((food.omega_3 * multiplier).toFixed(3)),
            omega_6: Number((food.omega_6 * multiplier).toFixed(3)),
        };

        return dailyTotals
    }
    
}




export function CalculateMicros(dailyTotals: any) {
    const micros = Object.entries(micronutrientTargets).map(
    ([name, target]) => {

        const current =
            dailyTotals[name as keyof NutritionTotals] ?? 0;

        return {
            name,

            daily_target: target.value * target.multiplier,

            unit: target.unit,

            value: Number(
                (current * target.multiplier).toFixed(2)
            ),

            percent: current === 0
                ? 0
                : Math.round(
                    (current / target.value) * 100
                )
                };
            }
        );

    return micros
}



export function CalculateCaloriesAndMacros(dailyTargets: any, dailyTotals:any){

    const cal_exp = dailyTargets.custom_calorie_target !== null ? dailyTargets.custom_calorie_target : dailyTargets.calorie_expenditure
    //ukupne vrijednosti koje treba hitati
    const calorieGoal = Number(cal_exp.toFixed(1));
    const dailyProtein = Number(dailyTargets.protein_needs.toFixed(1))
    const dailyFat = Number(dailyTargets.fat_needs.toFixed(1))
    const dailyCarbs = Number(dailyTargets.carbs_needs.toFixed(1))

    const caloriePercent = Math.round((dailyTotals.calories/calorieGoal)*100)

     const macros = [
        {
            name: "Protein",
            daily_target: dailyProtein,
            percent: dailyTotals.protein === 0 ? 0 : Math.round((dailyTotals.protein/dailyProtein)*100),
            value: Number(dailyTotals.protein.toFixed(1))
        },
        {
            name: "Fat",
            daily_target: dailyFat,
            percent: dailyTotals.fat === 0 ? 0 : Math.round((dailyTotals.fat/dailyFat)*100),
            value: Number(dailyTotals.fat.toFixed(1))
        },
        {
            name: "Carbs",
            daily_target: dailyCarbs,
            percent: dailyTotals.carbs === 0 ? 0 : Math.round((dailyTotals.carbs/dailyCarbs)*100),
            value: Number(dailyTotals.carbs.toFixed(1))
        }
    ]

    return {
        "calorieGoal": calorieGoal,
        "dailyProtein": dailyProtein,
        "dailyFat": dailyFat,
        "dailyCarbs": dailyCarbs,
        "caloriePercent": caloriePercent,
        "macros": macros
    }
}