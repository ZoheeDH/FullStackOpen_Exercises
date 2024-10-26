import { parseExerciseArguments } from "./utils/parseArguments";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, dailyHours: number[]): Result => {
  const totalDays = dailyHours.length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const averageHours = totalHours / totalDays;
  const rating = (): {rating: number, description:string} => {
    if (averageHours >= target) {
      return { rating: 3, description: "You're achieving great progress!" };
    } else if (averageHours < target && averageHours > target / 2) {
      return { rating: 2, description: "You're not quite there yet, but keep up the good work!" };
    } else {
      return { rating: 1, description: "You're struggling to meet your goal, but don't give up!" };
    }
  }

  return {
    periodLength: totalDays,
    trainingDays: dailyHours.filter(hours => hours > 0).length,
    success: averageHours >= target,
    rating: rating().rating,
    ratingDescription: rating().description,
    target,
    average: averageHours,
  }
}

try {
  const { value1, value2 } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}