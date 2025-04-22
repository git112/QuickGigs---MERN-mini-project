// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import GigList from '../gigs/GigList';
// import Button from '../ui/Button';
// import { FiArrowRight } from 'react-icons/fi';
// import { gigApi } from '../../api/apiClient';

// const FeaturedGigs = () => {
//   const [gigs, setGigs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         setIsLoading(true);
//         const response = await gigApi.getAll({ limit: 3 });
//         setGigs(response.data);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching gigs:', error);
//         setError('Failed to load featured gigs. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGigs();
//   }, []);

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container-custom">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900">Featured Gigs</h2>
//             <p className="mt-2 text-gray-600">Discover the latest opportunities for freelancers</p>
//           </div>
//           <Link to="/gigs" className="mt-4 md:mt-0">
//             <Button
//               variant="outline"
//               icon={<FiArrowRight />}
//               iconPosition="right"
//             >
//               View All Gigs
//             </Button>
//           </Link>
//         </div>

//         <GigList gigs={gigs} isLoading={isLoading} error={error} />
//       </div>
//     </section>
//   );
// };

// export default FeaturedGigs;