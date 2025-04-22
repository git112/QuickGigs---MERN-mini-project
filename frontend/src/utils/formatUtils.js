/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string 
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Calculate time remaining from now until deadline
 * @param {string} deadlineString - ISO date string of deadline
 * @returns {string} Human-readable time remaining
 */
export const getTimeRemaining = (deadlineString) => {
  const deadline = new Date(deadlineString);
  const now = new Date();
  
  // If deadline has passed
  if (deadline < now) {
    return 'Expired';
  }
  
  const diffTime = Math.abs(deadline - now);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} left`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  } else {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
  }
};

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Get category color class based on category name
 * @param {string} category - Category name
 * @returns {string} Tailwind color class
 */
export const getCategoryColorClass = (category) => {
  const categoryMap = {
    'Web Development': 'badge-primary',
    'Mobile App': 'badge-secondary',
    'Design': 'badge-accent',
    'Writing': 'badge-success',
    'Marketing': 'badge-warning',
    'Other': 'badge bg-gray-100 text-gray-700',
  };
  
  return categoryMap[category] || 'badge bg-gray-100 text-gray-700';
};