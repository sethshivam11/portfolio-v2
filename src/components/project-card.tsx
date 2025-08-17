import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Repository } from "./projects";
import ImageDialog from "./image-dialog";
import { Badge } from "./ui/badge";

function ProjectCard({
  project,
  index,
  images,
}: {
  project: Repository;
  images: { name: string; image: string; repository: string }[];
  index: number;
}) {
  const getProjectImage = (name: string) => {
    let image = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
      name
    )}`;
    images.map((ele) => {
      if (ele.name === name) {
        image = ele.image;
      }
    });
    return image;
  };
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="capitalize text-center text-xl">
            {project.name.replace(/-/g, " ")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative aspect-video overflow-hidden rounded-md mb-4">
            <ImageDialog
              src={getProjectImage(project.name)}
              name={project.name}
              description={project.description || ""}
              topics={project.topics || []}
              language={project.language || ""}
            />
          </div>
          <p className="text-muted-foreground line-clamp-3">
            {project.description}
          </p>
          <div className="flex space-between items-center w-full mt-4">
            {project.language && (
              <Badge className="mr-2">{project.language}</Badge>
            )}
            <div>
              {project.topics &&
                project.topics.slice(0, 2).map((topic, index) => (
                  <Badge variant="secondary" className="mr-2" key={index}>
                    {topic}
                  </Badge>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
          {project.homepage && (
            <Button size="sm" asChild>
              <Link
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;
