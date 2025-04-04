'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

// Sample project data (to be replaced with actual data from database)
const projects = [
  {
    id: 1,
    title: "Wÿ Sommer",
    description: "A minimalist personal portfolio",
    tags: ["Next.js", "React", "TailwindCSS"],
    imageUrl: "/images/wy01.png",
  },
  {
    id: 2,
    title: "AgencyJobs.Pro",
    description: "full-stack agency job board site",
    tags: ["Next.js", "Node.js", "Supabase"],
    imageUrl: "/images/project2.jpg",
  },
  {
    id: 3,
    title: "written-art®",
    description: "web design agency portfolio site",
    tags: ["Next.js", "React", "Cursor AI"],
    imageUrl: "/images/art01.png",
  },
  {
    id: 4,
    title: "Tropical Photo",
    description: "portfolio site for a photographer",
    tags: ["Framer", "Figma"],
    imageUrl: "/images/tropical01.png",
  },
  {
    id: 5,
    title: "written-art® Framer",
    description: "web design agency framer site",
    tags: ["Framer", "Figma"],
    imageUrl: "/images/art02.png",
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderHandleRef = useRef<HTMLDivElement>(null);
  
  // Add event listeners for slider dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isSliderDragging && sliderRef.current && carouselRef.current) {
        const slider = sliderRef.current;
        const rect = slider.getBoundingClientRect();
        const position = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        
        // Update slider position
        setSliderPosition(position);
        
        // Update carousel scroll position
        const carousel = carouselRef.current;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollLeft = (maxScroll * position) / 100;
      }
    };
    
    const handleMouseUp = () => {
      setIsSliderDragging(false);
    };
    
    if (isSliderDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSliderDragging]);
  
  // Update slider position when active index changes
  useEffect(() => {
    if (sliderRef.current) {
      setSliderPosition((activeIndex / (projects.length - 1)) * 100);
    }
  }, [activeIndex]);
  
  // Handle scroll in carousel
  const handleScroll = () => {
    if (!carouselRef.current || isDragging || isSliderDragging) return;
    
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
  
  // Slider control - handle initial click on slider track
  const handleSliderMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current || !carouselRef.current) return;
    
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    const newPosition = Math.max(0, Math.min(100, position));
    
    setSliderPosition(newPosition);
    
    // Set carousel scroll position based on slider
    const carousel = carouselRef.current;
    const targetScroll = (carousel.scrollWidth - carousel.clientWidth) * (newPosition / 100);
    carousel.scrollLeft = targetScroll;
  };
  
  // Slider handle dragging - separate from track clicking
  const handleSliderHandleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the track's mousedown
    setIsSliderDragging(true);
  };
  
  // Scroll to specific project
  // const scrollToProject = (index: number) => {
  //   if (!carouselRef.current) return;
    
  //   const carousel = carouselRef.current;
  //   const cardWidth = carousel.scrollWidth / projects.length;
  //   carousel.scrollLeft = cardWidth * index;
  //   setActiveIndex(index);
  // };

  return (
    <>
      {/* Background div with gradient */}
      <div className="fixed inset-0 z-0 gradient-home"></div>
      
      <div className="min-h-screen w-full flex flex-col items-center px-4 py-16 md:py-32 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24 text-center slide-in-bottom">
            <h1 className="font-grape-nuts text-6xl md:text-8xl mb-6 animate-float pt-24 md:pt-6">
              Wÿ Sommer
            </h1>
            
            {/* Profile photo outside of gradient effects */}
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 relative overflow-hidden rounded-full">
              <Image 
                src="/images/profile.JPG"
                alt="Wÿ Sommer profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-xl md:text-2xl mb-4 text-gray-600 dark:text-gray-300 max-w-prose-narrow mx-auto">
              creating thoughtful digital experiences
            </p>
            
            <p className="font-grape-nuts text-base md:text-lg mb-12 text-gray-600 dark:text-gray-300 max-w-prose-narrow mx-auto font-semibold">
              about me: i love color, i love designing, i love creating. i&apos;m from New York, i&apos;m a pisces, i&apos;m organized.
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
                {projects.map((project) => (
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
                ref={sliderRef}
                className="relative h-1 bg-gray-200 dark:bg-gray-800 rounded-full my-4 cursor-pointer"
                onMouseDown={handleSliderMouseDown}
              >
                {/* Slider handle */}
                <div 
                  ref={sliderHandleRef}
                  className="absolute top-1/2 transform -translate-y-1/2 h-5 w-5 bg-black dark:bg-white rounded-full cursor-grab active:cursor-grabbing touch-none"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={handleSliderHandleMouseDown}
                />
                {/* Active track */}
                <div 
                  className="absolute top-0 left-0 h-full bg-black dark:bg-white rounded-full pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12 slide-in-bottom delay-400">
            <div className="space-x-8">
              <Link href="/job-board" className="btn-primary">
                post a job offer
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
