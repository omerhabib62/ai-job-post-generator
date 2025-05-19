import { useState } from "react";
import { jobPostService } from "../../services/job-post.service";
import toast from "react-hot-toast";
import type { GenerateJobPostRequest, JobPost } from "../../types";

interface JobPostGeneratorProps {
  onGenerate: (jobPost: JobPost) => void;
}

export const JobPostGenerator = ({ onGenerate }: JobPostGeneratorProps) => {
  const [formData, setFormData] = useState<GenerateJobPostRequest>({
    company: "",
    role: "",
    technologies: [],
    location: "",
    jobType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techList = e.target.value.split(",").map((tech) => tech.trim());
    setFormData((prev) => ({ ...prev, technologies: techList }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.role) {
      toast.error("Company name and role are required");
      return;
    }

    setIsLoading(true);

    try {
      const generatedPost = await jobPostService.generateJobPost(formData);
      onGenerate(generatedPost);
      toast.success("Job post generated successfully!");
    } catch (error: any) {
      toast.error("Error generating job post. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Role *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Remote, New York, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="jobType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Type
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Technologies (comma separated)
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies?.join(", ")}
              onChange={handleTechnologiesChange}
              placeholder="e.g., React, Node.js, MongoDB"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {isLoading ? "Generating..." : "Generate Job Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
