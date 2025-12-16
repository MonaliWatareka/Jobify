const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, "Please enter a valid phone number"],
    default: "0000000000",
  },
  age: {
    type: Number,
    required: true,
    min: 23,
    max: 60,
  },
  gender: {
    type: String,
    required: true,
  },
  noticeperiod: {
    type: String,
    default: "Not Selected",
  },
  availablestartdate: {
    type: String,
    required: true,
  },
  currentjobtitle: {
    type: String,
    required: true,
  },
  desiredpay: {
    type: String,
    required: true,
  },
  uploadresume: {
    type: String,
    required: true,
  },
});

const jobseekerModel = mongoose.model("Jobseeker", jobseekerSchema);

module.exports = jobseekerModel;
