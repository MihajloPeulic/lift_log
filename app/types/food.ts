export type Food = {
    id: string;
    default_unit: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    category: string;
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

    foods:{
        id:string;
        name:string;
        calories:number;
        protein:number;
        carbs:number;
        fat:number;
    };
};


export type CalorieNeeds = {
    id: string,
    user_id: string,
    calorie_expenditure: number,
    protein_needs: number,
    fat_needs: number,
    carbs_needs: number
}


export type NutritionTotals = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};