import React, { useState } from 'react';
import { FiUser, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { gigApi } from '../../api/apiClient';

const ApplicationForm = ({ gigId, onApplicationSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    freelancerName: '',
    shortMessage: '',
  });
  
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
    
    if (!formData.freelancerName.trim()) {
      newErrors.freelancerName = 'Your name is required';
    }
    
    if (!formData.shortMessage.trim()) {
      newErrors.shortMessage = 'A message is required';
    } else if (formData.shortMessage.length < 20) {
      newErrors.shortMessage = 'Message should be at least 20 characters';
    } else if (formData.shortMessage.length > 500) {
      newErrors.shortMessage = 'Message cannot exceed 500 characters';
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
      await gigApi.apply(gigId, formData);
      
      toast.success('Your application was submitted successfully!');
      setFormData({
        freelancerName: '',
        shortMessage: '',
      });
      
      if (onApplicationSubmit) {
        onApplicationSubmit();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white shadow-card rounded-xl overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Apply for This Gig</h2>
        <p className="text-gray-600 mt-1">Submit your application to the client</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Freelancer Name */}
        <div>
          <label htmlFor="freelancerName" className="form-label">
            <div className="flex items-center">
              <FiUser className="mr-2 text-gray-500" />
              Your Name
            </div>
          </label>
          <input
            type="text"
            id="freelancerName"
            name="freelancerName"
            value={formData.freelancerName}
            onChange={handleChange}
            className={`form-input ${errors.freelancerName ? 'ring-error-500' : ''}`}
            placeholder="e.g., Jane Smith"
          />
          {errors.freelancerName && (
            <p className="form-error flex items-center mt-1">
              <FiAlertCircle className="mr-1" /> {errors.freelancerName}
            </p>
          )}
        </div>
        
        {/* Cover Message */}
        <div>
          <label htmlFor="shortMessage" className="form-label">
            <div className="flex items-center">
              <FiMessageSquare className="mr-2 text-gray-500" />
              Cover Message
            </div>
          </label>
          <textarea
            id="shortMessage"
            name="shortMessage"
            value={formData.shortMessage}
            onChange={handleChange}
            rows="4"
            className={`form-input ${errors.shortMessage ? 'ring-error-500' : ''}`}
            placeholder="Explain why you're a good fit for this project. Highlight your relevant skills and experience."
          ></textarea>
          <div className="mt-1 flex justify-between">
            {errors.shortMessage ? (
              <p className="form-error flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.shortMessage}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                {formData.shortMessage.length}/500 characters
              </p>
            )}
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  );
};

export default ApplicationForm;