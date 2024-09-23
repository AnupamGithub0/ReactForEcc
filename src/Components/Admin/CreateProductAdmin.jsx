import { useEffect, useState } from "react";
import Container from "../Container";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../../cloudinary";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProductAdmin() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate()

  const handleUploadImages = async (e) => {
    const file = e.target.files[0];
    const cloudinary = await uploadImage(file);
    setProductImages((prev) => {
      return [...prev, cloudinary.url];
    });
    e.target.value = "";
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ecnew-1.onrender.com/api/v1/product/create-product",
        {
          productName,
          category,
          costPrice,
          sellPrice,
          stock,
          description,
          productImages,
        }
      );
      if (res.data.success === true) {
        navigate("/")
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Create Product
        </h2>
        <form
          onSubmit={handleUploadProduct}
          className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-lg"
        >
          {/* Product Name */}
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          {/* Cost Price */}
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="costPrice"
            >
              Cost Price
            </label>
            <input
              id="costPrice"
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter cost price"
            />
          </div>

          {/* Sell Price */}
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="sellPrice"
            >
              Sell Price
            </label>
            <input
              id="sellPrice"
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter sell price"
            />
          </div>

          {/* Stock */}
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter product description"
              rows="5"
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center justify-center flex-col">
            <div className="relative overflow-hidden w-24 h-24 bg-transparent border-2 mb-3 ">
              <label>
                <div className="text-xs overflow-hidden bg-opacity-80 bg-slate-200 cursor-pointer text-center absolute top-10 left-2"></div>

                <div className="text-xs m-auto p-1 text-blue-500 overflow-hidden bg-opacity-80 bg-slate-200 cursor-pointer text-center absolute top-10 left-2">
                  Upload Photo
                  <div className="flex items-center justify-center">
                    <FaCloudUploadAlt size={23} />
                  </div>
                </div>
                <input
                  onChange={handleUploadImages}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            {productImages.map((prdImg) => (
              <div key={prdImg} className="w-[140px] h-[140px] border-2 ml-4">
                <img src={prdImg} alt="Product" />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
