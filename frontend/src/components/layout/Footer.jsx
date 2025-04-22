import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'About Us', path: '/about' },
      { name: 'How It Works', path: '/how-it-works' },
      { name: 'Success Stories', path: '/success-stories' },
      { name: 'Contact', path: '/contact' },
    ],
    clients: [
      { name: 'Post a Gig', path: '/gigs/post' },
      { name: 'Browse Freelancers', path: '/freelancers' },
      { name: 'Payments', path: '/payments' },
    ],
    freelancers: [
      { name: 'Find Work', path: '/freelancer' },
      { name: 'Resources', path: '/resources' },
      { name: 'Guides', path: '/guides' },
    ],
    support: [
      { name: 'FAQs', path: '/faqs' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: <FiGithub className="h-5 w-5" />, href: '#', label: 'GitHub' },
    { icon: <FiLinkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
    { icon: <FiTwitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <FiMail className="h-5 w-5" />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-base text-gray-600 hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* For Clients */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">For Clients</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.clients.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-base text-gray-600 hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* For Freelancers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">For Freelancers</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.freelancers.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-base text-gray-600 hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-base text-gray-600 hover:text-primary-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold">
                FX
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">QuickGigs</span>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            &copy; {year} QuickGigs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;