import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiSearch, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import Button from '../ui/Button';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiFileText className="h-8 w-8 text-primary-600" />,
      title: 'Post a Gig',
      description: 'Describe your project, set your budget, and specify the deadline.',
      forClient: true,
    },
    {
      icon: <FiSearch className="h-8 w-8 text-primary-600" />,
      title: 'Browse Gigs',
      description: 'Search through available gigs and find ones that match your skills.',
      forClient: false,
    },
    {
      icon: <FiMessageSquare className="h-8 w-8 text-primary-600" />,
      title: 'Submit Proposals',
      description: 'Apply to gigs with a compelling proposal highlighting your expertise.',
      forClient: false,
    },
    {
      icon: <FiCheckCircle className="h-8 w-8 text-primary-600" />,
      title: 'Review Applications',
      description: 'Review freelancer applications and choose the best candidate for your project.',
      forClient: true,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            QuickGigs simplifies the process of connecting clients with skilled freelancers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {/* For Clients */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="mb-6">
              <span className="inline-block bg-primary-100 text-primary-800 rounded-full px-4 py-1 text-sm font-medium">
                For Clients
              </span>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">Need work done?</h3>
              <p className="mt-2 text-gray-600">
                Post a gig and find the perfect freelancer for your project
              </p>
            </div>

            <div className="space-y-8">
              {steps.filter(step => step.forClient).map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-50 text-primary-700">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center">
                      {step.icon}
                      <span className="ml-2">{step.title}</span>
                    </h4>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/gigs/post">
                <Button variant="primary" fullWidth>
                  Post a Gig
                </Button>
              </Link>
            </div>
          </div>

          {/* For Freelancers */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="mb-6">
              <span className="inline-block bg-secondary-100 text-secondary-800 rounded-full px-4 py-1 text-sm font-medium">
                For Freelancers
              </span>
              <h3 className="mt-3 text-2xl font-bold text-gray-900">Ready to work?</h3>
              <p className="mt-2 text-gray-600">
                Find gigs that match your skills and start earning
              </p>
            </div>

            <div className="space-y-8">
              {steps.filter(step => !step.forClient).map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary-50 text-secondary-700">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center">
                      {step.icon}
                      <span className="ml-2">{step.title}</span>
                    </h4>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/gigs">
                <Button variant="secondary" fullWidth>
                  Find Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;