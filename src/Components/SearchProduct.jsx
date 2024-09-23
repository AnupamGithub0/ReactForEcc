import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Container from "./Container";

export default function SearchProduct() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productName = searchParams.get("productName");

  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        const res = await axios.get(
          `https://ecnew-1.onrender.com/api/v1/user/search?productName=${productName}`
        );
        setProducts(res.data.data); 
        // console.log("search data",res.data);
        
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false); 
      }
    };
    if (productName) {
      fetchProducts();
    }
  }, [productName]);

  return (
    <Container>
      <h1 className="text-2xl font-bold">Search Results for `{productName}`</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found for `{productName}`.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {products.map((product) => {
           
            const discountPercentage = product.costPrice
              ? ((product.costPrice - product.sellPrice) / product.costPrice) * 100
              : 0;

            return (
              <div key={product._id} className="border p-3 rounded-md shadow-md">
                <img
                  src={product.productImages[0]}
                  alt={product.productName}
                  className="w-full h-40 rounded-md"
                />
                <h2 className="text-sm text-center font-semibold mt-3">
                  {product.productName}
                </h2>
                <p className="mt-2 text-center text-blue-600 font-bold">
                  Price ₹{product.sellPrice}
                </p>
                {discountPercentage > 0 && (
                  <div className="text-center mt-1">
                    <p className="line-through text-gray-400">
                      ₹{product.costPrice}
                    </p>
                    <p className="text-red-500 font-bold">
                      Save {discountPercentage.toFixed(0)}%
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
