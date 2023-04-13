import mongoose from "mongoose";
import patientSchema from "./Patient.schema";

interface IPatient {
  id: string;
  meta: {
    lastUpdated: string;
    versionId: string;
  };
  identifier: {
    system: string;
    value: string;
  }[];
  name: {
    use: string;
    family: string;
    given: string[];
  }[];
  gender: string;
  birthDate: string;
  address: {
    use: string;
    line: string[];
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }[];
  telecom: {
    system: string;
    value: string;
    use: string;
  }[];
  maritalStatus: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
  };
}

const PatientModel =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export { PatientModel };
export type { IPatient };
