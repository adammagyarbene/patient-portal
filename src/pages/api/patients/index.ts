import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { PatientModel } from "@src/services/mongoose/models/patient";

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.atiwhmh.mongodb.net/?retryWrites=true&w=majority`;

export default async function getPatientByName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, familyName, sureName, gender } = req.query;

    await mongoose.connect(uri);

    let query = {};

    if (userId) {
      query = { ...query, id: userId };
    }

    if (familyName) {
      query = { ...query, "name.family": familyName };
    }

    if (sureName) {
      query = { ...query, "name.given": sureName };
    }

    if (gender) {
      query = { ...query, gender };
    }

    const patients = await PatientModel.find(query);

    if (!patients) {
      return res.status(404).json({ message: "Patient not found", familyName });
    }

    res.status(200).json({ ...patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await mongoose.disconnect();
  }
}
