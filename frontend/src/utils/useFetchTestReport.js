import { useState } from "react";
import MOCK_DATA from "./reportTestData.json";
export const useFetchTestReport = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [error, setError] = useState("");

  async function fetchReport(body) {
    try {
      const res = await fetch(process.env.FETCH_REPORTS_TESTGENIOUS, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({ ...body }),
      });
      if (!res.ok) throw new Error("Error while fetching file from s3!!");
      const jsonResponse = await res.json();
      setData(jsonResponse);

      return jsonResponse;
    } catch (e) {
      console.error(e?.message || "Error while fetching data from s3..");
      setError(e?.message || "Error while fetching data from s3..");
    }
  }
  return { data, error, fetchReport };
};
