import { useEffect, useState } from "react";
import Container from "./Container";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CartOrders() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const fetchingBuyProducts = async () => {
    if (currentUser?.data?._id) {
      try {
        const res = await axios.get(
          `https://ecnew-1.onrender.com/api/v1/user/get-orders/${currentUser.data._id}`
        );
        if (res.data.success == true) {
          setOrders(res.data?.data);
        }
      } catch (error) {
        alert("Error while fetching buy products");
      }
    }
  };

  useEffect(() => {
    fetchingBuyProducts();
  }, [currentUser]);

  //  date and time
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6 p-3">Orders</h1>
      {orders?.length === 0 ? (
        <div className="text-4xl text-blue-500 flex items-center justify-center">
          EMPTY!
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className={`flex items-center p-4 border rounded-lg shadow-md ${
                order.status === "Delivered"
                  ? "bg-green-200"
                  : order.status === "Shipped"
                  ? "bg-blue-100"
                  : order.status === "Pending"
                  ? "bg-yellow-100"
                  : order.status === "Cancelled"
                  ? "bg-red-100"
                  : "bg-gray-100" 
              }`}
            >
              <img
                src={order.productImage || "/path-to-fallback-image.jpg"}
                alt={order.productName}
                className="w-24 h-24 object-cover rounded-lg border border-gray-300 mr-6"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {order.productName}
                </h2>
                <p className="text-gray-700 font-bold mb-1">
                  Price: ₹{order.totalPay}
                </p>
                <p className="text-gray-600 mb-1">Quantity: {order.quantity}</p>
                <p className="text-gray-600 mb-1">
                  Date & Time:{" "}
                  <span className="font-semibold">
                    {formatDateTime(order.createdAt)}
                  </span>
                </p>
                <p className="text-gray-600">
                  Status:
                  <span
                    className={`font-bold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {" "}
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
