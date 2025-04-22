import Gig from '../models/Gig.js';

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
export const getGigs = async (req, res) => {
  try {
    const { 
      category, 
      query, 
      minBudget, 
      maxBudget, 
      sortBy = 'newest',
      limit = 20,
      page = 1
    } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (query) {
      filter.$text = { $search: query };
    }
    
    // Budget range filter
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }
    
    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'budget_high':
        sort = { budget: -1 };
        break;
      case 'budget_low':
        sort = { budget: 1 };
        break;
      case 'deadline':
        sort = { deadline: 1 };
        break;
      default:
        sort = { createdAt: -1 }; // newest first
    }
    
    // Calculate pagination
    const pageSize = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * pageSize;
    
    // Execute query
    const gigs = await Gig.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(skip);
    
    // Get total count for pagination info
    const total = await Gig.countDocuments(filter);
    
    res.json({
      data: gigs,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get gig by ID
// @route   GET /api/gigs/:id
// @access  Public
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new gig
// @route   POST /api/gigs
// @access  Public
export const createGig = async (req, res) => {
  try {
    const { title, description, category, budget, deadline, postedBy } = req.body;
    
    const gig = await Gig.create({
      title,
      description,
      category,
      budget,
      deadline,
      postedBy,
      applicants: [],
    });
    
    res.status(201).json(gig);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply to a gig
// @route   POST /api/gigs/:id/apply
// @access  Public
export const applyToGig = async (req, res) => {
  try {
    const { freelancerName, shortMessage } = req.body;
    
    // Find the gig
    const gig = await Gig.findById(req.params.id);
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    // Check if deadline has passed
    if (new Date(gig.deadline) < new Date()) {
      return res.status(400).json({ message: 'This gig has expired' });
    }
    
    // Check if freelancer has already applied
    const alreadyApplied = gig.applicants.some(
      applicant => applicant.freelancerName.toLowerCase() === freelancerName.toLowerCase()
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this gig' });
    }
    
    // Add the application
    gig.applicants.push({
      freelancerName,
      shortMessage,
      submittedAt: new Date(),
    });
    
    await gig.save();
    
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get gigs by category
// @route   GET /api/gigs/category/:category
// @access  Public
export const getGigsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const gigs = await Gig.find({ category }).sort({ createdAt: -1 });
    
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search gigs
// @route   GET /api/gigs/search
// @access  Public
export const searchGigs = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const gigs = await Gig.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};