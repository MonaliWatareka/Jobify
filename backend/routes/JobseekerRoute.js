const express = require("express");
const router = express.Router();
const {
  addJobseeker,
  displayAllJobseekers,
  displayJobseekerById,
  updateJobseeker,
  deleteJobseeker,
} = require("../controllers/JobseekerController.js");

// Add a new Jobseeker
router.post("/add-jobseeker", addJobseeker);

// Get all Jobseekers
router.get("/all-jobseekers", displayAllJobseekers);

// Get a single Jobseeker by ID
router.get("/single-jobseeker/:id", displayJobseekerById);

// Update a Jobseeker by ID
router.put("/update-jobseeker/:id", updateJobseeker);

// Delete a Jobseeker by ID
router.delete("/delete-jobseeker/:id", deleteJobseeker);

module.exports = router;
