import { useState, type ChangeEvent } from "react";
import axios from "../lib/axios.ts";
import FeedbackDisplay from "../components/resume/FeedbackDisplay.tsx";

interface LearningResource {
  title: string;
  url: string;
}

interface Feedback {
  strengths: string[];
  missingSkills: string[];
  suggestions: string[];
  learningResources: LearningResource[];
}

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select or drop a resume file.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("Job-description", jobDescription);
    setIsUploading(true);

    try {
      const response = await axios.post("/resume-analyze", formData);
      const feedbackObj = JSON.parse(response.data.feedback);
      setUploadSuccess(true);
      setFeedback(feedbackObj);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setFile(null);
      setJobDescription("");
      setUploadSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(e);
          setDragOver(false);
        }}
        className={`
          w-full max-w-xl rounded-2xl border bg-white p-6 sm:p-8
          shadow-sm transition-all
          ${
            dragOver
              ? "border-teal-500 bg-teal-50 ring-4 ring-teal-100"
              : "border-gray-200 hover:border-teal-400"
          }
        `}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Resume Analyzer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Get AI-powered feedback tailored to job roles
          </p>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload Area */}
        <label
          htmlFor="resume-upload"
          className="
            flex flex-col items-center justify-center
            border-2 border-dashed rounded-xl
            px-4 py-6 cursor-pointer
            text-center transition
            border-gray-300 hover:border-teal-500
            bg-gray-50
          "
        >
          <img
            src="/resume-upload-illustration.svg"
            alt="Upload Resume"
            className="w-24 mb-3"
          />

          <p className="font-medium text-gray-700">
            Upload your resume
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PDF or DOCX supported
          </p>

          <div className="mt-3 text-sm text-gray-600">
            {file ? `📄 ${file.name}` : "Click or drag & drop file"}
          </div>
        </label>

        {/* Job Description */}
        <div className="mt-6">
          <label
            htmlFor="job-description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Description
          </label>

          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="
              w-full min-h-[9rem] rounded-lg border
              border-gray-300 bg-white
              p-3 text-sm text-gray-800
              focus:ring-2 focus:ring-teal-500
              focus:border-teal-500
              outline-none resize-none
            "
          />
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || !jobDescription || isUploading}
          className="
            mt-6 w-full rounded-lg
            bg-teal-600 py-2.5
            text-white font-medium
            hover:bg-teal-700
            disabled:opacity-50
            transition-colors
          "
        >
          {isUploading ? "Analyzing..." : "Get AI Feedback"}
        </button>

        {/* Success */}
        {uploadSuccess && (
          <p className="mt-3 text-center text-sm text-teal-600 font-medium">
             Resume submitted successfully
          </p>
        )}
      </form>

      {feedback && (
        <FeedbackDisplay
          feedback={feedback}
          onClose={() => setFeedback(null)}
        />
      )}
    </div>
  );
}



