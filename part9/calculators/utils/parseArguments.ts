export const parseExerciseArguments = (args: string[]) => {
  const value1 = Number(args[2]);
  const value2 = args.slice(3).map(Number);

  if (!isNaN(Number(value1)) && value2.every((value) => { return !isNaN(Number(value)); })) { //typeof value2 == "object"
    return {
      value1,
      value2
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const parseBmiArguments = (args: string[]) => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
