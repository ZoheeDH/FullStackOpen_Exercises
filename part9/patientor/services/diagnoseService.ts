import diagnoses from "../data/diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnostics = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default { getDiagnostics };