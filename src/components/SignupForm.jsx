import React, { useState } from 'react';
import { Mail, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const SignupForm = ({ onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setLoading(true);
const response = await axios.post("https://audif-server.onrender.com/api/signup", {
  email,
  password,
});


      if (response.status === 201) {
        alert('Signup successful! Redirecting to login...');
        navigate('/login'); // ✅ Correct lowercase path
      }
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred during signup.';
      alert(`Signup failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
          <Card className="w-full max-w-md mx-auto mt-20 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 relative">
              <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 ">
                <X className="h-5 w-5" />
              </button>
              <CardTitle className="text-2xl font-bold text-gray-800">Signup</CardTitle>
              <p className="text-gray-600 mt-2"> Create your account to get started with Audify Verse.</p>
            </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg h-12  text-black"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg h-12 text-black"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg h-12 text-black"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Switch to login */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
