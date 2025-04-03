'use client';

import { JobListing } from './JobPostModal';

type JobDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing | null;
};

export default function JobDetailModal({ isOpen, onClose, job }: JobDetailModalProps) {
  if (!isOpen || !job) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-grape-nuts text-3xl">{job.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="text-xl">{job.company}</h3>
                <a 
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-blue-500 dark:text-blue-400 hover:underline text-sm"
                >
                  <svg 
                    className="w-4 h-4" 
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
                  Visit website
                </a>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-sm border border-gray-200 dark:border-gray-800 px-3 py-1">
                  {job.type}
                </span>
                <span className="text-sm border border-gray-200 dark:border-gray-800 px-3 py-1">
                  {job.location}
                </span>
                <span className="text-sm border border-gray-200 dark:border-gray-800 px-3 py-1">
                  Posted: {job.date}
                </span>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-medium">{job.salaryRange}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Job Description</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{job.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Requirements</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                {job.requirements.map((req, index) => (
                  <li key={index} className="list-disc list-outside">{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <a 
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-primary"
                  >
                    Visit company website
                  </a>
                </div>
                <button 
                  onClick={onClose}
                  className="btn-minimal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 