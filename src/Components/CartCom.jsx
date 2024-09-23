import { useCallback } from "react";
import Container from "./Container";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/userSlice";
import toast from 'react-hot-toast';

export default function CartCom() {
  const { currentUser, addToCart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cart = addToCart;
  const navigate = useNavigate();

  const handleDeleteItem = (id) => {
    if (id) {
      dispatch(removeFromCart({ _id: id }));
    }
  };

  const calculateTotalAmount = useCallback(() => {
    return cart.reduce(
      (total, item) => total + item.sellPrice * item.quantity,
      0
    );
  }, [cart]);

  axios.defaults.withCredentials = true;

  const handleCheckout = async () => {
    if (cart?.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const totalAmount = calculateTotalAmount();

      const response = await axios.post(
        "https://ecnew-1.onrender.com/api/v1/user/payment",
        { amount: totalAmount }
      );

      if (response.data) {
        const { payment_session_id } = response.data;

        const cashfree = await load({ mode: "sandbox" });

        let checkoutOptions = {
          paymentSessionId: payment_session_id,
          redirectTarget: "_modal",
        };

        cashfree.checkout(checkoutOptions).then(() => {
          console.log("Payment initialized");
          verifyPayment(response.data.order_id);
        });
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed! Please try again.");
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      const res = await axios.post("https://ecnew-1.onrender.com/api/v1/user/verify", {
        orderId: orderId,
      });

      if (res.data[0].payment_status === "SUCCESS") {
        toast.success("Payment verified");

        const paymentData = cart.map((item) => ({
          productName: item.productName,
          productImage: item.productImages[0],
          price: item.sellPrice,
          totalPay: calculateTotalAmount(),
          paymentMethod: "Cashfree",
          quantity: item.quantity,
          owner: currentUser.data._id,
        }));

        const saveRes = await axios.post(
          "https://ecnew-1.onrender.com/api/v1/user/save-payment",
          { payments: paymentData }
        );

        if (saveRes.data.success === true) {
          navigate("/user/orders");
        }
      }
    } catch (error) {
      console.error("Payment verification failed", error);
      // alert("Payment verification failed!");
    }
  };

  return (
    <Container>
      <div className="w-full mt-10 max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Shopping Cart
        </h1>
        <div className="hidden md:flex items-center justify-between text-lg font-semibold border-b pb-4">
          <h1 className="w-2/5">Product</h1>
          <h1 className="w-1/5 text-center">Price</h1>
          <h1 className="w-1/5 text-center">Quantity</h1>
          <h1 className="w-1/5 text-center">Total</h1>
        </div>
        {cart?.length > 0 ? (
          cart.map((item) => (
            <div
              key={item._id}
              className="relative  flex flex-col md:flex-row items-center justify-between mt-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 w-full md:w-2/5">
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <RxCrossCircled size={24} />
                </button>
                <div className="flex items-center gap-4">
                  <img
                    src={item.productImages[0]}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                  <h1 className="text-lg font-medium text-gray-800">
                    {item.productName}
                  </h1>
                </div>
              </div>
              <div className="w-full md:w-1/5 text-center mt-4 md:mt-0">
                <h1 className="text-lg font-medium text-gray-800">
                  ₹{item.sellPrice}
                </h1>
              </div>
              <div className="w-full md:w-1/5 text-center mt-4 md:mt-0">
                <h1 className="text-lg font-medium text-gray-800">
                  {item.quantity}
                </h1>
              </div>
              <div className="w-full md:w-1/5 text-center mt-4 md:mt-0">
                <h1 className="text-lg font-semibold text-gray-800">
                  ₹{item.sellPrice * item.quantity}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <h1 className="text-center text-2xl text-gray-500 mt-10">
              Your cart is empty
            </h1>
            <Link
              to={"/user/orders"}
              className="p-2 w-[100px] bg-green-800 text-white"
            >
              Check your orders
            </Link>
          </div>
        )}

        {cart?.length > 0 && (
          <div className="mt-8 text-center md:text-right">
            <h2 className="text-xl mb-2 md:text-2xl font-bold text-gray-800">
              Total: ₹{calculateTotalAmount()}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* For orders */}
              <div>
                <Link
                  to={"/user/orders"}
                  className="p-2 w-[100px] md:w-[150px] bg-green-800 text-white text-center block rounded-lg hover:bg-green-700 transition-colors"
                >
                  Check your orders
                </Link>
              </div>

              {/* For proceed to checkout */}
              <div>
                {currentUser?.accessToken ? (
                  <button
                    onClick={handleCheckout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <Link
                    to={"/signin"}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
