import { useState } from "react";

export const useGetS3Folders = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function fetchData(validationKey) {
    try {
      const res = await fetch(
        "https://evllpzt6ya.execute-api.us-east-1.amazonaws.com/default/pmofroms3",
        {
          method: "POST",
          headers: {
            ContentType: "application/json",
          },
          body: JSON.stringify({ folder_name: validationKey }),
        }
      );
      if (!res.ok) throw new Error("Error while fetching folders from s3!!");
      const jsonResponse = await res.json();
      setData(jsonResponse);
    } catch (e) {
      console.error(e?.message || "Error while fetching flders from s3..");
      setError(e?.message || "Error while fetching folders from s3..");
    }
  }
  return { data, error, fetchData };
};
