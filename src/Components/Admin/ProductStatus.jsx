import { useEffect, useState } from "react";
import Container from "../Container";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProductStatus() {
  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  console.log('I am current user from product status', currentUser);

  const getAllUserAndProducts = async () => {
    try {
      const res = await axios.post("https://ecnew-1.onrender.com/api/v1/user/product-status", { id: currentUser.data._id });
      setProducts(res.data.data);
      console.log("data all user and products", res.data);
    } catch (error) {
      alert("Error while getting all user and products");
    }
  };

  useEffect(() => {
    getAllUserAndProducts();
  }, []);

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleUpdateStatus = async (productId, newStatus) => {
    try {
      const res = await axios.post("https://ecnew-1.onrender.com/api/v1/user/updateStatus", {
        productId, 
        newStatus, 
      });

      if (res.data.success) {
        
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, status: newStatus } : product
          )
        );
        alert("Product status updated successfully");
      } else {
        alert("Error updating status: " + res.data.message);
      }
    } catch (error) {
      alert("Error while updating status: " + error.message);
    }
  };

  return (
    <Container>
      <div className="w-[1460px] border-2 h-screen m-auto">
        <div className="p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Pay</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{product.owner.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.owner.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>

                  <td className="border border-gray-300 px-2 py-2">
                    <select
                      value={product.status}
                      onChange={(e) => handleUpdateStatus(product._id, e.target.value)} // Pass productId and newStatus
                      className="border border-gray-300 p-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="border border-gray-300 px-4 py-2">{product.totalPay}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDateTime(product.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
