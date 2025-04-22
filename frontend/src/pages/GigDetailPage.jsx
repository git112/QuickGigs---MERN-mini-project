import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiClock, FiMail } from 'react-icons/fi';
import Button from '../components/ui/Button';
import GigDetailCard from '../components/gigs/GigDetailCard';
import ApplicationForm from '../components/freelancers/ApplicationForm';
import { gigApi } from '../api/apiClient';
import toast from 'react-hot-toast';

const GigDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplications, setShowApplications] = useState(false);
  
  useEffect(() => {
    const fetchGig = async () => {
      try {
        setIsLoading(true);
        const response = await gigApi.getById(id);
        setGig(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching gig:', error);
        setError('Failed to load gig. It may not exist or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGig();
  }, [id]);
  
  const handleApplicationSubmit = async () => {
    try {
      const response = await gigApi.getById(id);
      setGig(response.data);
      toast.success('Your application has been submitted successfully!');
    } catch (error) {
      console.error('Error refreshing gig data:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container-custom py-12 min-h-screen">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="bg-white shadow-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-1/6 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-32 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container-custom py-12 min-h-screen">
        <div className="bg-error-50 border border-error-200 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-error-700 mb-2">Error</h2>
          <p className="text-error-600 mb-6">{error}</p>
          <Button 
            variant="primary"
            onClick={() => navigate('/gigs')}
          >
            Browse Other Gigs
          </Button>
        </div>
      </div>
    );
  }
  
  // No gig found
  if (!gig) {
    return (
      <div className="container-custom py-12 min-h-screen">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gig Not Found</h2>
          <p className="text-gray-600 mb-6">The gig you're looking for doesn't exist or has been removed.</p>
          <Button 
            variant="primary"
            onClick={() => navigate('/gigs')}
          >
            Browse Gigs
          </Button>
        </div>
      </div>
    );
  }
  
  // Deadline check
  const isExpired = new Date(gig.deadline) < new Date();
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/gigs" className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium">
            <FiArrowLeft className="mr-2" />
            Back to Gigs
          </Link>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gig details (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <GigDetailCard gig={gig} />

            {/* Applications Section */}
            {gig.postedBy && (
              <div className="mt-8 bg-white shadow-card rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Applications ({gig.applicants?.length || 0})</h3>
                    <Button
                      variant="outline"
                      onClick={() => setShowApplications(!showApplications)}
                    >
                      {showApplications ? 'Hide Applications' : 'Show Applications'}
                    </Button>
                  </div>
                </div>

                {showApplications && gig.applicants && gig.applicants.length > 0 && (
                  <div className="divide-y divide-gray-100">
                    {gig.applicants.map((applicant, index) => (
                      <div key={index} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-primary-600" />
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-medium text-gray-900">{applicant.freelancerName}</h4>
                              <p className="text-sm text-gray-500 flex items-center">
                                <FiClock className="mr-1" />
                                Applied {formatDate(applicant.submittedAt)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<FiMail />}
                            onClick={() => window.location.href = `mailto:${applicant.freelancerName.replace(/\s+/g, '.')}@example.com`}
                          >
                            Contact
                          </Button>
                        </div>
                        <div className="mt-4 text-gray-700 bg-gray-50 rounded-lg p-4">
                          {applicant.shortMessage}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showApplications && (!gig.applicants || gig.applicants.length === 0) && (
                  <div className="p-6 text-center text-gray-500">
                    No applications yet. Be the first to apply!
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Application form (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            {isExpired ? (
              <div className="bg-warning-50 border border-warning-200 rounded-xl p-6 text-center animate-fade-in">
                <h3 className="text-xl font-bold text-warning-700 mb-2">This Gig Has Expired</h3>
                <p className="text-warning-600 mb-4">
                  The deadline for this gig has passed. Browse other available gigs.
                </p>
                <Link to="/gigs">
                  <Button variant="primary">
                    Find More Gigs
                  </Button>
                </Link>
              </div>
            ) : (
              <ApplicationForm 
                gigId={gig._id} 
                onApplicationSubmit={handleApplicationSubmit} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage;