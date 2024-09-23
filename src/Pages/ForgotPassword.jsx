import React, { useState } from 'react';
import axios from 'axios';
import Container from '../Components/Container';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://ecnew-1.onrender.com/api/v1/user/forgot-password', { email });
      console.log("res from forgot frontend",response);
      

      if (response.data.success) {
        toast.success('Password reset link sent to your email.');
      } else {
        toast.error(response.data.message || 'An error occurred.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Send Password Reset Link'}
        </button>
      </form>
    </Container>
  );
}
