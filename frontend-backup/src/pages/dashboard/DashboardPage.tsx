import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useAuth } from "../../contexts/AuthContext";
import { jobPostService } from "../../services/job-post.service";
import { JobPost } from "../../types";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const { user } = useAuth();
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const posts = await jobPostService.getMyJobPosts();
        setJobPosts(posts);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            to="/job-posts/generate"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate New Job Post
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
          <p className="mb-4">
            This is your dashboard where you can manage and create job posts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Quick Stats</h3>
              <p>Total job posts: {jobPosts.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Generate a Job Post</h3>
              <p>
                Create professional job descriptions in seconds using our
                AI-powered generator.
              </p>
              <Link
                to="/job-posts/generate"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                Get started →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Recent Job Posts</h2>
          {isLoading ? (
            <p>Loading your job posts...</p>
          ) : jobPosts.length === 0 ? (
            <div className="text-center py-6">
              <p className="mb-4">You haven't created any job posts yet.</p>
              <Link
                to="/job-posts/generate"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Your First Job Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobPosts.slice(0, 5).map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 rounded-md p-4 hover:bg-gray-50"
                >
                  <Link to={`/job-posts/${post._id}`}>
                    <h3 className="font-medium text-lg text-blue-600 hover:underline">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {post.company}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {post.location}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {post.jobType}
                    </span>
                  </div>
                </div>
              ))}
              {jobPosts.length > 5 && (
                <div className="text-center pt-4">
                  <Link
                    to="/job-posts"
                    className="text-blue-600 hover:underline"
                  >
                    View all job posts →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
