import { IPatient } from "@src/services/mongoose/models/patient";
import { createContext, useContext, useState } from "react";

interface PatientContextProps {
  patients: IPatient[] | null;
  setPatients: (patients: IPatient[]) => void;
}

const PatientContext = createContext<PatientContextProps>({
  patients: null,
  setPatients: () => {},
});

export const usePatientContext = () => useContext(PatientContext);

const PatientProvider = ({ children }: any) => {
  const [patients, setPatients] = useState<IPatient[] | null>(null);

  return (
    <PatientContext.Provider value={{ patients, setPatients }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
