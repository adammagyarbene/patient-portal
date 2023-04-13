import { Schema } from "mongoose";

const patientSchema = new Schema({
  id: String,
  meta: {
    lastUpdated: String,
    versionId: String,
  },
  identifier: [
    {
      system: String,
      value: String,
    },
  ],
  name: [
    {
      use: String,
      family: String,
      given: [String],
    },
  ],
  gender: String,
  birthDate: String,
  address: [
    {
      use: String,
      line: [String],
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  ],
  telecom: [
    {
      system: String,
      value: String,
      use: String,
    },
  ],
  maritalStatus: {
    coding: [
      {
        system: String,
        code: String,
        display: String,
      },
    ],
  },
});

export default patientSchema;
