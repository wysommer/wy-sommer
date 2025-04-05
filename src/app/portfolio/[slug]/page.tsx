'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';

// Define a type for project data
type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  imageUrl: string;
  portfolioImageUrl: string;
  category: string;
  slug: string;
  websiteUrl: string;
  githubUrl: string;
};

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundProject = projects.find(p => p.slug === slug);
      setProject(foundProject || null);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center gradient-portfolio">
        <p className="text-xl">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gradient-portfolio">
        <h1 className="font-grape-nuts text-4xl mb-6">project not found</h1>
        <p className="mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/portfolio" className="border-anim">
          back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-32 px-8 gradient-portfolio">
      <div className="max-w-4xl mx-auto">
        <Link href="/portfolio" className="inline-block mb-12 border-anim">
          ← back to portfolio
        </Link>
        
        <div className="slide-in-bottom">
          <h1 className="font-grape-nuts text-5xl md:text-7xl mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-800">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-900 mb-12 relative overflow-hidden rounded-lg">
            <Image 
              src={project.portfolioImageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p className="text-xl leading-relaxed">{project.fullDescription}</p>
            
            {/* Additional project details can be added here */}
            <h2 className="font-grape-nuts text-3xl mt-12 mb-6">project details</h2>
            <ul>
              <li>Category: {project.category}</li>
              <li>Technologies: {project.tags.join(', ')}</li>
            </ul>
            
            {/* Project Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href={project.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>Visit Website</span>
              </a>
              {!project.tags.includes("Framer") && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Navigation between projects */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            {projects.findIndex(p => p.id === project.id) > 0 ? (
              <Link 
                href={`/portfolio/${projects[projects.findIndex(p => p.id === project.id) - 1].slug}`}
                className="border-anim"
              >
                ← previous project
              </Link>
            ) : (
              <div></div>
            )}
            
            {projects.findIndex(p => p.id === project.id) < projects.length - 1 ? (
              <Link 
                href={`/portfolio/${projects[projects.findIndex(p => p.id === project.id) + 1].slug}`}
                className="border-anim"
              >
                next project →
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 