import { Link, useParams } from "react-router-dom";
import Container from "../Components/Container";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import army from "../assets/army.jpg";
import { useDispatch } from "react-redux";
import { addToCartSuccessed } from "../redux/userSlice";

export default function CategoriesProducts() {
  const params = useParams();
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchingCategoriesProduct = async () => {
    try {
      const res = await axios.get(
        `https://ecnew-1.onrender.com/api/v1/product/all-products/${params.category}`
      );
      setCategoriesProducts(res.data.data);
      // console.log("categoryies",res.data);
      
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchingCategoriesProduct();
  }, []);

  const handleAddToCart = (product) => {
    if (product && product._id) {
      dispatch(addToCartSuccessed(product));
      toast.success("Added to cart!")
    } else {
      console.error("Invalid product data", product);
    }
  };

  return (
    <Container>
      <div className="w-full md:w-[1100px] m-auto">
        <div className="">
          <h1 className="text-4xl capitalize p-3">{params.category}</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {categoriesProducts.map((product) => {
            const discountPercentage = product.costPrice ? (
              ((product.costPrice - product.sellPrice) / product.costPrice) *
              100
            ) : (
              <h1>0</h1>
            );

            return (
              <div
                key={product._id}
                className="w-[45%] md:w-[240px] mt-3 mx-2 h-[390px] md:h-[360px] border"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.productImages}
                    alt=""
                    className="h-[50%] w-full object-full"
                  />
                </Link>
                <div className="p-2">
                  <h1 className="text-sm p-1 bg-red-700 text-white w-fit rounded-full mt-1">
                    STOCK {product.stock}
                  </h1>
                  <p className="font-thin text-[15px] mt-1">{product.productName}</p>
                  <div className="text-sm flex items-center justify-around ">
                    <h1 className="line-through text-[18px] text-gray-500">
                      Rs.{product.costPrice}
                    </h1>
                    <h1 className="text-[18px] text-red-600 font-bold">
                      Rs.{product.sellPrice}
                    </h1>

                   

                  </div>

                  <div className="mt-2">
                      {discountPercentage > 0 && (
                        <div className="text-center">
                          <p className="text-blue-400 text-sm font-bold">
                            Save {discountPercentage.toFixed(0)}%
                          </p>
                        </div>
                      )}
                    </div>


                  <div className="text-center mt-5">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-1 bg-black text-white hover:bg-red-600"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
