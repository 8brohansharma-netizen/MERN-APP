const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const router = express.Router();
const protect = require('../middleware/auth');

router.get("/userlist", async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");
    res.status(200).json({ data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/userdetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findById(id).select("-password");
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/deleteuser/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userId !== id) {
      return res.status(403).json({ error: "You can only delete your own account" });
    }

    const userData = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "User deleted successfully", data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.patch("/updateuser/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    if (req.userId !== id) {
      return res.status(403).json({ error: "You can only update your own account" });
    }

    const updatedData = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;