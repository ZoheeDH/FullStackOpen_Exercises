import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnostics = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnostics
};