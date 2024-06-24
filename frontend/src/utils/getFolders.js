export const getS3Folders = async (validationKey) => {
  try {
    const res = await fetch(process.env.REACT_APP_FETCH_FOLDERS, {
      method: "POST",
      body: JSON.stringify({ folder_name: validationKey }),
    });
    return await res.json();
  } catch (e) {
    return null;
  }
};
