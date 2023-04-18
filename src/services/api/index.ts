import mongoose from "mongoose";
import { IPatient } from "../mongoose/models/patient";

export const searchPatients = async (
  searchTerm: string
): Promise<IPatient[]> => {
  const patientModel = mongoose.models.Patient;
  const patients = await patientModel
    .find({
      $or: [
        { id: { $regex: searchTerm, $options: "i" } },
        { "name.family": { $regex: searchTerm, $options: "i" } },
        { "name.given": { $regex: searchTerm, $options: "i" } },
        { gender: { $regex: searchTerm, $options: "i" } },
      ],
    })
    .limit(50);

  return patients;
};
