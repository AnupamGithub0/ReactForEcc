import { useEffect, useState } from "react";
import Container from "../Components/Container";
import army from "../assets/army.jpg";
import ps5 from "../assets/ps5.jpg";
import game from "../assets/game.jpg";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCartSuccessed, fetchProductSuccess } from "../redux/userSlice";
import toast from "react-hot-toast";

export default function Homepage() {
  const bannerImages = [game, army, ps5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  axios.defaults.withCredentials = true;
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://ecnew-1.onrender.com/api/v1/product/products"
      );
      setProducts(res.data.data);
      dispatch(fetchProductSuccess(res.data.data));
    } catch (error) {
      toast.error("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  axios.defaults.withCredentials = true;
  const fetchingCategory = async () => {
    try {
      const res = await axios.get(
        "https://ecnew-1.onrender.com/api/v1/product/category"
      );
      setCategory(res.data);
      // console.log("data 2.",res.data.data.productName);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchingCategory();
  }, []);

  const handleAddToCart = (product) => {
    if (product && product._id) {
      dispatch(addToCartSuccessed(product));
      navigate("/cart");
      setTimeout(() => {
        toast.success("Added to Cart!");
      }, 700);
    } else {
      console.error("Invalid product data", product);
    }
  };

  return (
    <Container>
      <div className="w-[100%] md:[85%] h-full m-auto mt-3 mb-3">
        <div>
          <div className="w-full p-5 text-center bg-red-500 text-white mb-3">
            <h1 className="font-thin">Best gaming products for low budgets</h1>
          </div>

          {/* banner */}
          <div className="flex w-full h-full overflow-hidden relative">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
                className="h-full w-full min-w-full min-h-full transition-all bg-slate-200"
              >
                <div className="relative">
                  <img
                    src={image}
                    alt={`Banner ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}

            <div className="absolute top-[50%] left-0 flex justify-between w-full px-4">
              <button
                onClick={handlePrevious}
                className="p-2 bg-white rounded-full shadow"
              >
                <GrFormPrevious />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-white rounded-full shadow"
              >
                <MdNavigateNext />
              </button>
            </div>
          </div>
        </div>

        {/* products-category(section) */}
        <div>
          <div className="p-3 bg-red-500 mt-2 text-white font-thin">
            <h1 className="text-center">Products categories</h1>
          </div>
          <div className="mt-3 ml-3 mb-5 flex items-center justify-center flex-wrap">
            {/* first-product */}
            {category?.data?.map((el) => {
              return (
                <div
                  key={el._id}
                  className="w-[45%] md:w-[200px] h-[150px] ml-3 cursor-pointer shadow-md mb-3 border-2"
                >
                  <Link to={`/categories/${el.category}`}>
                    <img
                      src={el.productImages[0]}
                      alt=""
                      className="w-[200px] h-[100px]"
                    />
                  </Link>
                  <h1 className="text-center mt-3">{el.category}</h1>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[100%] md:w-[80%] m-auto">
          <h1 className="text-2xl font-thin mb-2">Featured</h1>
          <div className="flex items-center flex-wrap justify-center">
            {/* products */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-[50vh]">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <div className="ml-2">Loading...</div>
              </div>
            ) : (
              <>
                {products?.map((product) => {
                  const discountPercentage = product.costPrice
                    ? ((product.costPrice - product.sellPrice) /
                        product.costPrice) *
                      100
                    : 0;

                  return (
                    <div
                      key={product._id}
                      className="w-[45%] md:w-[240px] mt-3 mx-2 h-[390px] md:h-[360px] border"
                    >
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.productImages[0]}
                          alt=""
                          className="h-[50%] w-full object-center"
                        />
                      </Link>
                      <div className="p-2">
                        <h1 className="text-sm p-1 bg-red-700 text-white w-fit rounded-full mt-1">
                          STOCK {product.stock}
                        </h1>
                        <p className="font-thin text-[15px]">
                          {product.productName}
                        </p>
                        <div className="text-sm flex items-center justify-around mt-2 ">
                          <h1 className="line-through text-[18px] text-gray-500">
                            Rs.{product.costPrice}
                          </h1>
                          <h1 className="text-[18px] text-red-600 font-bold">
                            Rs.{product.sellPrice}
                          </h1>
                        </div>

                        {discountPercentage > 0 && (
                          <div className="flex items-center justify-end mt-1">
                            <p className="text-blue-400 text-[0.7rem] font-bold">
                              Save {discountPercentage.toFixed(0)}%
                            </p>
                          </div>
                        )}

                        <div className="text-center mt-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-1 bg-blue-900 text-white hover:bg-red-600"
                          >
                            ADDTOCART
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
