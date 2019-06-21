import React from "react";
import styles from "./patient-search-container.css";
import PatientSearch from "../patient-search/patient-search";

export default function PatientSearchContainer(
  props: PatientSearchContainerProps
) {
  return (
    <div className={styles.searchContainer}>{/* <PatientSearch /> */}</div>
  );
}

type PatientSearchContainerProps = {
  history?: {
    push(newUrl: String): void;
  };
};
