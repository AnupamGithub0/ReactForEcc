export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
           
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p className="text-gray-400">Email: anupam@ecommerce.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-700 pt-4 text-center text-gray-400">
            &copy; 2024 Ecommerce. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  