import Resume from "../models/resume.model.js";
import ApiError from "../utils/apiError.js";
import parsePdfBuffer from "../utils/parsePdf.js";
import { uploadPdfToCloudinary, deleteFromCloudinary } from "../utils/uploadToCloudinary.js";
import {
  analyzeResume,
  getAtsScore,
  compareResumeWithJd,
  improveResume
} from "../agents/resume.agent.js";

const uploadResume = async (authUserId, file) => {
  const parsedText = await parsePdfBuffer(file.buffer);
  const uploadResult = await uploadPdfToCloudinary(file.buffer, file.originalname);
  const resume = await Resume.create({
    authUserId,
    fileName: file.originalname,
    fileUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    parsedText
  });

  return resume;
};

const getUserResumes = async (authUserId) => {
  return Resume.find({ authUserId }).sort({ createdAt: -1 });
};

const getResumeById = async (authUserId, resumeId) => {
  const resume = await Resume.findOne({ _id: resumeId, authUserId });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  return resume;
};

const deleteResume = async (authUserId, resumeId) => {
  const resume = await getResumeById(authUserId, resumeId);

  await deleteFromCloudinary(resume.publicId);
  await Resume.deleteOne({ _id: resumeId, authUserId });

  return true;
};

const analyzeUserResume = async (authUserId, resumeId) => {
  const resume = await getResumeById(authUserId, resumeId);
  const analysis = await analyzeResume(resume.parsedText);

  return { resumeId: resume._id, analysis };
};

const getUserResumeAtsScore = async (authUserId, resumeId) => {
  const resume = await getResumeById(authUserId, resumeId);
  const atsResult = await getAtsScore(resume.parsedText);

  return { resumeId: resume._id, atsResult };
};

const compareUserResumeWithJd = async (authUserId, resumeId, jobDescription) => {
  const resume = await getResumeById(authUserId, resumeId);
  const comparison = await compareResumeWithJd(resume.parsedText, jobDescription);

  return { resumeId: resume._id, comparison };
};

const improveUserResume = async (authUserId, resumeId) => {
  const resume = await getResumeById(authUserId, resumeId);
  const improvement = await improveResume(resume.parsedText);

  return { resumeId: resume._id, improvement };
};

export {
  uploadResume,
  getUserResumes,
  getResumeById,
  deleteResume,
  analyzeUserResume,
  getUserResumeAtsScore,
  compareUserResumeWithJd,
  improveUserResume
};
