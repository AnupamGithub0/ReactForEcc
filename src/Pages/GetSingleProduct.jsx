import { Link, useParams } from "react-router-dom";
import Container from "../Components/Container";
import begs from "../assets/begs.jpg";
import { useEffect, useState } from "react";
import Description from "../Components/Description";
import Reviews from "../Components/Reviews";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addToCartSuccessed, fetchProductSuccess } from "../redux/userSlice";

export default function GetSingleProduct() {
  const [singleProduct, setSingleProductData] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const [activeComponent, setActiveComponent] = useState("Description");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Description":
        return <Description />;
      case "Reviews":
        return <Reviews />;
      default:
        return <Description />;
    }
  };

  const fetchingSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://ecnew-1.onrender.com/api/v1/product/get-product/${params.productId}`
      );
      setSingleProductData(res.data);
      dispatch(fetchProductSuccess(res.data.data));

      // Fetch related products
      fetchRelatedProducts(res.data.data.category, res.data.data._id);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const fetchRelatedProducts = async (category, productId) => {
    try {
      const res = await axios.post(`https://ecnew-1.onrender.com/api/v1/user/recommended`, {
        category,
        productId,
      });
      setRelatedProducts(res.data.recommendations);
    } catch (error) {
      toast.error("Could not fetch related products.");
    }
  };

  useEffect(() => {
    fetchingSingleProduct();
  }, []);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Product Image and Details */}
          <div className="w-full md:w-2/3">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-mono mb-2">
                {singleProduct.data?.productName}
              </h1>
              <div className="relative mb-4">
                <span className="absolute top-0 left-0 bg-red-700 text-white px-2 py-1 text-xs rounded-br-lg">
                  SALE!
                </span>
                <img
                  src={singleProduct.data?.productImages[0] || begs}
                  alt={singleProduct.data?.productName}
                  className="w-full h-80 rounded-lg shadow-md"
                />
              </div>
              <div className="flex items-center justify-center text-lg font-bold mb-5">
                <span className="line-through text-gray-500 mr-2">
                  Rs.{singleProduct.data?.costPrice}
                </span>
                <span className="text-red-600 ml-4">
                  Rs.{singleProduct.data?.sellPrice}
                </span>
              </div>
              <div className="flex justify-around">
                <button
                  onClick={() => setActiveComponent("Description")}
                  className={`p-2 rounded-full text-white ${
                    activeComponent === "Description"
                      ? "bg-red-600"
                      : "bg-black hover:bg-red-600"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveComponent("Reviews")}
                  className={`p-2 rounded-full text-white ${
                    activeComponent === "Reviews"
                      ? "bg-red-600"
                      : "bg-black hover:bg-red-600"
                  }`}
                >
                  Reviews (0)
                </button>
              </div>
              <div className="mt-4">{renderComponent()}</div>
            </div>
          </div>

          {/* Related Products */}
          <div className="w-full md:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Related Products</h2>
              {relatedProducts.map((product, index) => (
                <div key={index} className="flex items-center mb-4 border-b pb-4">
                  <Link to={`/product/${product._id}`} className="w-24">
                    <img
                      src={product.productImages[0] || begs}
                      alt={product.productName}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-sm">{product.productName}</p>
                    <div className="flex items-center mt-2">
                      <span className="line-through text-gray-500 mr-2">
                        Rs.{product.costPrice}
                      </span>
                      <span className="text-red-600 font-bold">Rs.{product.sellPrice}</span>
                    </div>
                    <button className="mt-2 bg-black text-white px-2 py-1 rounded-lg hover:bg-red-600">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
