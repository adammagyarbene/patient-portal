import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";
import PatientList from "../components/PatientList";
import { IPatient } from "../services/mongoose/models/patient";
import { searchPatients } from "../services/api";
import fetchPatients from "@src/services/patients/fetchPatients";
import Spinner from "@src/components/Spinner";

interface IFilterPatientsProps {
  patients: IPatient[];
}

const FilterPatients: NextPage<IFilterPatientsProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const [patients, setPatients] = useState<IPatient[] | [] | null>(null);

  const formik = useFormik({
    initialValues: {
      userId: undefined,
      sureName: "",
      familyName: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      userId: Yup.number()
        .typeError("Patient ID must be a number")
        .positive("Patient ID must be positive"),
      sureName: Yup.string(),
      familyName: Yup.string(),
      gender: Yup.string().oneOf(
        ["male", "female"],
        "Please select a valid gender"
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const data = await fetchPatients(values);
      const patients: IPatient[] = Object.values(data);

      setPatients(patients);
      setLoading(false);
    },
  });

  return (
    <Layout>
      <Head>
        <title>Filter Patients</title>
      </Head>
      <div className="flex flex-wrap justify-between items-start bg-gray-100 min-h-screen">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Search Patients</h1>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 mb-2" htmlFor="userId">
                Patient ID
              </label>
              <input
                type="number"
                className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                id="userId"
                name="userId"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userId && formik.errors.userId ? (
                <div className="text-red-500">{formik.errors.userId}</div>
              ) : null}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 mb-2" htmlFor="sureName">
                Patient surename
              </label>
              <input
                type="text"
                className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                id="sureName"
                name="sureName"
                value={formik.values.sureName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.sureName && formik.errors.sureName ? (
                <div className="text-red-500">{formik.errors.sureName}</div>
              ) : null}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 mb-2" htmlFor="familyName">
                Patient family name
              </label>
              <input
                type="text"
                className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                id="familyName"
                name="familyName"
                value={formik.values.familyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.familyName && formik.errors.familyName ? (
                <div className="text-red-500">{formik.errors.familyName}</div>
              ) : null}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 mb-2" htmlFor="gender">
                Patient Gender
              </label>
              <select
                className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500">{formik.errors.gender}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(formik.errors).length > 0}
            >
              Search
            </button>
          </div>
        </form>
        {isLoading ? <Spinner /> : <PatientList patients={patients} />}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchTerm: string = query.searchTerm as string;

  if (!searchTerm) {
    return {
      props: {
        patients: [],
      },
    };
  }

  const patients = await searchPatients(searchTerm);

  return {
    props: {
      patients,
    },
  };
};

export default FilterPatients;
