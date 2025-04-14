import React, { useState, useRef, useEffect } from 'react';
import { MoveRight, Github, ExternalLink, Mail, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

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
  
  // Project data
  const projects = [
    {
      title: "RecruitWise | AI Recruitment Platform",
      description: "An AI-powered recruitment platform that matches candidates with job openings",
      image: "/images/recruitwise.png",
      github: "#",
      live: "#",
      tech: ["React", "Node.js", "Express", "MongoDB", "Stripe"]
    },
    {
      title: "Heuser PK | Educational Platform",
      description: "A landing page for an educational institute with a focus on user experience",
      image: "/images/heuser.png",
      github: "#",
      live: "#",
      tech: ["React", "Firebase", "Tailwind CSS", "Context API"]
    },
    {
      title: "Azzy's Hardware | E-commerce Store",
      description: "An e-commerce platform for hardware products with a user-friendly interface",
      image: "/images/azzyshardware.png",
      github: "#",
      live: "#",
      tech: ["React", "OpenWeather API", "Chart.js", "Leaflet"]
    }
  ];
  
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
        {name: "ReactJS", image: '/images/React.png'}, 
        {name: "JavaScript", image: "/images/js.webp"}, 
        {name: "HTML", image: '/images/html.png'},
        {name: "Tailwind CSS", image: "/images/tailwind.png"}
      ]
    },
    {
      title: "Backend",
      skills: [
        {name: "Node.js", image: '/images/node.jpg'}, 
        {name: "Express", image: "/images/express.png"}, 
        {name: "MongoDB", image: '/images/MongoDB.png'},
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        {name: "Git", image: '/images/git.png'}, 
        {name: "Docker", image: "/images/docker.jpg"}, 
        {name: "AWS", image: '/images/aws.jpeg'},
        {name: "Azure", image: '/images/azure.png'},
      ]
    }
  ];
  // Experience data
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Led the development of the company's main SaaS product, improving performance by 40%. Managed a team of 4 developers and implemented CI/CD pipelines."
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2020 - 2022",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with UX designers to implement new features and improve user experience."
    },
    {
      title: "Junior Web Developer",
      company: "Creative Web Agency",
      period: "2018 - 2020",
      description: "Built and maintained websites for various clients using HTML, CSS, JavaScript and WordPress. Participated in client meetings and requirement gathering."
    }
  ];
  
  // Scroll to section function
  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Next/previous project handlers
  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };
  
  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
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
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#030303]/90 backdrop-blur-sm border-b border-[#222222]/30"
        style={{
          backgroundColor: "rgba(3, 3, 3, 0.9)",
        }}
      >
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
        
        <div id="mobile-menu" className="hidden">
          <nav className="py-4 px-6 bg-[#0a0a0a] border-b border-[#222222]">
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
                    I am a front-end developer with 3 years of proven experience in the field. I am skilled in 
                    <span className="text-[#4ADE80]"> Search Engine Optimization</span>, 
                    <span className="text-[#4ADE80]"> Next.js</span>, 
                    <span className="text-[#4ADE80]"> React.js</span>, 
                    <span className="text-[#4ADE80]"> Tailwind CSS</span>, and 
                    <span className="text-[#4ADE80]"> JavaScript</span>. 
                    Along with that, I have experience in full-stack development using 
                    <span className="text-[#4ADE80]"> Node.js</span>, 
                    <span className="text-[#4ADE80]"> Express.js</span>, and 
                    <span className="text-[#4ADE80]"> MongoDB</span>.
                  </p>

                  <div className="mt-12 flex flex-wrap gap-5">
                    <Button className="bg-[#101010] hover:bg-[#1a1a1a] text-white py-6 px-8 rounded-lg flex items-center space-x-2">
                      <span className="text-[#4ADE80]">
                        <ExternalLink className="mr-2 h-5 w-5" />
                      </span>
                      <span className="font-medium">HIRE NOW</span>
                    </Button>
                    <Button variant="outline" className="border-[#222222] text-white py-6 px-8 rounded-lg flex items-center space-x-2">
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
                      width="500" 
                      height="500" 
                      viewBox="0 0 500 500" 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
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
                    <div className="absolute -top-5 -left-5 w-10 h-10 border-t-2 border-l-2 border-[#4ADE80]"></div>
                    <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-2 border-r-2 border-[#4ADE80]"></div>
                    
                    {/* Profile Image */}
                    <div className="w-[300px] h-[400px] relative z-10 rounded-lg overflow-hidden border-2 border-[#222222]">
                      <img 
                        src="/images/me.png" 
                        alt="Humayun Raza" 
                      />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -right-10 top-1/4 w-20 h-20 bg-[#030303] border border-[#222222] rounded-full flex items-center justify-center z-20">
                      <span className="text-[#4ADE80] text-3xl"><img className='w-10' src='/images/React.png'/></span>
                    </div>
                    <div className="absolute -left-5 bottom-1/4 w-14 h-14 bg-[#030303] border border-[#222222] rounded-lg flex items-center justify-center z-20">
                      <span className="text-[#4ADE80] text-2xl">{"</>"}</span>
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
        <section 
          ref={sectionRefs.projects} 
          className="min-h-screen py-16 bg-[#050505]"
          style={{
            backgroundColor: "#050505",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">03</div>
              <div className="text-sm text-gray-500 font-mono">//PORTFOLIO</div>
              <div className="text-sm text-gray-500">2020 - 2024</div>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-white mb-12">
              LATEST PORTFOLIO
            </h2>
            
            <p className="text-gray-400 max-w-lg mb-16">
              My creative spirit comes alive in the digital realm. With nimble
              fingers flying across the device.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <div key={index} className="group relative">
                  <div className="relative overflow-hidden rounded-md bg-[#121212]" style={{ backgroundColor: "#121212" }}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Small + marks */}
                    <div className="absolute top-4 left-4 text-[#4ADE80] text-lg font-bold">+</div>
                    <div className="absolute bottom-4 right-4 text-[#4ADE80] text-lg font-bold">+</div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <div className="text-sm text-gray-500">2024</div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <div className="text-gray-500 uppercase text-xs tracking-wider">
                        {project.tech.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                    <button className="text-white">
                      <MoveRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={sectionRefs.contact} 
          className="min-h-screen py-16 bg-[#030303]"
          style={{
            backgroundColor: "#030303",
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">04</div>
              <div className="text-sm text-gray-500 font-mono">//CONTACT</div>
              <div className="text-sm text-gray-500">2020 - 2024</div>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-white mb-16">
              GET IN TOUCH
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <form className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm text-gray-500 uppercase tracking-wide">Name</label>
                    <Input id="name" placeholder="Your name" className="bg-[#101010] border-[#222222] h-14 text-white" 
                      style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm text-gray-500 uppercase tracking-wide">Email</label>
                    <Input id="email" type="email" placeholder="Your email address" className="bg-[#101010] border-[#222222] h-14 text-white" 
                      style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm text-gray-500 uppercase tracking-wide">Message</label>
                    <Textarea id="message" placeholder="Your message" className="bg-[#101010] border-[#222222] min-h-32 text-white" 
                      style={{ backgroundColor: "#101010", borderColor: "#222222" }}
                    />
                  </div>
                  <Button className="w-full bg-[#101010] hover:bg-[#1a1a1a] h-14 mt-4">
                    <span className="text-[#4ADE80] mr-2">
                      <Mail className="h-5 w-5" />
                    </span>
                    Send Message
                  </Button>
                </form>
              </div>
              <div className="lg:pl-16">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Email</div>
                    <div className="text-[#4ADE80]">humayun.raza@example.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Phone</div>
                    <div className="text-white">+1 (555) 123-4567</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Location</div>
                    <div className="text-white">New York, NY, USA</div>
                  </div>
                  
                  <div className="pt-8">
                    <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">Follow Me</div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="icon" className="rounded-md bg-[#101010] border-[#222222] hover:border-[#4ADE80]"
                        style={{ backgroundColor: "#101010", borderColor: "#222222" }}>
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-md bg-[#101010] border-[#222222] hover:border-[#4ADE80]"
                        style={{ backgroundColor: "#101010", borderColor: "#222222" }}>
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-md bg-[#101010] border-[#222222] hover:border-[#4ADE80]"
                        style={{ backgroundColor: "#101010", borderColor: "#222222" }}>
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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