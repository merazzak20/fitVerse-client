import axios from "axios";

const image_BB_API_KEY = import.meta.env.VITE_ImageBB_API_KEY;
const image_BB_Hosting_API = `https://api.imgbb.com/1/upload?key=${image_BB_API_KEY}`;
export const uploadImage = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(image_BB_Hosting_API, formData);
  return data.data.display_url;
};

export const saveUser = async (user) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  });
};
