import axios from "axios";

export default async function getFolders(token: string, folderId: string) {
  return await axios.get(`${import.meta.env.VITE_URL}/folder/${folderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
