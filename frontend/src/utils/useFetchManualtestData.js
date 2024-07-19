import { useState } from "react";

export const useFetchManualTests = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchTests(reqBody) {
    try {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_FETCH_MANUAL_TEST_DATA, {
        method: "POST",

        body: JSON.stringify({ ...reqBody }),
      });

      if (!res.ok)
        throw new Error(
          "Project does not exist or manual test data not found for the given project!!"
        );
      const jsonResponse = await res.json();

      setData(jsonResponse);
      setError(null);
      return jsonResponse;
    } catch (e) {
      console.error(
        e?.message || "Error while fetching manualTest data from s3.."
      );
      setError(e?.message || "Error while fetching manual Test data from s3..");
    } finally {
      setLoading(false);
    }
  }
  return { data, error, fetchTests, loading };
};
