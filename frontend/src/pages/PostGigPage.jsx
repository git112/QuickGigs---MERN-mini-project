import React from 'react';
import GigForm from '../components/gigs/GigForm';

const PostGigPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <GigForm />
        </div>
      </div>
    </div>
  );
};

export default PostGigPage;