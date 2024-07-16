const express = require("express");
const {
  updateProfile,
  viewProfile,
  deleteProfile,
  userProfile,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/profile", authenticate, updateProfile);
router.get("/profile", authenticate, viewProfile);
router.get("/userprofile", authenticate, userProfile);
router.delete("/profile", authenticate, deleteProfile);

module.exports = router;
