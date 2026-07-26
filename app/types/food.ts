export type Food = {
    id: string;
    default_unit: string;
    name: string;
    category: string;

    calories: number;
    protein: number;
    carbs: number;
    fat: number;

    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;

    vitamin_a: number;
    vitamin_c: number;
    vitamin_d: number;
    vitamin_e: number;
    vitamin_k: number;

    vitamin_b1: number;
    vitamin_b2: number;
    vitamin_b3: number;
    vitamin_b5: number;
    vitamin_b6: number;
    vitamin_b7: number;
    vitamin_b9: number;
    vitamin_b12: number;

    calcium: number;
    iron: number;
    magnesium: number;
    phosphorus: number;
    potassium: number;
    zinc: number;
    copper: number;
    manganese: number;
    selenium: number;

    iodine: number;
    chromium: number;
    molybdenum: number;
    choline: number;

    omega_3: number;
    omega_6: number;
};

export type Unit = {
    id: string;
    unit_name: string;
    grams: number;
};



export type MealItem = {
    id:string;
    amount:number;

    food_units:{
        grams:number;
        unit_name:string;
    };

    foods: Food
};


export type CalorieNeeds = {
    id: string,
    user_id: string,
    calorie_expenditure: number,
    protein_needs: number,
    fat_needs: number,
    carbs_needs: number,
    bmr: number,
    weight_goal: number,
    activity_level: string,
    custom_calorie_target: number,
    weight_change_rate: number
}


export type NutritionTotals = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;

    fiber: number;
    sugar: number;
    sodium: number;
    cholesterol: number;

    vitamin_a: number;
    vitamin_c: number;
    vitamin_d: number;
    vitamin_e: number;
    vitamin_k: number;

    vitamin_b1: number;
    vitamin_b2: number;
    vitamin_b3: number;
    vitamin_b5: number;
    vitamin_b6: number;
    vitamin_b7: number;
    vitamin_b9: number;
    vitamin_b12: number;

    calcium: number;
    iron: number;
    magnesium: number;
    phosphorus: number;
    potassium: number;
    zinc: number;
    copper: number;
    manganese: number;
    selenium: number;

    iodine: number;
    chromium: number;
    molybdenum: number;
    choline: number;

    omega_3: number;
    omega_6: number;
};