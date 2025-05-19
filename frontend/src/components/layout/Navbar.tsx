import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            Job Post Generator
          </Link>
          {isAuthenticated && (
            <div className="hidden md:flex space-x-4">
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/job-posts/generate" className="hover:text-gray-300">
                Generate Job Post
              </Link>
              <Link to="/job-posts" className="hover:text-gray-300">
                My Job Posts
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" className="hover:text-gray-300">
                  Admin
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Hello, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link
                to="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
