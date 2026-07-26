export type ActivityLevel =
    | "sedentary"
    | "lightly_active"
    | "moderately_active"
    | "very_active"
    | "extremely_active";


export const activityLevelListForUi: Record<ActivityLevel, string> = {
    sedentary: "Sedentary",
    lightly_active: "Lightly Active",
    moderately_active: "Moderately Active",
    very_active: "Very Active",
    extremely_active: "Extremely Active",
}

export const activityMultiplier: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9,
};


export const micronutrientTargets = {
    // Vitamins
    vitamin_a: { value: 0.9, unit: "mcg", multiplier: 1000 },
    vitamin_c: { value: 100, unit: "mg", multiplier: 1 },
    vitamin_d: { value: 0.02, unit: "mcg", multiplier: 1000 },
    vitamin_e: { value: 15, unit: "mg", multiplier: 1 },
    vitamin_k: { value: 0.12, unit: "mcg", multiplier: 1000 },

    vitamin_b1: { value: 1.5, unit: "mg", multiplier: 1 },
    vitamin_b2: { value: 1.7, unit: "mg", multiplier: 1 },
    vitamin_b3: { value: 18, unit: "mg", multiplier: 1 },
    vitamin_b5: { value: 5, unit: "mg", multiplier: 1 },
    vitamin_b6: { value: 2, unit: "mg", multiplier: 1 },
    vitamin_b7: { value: 0.03, unit: "mcg", multiplier: 1000 },
    vitamin_b9: { value: 0.4, unit: "mcg", multiplier: 1000 },
    vitamin_b12: { value: 0.0024, unit: "mcg", multiplier: 1000 },


    // Minerals
    calcium: { value: 1200, unit: "mg", multiplier: 1 },
    iron: { value: 10, unit: "mg", multiplier: 1 },
    magnesium: { value: 400, unit: "mg", multiplier: 1 },
    phosphorus: { value: 700, unit: "mg", multiplier: 1 },
    potassium: { value: 3500, unit: "mg", multiplier: 1 },
    sodium: { value: 2300, unit: "mg", multiplier: 1 },
    zinc: { value: 12, unit: "mg", multiplier: 1 },
    copper: { value: 0.9, unit: "mg", multiplier: 1 },
    manganese: { value: 2.3, unit: "mg", multiplier: 1 },
    selenium: { value: 0.055, unit: "mcg", multiplier: 1000 },
    iodine: { value: 0.15, unit: "mcg", multiplier: 1000 },
    chromium: { value: 0.035, unit: "mcg", multiplier: 1000 },
    molybdenum: { value: 0.045, unit: "mcg", multiplier: 1000 },


    // Other
    cholesterol: { value: 300, unit: "mg", multiplier: 1 },
    choline: { value: 550, unit: "mg", multiplier: 1 },

    omega_3: { value: 1.6, unit: "g", multiplier: 1 },
    omega_6: { value: 17, unit: "g", multiplier: 1 },


    // Grams
    fiber: { value: 30, unit: "g", multiplier: 1 },
    sugar: { value: 50, unit: "g", multiplier: 1 }
};