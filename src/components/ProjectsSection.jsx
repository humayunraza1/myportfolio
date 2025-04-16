import { useState } from "react";
import { MoveRight, Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageViewer from "./ImageViewer"; // Import the enhanced ImageViewer component

// Updated projects array with your data
const projects = [
  {
    id: 1,
    title: "Heuser PK | Educational Platform",
    description: "A landing page for an educational institute with a focus on user experience",
    longDescription: "Designed and developed a comprehensive landing page for Heuser PK, an educational institute focused on providing quality learning experiences. The platform features an intuitive interface, responsive design, and seamless navigation to enhance user engagement and information accessibility.",
    year: "2023",
    image: "/images/heuser.webp",
    images: [
      "/images/heuser.webp"
    ],
    github: "#",
    liveUrl: "https://heuserpk.com",
    tech: ["Next.Js", "MongoDB", "Tailwind CSS"],
    },
  {
    id: 2,
    title: "RecruitWise | AI Recruitment Platform",
    description: "An AI-powered recruitment platform that matches candidates with job openings",
    longDescription: "RecruitWise is an innovative AI-driven recruitment solution that streamlines the hiring process by intelligently matching candidates with suitable job positions. The platform analyzes candidate profiles and job requirements to suggest optimal matches, saving time and improving recruitment outcomes.",
    year: "Ongoing",
    image: "/images/recruitwise.webp",
    images: [
      "/images/recruitwise.webp"
    ],
    github: "#",
    liveUrl: "https://recruitwise-frontend.vercel.app/",
    tech: ["ReactJS", "MongoDB", "Context API"],
  },
  {
    id: 3,
    title: "Azzy's Hardware | E-commerce Store",
    description: "An e-commerce platform for hardware products with a user-friendly interface",
    longDescription: "Azzy's Hardware is a full-featured e-commerce platform specializing in hardware products. The store offers a comprehensive shopping experience with product browsing, category filtering, cart management, secure checkout, and order tracking capabilities.",
    year: "Ongoing",
    image: "/images/azzyshardware.webp",
    images: [
      "/images/azzyshardware.webp"
    ],
    github: "https://github.com/humayunraza1/ReactJS-E-commerce-Store",
    liveUrl: "https://azzyshardware.store",
    tech: ["ReactJS", "Node.js", "Express", "Tailwind CSS", "Context API"],
    }
];

export default function ProjectsSection() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setSheetOpen(true);
  };

  const openImageViewer = (image) => {
    setSelectedImage(image);
    setImageViewerOpen(true);
  };

  const sectionRefs = { projects: null }; // This would be properly defined in your full code

  return (
    <section
      ref={sectionRefs.projects}
      className="min-h-screen py-16 bg-[#050505]"
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
            <div 
              key={index} 
              className="group relative cursor-pointer"
              onClick={() => openProjectDetails(project)}
            >
              <div className="relative overflow-hidden rounded-md bg-[#121212]">
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
                  <div className="text-sm text-gray-500">{project.year}</div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <div className="text-gray-500 uppercase text-xs tracking-wider">
                    {project.tech.slice(0, 2).join(" • ")}
                  </div>
                </div>
                <button className="text-white">
                  <MoveRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right-side Sheet (Drawer) */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} side="right">
          <SheetContent 
            className="bg-[#121212] text-white border-l border-gray-800 w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0"
            style={{ maxHeight: "100vh" }}
          >
            {selectedProject && (
              <div className="h-full overflow-y-auto p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{selectedProject.year}</div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-400 mb-6">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {selectedProject.images.map((img, i) => (
                        <CarouselItem key={i}>
                          <div className="p-1">
                            <img 
                              src={img} 
                              alt={`${selectedProject.title} screenshot ${i+1}`}
                              className="w-full h-60 object-cover rounded-md cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                openImageViewer(img);
                              }}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border-gray-700">
                      <ChevronLeft className="h-4 w-4" />
                    </CarouselPrevious>
                    <CarouselNext className="right-2 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border-gray-700">
                      <ChevronRight className="h-4 w-4" />
                    </CarouselNext>
                  </Carousel>
                </div>

                <div className="space-y-8 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, i) => (
                        <Badge key={i} variant="outline" className="bg-[#1a1a1a] text-gray-300 border-gray-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">About the Project</h4>
                    <p className="text-gray-400 mb-4">{selectedProject.longDescription}</p>
                    
                    {/* <h4 className="text-lg font-semibold text-white mb-2">Challenges & Solutions</h4>
                    <p className="text-gray-400 mb-2"><span className="text-[#4ADE80]">Challenge:</span> {selectedProject.challenges}</p>
                    <p className="text-gray-400"><span className="text-[#4ADE80]">Solution:</span> {selectedProject.solutions}</p> */}
                  </div>
                </div>

                <div className="flex flex-row justify-start gap-4 mt-8">
                  <Button 
                    className="bg-[#4ADE80] hover:bg-[#3DAE70] text-black"
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live View
                  </Button>
                  {selectedProject.github !== "#" && (
                    <Button 
variant="outline" 
  className="border-[#222222] text-white hover:text-[#4ADE80] hover:border-[#4ADE80] bg-transparent hover:bg-transparent "
                      onClick={() => window.open(selectedProject.github, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub Repo
                    </Button>
                  )}
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Enhanced Image Viewer */}
        <ImageViewer 
          isOpen={imageViewerOpen} 
          onClose={() => setImageViewerOpen(false)} 
          image={selectedImage} 
        />
      </div>
    </section>
  );
}