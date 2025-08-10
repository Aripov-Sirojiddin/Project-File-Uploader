import axios from "axios";

export default async function createFile(
  fileName: string,
  userId: string,
  token: string,
  parentId: string
) {
  return await axios.post(
    `${import.meta.env.VITE_URL}/folder/create`,
    {
      name: fileName,
      parentId: parentId,
      userId: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
