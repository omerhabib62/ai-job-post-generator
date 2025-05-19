import { MainLayout } from "../components/layout/MainLayout";

export const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium"
        >
          Back to Home
        </a>
      </div>
    </MainLayout>
  );
};
