const mongoose = require("mongoose");
const validator = require("validator");
const jobseekerModel = require("../models/jobseekerModel.js");

// Add a new Jobseeker
const addJobseeker = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      phone,
      age,
      gender,
      noticeperiod,
      availablestartdate,
      currentjobtitle,
      desiredpay,
      uploadresume,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !address ||
      !email ||
      !phone ||
      !age ||
      !gender ||
      !availablestartdate ||
      !currentjobtitle ||
      !desiredpay ||
      !uploadresume
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
      return res.json({ success: false, message: "Invalid phone number" });
    }

    // Validate age
    if (age < 23 || age > 60) {
      return res.json({ success: false, message: "Age must be between 23 and 60" });
    }

    const jobseekerData = {
      name,
      address,
      email,
      phone,
      age,
      gender,
      noticeperiod: noticeperiod || "Not Selected",
      availablestartdate,
      currentjobtitle,
      desiredpay,
      uploadresume,
    };

    const newJobseeker = new jobseekerModel(jobseekerData);
    await newJobseeker.save();

    res.json({ success: true, message: "Jobseeker added", jobseeker: newJobseeker });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error: " + error.message });
  }
};

// Display all Jobseekers
const displayAllJobseekers = async (req, res) => {
  try {
    const allJobseekers = await jobseekerModel.find();
    res.json({ success: true, jobseekers: allJobseekers });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Display single Jobseeker by ID
const displayJobseekerById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobseeker = await jobseekerModel.findById(id);

    if (!jobseeker) {
      return res.json({ success: false, message: "Jobseeker not found" });
    }

    res.json({ success: true, jobseeker });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Jobseeker by ID
const updateJobseeker = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Optional: Validate email and phone if provided
    if (updatedData.email && !validator.isEmail(updatedData.email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (updatedData.phone && !/^\d{10}$/.test(updatedData.phone)) {
      return res.json({ success: false, message: "Invalid phone number" });
    }

    const updatedJobseeker = await jobseekerModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedJobseeker) {
      return res.json({ success: false, message: "Jobseeker not found" });
    }

    res.json({ success: true, message: "Jobseeker updated", jobseeker: updatedJobseeker });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete Jobseeker by ID
const deleteJobseeker = async (req, res) => {
  try {
    const { id } = req.params;
    await jobseekerModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Jobseeker deleted" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addJobseeker,
  displayAllJobseekers,
  displayJobseekerById,
  updateJobseeker,
  deleteJobseeker,
};




