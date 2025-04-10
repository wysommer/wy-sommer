'use client';

import { useState } from 'react';

export type JobListing = {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  date: string;
  type: string;
  website: string;
};

type JobPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: Omit<JobListing, 'id' | 'date'>) => void;
};

export default function JobPostModal({ isOpen, onClose, onSubmit }: JobPostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salaryRange: '',
    description: '',
    requirements: '',
    type: 'Full-time',
    website: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormspreeSubmitting, setIsFormspreeSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salaryRange.trim()) newErrors.salaryRange = 'Salary range is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
    if (!formData.type.trim()) newErrors.type = 'Job type is required';
    if (!formData.website.trim()) newErrors.website = 'Website is required';
    
    // Basic URL validation
    if (formData.website.trim() && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsFormspreeSubmitting(true);
      
      try {
        // Split requirements by new line and filter out empty strings
        const requirementsArray = formData.requirements
          .split('\n')
          .map(req => req.trim())
          .filter(req => req.length > 0);
        
        // First, handle the Formspree submission manually
        const formspreeResponse = await fetch('https://formspree.io/f/mpwpyndy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'job',
            title: formData.title.toLowerCase(),
            company: formData.company,
            location: formData.location,
            salaryRange: formData.salaryRange,
            description: formData.description,
            requirements: requirementsArray,
            type: formData.type,
            website: formData.website
          }),
        });
        
        if (!formspreeResponse.ok) {
          throw new Error('Failed to submit form to Formspree');
        }
        
        // If Formspree submission was successful, then handle local app state
        onSubmit({
          title: formData.title.toLowerCase(), // Match existing format
          company: formData.company,
          location: formData.location,
          salaryRange: formData.salaryRange,
          description: formData.description,
          requirements: requirementsArray,
          type: formData.type,
          website: formData.website
        });
        
        // Reset form
        setFormData({
          title: '',
          company: '',
          location: '',
          salaryRange: '',
          description: '',
          requirements: '',
          type: 'Full-time',
          website: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        // Show an error message to the user if needed
      } finally {
        setIsFormspreeSubmitting(false);
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 pt-16 md:pt-16">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto rounded">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="font-grape-nuts text-2xl md:text-3xl">post a job</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="formType" value="job" />
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                job title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.company ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                company website
              </label>
              <input
                type="url"
                name="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.website ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.website && <p className="mt-1 text-xs text-red-500">{errors.website}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.location ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                salary range
              </label>
              <input
                type="text"
                name="salaryRange"
                placeholder="e.g. $80K - $100K"
                value={formData.salaryRange}
                onChange={handleChange}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.salaryRange ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.salaryRange && <p className="mt-1 text-xs text-red-500">{errors.salaryRange}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                job type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.type ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
              {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                job description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                requirements (one per line)
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. 5+ years of experience with React"
                className={`w-full px-0 py-2 bg-transparent border-b ${
                  errors.requirements ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:border-black dark:focus:border-white outline-none transition-colors`}
              />
              {errors.requirements && <p className="mt-1 text-xs text-red-500">{errors.requirements}</p>}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-minimal"
              >
                cancel
              </button>
              <button
                type="submit"
                disabled={isFormspreeSubmitting}
                className="btn-primary"
              >
                {isFormspreeSubmitting ? 'submitting...' : 'submit listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 