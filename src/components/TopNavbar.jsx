import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react'; // ✅ Hamburger & close icons

export const TopNavbar = ({ onLoginClick, onSignupClick }) => {
  const [userEmail, setUserEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ✅ Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/b83c6f6a-f681-4c31-a9c8-bdc0e81796e2.png"
              alt="Audify Logo"
              className="h-[50px] w-[50px] object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Audify.Ai
            </span>
          </div>

          {/* ✅ Hamburger Icon (mobile only) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? (
                <X className="w-6 h-6 text-blue-600" />
              ) : (
                <Menu className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>

          {/* ✅ Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {userEmail ? (
              <>
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

        {/* ✅ Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col items-start space-y-3 md:hidden">
            {userEmail ? (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full h-10 w-10 flex items-center justify-center text-lg shadow-md">
                  {userEmail[0]?.toUpperCase()}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-red-600 border-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onLoginClick}
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                >
                  Login
                </Button>
                <Button
                  onClick={onSignupClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
