import { useState } from 'react'
import { ArrowLeft, Github, Globe, Calendar, Clock, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function ProjectView() {
  const [activeTab, setActiveTab] = useState('overview')

  const project = {
    title: "E-commerce Platform",
    description: "A full-stack online shopping solution with user authentication, product catalog, shopping cart, and payment integration.",
    longDescription: "This e-commerce platform is designed to provide a seamless online shopping experience. It features a responsive design, ensuring a great user experience across all devices. The platform includes user authentication to manage accounts and track orders, a comprehensive product catalog with search and filter capabilities, a shopping cart for easy checkout, and secure payment integration.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe API"],
    features: [
      "User authentication and account management",
      "Product catalog with search and filter options",
      "Shopping cart functionality",
      "Secure payment processing with Stripe",
      "Order tracking and history",
      "Admin panel for inventory management"
    ],
    challenges: [
      "Implementing real-time inventory updates",
      "Ensuring secure handling of user data and payment information",
      "Optimizing performance for large product catalogs"
    ],
    githubUrl: "https://github.com/username/e-commerce-platform",
    liveUrl: "https://e-commerce-platform-demo.com",
    startDate: "2023-01-15",
    endDate: "2023-04-30",
    duration: "3.5 months"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        
        <Carousel className="w-full max-w-4xl mx-auto mb-8">
          <CarouselContent>
            {project.images.map((image, index) => (
              <CarouselItem key={index}>
                <img src={image} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-[400px] object-cover rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'features' ? 'default' : 'outline'}
            onClick={() => setActiveTab('features')}
          >
            Features
          </Button>
          <Button
            variant={activeTab === 'challenges' ? 'default' : 'outline'}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            {activeTab === 'overview' && (
              <div>
                <p className="text-lg mb-4">{project.longDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Start Date: {project.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>End Date: {project.endDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Duration: {project.duration}</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'features' && (
              <ul className="list-disc list-inside space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
            {activeTab === 'challenges' && (
              <ul className="list-disc list-inside space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> View on GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-4 w-4" /> Live Demo
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}