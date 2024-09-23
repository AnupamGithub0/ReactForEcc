import { useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

function CashfeeTest() {
  let cashfree;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  insitialzeSDK();

  const [orderId, setOrderId] = useState("");

  const getSessionId = async () => {
    try {
      const res = await axios.get("https://ecommercebackend02.onrender.com/api/v1/user/payment");

      setOrderId(res.data.order_id);
      return res.data.payment_session_id;
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await axios.post("https://ecommercebackend02.onrender.com/api/v1/user/verify", {
        orderId: orderId,
      });
      console.log("verify get", res.data);

      if (res && res.data) {
        alert("payment verified");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const sessionId = await getSessionId();
    let checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    };

    cashfree.checkout(checkoutOptions).then(() => {
      verifyPayment(orderId);
    });
  };

  return (
    <>
      <h1>Welcome to cashfree</h1>
      <div className="card">
        <button onClick={handlePay}>buy</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default CashfeeTest;
