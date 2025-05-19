import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { jobPostService } from "../../services/job-post.service";
import type { JobPost } from "../../types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const JobPostsListPage = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const posts = await jobPostService.getMyJobPosts();
        setJobPosts(posts);
      } catch (error) {
        console.error("Error fetching job posts:", error);
        toast.error("Failed to load job posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      try {
        await jobPostService.deleteJobPost(id);
        setJobPosts((prev) => prev.filter((post) => post._id !== id));
        toast.success("Job post deleted successfully");
      } catch (error) {
        console.error("Error deleting job post:", error);
        toast.error("Failed to delete job post");
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Job Posts</h1>
          <Link
            to="/job-posts/generate"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create New Job Post
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading job posts...</p>
          </div>
        ) : jobPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-xl font-medium mb-4">No Job Posts Yet</h2>
            <p className="mb-6">You haven't created any job posts yet.</p>
            <Link
              to="/job-posts/generate"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate Your First Job Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/job-posts/${post._id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {post.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {post.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {post.jobType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(post.createdAt ?? "").toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/job-posts/${post._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => post._id && handleDelete(post._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
