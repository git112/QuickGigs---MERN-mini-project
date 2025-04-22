import express from 'express';
import {
  getGigs,
  getGigById,
  createGig,
  applyToGig,
  getGigsByCategory,
  searchGigs,
} from '../controllers/gigController.js';

const router = express.Router();

// Get all gigs with optional filtering
router.get('/', getGigs);

// Get gigs by category
router.get('/category/:category', getGigsByCategory);

// Search gigs
router.get('/search', searchGigs);

// Get a single gig by ID
router.get('/:id', getGigById);

// Create a new gig
router.post('/', createGig);

// Apply to a gig
router.post('/:id/apply', applyToGig);

export default router;