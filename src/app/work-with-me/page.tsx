"use client";

import Image from "next/image";

export default function WorkWithMe() {
  return (
    <div className="min-h-screen py-32 px-8 gradient-job-board">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20 slide-in-bottom">
          <h1 className="font-grape-nuts text-5xl md:text-7xl mb-8">
            work with me
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Transform your vision into a stunning digital experience that converts visitors into customers
          </p>
        </div>

        {/* Why Choose Me Section */}
        <div className="mb-20 slide-in-bottom delay-200">
          <h2 className="font-grape-nuts text-4xl md:text-5xl mb-12 text-center">
            why choose me?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="border border-white p-8">
                <h3 className="font-grape-nuts text-2xl mb-4">🎨 Creative Vision</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  I don&apos;t just build websites—I craft digital experiences that tell your story and connect with your audience on an emotional level.
                </p>
              </div>
              
              <div className="border border-white p-8">
                <h3 className="font-grape-nuts text-2xl mb-4">⚡ Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Modern development practices ensure your site loads instantly and performs flawlessly across all devices and browsers.
                </p>
              </div>
              
              <div className="border border-white p-8">
                <h3 className="font-grape-nuts text-2xl mb-4">📱 Mobile-First</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every project is designed mobile-first, ensuring your users have an exceptional experience regardless of their device.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="border border-white p-8">
                <h3 className="font-grape-nuts text-2xl mb-4">🚀 Future-Proof</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Built with the latest technologies and best practices, your site will scale with your business for years to come.
                </p>
              </div>
              
              <div className="border border-white p-8">
                <h3 className="font-grape-nuts text-2xl mb-4">🎯 Conversion Focused</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every design decision is made with your business goals in mind, optimizing for user engagement and conversions.
                </p>
              </div>
              
              <div className="border border-white p-8">
                <h3 className="font-grape-nuts text-2xl mb-4">🤝 Personal Touch</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Direct communication throughout the process—no middlemen, no confusion, just clear collaboration and results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What I Build Section */}
        <div className="mb-20 slide-in-bottom delay-300">
          <h2 className="font-grape-nuts text-4xl md:text-5xl mb-12 text-center">
            what I build
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌐</div>
              <h3 className="font-grape-nuts text-2xl mb-4">Websites</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Custom websites that showcase your brand and drive business growth
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="font-grape-nuts text-2xl mb-4">Mobile Apps</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Interactive applications that solve real problems and delight users
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🖥️</div>
              <h3 className="font-grape-nuts text-2xl mb-4">Web Apps</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Full-stack software products for startups and established businesses
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-20 slide-in-bottom delay-400">
          <h2 className="font-grape-nuts text-4xl md:text-5xl mb-12 text-center">
            my process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-grape-nuts text-xl mb-2">Discovery</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Understanding your goals, audience, and vision
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-grape-nuts text-xl mb-2">Design</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Creating beautiful, user-focused designs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-grape-nuts text-xl mb-2">Develop</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Building with clean, modern code
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="font-grape-nuts text-xl mb-2">Launch</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Deploying and optimizing for success
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20 slide-in-bottom delay-400">
          <h2 className="font-grape-nuts text-4xl md:text-5xl mb-12 text-center">
            my pricing
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-8">
            <div className="text-center p-8">
              <h3 className="font-sans font-bold text-2xl mb-4">Websites</h3>
              <p className="animated-gradient-green-blue text-3xl md:text-4xl font-bold leading-relaxed">
                $1799 - $7799
              </p>
            </div>
            <div className="text-center p-8">
              <h3 className="font-sans font-bold text-2xl mb-4">Apps / Software</h3>
              <p className="animated-gradient-blue-purple text-3xl md:text-4xl font-bold leading-relaxed">
                $8799 - $39,799
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 py-8 leading-relaxed text-md md:w-1/2 mx-auto text-center">
            prices are based on complexity, number of pages, types of features, and other factors. book a free consultation with me to get an exact price for your project.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center slide-in-bottom delay-500">
          <div className="border border-white p-12 max-w-2xl mx-auto">
            <Image
              src="/images/profile.png"
              alt="Wy Sommer"
              width={120}
              height={120}
              className="rounded-full mb-8 h-30 w-30 mx-auto"
            />
            
            <h2 className="font-grape-nuts text-3xl md:text-4xl mb-6">
              ready to get started?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
              Let&apos;s discuss your project and see how I can help bring your vision to life. 
              Book a free 15-minute strategy session to get started.
            </p>
            
            <a
              href="https://app.apollo.io/#/meet/wyatt_sommer_dd0/15-min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-lg px-8 py-4"
            >
              book free consultation
            </a>
            
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Opens in a new window
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center slide-in-bottom delay-600">
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            Trusted by businesses worldwide • Built with ❤️ by Wÿ Sommer™
          </p>
        </div>
      </div>
    </div>
  );
}
