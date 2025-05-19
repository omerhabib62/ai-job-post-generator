import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

// Main Pages
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Job Posts Pages
import { GenerateJobPostPage } from "./pages/job-posts/GenerateJobPostPage";
import { JobPostsListPage } from "./pages/job-posts/JobPostsListPage";
import { JobPostDetailPage } from "./pages/job-posts/JobPostDetailPage";

function AppWithFullFunctionality() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Wrap the entire app initialization in a try/catch
    try {
      console.log("App with full functionality mounted");
    } catch (error: any) {
      console.error("Fatal error initializing app:", error);
      setErrorMessage(
        error?.message || "Unknown error initializing application"
      );
      setHasError(true);
    }
  }, []);

  // Show error state if something critical failed
  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 max-w-md bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-700 mb-4">
            {errorMessage ||
              "There was an error loading the application. Please try again later."}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Normal app rendering
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/job-posts">
              <Route index element={<JobPostsListPage />} />
              <Route path="generate" element={<GenerateJobPostPage />} />
              <Route path=":id" element={<JobPostDetailPage />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            {/* Add admin routes here when needed */}
          </Route>

          {/* 404 Page */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWithFullFunctionality;
