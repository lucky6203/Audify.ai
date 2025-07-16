import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate(); // ✅ Correct placement

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('userEmail', res.data.email);
      if (onLoginSuccess) onLoginSuccess(res.data.email);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
        <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
        <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 border-2 border-gray-200 focus:border-blue-400 rounded-lg h-12"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium">
            Login
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
