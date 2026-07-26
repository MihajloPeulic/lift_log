import { MealItem } from "@/app/types/food";


export function calculateFoodNutrition(item: MealItem) {

    const grams =
        item.amount * item.food_units.grams;


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


        fiber:
            item.foods.fiber * multiplier,

        sugar:
            item.foods.sugar * multiplier,

        sodium:
            item.foods.sodium * multiplier,

        cholesterol:
            item.foods.cholesterol * multiplier,


        vitamin_a:
            item.foods.vitamin_a * multiplier,

        vitamin_c:
            item.foods.vitamin_c * multiplier,

        vitamin_d:
            item.foods.vitamin_d * multiplier,

        vitamin_e:
            item.foods.vitamin_e * multiplier,

        vitamin_k:
            item.foods.vitamin_k * multiplier,


        vitamin_b1:
            item.foods.vitamin_b1 * multiplier,

        vitamin_b2:
            item.foods.vitamin_b2 * multiplier,

        vitamin_b3:
            item.foods.vitamin_b3 * multiplier,

        vitamin_b5:
            item.foods.vitamin_b5 * multiplier,

        vitamin_b6:
            item.foods.vitamin_b6 * multiplier,

        vitamin_b7:
            item.foods.vitamin_b7 * multiplier,

        vitamin_b9:
            item.foods.vitamin_b9 * multiplier,

        vitamin_b12:
            item.foods.vitamin_b12 * multiplier,


        calcium:
            item.foods.calcium * multiplier,

        iron:
            item.foods.iron * multiplier,

        magnesium:
            item.foods.magnesium * multiplier,

        phosphorus:
            item.foods.phosphorus * multiplier,

        potassium:
            item.foods.potassium * multiplier,

        zinc:
            item.foods.zinc * multiplier,

        copper:
            item.foods.copper * multiplier,

        manganese:
            item.foods.manganese * multiplier,

        selenium:
            item.foods.selenium * multiplier,


        iodine:
            item.foods.iodine * multiplier,

        chromium:
            item.foods.chromium * multiplier,

        molybdenum:
            item.foods.molybdenum * multiplier,

        choline:
            item.foods.choline * multiplier,


        omega_3:
            item.foods.omega_3 * multiplier,

        omega_6:
            item.foods.omega_6 * multiplier,

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


                fiber:
                    total.fiber + nutrition.fiber,

                sugar:
                    total.sugar + nutrition.sugar,

                sodium:
                    total.sodium + nutrition.sodium,

                cholesterol:
                    total.cholesterol + nutrition.cholesterol,


                vitamin_a:
                    total.vitamin_a + nutrition.vitamin_a,

                vitamin_c:
                    total.vitamin_c + nutrition.vitamin_c,

                vitamin_d:
                    total.vitamin_d + nutrition.vitamin_d,

                vitamin_e:
                    total.vitamin_e + nutrition.vitamin_e,

                vitamin_k:
                    total.vitamin_k + nutrition.vitamin_k,


                vitamin_b1:
                    total.vitamin_b1 + nutrition.vitamin_b1,

                vitamin_b2:
                    total.vitamin_b2 + nutrition.vitamin_b2,

                vitamin_b3:
                    total.vitamin_b3 + nutrition.vitamin_b3,

                vitamin_b5:
                    total.vitamin_b5 + nutrition.vitamin_b5,

                vitamin_b6:
                    total.vitamin_b6 + nutrition.vitamin_b6,

                vitamin_b7:
                    total.vitamin_b7 + nutrition.vitamin_b7,

                vitamin_b9:
                    total.vitamin_b9 + nutrition.vitamin_b9,

                vitamin_b12:
                    total.vitamin_b12 + nutrition.vitamin_b12,


                calcium:
                    total.calcium + nutrition.calcium,

                iron:
                    total.iron + nutrition.iron,

                magnesium:
                    total.magnesium + nutrition.magnesium,

                phosphorus:
                    total.phosphorus + nutrition.phosphorus,

                potassium:
                    total.potassium + nutrition.potassium,

                zinc:
                    total.zinc + nutrition.zinc,

                copper:
                    total.copper + nutrition.copper,

                manganese:
                    total.manganese + nutrition.manganese,

                selenium:
                    total.selenium + nutrition.selenium,


                iodine:
                    total.iodine + nutrition.iodine,

                chromium:
                    total.chromium + nutrition.chromium,

                molybdenum:
                    total.molybdenum + nutrition.molybdenum,

                choline:
                    total.choline + nutrition.choline,


                omega_3:
                    total.omega_3 + nutrition.omega_3,

                omega_6:
                    total.omega_6 + nutrition.omega_6,

            };

        },

        {
            calories:0,
            protein:0,
            carbs:0,
            fat:0,

            fiber:0,
            sugar:0,
            sodium:0,
            cholesterol:0,

            vitamin_a:0,
            vitamin_c:0,
            vitamin_d:0,
            vitamin_e:0,
            vitamin_k:0,

            vitamin_b1:0,
            vitamin_b2:0,
            vitamin_b3:0,
            vitamin_b5:0,
            vitamin_b6:0,
            vitamin_b7:0,
            vitamin_b9:0,
            vitamin_b12:0,

            calcium:0,
            iron:0,
            magnesium:0,
            phosphorus:0,
            potassium:0,
            zinc:0,
            copper:0,
            manganese:0,
            selenium:0,

            iodine:0,
            chromium:0,
            molybdenum:0,
            choline:0,

            omega_3:0,
            omega_6:0,
        }

    );

}