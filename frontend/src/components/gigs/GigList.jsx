import React from 'react';
import GigCard from './GigCard';

const GigList = ({ gigs, isLoading = false, error = null }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mt-4"></div>
            <div className="h-24 bg-gray-200 rounded w-full mt-4"></div>
            <div className="flex justify-between mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-error-700">
        <p className="font-medium">Error loading gigs</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }
  if (!Array.isArray(gigs)) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-error-700">
        <p className="font-medium">Invalid gigs data</p>
        <p className="text-sm mt-1">Expected a list of gigs, but got something else.</p>
      </div>
    );
  }
  
  if (gigs.length === 0)  {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">No gigs found</h3>
        <p className="text-gray-600 mt-2">
          Try adjusting your search or filter criteria, or check back later for new opportunities.
        </p>
      </div>
    );
  }
  
  // Render gig list
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gigs.map((gig) => (
        <GigCard key={gig._id} gig={gig} />
      ))}
    </div>
  );
};

export default GigList;