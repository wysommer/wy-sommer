'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'general inquiry',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    try {
      // In a real application, you would send the form data to your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        subject: 'general inquiry',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };
  
  return (
    <div className="min-h-screen py-32 px-8 gradient-contact">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-grape-nuts text-5xl md:text-7xl mb-16 text-center slide-in-bottom">
          get in touch
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form - Minimal Design */}
          <div className="slide-in-bottom delay-200">
            <h2 className="font-grape-nuts text-3xl mb-8">send a message</h2>
            
            {formStatus === 'success' ? (
              <div className="border border-gray-200 dark:border-gray-800 p-8 text-center">
                <h3 className="font-grape-nuts text-2xl mb-4">message sent</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="btn-minimal"
                >
                  send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                    name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                    placeholder="your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                    email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                    placeholder="your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                    subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                  >
                    <option value="general inquiry">general inquiry</option>
                    <option value="job opportunity">job opportunity</option>
                    <option value="project collaboration">project collaboration</option>
                    <option value="other">other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                    message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                    placeholder="your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`btn-primary mt-4 ${
                    formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'submitting' ? 'sending...' : 'send message'}
                </button>
                
                {formStatus === 'error' && (
                  <p className="text-red-500 mt-4 text-sm">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
          
          {/* Calendly Section - Minimal Design */}
          <div className="slide-in-bottom delay-300">
            <h2 className="font-grape-nuts text-3xl mb-8">schedule a meeting</h2>
            
            <div className="h-[500px] border border-gray-200 dark:border-gray-800">
              {/* In a real application, this would be replaced with an actual Calendly embed */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Select a time that works for you, and let&apos;s discuss your project needs.
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm">Available time slots:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="btn-minimal text-sm">mon 10:00 am</button>
                      <button className="btn-minimal text-sm">tue 2:00 pm</button>
                      <button className="btn-minimal text-sm">wed 11:00 am</button>
                      <button className="btn-minimal text-sm">thu 3:00 pm</button>
                      <button className="btn-minimal text-sm">fri 9:00 am</button>
                      <button className="btn-minimal text-sm">fri 1:00 pm</button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
                      Note: This is a placeholder for the Calendly integration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 