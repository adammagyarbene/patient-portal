// import mongoose from "mongoose";
// import { PatientModel } from "../models/patient";

// const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.atiwhmh.mongodb.net/?retryWrites=true&w=majority`;

// const connect = () => {
//   mongoose
//     .connect(uri)
//     .then(() => {
//       console.log("Connected to MongoDB");

//       // Create a new patient
//       const newPatient = new PatientModel({
//         id: "12345",
//         meta: {
//           lastUpdated: "2022-01-01T00:00:00.000Z",
//           versionId: "1",
//         },
//         identifier: [
//           {
//             system: "http://example.com/patient",
//             value: "00001",
//           },
//         ],
//         name: [
//           {
//             use: "official",
//             family: "Doe",
//             given: ["John"],
//           },
//         ],
//         gender: "male",
//         birthDate: "1990-01-01",
//         address: [
//           {
//             use: "home",
//             line: ["123 Main St"],
//             city: "Anytown",
//             state: "CA",
//             postalCode: "12345",
//             country: "USA",
//           },
//         ],
//         telecom: [
//           {
//             system: "phone",
//             value: "555-555-1234",
//             use: "home",
//           },
//         ],
//         maritalStatus: {
//           coding: [
//             {
//               system: "http://hl7.org/fhir/v3/MaritalStatus",
//               code: "M",
//               display: "Married",
//             },
//           ],
//         },
//       });

//       // Save the patient to the database
//       newPatient
//         .save()
//         .then(() => {
//           console.log("New patient saved to the database");
//           mongoose.connection.close();
//         })
//         .catch((err: any) => {
//           console.error(err);
//           mongoose.connection.close();
//         });
//     })
//     .catch((err: any) => {
//       console.error(err);
//     });
// };

// export default connect;
