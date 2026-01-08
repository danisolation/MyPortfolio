"use client";

import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Project, ProjectCategory, MediaItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

const categories: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
];

// Shimmer effect for loading placeholder
const shimmer = (width: number, height: number) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1e293b" offset="20%" />
      <stop stop-color="#334155" offset="50%" />
      <stop stop-color="#1e293b" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#1e293b" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

// Preload image utility
const preloadImage = (src: string) => {
  if (typeof window !== "undefined") {
    const img = new window.Image();
    img.src = src;
  }
};

// Memoized Project Card Component
const ProjectCard = memo(function ProjectCard({
  project,
  index,
  onViewProject,
}: {
  project: Project;
  index: number;
  onViewProject: (project: Project) => void;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isGif = project.image.endsWith(".gif");

  const handleClick = useCallback(() => {
    onViewProject(project);
  }, [project, onViewProject]);

  const handleLinkClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  // Preload modal images on hover
  const handleMouseEnter = useCallback(() => {
    project.media.forEach((media) => {
      if (media.type === "image" && !media.url.endsWith(".gif")) {
        preloadImage(media.url);
      }
    });
  }, [project.media]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative bg-slate-900/80 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/30 transition-all duration-500">
        {/* Image container */}
        <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-slate-800">
          {/* Loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            quality={isGif ? 100 : 75}
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
            onLoad={handleImageLoad}
            placeholder={isGif ? "empty" : "blur"}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
            unoptimized={isGif}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900/90 rounded-lg text-white font-medium text-sm sm:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-slate-800 text-blue-400 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-slate-800 text-slate-400 rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-400 hover:text-blue-400 transition-colors"
            onClick={handleLinkClick}
          >
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            View on GitHub
            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
});

// Memoized Media Viewer Component
const MediaViewer = memo(function MediaViewer({
  media,
  currentIndex,
  projectTitle,
  isActive,
}: {
  media: MediaItem;
  currentIndex: number;
  projectTitle: string;
  isActive: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isGif = media.url.endsWith(".gif");

  // Reset loading state when media changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [media.url]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  if (media.type === "video") {
    return (
      <>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
        <video
          src={media.url}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          controls
          autoPlay={isActive}
          muted
          loop
          playsInline
          onLoadedData={handleLoad}
          onError={handleError}
        />
      </>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800">
        <span className="text-slate-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <>
      {/* Loading skeleton for modal images */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={media.url}
        alt={`${projectTitle} - ${currentIndex + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
        className={`object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        quality={isGif ? 100 : 85}
        unoptimized={isGif}
        priority={isActive}
        loading={isActive ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={isGif ? "empty" : "blur"}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(896, 504))}`}
      />
    </>
  );
});

// Memoized Project Modal Component
const ProjectModal = memo(function ProjectModal({
  project,
  currentMediaIndex,
  onClose,
  onPrevMedia,
  onNextMedia,
  onSelectMedia,
}: {
  project: Project;
  currentMediaIndex: number;
  onClose: () => void;
  onPrevMedia: () => void;
  onNextMedia: () => void;
  onSelectMedia: (index: number) => void;
}) {
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative bg-slate-900 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-slate-800"
        onClick={handleContentClick}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8 sm:h-10 sm:w-10"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        <div className="overflow-y-auto max-h-[95vh] sm:max-h-[90vh] custom-scrollbar">
          {/* Media carousel */}
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-slate-950">
            <MediaViewer
              media={project.media[currentMediaIndex]}
              currentIndex={currentMediaIndex}
              projectTitle={project.title}
              isActive={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />

            {project.media.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevMedia}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNextMedia}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                {/* Thumbnail indicators */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 bg-slate-900/80 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                  {project.media.map((mediaItem, mediaIndex) => {
                    const isGifThumb = mediaItem.url.endsWith(".gif");
                    return (
                      <button
                        key={mediaIndex}
                        onClick={() => onSelectMedia(mediaIndex)}
                        className={`relative w-8 h-6 sm:w-12 sm:h-8 rounded overflow-hidden transition-all ${
                          mediaIndex === currentMediaIndex
                            ? "ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        {mediaItem.type === "video" ? (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <span className="text-[8px] text-white">▶</span>
                          </div>
                        ) : (
                          <Image
                            src={mediaItem.url}
                            alt={`Thumbnail ${mediaIndex + 1}`}
                            fill
                            sizes="48px"
                            className="object-cover"
                            quality={30}
                            unoptimized={isGifThumb}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 pr-8">
              {project.title}
            </h3>

            <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 sm:mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500/10 text-blue-400 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Role */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 sm:mb-3">
                My Role
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.role.map((role) => (
                  <span
                    key={role}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-cyan-500/10 text-cyan-400 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-cyan-500/20"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm sm:text-base"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              View on GitHub
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Memoize filtered projects
  const filteredProjects = useMemo(
    () =>
      activeTab === "all"
        ? projects
        : projects.filter((project) => project.category === activeTab),
    [activeTab]
  );

  // Memoize event handlers
  const handlePrevMedia = useCallback(() => {
    if (!selectedProject) return;
    setCurrentMediaIndex((prev) =>
      prev === 0 ? selectedProject.media.length - 1 : prev - 1
    );
  }, [selectedProject]);

  const handleNextMedia = useCallback(() => {
    if (!selectedProject) return;
    setCurrentMediaIndex((prev) =>
      prev === selectedProject.media.length - 1 ? 0 : prev + 1
    );
  }, [selectedProject]);

  const handleViewProject = useCallback((project: Project) => {
    setCurrentMediaIndex(0);
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleSelectMedia = useCallback((index: number) => {
    setCurrentMediaIndex(index);
  }, []);

  const handleTabChange = useCallback((categoryId: ProjectCategory) => {
    setActiveTab(categoryId);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-slate-900/30 snap-start snap-always flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 sm:mb-10 lg:mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabChange(category.id)}
              className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                activeTab === category.id
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg sm:rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid - responsive columns */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewProject={handleViewProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          currentMediaIndex={currentMediaIndex}
          onClose={handleCloseModal}
          onPrevMedia={handlePrevMedia}
          onNextMedia={handleNextMedia}
          onSelectMedia={handleSelectMedia}
        />
      )}
    </section>
  );
}
