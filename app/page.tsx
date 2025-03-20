"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeSkillFrame, setActiveSkillFrame] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const skills = [
    { name: "GRAPHIC & WEBDESIGNER", active: true, url: "https://example.com/graphic-design" },
    { name: "MOTION DESIGNER", active: false, url: "https://example.com/motion-design" },
    { name: "WEBFLOW EXPERT", active: false, url: "https://example.com/webflow" },
  ];

  const portfolio = [
    {
      title: "Project 1",
      image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Project 2",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="min-h-screen w-full p-4 md:p-8 flex items-center justify-center">
      <div className="device max-w-5xl w-full">
        <div className="device-header">
          <div className="flex items-center gap-3">
            <div className="text-xl font-semibold">Personalia</div>
            <div className="device-dots">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="device-dot" />
              ))}
            </div>
          </div>
        </div>

        <div className="device-screen">
          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="aspect-square rounded-xl bg-secondary/30 p-4 flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 bg-primary rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              
              <a 
                href="https://thierry.fl-group.org/thierryvcard"
                className="contact-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Opslaan in contacten
              </a>

              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <button 
                    key={i} 
                    className="skill-button"
                    onClick={() => setActiveSkillFrame(activeSkillFrame === skill.url ? null : skill.url)}
                  >
                    <div className={`w-3 h-3 rounded-full ${skill.active ? 'bg-success' : 'bg-muted'}`} />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column (Portfolio) */}
            <div className="portfolio-container">
              <div className="portfolio-nav">
                <div className="portfolio-title">
                  <span className="text-warning">⭐</span>
                  BEDRIJFSPORTFOLIO
                </div>
                <div className="portfolio-controls">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setCurrentSlide(Math.min(portfolio.length - 1, currentSlide + 1))}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="portfolio-image">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={portfolio[currentSlide].image}
                    alt={portfolio[currentSlide].title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="grid-item">
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-success' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skill iFrames */}
        <AnimatePresence>
          {activeSkillFrame && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <Card className="w-full max-w-4xl h-[80vh] relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-4 right-4 z-10"
                  onClick={() => setActiveSkillFrame(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <iframe
                  src={activeSkillFrame}
                  className="w-full h-full rounded-lg"
                  title="Skill Details"
                />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}