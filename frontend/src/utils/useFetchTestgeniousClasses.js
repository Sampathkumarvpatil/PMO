import { useState } from "react";

export const useFetchTestgeniousClasses = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function fetchClasses(project_name) {
    try {
      const res = await fetch(process.env.FETCH_CLASSES_TESTGENIOUS, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({ project_name }),
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
  return { data, error, fetchClasses };
};
