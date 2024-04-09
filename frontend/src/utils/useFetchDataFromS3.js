import { useEffect, useState } from "react";

export const useFetchDataFromS3 = (file_key) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [file_key]);

  async function fetchData() {
    try {
      const res = await fetch(process.env.FETCH_S3_FILE, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({ file_key }),
      });
      if (!res.ok) throw new Error("Error while fetching file from s3!!");
      const jsonResponse = await res.json();
      setData(jsonResponse);
      return { data, error };
    } catch (e) {
      console.error(e?.message || "Error while fetching data from s3..");
      setError(e?.message || "Error while fetching data from s3..");
    }
  }
};
