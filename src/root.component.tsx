import React from "react";
import PatientSearchContainer from "./patient-search-container/patient-search-container";
import { BrowserRouter, Route } from "react-router-dom";

export default function Root(props: RootProps) {
  return (
    <BrowserRouter basename="/openmrs/spa">
      <Route to="patient-search" component={PatientSearchContainer} />
    </BrowserRouter>
  );
}

type RootProps = {};
