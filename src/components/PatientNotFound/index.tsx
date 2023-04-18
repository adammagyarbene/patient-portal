import React from "react";

const PatientNotFound: React.FC = () => {
  return (
    <div className="text-gray-800 w-1/2 border-collapse p-4 rounded-md shadow-md bg-white">
      <p className="text-2xl font-bold mb-2">Patient not found</p>
      <p className="text-lg text-gray-600">
        {`Sorry, we couldn't find the patient you're looking for.`}
      </p>
    </div>
  );
};

export default PatientNotFound;
