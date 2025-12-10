const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/", verifyToken, upload.array("files", 5), reportController.createReport);

router.get("/", verifyToken, reportController.getUserReports);

module.exports = router;
