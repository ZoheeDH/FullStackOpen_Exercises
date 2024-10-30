import { parseBmiArguments } from "./utils/parseArguments";

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height/100) ** 2);
  if (bmi < 16) {
    return "Underweight (Severe Thinness)";
  } else if (bmi >= 16 && bmi < 17) {
    return "Underweight (Moderate Thinness)";
  } else if (bmi >= 17 && bmi < 18.5) {
    return "Underweight (Mild Thinness)";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal Range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight (Pre-Obese)";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese (Class II)";
  } else if (bmi > 40) {
    return "Obese (Class III)";
  } else {
    throw new Error("Invalid input: height and weight must be positive numbers");
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;