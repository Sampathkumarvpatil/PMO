import { useState } from "react";
// import MOCK_DATA from "./reportTestData.json";
export const useFetchTestReport = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchReport(body) {
    try {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_FETCH_REPORT, {
        method: "POST",

        body: JSON.stringify({ ...body }),
      });
      if (!res.ok) throw new Error("Error while fetching file from s3!!");
      const jsonResponse = await res.json();

      setData(jsonResponse);
    } catch (e) {
      console.error(e?.message || "Error while fetching data from s3..");
      setError(e?.message || "Error while fetching data from s3..");
    } finally {
      setLoading(false);
    }
  }
  return { data, error, fetchReport, loading };
};
