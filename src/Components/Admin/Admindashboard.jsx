import { Link } from "react-router-dom";
import Container from "../Container";

export default function Admindashboard() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Add your dashboard content here */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <p className="text-lg text-gray-600">
            Welcome to the Admin Dashboard! Here you can manage your products, view analytics, and configure settings.
          </p>

          {/* Example buttons or links */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to={"create-product"} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Manage Products
            </Link>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Delete-product
            </button>
            <Link to={"product-status"} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
             product-status
            </Link>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
