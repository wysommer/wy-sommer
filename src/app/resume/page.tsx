'use client';

import { useState } from 'react';

// Sample resume data
const experience = [
  {
    id: 1,
    title: "senior web developer",
    company: "Tech Solutions Inc.",
    period: "2020 - Present",
    description: "Led development of enterprise web applications using React and Next.js. Implemented modern UI/UX principles and optimized for performance. Managed a team of 4 junior developers.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Team Leadership"]
  },
  {
    id: 2,
    title: "front-end developer",
    company: "Creative Agency",
    period: "2018 - 2020",
    description: "Developed responsive websites and interactive experiences for various clients. Collaborated with designers to implement pixel-perfect designs. Improved site performance by 40%.",
    skills: ["JavaScript", "React", "SCSS", "Performance Optimization"]
  },
  {
    id: 3,
    title: "ui/ux designer",
    company: "Digital Studio",
    period: "2016 - 2018",
    description: "Created user interfaces for web and mobile applications. Conducted user research and usability testing. Developed wireframes and prototypes using Figma and Sketch.",
    skills: ["UI Design", "UX Research", "Figma", "Sketch", "Prototyping"]
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
    degree: "Frontend Simplified Bootcamp",
    institution: "FES Institute",
    year: "2024",
    description: "Brushed up on my HTML, CSS, and JavaScript skills. Learned about React, Next.js, and Tailwind CSS."
  },
  {
    id: 3,
    degree: "Graphic Design Course",
    institution: "Community College of Denver",
    year: "2022",
    description: "Learned how to use Adobe Creative Suite."
  },
  {
    id: 4,
    degree: "Full Stack Development Bootcamp",
    institution: "University of Denver",
    year: "2018",
    description: "Learned about HTML, CSS, JavaScript, Node.js, Express, MongoDB, and React. Also learned about Git and GitHub."
  }
];

const skills = [
  { category: "development", items: ["Cursor AI", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS"] },
  { category: "design", items: ["UI/UX Design", "Wireframing", "Prototyping", "Figma", "Adobe Creative Suite"] },
  { category: "other", items: ["Project Management", "Team Leadership", "Agile Methodology", "Performance Optimization"] }
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
          resume
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
                    expandedSection === job.id ? 'max-h-96' : 'max-h-0 md:max-h-20'
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
        <div className="text-center mt-16 mb-8 slide-in-bottom delay-500">
          <button className="btn-minimal">
            download cv
          </button>
        </div>
      </div>
    </div>
  );
} 