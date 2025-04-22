import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiDollarSign, FiCalendar, FiTag, FiFileText, FiUser, FiAlertCircle } from 'react-icons/fi';
import Button from '../ui/Button';
import { gigApi } from '../../api/apiClient';

const GigForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    postedBy: '',
  });
  
  const categories = [
    'Web Development',
    'Mobile App',
    'Design',
    'Writing',
    'Marketing',
    'Other',
  ];
  
  // Set a minimum deadline of tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDeadlineDate = tomorrow.toISOString().split('T')[0];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title should be at least 10 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 30) {
      newErrors.description = 'Description should be at least 30 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(formData.budget) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }
    
    if (!formData.postedBy.trim()) {
      newErrors.postedBy = 'Your name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format data for API
      const gigData = {
        ...formData,
        budget: Number(formData.budget),
      };
      
      const response = await gigApi.create(gigData);
      
      toast.success('Gig posted successfully!');
      navigate(`/gigs/${response.data._id}`);
    } catch (error) {
      console.error('Error posting gig:', error);
      toast.error(error.response?.data?.message || 'Failed to post gig. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Gig</h1>
        <p className="text-gray-600 mt-1">Fill out the form below to post your project</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="form-label">
            <div className="flex items-center">
              <FiFileText className="mr-2 text-gray-500" />
              Project Title
            </div>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'ring-error-500' : ''}`}
            placeholder="e.g., 'WordPress Website Development' or 'Logo Design for Tech Startup'"
          />
          {errors.title && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.title}
            </p>
          )}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="form-label">
            <div className="flex items-center">
              <FiFileText className="mr-2 text-gray-500" />
              Project Description
            </div>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className={`form-input ${errors.description ? 'ring-error-500' : ''}`}
            placeholder="Describe your project in detail. Include requirements, deliverables, and any other important information."
          ></textarea>
          {errors.description && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.description}
            </p>
          )}
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="category" className="form-label">
            <div className="flex items-center">
              <FiTag className="mr-2 text-gray-500" />
              Category
            </div>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-input ${errors.category ? 'ring-error-500' : ''}`}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.category}
            </p>
          )}
        </div>
        
        {/* Budget */}
        <div>
          <label htmlFor="budget" className="form-label">
            <div className="flex items-center">
              <FiDollarSign className="mr-2 text-gray-500" />
              Budget (USD)
            </div>
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="1"
            step="1"
            className={`form-input ${errors.budget ? 'ring-error-500' : ''}`}
            placeholder="e.g., 500"
          />
          {errors.budget && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.budget}
            </p>
          )}
        </div>
        
        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="form-label">
            <div className="flex items-center">
              <FiCalendar className="mr-2 text-gray-500" />
              Deadline
            </div>
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={minDeadlineDate}
            className={`form-input ${errors.deadline ? 'ring-error-500' : ''}`}
          />
          {errors.deadline && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.deadline}
            </p>
          )}
        </div>
        
        {/* Posted By */}
        <div>
          <label htmlFor="postedBy" className="form-label">
            <div className="flex items-center">
              <FiUser className="mr-2 text-gray-500" />
              Your Name
            </div>
          </label>
          <input
            type="text"
            id="postedBy"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleChange}
            className={`form-input ${errors.postedBy ? 'ring-error-500' : ''}`}
            placeholder="e.g., John Smith"
          />
          {errors.postedBy && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.postedBy}
            </p>
          )}
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/gigs')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting Gig...' : 'Post Gig'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GigForm;