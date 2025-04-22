import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiDollarSign, FiCalendar, FiChevronRight } from 'react-icons/fi';
import Badge from '../ui/Badge';
import { formatCurrency, formatDate, getTimeRemaining, truncateText, getCategoryColorClass } from '../../utils/formatUtils';

const GigCard = ({ gig }) => {
  const {
    _id,
    title,
    description,
    category,
    budget,
    deadline,
    postedBy,
    applicants = [],
    createdAt,
  } = gig;

  // Calculate days ago
  const postedDate = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const postedAgo = diffDays === 0 ? 'Today' : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return (
    <div className="card group hover:translate-y-[-2px] animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Badge 
              variant={category === 'Web Development' ? 'primary' : 
                      category === 'Mobile App' ? 'secondary' : 
                      category === 'Design' ? 'accent' : 
                      category === 'Writing' ? 'success' : 
                      category === 'Marketing' ? 'warning' : 'gray'}
            >
              {category}
            </Badge>
            <span className="text-xs text-gray-500 ml-2">{postedAgo}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <FiClock className="inline-block mr-1" />
            {getTimeRemaining(deadline)}
          </div>
        </div>
        
        <Link to={`/gigs/${_id}`}>
          <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">
          {truncateText(description, 150)}
        </p>
        
        <div className="mt-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center mr-4">
              <FiDollarSign className="mr-1 text-gray-500" />
              <span className="font-medium">{formatCurrency(budget)}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="mr-1 text-gray-500" />
              <span>Due {formatDate(deadline)}</span>
            </div>
          </div>
          
          <div className="mt-2 sm:mt-0 text-sm font-medium text-gray-600">
            {applicants.length} application{applicants.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Posted by <span className="font-medium text-gray-900">{postedBy}</span>
        </div>
        <Link 
          to={`/gigs/${_id}`} 
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          View Details
          <FiChevronRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default GigCard;