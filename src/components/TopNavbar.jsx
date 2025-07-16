import React, { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TopNavbar = ({ onLoginClick, onSignupClick }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check for logged-in user email in localStorage
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.reload(); // reload page to reset UI
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Audify Verse
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <>
                {/* User Avatar */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full h-10 w-10 flex items-center justify-center text-lg shadow-md">
                  {userEmail[0]?.toUpperCase()}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="rounded-full px-4 py-2 text-red-600 border-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onLoginClick}
                  className="rounded-full px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Login
                </Button>
                <Button
                  onClick={onSignupClick}
                  className="rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
