// routes/tagcount.js
const express = require('express');
const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const tagCounts = await Workout.aggregate([
      { $group: { _id: "$reps", count: { $sum: 1 } } }
    ]);
    res.status(200).json(tagCounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tag counts' });
  }
});

module.exports = router;
