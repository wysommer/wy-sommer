'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

// Sample project data (to be replaced with actual data from database)
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A minimalist portfolio built with Next.js and TailwindCSS",
    tags: ["Next.js", "React", "TailwindCSS"],
    imageUrl: "/images/project1.jpg",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with cart functionality",
    tags: ["React", "Node.js", "MongoDB"],
    imageUrl: "/images/project2.jpg",
  },
  {
    id: 3,
    title: "AI Task Manager",
    description: "Smart task manager using AI to prioritize your work",
    tags: ["Python", "TensorFlow", "React"],
    imageUrl: "/images/project3.jpg",
  },
  {
    id: 4,
    title: "Travel Blog",
    description: "Beautiful travel blog with dynamic content loading",
    tags: ["Next.js", "Sanity.io", "Vercel"],
    imageUrl: "/images/project4.jpg",
  },
  {
    id: 5,
    title: "Health Tracking App",
    description: "Mobile application for tracking fitness and nutrition",
    tags: ["React Native", "Firebase", "Redux"],
    imageUrl: "/images/project5.jpg",
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Update slider position when active index changes
  useEffect(() => {
    if (sliderRef.current) {
      setSliderPosition((activeIndex / (projects.length - 1)) * 100);
    }
  }, [activeIndex]);
  
  // Handle scroll in carousel
  const handleScroll = () => {
    if (!carouselRef.current || isDragging) return;
    
    const carousel = carouselRef.current;
    const scrollPosition = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    // Calculate slider position as percentage
    const newSliderPosition = (scrollPosition / maxScroll) * 100;
    setSliderPosition(newSliderPosition);
    
    // Calculate active index
    const cardWidth = carousel.scrollWidth / projects.length;
    const newActiveIndex = Math.min(
      Math.floor((scrollPosition + cardWidth / 2) / cardWidth),
      projects.length - 1
    );
    
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };
  
  // Mouse dragging for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Slider control
  const handleSliderMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
    
    // Set carousel scroll position based on slider
    const carousel = carouselRef.current;
    const targetScroll = (carousel.scrollWidth - carousel.clientWidth) * (position / 100);
    carousel.scrollLeft = targetScroll;
  };
  
  // Scroll to specific project
  const scrollToProject = (index: number) => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    const cardWidth = carousel.scrollWidth / projects.length;
    carousel.scrollLeft = cardWidth * index;
    setActiveIndex(index);
  };

  return (
    <>
      {/* Background div with gradient */}
      <div className="fixed inset-0 z-0 gradient-home"></div>
      
      <div className="min-h-screen w-full flex flex-col items-center px-4 py-16 md:py-32 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24 text-center slide-in-bottom">
            <h1 className="font-grape-nuts text-6xl md:text-8xl mb-6 animate-float">
              Wÿ Sommer
            </h1>
            
            {/* Profile photo outside of gradient effects */}
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 relative overflow-hidden rounded-full">
              <img 
                src="/images/profile.JPG"
                alt="Wÿ Sommer profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-xl md:text-2xl mb-4 text-gray-600 dark:text-gray-300 max-w-prose-narrow mx-auto">
              creating thoughtful digital experiences
            </p>
            
            <p className="font-grape-nuts text-base md:text-lg mb-12 text-gray-600 dark:text-gray-300 max-w-prose-narrow mx-auto font-semibold">
              about me: i love color, i love designing, i love creating. i'm from New York, i'm a pisces, i'm organized.
            </p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative w-full slide-in-bottom delay-200">
            {/* Carousel */}
            <div className="mx-auto max-w-[840px]">
              <div 
                ref={carouselRef}
                className="flex overflow-x-scroll hide-scrollbar gap-6 py-6 snap-x snap-mandatory"
                style={{ 
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: isDragging ? 'auto' : 'smooth'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onScroll={handleScroll}
              >
                {projects.map((project, index) => (
                  <div 
                    key={project.id}
                    className="flex-shrink-0 w-[260px] rounded-2xl overflow-hidden shadow-lg snap-center transition-transform hover:scale-[1.02] duration-300"
                    style={{ aspectRatio: '9/16' }}
                  >
                    {/* Project image */}
                    <div className="relative h-full w-full">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      {/* Project details at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-medium text-xl mb-1">{project.title}</h3>
                        <p className="text-sm mb-2 text-white/80 line-clamp-2">{project.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slider control */}
            <div className="mx-auto max-w-[600px] mt-6">
              <div 
                className="relative h-1 bg-gray-200 dark:bg-gray-800 rounded-full my-4"
                onMouseDown={handleSliderMouseDown}
              >
                {/* Slider handle */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 h-3 w-3 bg-black dark:bg-white rounded-full cursor-pointer"
                  style={{ left: `${sliderPosition}%` }}
                />
                {/* Active track */}
                <div 
                  className="absolute top-0 left-0 h-full bg-black dark:bg-white rounded-full"
                  style={{ width: `${sliderPosition}%` }}
                />
              </div>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  onClick={() => scrollToProject(index)}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12 slide-in-bottom delay-400">
            <div className="space-x-8">
              <Link href="/job-board" className="btn-primary">
                job board
              </Link>
              <Link href="/contact" className="btn-minimal">
                get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
