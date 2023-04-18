import React from "react";
import { useRouter } from "next/router";

import { IPatient } from "@src/services/mongoose/models/patient";
import PatientNotFound from "../PatientNotFound";

interface PatientListProps {
  patients: IPatient[] | [] | null;
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const router = useRouter();

  if (patients == null) {
    return <></>;
  }

  if (!patients.length) {
    return <PatientNotFound />;
  }

  const onUserClicked = (patient: IPatient) => {
    router.push({
      pathname: "/patient",
      query: { patientId: patient.id },
    });
  };

  return (
    <table className="w-full lg:w-1/2 sm:w-full md:w-full border-collapse">
      <thead>
        <tr className="md:table-row">
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 lg:table-cell">
            Name
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300">
            Gender
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {patients.map((patient) => (
          <tr
            key={patient.id}
            className="md:table-row cursor-pointer hover:bg-blue-100 transition duration-300 ease-in-out"
            onClick={() => onUserClicked(patient)}
          >
            <td className="p-3 font-medium uppercase text-gray-600 border border-gray-300 lg:table-cell">
              {patient.name[0].given[0]} {patient.name[0].family}
            </td>
            <td className="p-3 uppercase text-gray-900 border border-gray-300">
              {patient.gender}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientList;
