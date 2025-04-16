import React, { useState, useRef, useEffect } from 'react';
import { MoveRight, Github, ExternalLink, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactInformation';

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [currentProject, setCurrentProject] = useState(0);
  const sectionRefs = {
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };
  
  // Check which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current && 
            scrollPosition >= ref.current.offsetTop && 
            scrollPosition < ref.current.offsetTop + ref.current.offsetHeight) {
          setActiveSection(section);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'About', section: 'about' },
    { name: 'Experience', section: 'experience' },
    { name: 'Skills', section: 'skills' },
    { name: 'Projects', section: 'projects' },
    { name: 'Contact', section: 'contact' },
  ];
  
  // Skills data
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        {name: "ReactJS", image: '/images/React.webp'}, 
        {name: "JavaScript", image: "/images/js.webp"}, 
        {name: "HTML", image: '/images/html.webp'},
        {name: "Tailwind CSS", image: "/images/tailwind.webp"}
      ]
    },
    {
      title: "Backend",
      skills: [
        {name: "Node.js", image: '/images/node.webp'}, 
        {name: "Express", image: "/images/express.webp"}, 
        {name: "MongoDB", image: '/images/MongoDB.webp'},
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        {name: "Git", image: '/images/git.webp'}, 
        {name: "Docker", image: "/images/docker.webp"}, 
        {name: "AWS", image: '/images/aws.webp'},
        {name: "Azure", image: '/images/azure.webp'},
      ]
    }
  ];
  // Experience data
  const experiences = [
    {
      title: "Game Developer Intern",
      company: "Mindstorm Studios - Lahore",
      period: "June 2024 - July 2024",
      description: "Built the game to be as mobile-friendly as possible, across all devices. Implemented Unity Animator for smooth character animations, improving gameplay fluidity. Participated in design talks and contributed to the development of gameplay mechanics. Worked closely with a mentor, using their feedback to refine my coding skills and game development methods."
    }
  ];
  
  // Scroll to section function
  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200" 
      style={{
        backgroundColor: "#030303",
        color: "#e5e7eb",
      }}>
      {/* Vertical Navigation with horizontal text (desktop only) */}
      <aside className="fixed left-8 top-0 bottom-0 z-50 items-center pointer-events-none hidden md:flex">
        <nav className="flex flex-col items-start space-y-8 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.section}
              onClick={() => scrollToSection(link.section)}
              className={`text-sm uppercase font-medium tracking-wider cursor-pointer transition-colors duration-300 px-4 py-1 relative ${
                activeSection === link.section 
                  ? 'text-[#4ADE80]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeSection === link.section && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#4ADE80] rounded-full"></span>
              )}
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
      
      {/* Mobile Burger Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#030303]/90 backdrop-blur-sm">
  <div className="flex justify-between items-center p-4">
    <button 
      onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
      className="text-white p-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  
  <div id="mobile-menu" className="hidden w-full">
    <nav className="py-4 px-6 bg-[#0a0a0a]">
      {navLinks.map((link) => (
        <a
          key={link.section}
          onClick={() => {
            scrollToSection(link.section);
            document.getElementById('mobile-menu').classList.add('hidden');
          }}
          className={`block py-3 text-sm uppercase font-medium tracking-wider cursor-pointer transition-colors duration-300 ${
            activeSection === link.section 
              ? 'text-[#4ADE80]' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {link.name}
        </a>
      ))}
    </nav>
  </div>
