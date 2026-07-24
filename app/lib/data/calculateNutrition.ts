import { MealItem } from "@/app/types/food";

export function calculateFoodNutrition(item: MealItem) {

    const grams =
        item.amount * item.food_units.grams ;


    const multiplier = grams / 100;


    return {

        grams,

        calories:
            item.foods.calories * multiplier,

        protein:
            item.foods.protein * multiplier,

        carbs:
            item.foods.carbs * multiplier,

        fat:
            item.foods.fat * multiplier,

    };

}




export function calculateMealNutrition(items: MealItem[] = []) {

    return items.reduce(

        (total, item) => {

            const nutrition = calculateFoodNutrition(item);


            return {

                calories:
                    total.calories + nutrition.calories,

                protein:
                    total.protein + nutrition.protein,

                carbs:
                    total.carbs + nutrition.carbs,

                fat:
                    total.fat + nutrition.fat,

            };

        },

        {
            calories:0,
            protein:0,
            carbs:0,
            fat:0
        }

    );

}