import mongoose from 'mongoose';

// Applicant schema (embedded document)
const applicantSchema = new mongoose.Schema(
  {
    freelancerName: {
      type: String,
      required: [true, 'Freelancer name is required'],
      trim: true,
    },
    shortMessage: {
      type: String,
      required: [true, 'Application message is required'],
      trim: true,
      maxlength: [500, 'Message cannot be more than 500 characters'],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

// Gig schema
const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Web Development', 'Mobile App', 'Design', 'Writing', 'Marketing', 'Other'],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: [5, 'Budget must be at least $5'],
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
      validate: {
        validator: function(value) {
          return value > Date.now();
        },
        message: 'Deadline must be a future date',
      },
    },
    postedBy: {
      type: String,
      required: [true, 'Name of poster is required'],
      trim: true,
    },
    applicants: [applicantSchema],
  },
  {
    timestamps: true,
  }
);

// Create index for searching
gigSchema.index({ title: 'text', description: 'text', category: 'text' });

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;