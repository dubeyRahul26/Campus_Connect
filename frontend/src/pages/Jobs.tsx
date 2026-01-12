import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchJobs,
  createJob,
  deleteJob,
  updateJob,
} from "../store/jobsSlice";
import {
  applyToJob,
  fetchMyApplications,
} from "../store/applicationsSlice";
import {
  fetchJobApplicants,
  clearApplicants,
} from "../store/jobApplicantsSlice";

import AuthLoader from "../components/AuthLoader";
import JobsHeader from "../components/jobs/JobsHeader";
import JobsTable from "../components/jobs/JobsTable";
import JobCard from "../components/jobs/JobCard";
import JobModal from "../components/jobs/JobModal";
import EmptyJobsState from "../components/jobs/EmptyJobsState";
import ApplyConfirmModal from "../components/jobs/ApplyConfirmModal";
import DeleteConfirmModal from "../components/jobs/DeleteConfirmModal";
import ApplicantsModal from "../components/jobs/ApplicantsModal";
import toast from "react-hot-toast";

export default function JobsPage() {
  const dispatch = useAppDispatch();
  const { jobs, loading } = useAppSelector((s) => s.jobs);
  const { appliedJobIds, loading: appsLoading } = useAppSelector(
    (s) => s.applications
  );
  const { applicants, loading: applicantsLoading } = useAppSelector(
    (s) => s.jobApplicants
  );
  const { user, checkingAuth } = useAppSelector((s) => s.auth);

  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<any | null>(null);
  const [viewJob, setViewJob] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchMyApplications());
  }, [dispatch]);

  if (checkingAuth) return <AuthLoader fullscreen />;
  if (!user) return null;

  const isAdmin = user.role === "admin";

  if (loading || appsLoading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <AuthLoader />
      </main>
    );
  }

  const onSave = (data: any) => {
    editingJob
      ? dispatch(updateJob({ id: editingJob._id, data }))
      : dispatch(createJob(data));

    setOpen(false);
    setEditingJob(null);
  };

  const confirmApply = async () => {
    if (!applyJob) return;

    await dispatch(applyToJob(applyJob._id));
    dispatch(fetchMyApplications());

    window.open(applyJob.url, "_blank");
    toast.success("Application recorded");

    setApplyJob(null);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    dispatch(deleteJob(deleteId));
    toast.success("Job deleted");
    setDeleteId(null);
  };

  const openApplicants = (job: any) => {
    setViewJob(job);
    dispatch(fetchJobApplicants(job._id));
  };

  const closeApplicants = () => {
    setViewJob(null);
    dispatch(clearApplicants());
  };

  if (jobs.length === 0) {
    return (
      <>
        <EmptyJobsState isAdmin={isAdmin} onAdd={() => setOpen(true)} />
        <JobModal
          open={open}
          job={null}
          onClose={() => setOpen(false)}
          onSave={onSave}
        />
      </>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <JobsHeader isAdmin={isAdmin} onAdd={() => setOpen(true)} />

      {/* Desktop */}
      <div className="hidden sm:block">
        <JobsTable
          jobs={jobs}
          isAdmin={isAdmin}
          appliedJobIds={appliedJobIds}
          onEdit={setEditingJob}
          onDelete={setDeleteId}
          onApply={setApplyJob}
          onViewApplicants={openApplicants}
        />
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            isAdmin={isAdmin}
            applied={appliedJobIds.includes(job._id)}
            onEdit={setEditingJob}
            onDelete={setDeleteId}
            onApply={setApplyJob}
            onViewApplicants={openApplicants} 
          />
        ))}
      </div>

      <JobModal
        open={open || !!editingJob}
        job={editingJob}
        onClose={() => {
          setOpen(false);
          setEditingJob(null);
        }}
        onSave={onSave}
      />

      <ApplyConfirmModal
        open={!!applyJob}
        job={applyJob}
        onCancel={() => setApplyJob(null)}
        onConfirm={confirmApply}
      />

      <DeleteConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <ApplicantsModal
        open={!!viewJob}
        onClose={closeApplicants}
        applicants={applicants}
        loading={applicantsLoading}
      />
    </main>
  );
}
