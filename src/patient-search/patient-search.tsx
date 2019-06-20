import React from "react";
import { doSearch } from "./patient.resource";
import styles from "./patient-search.css";

export default function PatientSearch(props: PatientSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [patientResults, setPatientResults] = React.useState([]);
  const [resultsLoaded, setResultsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isSearching) {
      doSearch(searchTerm)
        .then(data => {
          setPatientResults(data["results"]);
          setResultsLoaded(true);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  }, [isSearching]);

  function handleSubmit($event: React.FormEvent<HTMLFormElement>) {
    $event.preventDefault();
    setIsSearching(true);
    setResultsLoaded(false);
  }

  function navigateToPatientDashboard(patientUuid: string) {
    props.history.push(`/patient-dashboard/${patientUuid}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.all_content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <input
              className={styles.searchbox}
              type="text"
              placeholder="Enter patient name or identifier to search"
              value={searchTerm}
              onChange={$event => setSearchTerm($event.target.value)}
              autoFocus
            ></input>
            <button className={styles.btn} type="submit">
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
        {resultsLoaded && (
          <div className={styles.search_results}>
            {patientResults.length && (
              <table className={styles.search_results}>
                <tr>
                  <th>#</th>
                  <th>Identifiers</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
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
              </table>
            )}
            <p className={styles.matches_text}>
              Found {patientResults.length}{" "}
              {patientResults.length === 1 ? "match" : "matches"}{" "}
            </p>
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
