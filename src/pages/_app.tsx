import type { AppProps } from "next/app";
import PatientProvider from "@src/hooks/usePatientContext";

import "@src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PatientProvider>
      <Component {...pageProps} />;
    </PatientProvider>
  );
}
