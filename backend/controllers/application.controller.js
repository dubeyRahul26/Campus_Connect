import JobApplication from "../models/jobApplication.model.js";
import Job from "../models/job.model.js";

/* ================= APPLY TO JOB ================= */
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const studentId = req.user._id;

    /* Only students can apply */
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can apply to jobs",
      });
    }

    /* Check job exists */
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    /* Block closed jobs */
    if (job.status === "Closed") {
      return res.status(400).json({
        message: "Applications for this job are closed",
      });
    }

    /* Prevent duplicate application */
    const alreadyApplied = await JobApplication.findOne({
      jobId,
      studentId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    const application = await JobApplication.create({
      jobId,
      studentId,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to apply for job",
    });
  }
};

/* ================= STUDENT DASHBOARD ================= */
export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user._id;

    const applications = await JobApplication.find({ studentId })
      .populate("jobId")
      .sort({ createdAt: -1 });

    /* Remove applications whose job was deleted */
    const validApplications = applications.filter(
      (app) => app.jobId !== null
    );

    res.json(validApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};

/* ================= WITHDRAW APPLICATION ================= */
export const withdrawApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const studentId = req.user._id;

    const application = await JobApplication.findOne({
      _id: applicationId,
      studentId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    await application.deleteOne();

    res.json({
      message: "Application withdrawn successfully",
      applicationId,
      jobId: application.jobId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to withdraw application",
    });
  }
};


/* ================= UPDATE STATUS (ADMIN) ================= */
export const updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const { status } = req.body;

    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

