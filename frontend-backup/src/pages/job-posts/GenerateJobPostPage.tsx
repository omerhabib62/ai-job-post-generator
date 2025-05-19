import { useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { JobPostGenerator } from "../../components/job-posts/JobPostGenerator";
import { JobPostPreview } from "../../components/job-posts/JobPostPreview";
import { JobPost } from "../../types";

export const GenerateJobPostPage = () => {
  const [generatedJobPost, setGeneratedJobPost] = useState<JobPost | null>(
    null
  );

  const handleGenerate = (jobPost: JobPost) => {
    setGeneratedJobPost(jobPost);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create a Job Post</h1>

        <div className="mb-8">
          <JobPostGenerator onGenerate={handleGenerate} />
        </div>

        {generatedJobPost && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <JobPostPreview jobPost={generatedJobPost} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};
