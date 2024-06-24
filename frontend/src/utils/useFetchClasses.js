import { useState } from "react";

export const useFetchClasses = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchClasses(project_name) {
    try {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_FETCH_CLASSES, {
        method: "POST",

        body: JSON.stringify({ project_name }),
      });

      if (!res.ok)
        throw new Error(
          "Project does not exist or classes not found for the given project!!"
        );
      const jsonResponse = await res.json();

      setData(jsonResponse);
      setError(null);
    } catch (e) {
      console.error(
        e?.message || "Error while fetching classes data from s3.."
      );
      setError(e?.message || "Error while fetching classes data from s3..");
    } finally {
      setLoading(false);
    }
  }
  return { data, error, fetchClasses, loading };
};
