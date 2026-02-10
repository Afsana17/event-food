const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'paused'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  attendedSessions: {
    type: Number,
    default: 0,
  },
  totalSessions: Number,
  progress: {
    skillLevel: String,
    notes: String,
    milestones: [{
      title: String,
      date: Date,
      achieved: Boolean,
    }],
  },
  performance: [{
    date: Date,
    metrics: Map,
    feedback: String,
  }],
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
