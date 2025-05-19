import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

export const LandingPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Create Professional Job Descriptions In Seconds
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our AI-powered tool helps you generate compelling job postings with
            just a few clicks. Save time and attract top talent with
            professionally crafted job descriptions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth/register"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg"
            >
              Get Started For Free
            </Link>
            <Link
              to="/auth/login"
              className="bg-blue-700 text-white border border-white hover:bg-blue-600 px-6 py-3 rounded-md font-medium text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Enter Job Details</h3>
              <p className="text-gray-600">
                Input basic information about the position like company name,
                role, and required skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">AI Generation</h3>
              <p className="text-gray-600">
                Our intelligent system creates a professional and compelling job
                description in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Review & Publish</h3>
              <p className="text-gray-600">
                Edit if needed, then save or copy your professional job
                description to use anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Create professional job descriptions in seconds instead of
                hours.
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Professional Quality</h3>
              <p className="text-gray-600">
                AI-generated content that sounds natural and professional.
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
              <p className="text-gray-600">
                Edit any part of the generated job description to match your
                needs.
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Store & Manage</h3>
              <p className="text-gray-600">
                Save all your job descriptions in one place for easy access.
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">
                Copy to clipboard for posting on job boards or your website.
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Industry Best Practices
              </h3>
              <p className="text-gray-600">
                Descriptions follow recruiting standards to attract qualified
                candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Better Job Descriptions?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of recruiters and hiring managers who are saving time
            and improving their hiring process.
          </p>
          <Link
            to="/auth/register"
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg"
          >
            Get Started For Free
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};
