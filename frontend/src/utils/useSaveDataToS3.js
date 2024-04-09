import { useEffect, useState } from "react";

export const useSaveDataToS3 = (file_name, json_data) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    saveData();
  }, [file_name, json_data]);

  async function saveData() {
    try {
      const res = await fetch(process.env.SAVE_FILE_TO_S3, {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify({ file_name, json_data }),
      });
      if (!res.ok) throw new Error("Error while saving file from s3!!");
      await res.json();
      setSuccess(true);
      return { success, error };
    } catch (e) {
      console.error(e?.message || "Error while fetching data from s3..");
      setError(e?.message || "Error while fetching data from s3..");
    }
  }
};
