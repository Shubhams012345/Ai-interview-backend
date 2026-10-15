import Job from "../models/job.model.js";

const sampleJobs = [
  {
    title: "Junior Node.js Developer",
    company: "TechNova",
    location: "Remote",
    description: "Work on Express APIs, MongoDB, and basic AI features.",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
    experienceLevel: "Fresher",
    jobType: "Full-time"
  },
  {
    title: "Frontend React Developer",
    company: "Pixel Labs",
    location: "Bengaluru",
    description: "Build UI screens for a job search platform.",
    skills: ["React", "JavaScript", "CSS"],
    experienceLevel: "Fresher",
    jobType: "Full-time"
  },
  {
    title: "Backend Engineer",
    company: "CloudWorks",
    location: "Hyderabad",
    description: "Build microservices with Node.js and Redis caching.",
    skills: ["Node.js", "MongoDB", "Redis", "Docker"],
    experienceLevel: "1-3 years",
    jobType: "Full-time"
  }
];

const seedJobsIfEmpty = async () => {
  const jobCount = await Job.countDocuments();

  if (jobCount > 0) {
    return;
  }

  await Job.insertMany(sampleJobs);
  console.log("Sample jobs added");
};

export default seedJobsIfEmpty;
