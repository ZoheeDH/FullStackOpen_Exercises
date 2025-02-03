import { NewPatient, Gender } from "./types";

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isGender = (value: string): value is Gender => {
  return ['male', 'female', 'other'].includes(value);
};

const parseStringField = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error("Incorrect or missing name, ssn or occupation field");
  }
  return value;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing field dateOfBirth");
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing field gender");
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseStringField(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseStringField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation)
    };
    return newPatient;
  }
  throw new Error('Invalid data: some fields are missing');
};

export default toNewPatient;