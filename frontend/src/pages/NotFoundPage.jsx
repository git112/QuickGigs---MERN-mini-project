import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBriefcase } from 'react-icons/fi';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="primary"
              icon={<FiHome />}
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/gigs">
            <Button
              variant="outline"
              icon={<FiBriefcase />}
              className="w-full sm:w-auto"
            >
              Browse Gigs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;