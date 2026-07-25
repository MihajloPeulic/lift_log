import { activityMultiplier } from "@/app/constants/nutrition";


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
    
    let BMR =
        gender === "male"
            ? (10 * bodyweight) + (6.25 * height) - (5 * age) + 5
            : (10 * bodyweight) + (6.25 * height) - (5 * age) - 161;

    BMR = Number(BMR.toFixed(1))
    
        
    
    
        const calorie_expenditure =
            Number((BMR * activityMultiplier[activity as keyof typeof activityMultiplier]).toFixed(1));

    
        const protein_needs =
            Number((bodyweight * 2.2).toFixed(1));
    
        const fat_needs =
            Number((bodyweight * 1).toFixed(1));
    
        const proteinCalories =
            protein_needs * 4;
    
    
        const fatCalories =
            fat_needs * 9;
    
        const carbs_needs =
            Number(((calorie_expenditure - proteinCalories - fatCalories) / 4).toFixed(1));


        return {
            calorie_expenditure: calorie_expenditure, 
            protein_needs: protein_needs, 
            carbs_needs: carbs_needs, 
            fat_needs: fat_needs,
            BMR: BMR
        }
}