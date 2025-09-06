'use client';

import { useState } from 'react';

// Sample resume data
const experience = [
  {
    id: 1,
    title: "Founder / Software Engineer",
    company: "16:7 Studio Inc.",
    period: "2025 - present",
    description: "Designed & developed two Christianity focused software products, one with Next.js and the other with React Native.",
    skills: ["React", "Next.js", "React Native", "TailwindCSS", "OpenAI API", "Clerk Authentication", "Supabase", "Vercel", "UI/UX Design", "Cursor", "Logo Design", "Branding"]
  },
  {
    id: 2,
    title: "Freelance Web Developer",
    company: "written-art LLC",
    period: "2025 - present",
    description: "Designed & developed responsive websites and interactive experiences for various clients.",
    skills: ["React", "Next.js", "Vercel", "UI/UX Design", "Framer", "Figma", "Logo Design", "Branding"]
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Skinstric AI",
    period: "2024 - 2025",
    description: "Converted Figma designs into a dynamic web app that used an API to take an uploaded or captured image to provide personalized skincare advice.",
    skills: ["React", "Next.js", "Vercel", "Figma to Code", "REST API's"]
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Frontend Simplified",
    period: "2024 - 2025",
    description: "Converted a static web design into a responsive web application using React, HTML, CSS, and JavaScript. Used Git and Github to manage version control. Implemented smooth animations and transitions in React.",
    skills: ["React", "Next.js", "Git", "Github", "Vercel", "Javascript", "HTML", "CSS"]
  }
];

const education = [
  {
    id: 1,
    degree: "Build With AI",
    institution: "Switch Dimension",
    year: "2025",
    description: "Learned how to build full stack applications using cursor AI."
  },
  {
    id: 2,
    degree: "Ultimate Framer Masterclass",
    institution: "Insert Frame",
    year: "2025",
    description: "Learned how to build responsive, animated websites using Framer."
  },
  {
    id: 3,
    degree: "Frontend Simplified Bootcamp",
    institution: "FES Institute",
    year: "2024",
    description: "Brushed up on my HTML, CSS, and JavaScript skills. Learned about React, Next.js, and Tailwind CSS."
  },
  {
    id: 4,
    degree: "Graphic Design Course",
    institution: "Community College of Denver",
    year: "2022",
    description: "Learned how to use Adobe Creative Suite."
  },
  {
    id: 5,
    degree: "Full Stack Development Bootcamp",
    institution: "University of Denver",
    year: "2018",
    description: "Learned about HTML, CSS, JavaScript, Node.js, Express, MongoDB, and React. Also learned about Git and GitHub."
  }
];

const skills = [
  { category: "development", items: ["Cursor", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS"] },
  { category: "design", items: ["UI/UX Design", "Wireframing", "Prototyping", "Figma", "Framer", "Adobe Creative Suite", "Logo Design", "Branding"] },
  { category: "other", items: ["Project Management", "Team Leadership", "Agile Methodology", "Performance Optimization", "Git/GitHub", "SEO", "Social Media Marketing", "Compassion"] }
];

export default function Resume() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (id: number) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  return (
    <div className="min-h-screen py-32 px-8 gradient-resume">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-grape-nuts text-5xl md:text-7xl mb-16 text-center slide-in-bottom">
          resumé
        </h1>
        
        {/* Professional Experience - Minimal Timeline */}
        <section className="mb-20 slide-in-bottom delay-200">
          <h2 className="font-grape-nuts text-3xl mb-12">experience</h2>
          
          <div className="space-y-16">
            {experience.map((job) => (
              <div 
                key={job.id} 
                className="relative"
              >
                <div 
                  className="border-l border-gray-200 dark:border-gray-800 pl-8 ml-4 transition-all duration-300"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 timeline-dot"></div>
                  
                  <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-grape-nuts text-2xl">{job.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {job.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{job.company}</p>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedSection === job.id ? 'max-h-96' : 'max-h-0 md:max-h-0'
                  }`}>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggleSection(job.id)}
                    className="mt-4 text-sm flex items-center border-anim"
                  >
                    {expandedSection === job.id ? 'show less' : 'show more'}
                    <svg
                      className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                        expandedSection === job.id ? 'rotate-180' : ''
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Education - Minimal Style */}
        <section className="mb-20 slide-in-bottom delay-300">
          <h2 className="font-grape-nuts text-3xl mb-12">education</h2>
          
          <div className="space-y-10">
            {education.map((edu) => (
              <div 
                key={edu.id}
                className="border-t border-gray-200 dark:border-gray-800 pt-6"
              >
                <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-grape-nuts text-xl">{edu.degree}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills - Minimal Grid */}
        <section className="mb-20 slide-in-bottom delay-400">
          <h2 className="font-grape-nuts text-3xl mb-12">skills</h2>
          
          <div className="flex justify-between flex-col md:flex-row gap-10">
            {skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="font-grape-nuts text-xl mb-4">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Download Button - Minimal Style */}
        {/* <div className="text-center mt-16 mb-8 slide-in-bottom delay-500">
          <a 
            href="/docs/wyatt-sommer-resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-minimal inline-block"
          >
            download cv
          </a>
        </div> */}
        <div className="text-center mt-16 mb-8 slide-in-bottom delay-500">
          <a 
            href="/contact" 
            className="btn-minimal inline-block"
          >
            start a project
          </a>
        </div>
      </div>
    </div>
  );
} 