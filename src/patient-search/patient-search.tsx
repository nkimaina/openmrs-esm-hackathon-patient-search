import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { doSearch } from "./patient.resource";
import styles from "./patient-search.css";

export const PatientSearchWidget = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: PatientSearch,
  suppressComponentDidCatchWarning: true
});

export default function PatientSearch(props: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [patientResults, setPatientResults] = React.useState([]);
  const [resultsLoaded, setResultsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isSearching && searchTerm !== "") {
      doSearch(searchTerm)
        .then(data => {
          setPatientResults(data["results"]);
          setResultsLoaded(true);
        })
        .finally(() => {
          setIsSearching(false);
        });
    } else {
      setIsSearching(false);
    }
  }, [isSearching]);

  function handleSubmit($event: React.FormEvent<HTMLFormElement>) {
    $event.preventDefault();
    setIsSearching(true);
    setResultsLoaded(false);
  }

  function navigateToPatientDashboard(patientUuid: string) {
    window.location.href =
      window.location.origin + `/openmrs/spa/patient-dashboard/${patientUuid}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.all_content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className="input-group mb-3">
              <input
                className="form-control search-box"
                type="text"
                placeholder="Enter patient name or identifier to search"
                value={searchTerm}
                onChange={$event => setSearchTerm($event.target.value)}
                autoFocus
              ></input>

              <button
                className="btn input-group-append btn-primary"
                type="submit"
              >
                {isSearching ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa fa-search"></i>
                )}
              </button>
              {resultsLoaded ? (
                <button
                  className="btn input-group-append btn-warning button-cancel"
                  onClick={() => {
                    setResultsLoaded(false);
                    setPatientResults([]);
                    setSearchTerm("");
                  }}
                >
                  <i className="fa fa-times"></i>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
        {resultsLoaded && (
          <div className={styles.search_results}>
            <b>
              <p>
                Found {patientResults.length}{" "}
                {patientResults.length === 1 ? "match" : "matches"}{" "}
              </p>
            </b>
            {patientResults.length && (
              <table className="table table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Identifiers</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {patientResults.map((result, i) => [
                    <tr
                      className={styles.table_row}
                      onClick={() => navigateToPatientDashboard(result.uuid)}
                    >
                      <td>{i + 1}</td>
                      <td>
                        {result.identifiers
                          .map(identifier => identifier.identifier)
                          .join(",")}
                      </td>
                      <td>{result.person.display}</td>
                      <td>{result.person.age}</td>
                      <td>{result.person.gender}</td>
                    </tr>
                  ])}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type PatientSearchProps = {
  history?: {
    push(newUrl: String): void;
  };
};
