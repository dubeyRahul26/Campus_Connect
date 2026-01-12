import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";

/* GET all jobs */
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find()
    .populate("createdBy", "fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(jobs);
};

/* CREATE job (ADMIN) */
export const createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json(job);
};

/* UPDATE job (ADMIN) */
export const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  Object.assign(job, req.body);
  await job.save();

  res.status(200).json(job);
};

/* DELETE job (ADMIN) */
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  await job.deleteOne();
  res.status(200).json({ message: "Job deleted" });
};


/* ================= ADMIN: VIEW APPLICANTS ================= */
export const getJobApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await JobApplication.find({ jobId })
      .populate({
        path: "studentId",
        select: "fullName email branch",
      })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch applicants",
    });
  }
};
