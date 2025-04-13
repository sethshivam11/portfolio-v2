"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  const experiences = [
    {
      title: "Web Developer Intern",
      company: "DU Student Helper",
      period: "June 2024 - September 2024",
      description: [
        "Enhanced user engagement through intuitive UI/UX design and developed 4+ unique feature-rich pages.",
        "Improved a platform catering to 10,000+ DU students and 4,00,000+ CUET aspirants.",
        "Contributed to achieving the necessary traffic for Google AdSense approval.",
      ],
      skills: ["Next.js", "Figma", "Tailwind"],
    },
    {
      title: "Web Developer Intern",
      company: "House of Couton Pvt. Ltd.",
      period: "January 2025 - April 2025",
      description: [
        "Learned extensively about the MediaRecorder API on the web for recording media streams.",
        "Explored the Camera API and audio/video streams on the web for handling video capture.",
        "Learned automation testing using Selenium WebDriver for web application automation testing.",
      ],
      skills: ["Next.js", "Tailwind", "Selenium WebDriver"],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            My Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Professional experiences that have shaped my skills and knowledge in
            web development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
