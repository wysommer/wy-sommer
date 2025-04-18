'use client';

import { useState, Suspense } from 'react';
import Script from 'next/script';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
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
    
    try {
      const response = await fetch("https://formspree.io/f/mpwpyndy", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ 
          name: '',
          email: '',
          website: '',
          message: '',
          subject: 'general inquiry',
        });
      } else {
        console.error('Form submission failed:', response);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error details:', errorData);
        setFormStatus('error');
      }
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
              <div className="border border-gray-200 dark:border-gray-800 p-8 text-center flex flex-col items-center">
                <h3 className="font-grape-nuts text-2xl mb-4">message sent</h3>
                <div className="w-32 h-32">
                  <DotLottieReact
                    src="https://lottie.host/3fe1fd40-9d64-4b42-9f99-c6356d7b613a/K7eAePXBmS.lottie"
                    loop
                    autoplay
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 mt-4">
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
              <form 
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
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
                  <label htmlFor="website" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                    website (optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-0 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white outline-none transition-colors"
                    placeholder="your website url"
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
            
            <div className="h-[650px] border border-gray-200 dark:border-gray-800">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/contact-written-art/interview"
                style={{ minWidth: '320px', height: '650px' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendly Embed Script */}
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
      />
    </div>
  );
}

// Loading fallback component
function ContactLoading() {
  return (
    <div className="min-h-screen py-32 px-8 gradient-contact">
      <div className="max-w-6xl mx-auto text-center">
        <p>Loading contact form...</p>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactForm />
    </Suspense>
  );
} 