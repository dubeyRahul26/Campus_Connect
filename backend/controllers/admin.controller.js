import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";
import User from "../models/user.model.js";
import InterviewPrep from "../models/interviewPrep.model.js"; 

export const getAdminStats = async (req, res) => {
  try {
    // JOB STATS
    const totalJobs = await Job.countDocuments();
    const openJobs = await Job.countDocuments({ status: "Open" });
    const closedJobs = await Job.countDocuments({ status: "Closed" });

    // APPLICATION STATS
    const totalApplications = await JobApplication.countDocuments();

    // USER STATS (students only)
    const totalUsers = await User.countDocuments({ role: "student" });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newUsersThisMonth = await User.countDocuments({
      role: "student",
      createdAt: { $gte: startOfMonth },
    });

    // INTERVIEW PREP POSTS (VISIBLE ONLY)
    const totalInterviewPrepPosts =
      await InterviewPrep.countDocuments({
        isHidden: { $ne: true },
      });

    // JOBS WITH APPLICANTS
    const jobsWithApplicants = await Job.aggregate([
      {
        $lookup: {
          from: "jobapplications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      {
        $project: {
          companyName: 1,
          role: 1,
          applicantsCount: { $size: "$applications" },
        },
      },
      { $sort: { applicantsCount: -1 } },
      { $limit: 5 },
    ]);

    // FINAL RESPONSE
    res.json({
      totalJobs,
      openJobs,
      closedJobs,
      totalApplications,
      totalUsers,
      newUsersThisMonth,
      totalInterviewPrepPosts,
      jobsWithApplicants,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};
