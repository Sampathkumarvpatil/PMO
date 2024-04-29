export const getS3Folders = async (validationKey) => {
  try {
    const res = await fetch(
      "https://evllpzt6ya.execute-api.us-east-1.amazonaws.com/default/pmofroms3",
      {
        method: "POST",
        body: JSON.stringify({ folder_name: validationKey }),
      }
    );
    return await res.json();
  } catch (e) {
    return null;
  }
};
