const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset); // 🔹 Replace with your preset
  formData.append("cloud_name", cloudName); // 🔹 Replace with your Cloudinary name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // 🔹 Cloudinary se URL return karega
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
