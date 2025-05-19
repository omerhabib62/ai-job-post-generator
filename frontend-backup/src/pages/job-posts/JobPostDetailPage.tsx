import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { JobPostPreview } from "../../components/job-posts/JobPostPreview";
import { jobPostService } from "../../services/job-post.service";
import { JobPost } from "../../types";
import toast from "react-hot-toast";

export const JobPostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobPost = async () => {
      if (!id) return;

      try {
        const post = await jobPostService.getJobPostById(id);
        setJobPost(post);
      } catch (err) {
        console.error("Error fetching job post:", err);
        setError(
          "Failed to load job post. It might have been deleted or you do not have permission to view it."
        );
        toast.error("Failed to load job post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPost();
  }, [id]);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading job post...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        ) : jobPost ? (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{jobPost.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Posted on{" "}
                  {new Date(jobPost.createdAt ?? "").toLocaleDateString()}
                </span>
              </div>
            </div>

            <JobPostPreview jobPost={jobPost} />
          </>
        ) : (
          <div className="bg-yellow-50 text-yellow-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Job Post Not Found</h2>
            <p>The job post you're looking for could not be found.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
