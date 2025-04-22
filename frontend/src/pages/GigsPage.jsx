import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiPlus, FiX, FiRefreshCw, FiCheck } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GigList from '../components/gigs/GigList';
import { gigApi } from '../api/apiClient';

const GigsPage = () => {
  // State for gigs and loading
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Available categories and sort options
  const categories = [
    'Web Development',
    'Mobile App',
    'Design',
    'Writing',
    'Marketing',
    'Other'
  ];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget_high', label: 'Highest Budget' },
    { value: 'budget_low', label: 'Lowest Budget' },
    { value: 'deadline', label: 'Deadline (Soonest)' }
  ];
  
  // Fetch gigs with current filters
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setIsLoading(true);
        
        // Build query parameters
        const params = {};
        if (searchQuery) params.query = searchQuery;
        if (activeCategory) params.category = activeCategory;
        if (sortBy) params.sortBy = sortBy;
        
        const response = await gigApi.getAll(params);
        setGigs(response.data.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching gigs:', error);
        setError('Failed to load gigs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGigs();
  }, [searchQuery, activeCategory, sortBy]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already triggered by the useEffect
  };
  
  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? '' : category);
  };
  
  // Handle sort selection
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('');
    setSortBy('newest');
  };
  
  // Toggle filter visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-700 text-white py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect Freelance Gig</h1>
            <p className="text-primary-100 text-lg mb-8">
              Browse through hundreds of opportunities that match your skills and interests
            </p>
            
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for gigs..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-white/10 border border-primary-500 rounded-full py-3 px-5 pl-12 text-white placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-200" size={18} />
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">Available Gigs</h2>
            <p className="text-gray-600">
              {!isLoading && `Showing ${gigs.length} ${gigs.length === 1 ? 'gig' : 'gigs'}`}
              {activeCategory && ` in ${activeCategory}`}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={<FiFilter />}
              onClick={toggleFilters}
              className="md:hidden"
            >
              Filters
            </Button>
            
            <div className="hidden md:block">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="form-input px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <Link to="/gigs/post">
              <Button
                variant="primary"
                icon={<FiPlus />}
              >
                Post a Gig
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar - desktop */}
          <aside className="hidden lg:block col-span-1">
            <div className="bg-white shadow-card rounded-xl p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {(activeCategory || sortBy !== 'newest') && (
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <FiRefreshCw size={14} className="mr-1" />
                    Reset
                  </button>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        activeCategory === category
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category}</span>
                      {activeCategory === category && (
                        <FiCheck className="text-primary-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Sort By</h4>
                <div className="space-y-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <FiCheck className="text-primary-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Mobile filters - shown when filter button is clicked */}
          {showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={toggleFilters}>
              <div 
                className="bg-white h-full w-4/5 max-w-sm p-6 ml-auto animate-slide-up"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`flex w-full items-center justify-between px-3 py-2 rounded-md transition-colors ${
                          activeCategory === category
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{category}</span>
                        {activeCategory === category && (
                          <FiCheck className="text-primary-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full form-input px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-4 mt-auto pt-4">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    fullWidth
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    onClick={toggleFilters}
                    fullWidth
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Active filters - mobile & tablet */}
          {(activeCategory || searchQuery) && (
            <div className="lg:hidden mb-4 flex flex-wrap gap-2">
              {activeCategory && (
                <Badge variant="primary" className="pl-2 pr-1 py-1 flex items-center">
                  {activeCategory}
                  <button
                    onClick={() => setActiveCategory('')}
                    className="ml-1 p-1 hover:bg-primary-100 rounded-full"
                  >
                    <FiX size={14} />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 p-1 hover:bg-secondary-100 rounded-full"
                  >
                    <FiX size={14} />
                  </button>
                </Badge>
              )}
              {(activeCategory || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                >
                  <FiRefreshCw size={14} className="mr-1" />
                  Reset all
                </button>
              )}
            </div>
          )}
          
          {/* Gigs list */}
          <div className="lg:col-span-3">
            <GigList gigs={gigs} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigsPage;