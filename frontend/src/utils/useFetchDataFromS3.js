import { useState } from "react";

export const useFetchDataFromS3 = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function fetchData(file_key) {
    try {
      const res = await fetch(process.env.FETCH_S3_FILE, {
        method: "POST",

        body: JSON.stringify({ file_key }),
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
  return { data, error, fetchData };
};
