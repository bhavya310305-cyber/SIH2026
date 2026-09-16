require("dotenv").config();
const express = require("express");
const pool = require("../connection");
const jwt = require("jsonwebtoken");
const router = express.Router();

const {
  handleGetUser,
  getProjects,
  getProgressUpdates,
  getEmergencyReports,
  postProjectUpdate,
  postEmergencyReport,
  getMonitoringMetrics
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRole");

router.get("/getUser/:id", authenticateToken, handleGetUser);

router.get(
  "/getprojects",
  authenticateToken,
  checkRole("MP"),
  getProjects
);

router.get(
  "/getProgressUpdates/:project_id",
  authenticateToken,
  getProgressUpdates,
);

router.get(
  "/getEmergencyReports/:project_id",
  authenticateToken,
  getEmergencyReports,
);

router.post("/postupdates", authenticateToken, postProjectUpdate);

router.post("/postemergency", authenticateToken, postEmergencyReport);

router.get(
  "/getMonitoringMetrics",
  authenticateToken,
  checkRole("MP"),
  getMonitoringMetrics
);

module.exports = router;
