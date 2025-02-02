import patients from "../data/patients";
import { Patient, NonSensitivePatient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient: Patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export default {
  getNonSensitivePatients
};