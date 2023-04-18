import React from "react";
import Gravatar from "react-gravatar";

interface PatientInfoProps {
  name: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  address: string;
  phone: string;
}

const PatientInfo: React.FC<PatientInfoProps> = (patient) => {
  return (
    <div className="max-w-xl mx-auto mt-4 rounded-lg shadow-md overflow-hidden">
      <div className="max-w-xl mx-auto mt-4 rounded-lg shadow-md overflow-hidden">
        <div className="bg-white px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Gravatar
                email={patient.phone}
                size={64}
                className="rounded-full"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">
                {patient.name}
              </h2>
              <table className="table-fixed w-full text-gray-600">
                <tbody>
                  {Object.entries(patient).map(([key, value]) => (
                    <tr key={key}>
                      <td className="font-bold pr-2 capitalize">{key}:</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
