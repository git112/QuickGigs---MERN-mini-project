import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase } from 'react-icons/fi';
import Button from '../ui/Button';

const HeroSection = () => {
  const categories = [
    'Web Development',
    'Mobile App',
    'Design',
    'Writing',
    'Marketing',
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-accent-900 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Connect with top freelancers for your next project
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-100">
            FreelanceX makes it easy to post projects and hire expert freelancers, or find your next gig as a freelancer.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gigs/post">
              <Button 
                variant="secondary" 
                size="lg"
                icon={<FiSearch />}
              >
                Post a Gig
              </Button>
            </Link>
            <Link to="/gigs">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                icon={<FiBriefcase />}
              >
                Find Work
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/gigs?category=${category}`}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/10">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <p className="text-3xl font-bold text-white">1000+</p>
              <p className="text-primary-100 text-sm">Active Gigs</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-primary-100 text-sm">Freelancers</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold text-white">$50K+</p>
              <p className="text-primary-100 text-sm">Paid to Freelancers</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-primary-100 text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;