'use client';

import { useState } from 'react';
import Image from 'next/image';

// Sample project data (to be replaced with actual data from database)
const projects = [
  {
    id: 1,
    title: "e-commerce platform",
    description: "responsive design for modern shopping",
    imageUrl: "/next.svg", // Placeholder image
    tags: ["React", "Next.js", "Tailwind"],
    category: "web"
  },
  {
    id: 2,
    title: "corporate website",
    description: "elegant digital identity for business",
    imageUrl: "/next.svg", // Placeholder image
    tags: ["React", "Motion", "Tailwind"],
    category: "web"
  },
  {
    id: 3,
    title: "mobile app ui",
    description: "intuitive interface for seamless experience",
    imageUrl: "/next.svg", // Placeholder image
    tags: ["React Native", "UI Design"],
    category: "mobile"
  },
  {
    id: 4,
    title: "dashboard interface",
    description: "data visualization with clean aesthetics",
    imageUrl: "/next.svg", // Placeholder image
    tags: ["React", "D3.js", "UI Design"],
    category: "web"
  },
  {
    id: 5,
    title: "brand identity",
    description: "cohesive visual language for a tech startup",
    imageUrl: "/next.svg", // Placeholder image
    tags: ["Branding", "Design"],
    category: "design"
  }
];

// Categories for filtering
const categories = ["all", "web", "mobile", "design"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen w-full py-32 px-8 gradient-portfolio">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-grape-nuts text-5xl md:text-7xl mb-16 text-center slide-in-bottom">
          portfolio
        </h1>
        
        {/* Category Filter - Minimal Style */}
        <div className="flex justify-center mb-16 space-x-8 slide-in-bottom delay-200">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-grape-nuts text-xl transition-colors ${
                activeCategory === category
                  ? 'text-black dark:text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid - Minimal Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 slide-in-bottom delay-300">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="project-card p-6 hover-lift"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="aspect-[3/2] w-full bg-gray-100 dark:bg-gray-900 mb-6 relative overflow-hidden">
                <Image 
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="font-grape-nuts text-2xl mb-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="border-anim text-sm">
                view project
              </button>
            </div>
          ))}
        </div>
        
        {/* Show message if no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 slide-in-bottom delay-300">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              no projects found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 