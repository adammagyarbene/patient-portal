import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PatientInfo from "@src/components/PatientInfo";
import { usePatientContext } from "@src/hooks/usePatientContext";
import _ from "lodash";
import { IPatient } from "@src/services/mongoose/models/patient";
import PatientNotFound from "@src/components/PatientNotFound";
import fetchPatients from "@src/services/patients/fetchPatients";
import Spinner from "@src/components/Spinner";
import BackArrow from "@src/components/BackArrow";

const extractNameInfo = ({
  family,
  given,
}: {
  use: string;
  family: string;
  given: string[];
}): string => {
  return given[0] + " " + family;
};

const PatientPage: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const router = useRouter();
  const { patientId } = router.query;
  const { patients } = usePatientContext();

  const getPatient = useCallback(async () => {
    setLoading(true);
    const existingPatient: any = _.find(patients, { id: patientId });

    if (existingPatient) {
      setSelectedPatient(existingPatient);
    } else if (typeof patientId == "string") {
      const data = await fetchPatients({ userId: patientId });
      const patient: any = Object.values(data)[0];
      setSelectedPatient(patient);
    } else {
      setSelectedPatient(null);
    }

    setLoading(false);
  }, [patientId, patients]);

  useEffect(() => {
    getPatient();
  }, [getPatient, patientId]);

  if (isLoading)
    return (
      <div className="p-4 bg-gray-100 min-h-screen">
        <Spinner />
      </div>
    );

  if (selectedPatient) {
    const {
      birthDate,
      gender,
      name,
      address,
      maritalStatus: { coding },
      telecom,
    } = selectedPatient;

    return (
      <div className="p-4 bg-gray-100 min-h-screen">
        <BackArrow href="/" />
        <PatientInfo
          name={extractNameInfo(name[0])}
          gender={gender}
          birthDate={birthDate}
          maritalStatus={coding[0].display}
          address={address[0].line[0]}
          phone={telecom[0].value}
        />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <BackArrow href="/" />
      <PatientNotFound />;
    </div>
  );
};

export default PatientPage;
