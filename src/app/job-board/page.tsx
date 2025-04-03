'use client';

import { useState, useEffect } from 'react';
import JobPostModal, { JobListing } from './_components/JobPostModal';
import JobDetailModal from './_components/JobDetailModal';

// Sample job listings data (would come from a database in a real application)
const initialJobListings = [
  {
    id: 1,
    title: "senior front-end developer",
    company: "Tech Innovations Inc.",
    location: "Remote",
    salaryRange: "$110K - $140K",
    description: "We are seeking an experienced Front-end Developer with expertise in React and Next.js to join our growing team.",
    requirements: [
      "5+ years of experience with React",
      "Experience with Next.js and TypeScript",
      "Strong understanding of modern CSS and responsive design",
      "Experience with state management solutions"
    ],
    date: "2023-03-25",
    type: "Full-time",
    website: "https://techinnovations.example.com"
  },
  {
    id: 2,
    title: "ui/ux designer",
    company: "Creative Solutions Agency",
    location: "New York, NY",
    salaryRange: "$90K - $120K",
    description: "Join our creative team to design beautiful interfaces for our clients' web and mobile applications.",
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency with Figma, Sketch, or Adobe XD",
      "Knowledge of design systems and component libraries",
      "Portfolio demonstrating strong visual design skills"
    ],
    date: "2023-03-20",
    type: "Full-time",
    website: "https://creativesolutions.example.com"
  },
  {
    id: 3,
    title: "full-stack web developer",
    company: "Startup Ventures",
    location: "San Francisco, CA",
    salaryRange: "$120K - $150K",
    description: "Looking for a versatile developer who can work on both front-end and back-end technologies.",
    requirements: [
      "Experience with React, Node.js, and database technologies",
      "Knowledge of RESTful API design and implementation",
      "Familiarity with cloud services (AWS, GCP, or Azure)",
      "Strong problem-solving skills"
    ],
    date: "2023-03-18",
    type: "Full-time",
    website: "https://startupventures.example.com"
  },
  {
    id: 4,
    title: "web designer (contract)",
    company: "Digital Marketing Agency",
    location: "Remote",
    salaryRange: "$50 - $70 per hour",
    description: "We need a talented web designer for a 3-month project creating marketing websites.",
    requirements: [
      "Experience designing responsive websites",
      "Knowledge of HTML/CSS",
      "Proficiency with design tools",
      "Understanding of web accessibility standards"
    ],
    date: "2023-03-15",
    type: "Contract",
    website: "https://digitalmarketing.example.com"
  }
];

// Job types and locations for filtering
const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Freelance"];
const locations = ["All Locations", "Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA"];

export default function JobBoard() {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  
  // Load job listings from localStorage on initial render
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobListings');
    if (storedJobs) {
      try {
        setJobListings(JSON.parse(storedJobs));
      } catch (error) {
        console.error('Failed to parse stored jobs:', error);
        setJobListings(initialJobListings);
      }
    } else {
      setJobListings(initialJobListings);
    }
  }, []);
  
  // Save job listings to localStorage whenever they change
  useEffect(() => {
    if (jobListings.length > 0) {
      localStorage.setItem('jobListings', JSON.stringify(jobListings));
    }
  }, [jobListings]);
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'All Locations' || job.location === selectedLocation;
    
    return matchesSearch && matchesType && matchesLocation;
  });
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleOpenDetailModal = (job: JobListing) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };
  
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };
  
  const handleSubmitJob = (jobData: Omit<JobListing, 'id' | 'date'>) => {
    // Create a new job listing with a generated ID and the current date
    const newJob: JobListing = {
      ...jobData,
      id: Math.max(0, ...jobListings.map(job => job.id)) + 1, // Generate unique ID
      date: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
    };
    
    // Add the new job to the job listings array
    setJobListings(prev => [newJob, ...prev]);
    
    // Close the modal
    handleCloseModal();
  };
  
  // Handle job deletion if needed
  // const handleDeleteJob = (jobId: number) => {
  //   setJobListings(prev => prev.filter(job => job.id !== jobId));
  // };
  
  // Handle resetting to initial job listings
  // const handleResetJobs = () => {
  //   setJobListings(initialJobListings);
  // };
  
  return (
    <div className="min-h-screen py-32 px-8 gradient-job-board">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 slide-in-bottom">
          <div>
            <h1 className="font-grape-nuts text-5xl md:text-7xl mb-4">
              job board
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              post a job offer if you&apos;re interested in hiring me
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <button 
              className="btn-primary"
              onClick={handleOpenModal}
            >
              post a job
            </button>
          </div>
        </div>
        
        {/* Search and Filters - Minimal Style */}
        <div className="mb-16 slide-in-bottom delay-200">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-6">
            {/* Search input */}
            <div className="flex-grow">
              <input
                type="text"
                placeholder="search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
              />
            </div>
            
            {/* Filter toggle button */}
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="border-anim text-sm flex items-center self-end"
            >
              filters
              <svg
                className={`ml-1 w-4 h-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          
          {/* Filter options */}
          {isFilterExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-gray-200 dark:border-gray-800">
              {/* Job Type filter */}
              <div>
                <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                  job type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Location filter */}
              <div>
                <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                  location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Job Listings - Minimal Style */}
        <div className="space-y-16 slide-in-bottom delay-300">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div 
                key={job.id}
                className="border-t border-gray-200 dark:border-gray-800 pt-8"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h2 className="font-grape-nuts text-2xl mb-2">{job.title}</h2>
                    <div className="flex items-center gap-2 mb-4">
                      <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                      <span className="text-gray-300">•</span>
                      <a 
                        href={job.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm flex items-center gap-1 text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        <svg 
                          className="w-3 h-3" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        website
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-wrap gap-3">
                    <span className="text-sm border border-gray-200 dark:border-gray-800 px-3 py-1">
                      {job.type}
                    </span>
                    <span className="text-sm border border-gray-200 dark:border-gray-800 px-3 py-1">
                      {job.location}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">{job.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider mb-3 text-gray-500">Requirements</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-sm">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="list-disc list-outside">{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Salary Range: </span>
                    <span className="text-gray-800 dark:text-gray-200">{job.salaryRange}</span>
                  </div>
                  
                  <button 
                    className="btn-minimal"
                    onClick={() => handleOpenDetailModal(job)}
                  >
                    view details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 border border-gray-200 dark:border-gray-800">
              <h3 className="font-grape-nuts text-2xl mb-4">no jobs found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('All Types');
                  setSelectedLocation('All Locations');
                }}
                className="btn-minimal"
              >
                clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Employer CTA - Minimal Style */}
        <div className="mt-20 border border-gray-200 dark:border-gray-800 p-12 text-center">
          <h2 className="font-grape-nuts text-3xl mb-4">want to hire me?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
            post your job offer here and i&apos;ll reach out to you if i&apos;m interested
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              className="btn-primary"
              onClick={handleOpenModal}
            >
              post a job
            </button>
          </div>
        </div>
      </div>
      
      {/* Job Post Modal */}
      <JobPostModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitJob}
      />
      
      {/* Job Detail Modal */}
      <JobDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        job={selectedJob}
      />
    </div>
  );
} 