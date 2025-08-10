import axios from "axios";

export default async function updateFileName(
  fileId: string | null,
  fileName: string,
  token: string
) {
  return await axios.patch(
    `${import.meta.env.VITE_URL}/folder/update/name/${fileId}`,
    {
      name: fileName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
