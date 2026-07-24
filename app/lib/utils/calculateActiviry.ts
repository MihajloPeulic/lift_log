export function CalculateExpenditure(
    bodyweight: number,
    height: number,
    date_of_birth: string,
    activity: string,
    gender: string
) {

    const date = new Date(date_of_birth);

    const today = new Date();

    let age = today.getFullYear() - date.getFullYear();

    const monthDifference = today.getMonth() - date.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < date.getDate())
    ) {
        age--;
    }
    const BMR =
        gender === "male"
            ? (10 * bodyweight) + (6.25 * height) - (5 * age) + 5
            : (10 * bodyweight) + (6.25 * height) - (5 * age) - 161;
    
        const activityMultiplier = {
            sedentary: 1.2,
            lightly_active: 1.375,
            moderately_active: 1.55,
            very_active: 1.725,
            extremely_active: 1.9,
        };
    
    
        const calorie_expenditure =
            BMR * activityMultiplier[activity as keyof typeof activityMultiplier];

    
        const protein_needs =
            bodyweight * 2.2;
    
        const fat_needs =
            bodyweight * 1;
    
        const proteinCalories =
            protein_needs * 4;
    
    
        const fatCalories =
            fat_needs * 9;
    
        const carbs_needs =
            (calorie_expenditure - proteinCalories - fatCalories) / 4;


        return {
            calorie_expenditure: calorie_expenditure, 
            protein_needs: protein_needs, 
            carbs_needs: carbs_needs, 
            fat_needs: fat_needs
        }
}