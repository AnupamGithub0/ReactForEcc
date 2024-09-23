const url = "https://api.cloudinary.com/v1_1/dtktdmy6h/image/upload";
export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product");

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    return res.json();
};
