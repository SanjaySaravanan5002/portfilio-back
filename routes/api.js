const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   GET /api/status
// @desc    Check backend status
// @access  Public
router.get('/status', (req, res) => {
  res.json({ status: 'online', message: 'Sanjeeth\'s portfolio backend is active.' });
});

// @route   POST /api/contact
// @desc    Submit a contact form query
// @access  Public
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and message.' });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject: subject || 'No Subject',
      message,
    });

    return res.status(201).json({
      success: true,
      data: newContact,
      message: 'Message saved successfully!'
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, error: 'Server Error. Could not submit message.' });
  }
});

// @route   GET /api/projects
// @desc    Get all projects (mocked or database items)
// @access  Public
router.get('/projects', (req, res) => {
  res.json([
    {
      id: 'nesto',
      title: 'Nesto App',
      tag: 'Productivity Platform',
      features: ['Personal Notes', 'Authentication', 'Cloud Storage', 'CRUD Operations'],
      tech: ['Flutter', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
      category: 'Mobile'
    },
    {
      id: 'life',
      title: 'Life App',
      tag: 'Social Communication Platform',
      features: ['Real-time Messaging', 'Authentication', 'Media Sharing', 'User Management'],
      tech: ['Flutter', 'React', 'Socket.io', 'Node.js', 'MongoDB'],
      category: 'Mobile/Web'
    }
  ]);
});

module.exports = router;