</div>

            
            
      <main className="container mx-auto px-4 md:px-20 pt-16 md:pt-12">
        {/* About Section */}
        <section 
          ref={sectionRefs.about} 
          className="min-h-screen flex flex-col justify-center py-16 bg-[#030303]"
          style={{
            backgroundColor: "#030303",
          }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="mb-10 lg:mb-0 order-2 lg:order-1">
                  <p className="text-[#4ADE80] text-sm uppercase tracking-wide font-medium mb-5">
                    FRONT END DEVELOPER | FULL STACK DEVELOPER | FREELANCE DEVELOPER
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-10">
                    HUMAYUN RAZA
                  </h1>
                  <p className="text-gray-300 text-xl max-w-3xl leading-relaxed">
  MERN Stack developer and Computer Science student at IBA with a proven track record in developing comprehensive web applications, from e-commerce platforms to AI recruitment systems. Technical proficiency in 
  <span className="text-[#4ADE80]"> ReactJS</span>, and 
  <span className="text-[#4ADE80]"> TailwindCSS</span> for responsive frontends, complemented by 
  <span className="text-[#4ADE80]"> NodeJS</span>, 
  <span className="text-[#4ADE80]"> ExpressJS</span>, and 
  <span className="text-[#4ADE80]"> MongoDB</span> for robust backend architecture. Experienced in implementing server-side rendering, 
  <span className="text-[#4ADE80]"> WebSockets</span> for real-time communication, 
  <span className="text-[#4ADE80]"> AWS</span> cloud deployment, and version control via 
  <span className="text-[#4ADE80]"> Git/GitHub</span>. Additional experience in game development using 
  <span className="text-[#4ADE80]"> Unity</span>. Dedicated to crafting efficient, scalable solutions with exceptional user experiences.
</p>

                  <div className="mt-12 flex flex-wrap gap-5">
                    <Button className="bg-[#101010] hover:bg-[#1a1a1a] text-white py-6 px-8 rounded-lg flex items-center space-x-2" onClick={() => scrollToSection('contact')}>
                      <span className="text-[#4ADE80]">
                        <ExternalLink className="mr-2 h-5 w-5" />
                      </span>
                      <span className="font-medium">Get In Touch</span>
                    </Button>
                    <Button 
  variant="outline" 
  className="border-[#222222] text-white hover:text-[#4ADE80] hover:border-[#4ADE80] bg-transparent hover:bg-transparent py-6 px-8 rounded-lg flex items-center space-x-2"
  onClick={() => window.open("https://drive.google.com/file/d/1Qez3toKvPewOfFBT3tdpk4NKJPNKl3Qv/view?usp=sharing", '_blank')}
>
  <span className="text-[#4ADE80]">
    <MoveRight className="mr-2 h-5 w-5" />
  </span>
  <span className="font-medium">DOWNLOAD CV</span>
</Button>
                  </div>
                </div>
                
                {/* Profile Picture with Abstract Blob */}
                <div className="relative flex justify-center order-1 lg:order-2">
                  <div className="relative">
                    {/* Abstract Blob SVG Background */}
                                          <svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 500 500" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 max-w-full"
                        style={{ maxHeight: '100%' }}
                      >
                        <defs>
                          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.3" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M430.9,290.9c25.4-55.6,7.9-137.8-38.9-190.9S267.3,2.2,208.9,28.8S105.2,137.5,62.8,200
                            s-71.8,127.8-43.7,167.7c28.2,39.9,99.7,37.9,159,42.5c59.4,4.5,106.7,15.6,157.4-7.8S405.6,346.5,430.9,290.9z"
                          fill="url(#blob-gradient)"
                          filter="blur(20px)"
                        />
                      </svg>
                    
                              {/* Decorative Elements */}
                    <div className="absolute -top-3 sm:-top-5 -left-3 sm:-left-5 w-6 h-6 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#4ADE80]"></div>
                    <div className="absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-5 w-6 h-6 sm:w-10 sm:h-10 border-b-2 border-r-2 border-[#4ADE80]"></div>

                    {/* Profile Image */}
                    <div className="w-[200px] h-[275px] sm:w-[250px] sm:h-[325px] md:w-[300px] md:h-[400px] relative z-10 rounded-lg overflow-hidden border-2 border-[#222222]">
                      <img 
                        src="/images/me.webp" 
                        alt="Humayun Raza" 
                        loading="lazy"
                      />
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -right-4 sm:-right-6 md:-right-10 top-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#030303] border border-[#222222] rounded-full flex items-center justify-center z-20">
                      <span className="text-[#4ADE80]">
                        <img className='w-6 sm:w-8 md:w-10' src='/images/React.webp' alt="React logo" />
                      </span>
                    </div>
                    <div className="absolute -left-3 sm:-left-4 md:-left-5 bottom-1/4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#030303] border border-[#222222] rounded-lg flex items-center justify-center z-20">
                      <span className="text-[#4ADE80] text-base sm:text-xl md:text-2xl">{"</>"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section 
          ref={sectionRefs.experience} 
          className="min-h-screen py-16 bg-[#030303]"
          style={{
            backgroundColor: "#030303",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">01</div>
              <div className="text-sm text-gray-500 font-mono">//EXPERIENCE</div>
              <div className="text-sm text-gray-500">2020 - 2024</div>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-white mb-16">
              WORK HISTORY
            </h2>
            
            <div className="relative">
              {/* Center vertical line */}
              <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#111827]/40 transform md:-translate-x-1/2"></div>
              
              <div className="space-y-16">
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-stretch ${
                      index % 2 === 0 || window.innerWidth < 768 ? 'justify-start' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 w-[14px] h-[14px] bg-[#4ADE80] rounded-full transform md:-translate-x-1/2 z-10"
                      style={{ backgroundColor: "#4ADE80" }}
                    ></div>
                    
                    {/* Date indicator */}
                    <div className={`text-[#4ADE80] font-mono text-xs absolute left-[40px] md:left-auto ${
                      index % 2 === 0 ? 'md:left-[calc(50%+20px)]' : 'md:right-[calc(50%+20px)] md:text-right'
                    }`}
                      style={{ color: "#4ADE80" }}
                    >
                      {exp.period}
                    </div>
                    
                    {/* Content - alternating sides */}
                    <div className={`pl-12 md:pl-0 ${
                      index % 2 === 0 ? 'md:pr-[calc(50%+40px)]' : 'md:pl-[calc(50%+40px)]'
                    } pt-8`}>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-[#4ADE80] mb-3">{exp.company}</p>
                      <p className="text-gray-400">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={sectionRefs.skills} 
          className="min-h-screen py-16 bg-[#050505]"
          style={{
            backgroundColor: "#050505",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">02</div>
              <div className="text-sm text-gray-500 font-mono">//SKILLS</div>
              <div className="text-sm text-gray-500">2020 - 2024</div>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-white mb-12">
              MY EXPERTISE
            </h2>

            <div className="relative overflow-hidden py-12">
              {/* Sliding image carousel */}
              <div className="flex animate-marquee gap-8" style={{
                animation: "marquee 30s linear infinite",
                width: "max-content",
                transform: "translateX(0)",
              }}>
                {skillCategories.flatMap(category => 
                  category.skills.map((skill, i) => (
                    <div 
                      key={`${category.title}-${skill.name}-${i}`} 
                      className="flex-shrink-0 bg-[#121212] rounded-md overflow-hidden w-[280px]"
                      style={{
                        backgroundColor: "#121212"
                      }}
                    >
                      <div className="h-[150px] bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: "#1a1a1a" }}>
                        <img 
                          src={`${skill.image}`} // Temporary placeholder - would use skill.image in production
                          alt={skill.name}
                          className="opacity-80"
                          loading='lazy'
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]/70"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-medium text-lg">{skill.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                
                {/* Duplicate for infinite effect */}
                {skillCategories.flatMap(category => 
                  category.skills.map((skill, i) => (
                    <div 
                      key={`duplicate-${category.title}-${skill.name}-${i}`} 
                      className="flex-shrink-0 bg-[#121212] rounded-md overflow-hidden w-[280px]"
                      style={{
                        backgroundColor: "#121212"
                      }}
                    >
                      <div className="h-[150px] bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: "#1a1a1a" }}>
                        <img 
                          src={`${skill.image}`} // Temporary placeholder - would use skill.image in production
                          alt={skill.name}
                          className="opacity-80"
                          loading='lazy'
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]/70"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-medium text-lg">{skill.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
            </div>

            <style jsx>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-marquee {
                animation: marquee 40s linear infinite;
              }
            `}</style>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={sectionRefs.projects} > 
        <ProjectsSection/>
        </section>

        {/* Contact Section */}
        <section 
          ref={sectionRefs.contact} 
          className="min-h-screen py-16 bg-[#030303]"
          style={{
            backgroundColor: "#030303",
          }}
        >
          <ContactSection/>
        </section>
      </main>

      <footer className="bg-[#030303] border-t border-[#222222] py-8 mt-16"
        style={{
          backgroundColor: "#030303",
          borderColor: "#222222"
        }}
      >
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Humayun Raza. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;