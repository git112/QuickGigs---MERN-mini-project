import React from 'react';
import { FiCalendar, FiDollarSign, FiClock, FiTag, FiUser } from 'react-icons/fi';
import Badge from '../ui/Badge';
import { formatCurrency, formatDate, getTimeRemaining } from '../../utils/formatUtils';

const GigDetailCard = ({ gig }) => {
  const {
    title,
    description,
    category,
    budget,
    deadline,
    postedBy,
    createdAt,
    applicants = [],
  } = gig;

  return (
    <div className="bg-white shadow-card rounded-xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-wrap items-center justify-between mb-3">
          <Badge 
            variant={category === 'Web Development' ? 'primary' : 
                    category === 'Mobile App' ? 'secondary' : 
                    category === 'Design' ? 'accent' : 
                    category === 'Writing' ? 'success' : 
                    category === 'Marketing' ? 'warning' : 'gray'}
            size="lg"
          >
            {category}
          </Badge>
          <div className="text-sm text-gray-500 flex items-center mt-2 sm:mt-0">
            <FiClock className="inline-block mr-1" />
            {getTimeRemaining(deadline)}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      
      {/* Details */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <FiDollarSign className="mr-1 text-gray-500" />
            <span className="font-medium">{formatCurrency(budget)}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiCalendar className="mr-1 text-gray-500" />
            <span>Due by {formatDate(deadline)}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiUser className="mr-1 text-gray-500" />
            <span>Posted by {postedBy}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FiTag className="mr-1 text-gray-500" />
            <span>{applicants.length} application{applicants.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Project Details</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-medium mr-2">Category:</span> {category}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Budget:</span> {formatCurrency(budget)}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Deadline:</span> {formatDate(deadline)}
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Posted on:</span> {formatDate(createdAt)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailCard;