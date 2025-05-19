import { useState } from "react";
import { JobPost } from "../../types";
import { jobPostService } from "../../services/job-post.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface JobPostPreviewProps {
  jobPost: JobPost;
  editable?: boolean;
}

export const JobPostPreview = ({
  jobPost,
  editable = true,
}: JobPostPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJobPost, setEditedJobPost] = useState<JobPost>(jobPost);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedJobPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techList = e.target.value
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
    setEditedJobPost((prev) => ({ ...prev, technologies: techList }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // If we have an ID, it's an existing post that we're saving
      if (editedJobPost._id) {
        await jobPostService.updateJobPost(editedJobPost._id, editedJobPost);
        toast.success("Job post updated successfully!");
      } else {
        // Otherwise, we're creating a new post
        const savedPost = await jobPostService.createJobPost(editedJobPost);
        toast.success("Job post saved successfully!");
        navigate(`/job-posts/${savedPost._id}`);
      }
      setIsEditing(false);
    } catch (error) {
      toast.error("Error saving job post");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyToClipboard = () => {
    const jobDescription = `
${editedJobPost.title}

Company: ${editedJobPost.company}
Location: ${editedJobPost.location}
Job Type: ${editedJobPost.jobType}

${editedJobPost.description}

Technologies: ${editedJobPost.technologies?.join(", ")}
`;

    navigator.clipboard
      .writeText(jobDescription)
      .then(() => toast.success("Job post copied to clipboard!"))
      .catch(() => toast.error("Failed to copy job post"));
  };

  // Function to render markdown description
  const renderDescription = (text: string) => {
    return { __html: text.replace(/\n/g, "<br />") };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {isEditing ? (
        // Edit Form
        <div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedJobPost.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={editedJobPost.company}
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
                value={editedJobPost.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                value={editedJobPost.jobType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
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
              value={editedJobPost.technologies?.join(", ")}
              onChange={handleTechnologiesChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedJobPost.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              {isSaving ? "Saving..." : "Save Job Post"}
            </button>
          </div>
        </div>
      ) : (
        // Preview Mode
        <div>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{editedJobPost.title}</h2>
            {editable && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {editedJobPost.company}
            </div>
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {editedJobPost.location}
            </div>
            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {editedJobPost.jobType}
            </div>
          </div>

          <div className="mb-6 prose max-w-none">
            <div
              dangerouslySetInnerHTML={renderDescription(
                editedJobPost.description
              )}
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {editedJobPost.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
