"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pinnedRepos = [
    "sociial",
    "lastminprep",
    "campus-space",
    "gadget-store",
  ];
  const excludedRepos = [
    "portfolio",
    "portfolio-mern",
    "portfolio-v2",
    "inventory-app",
    "audio-player",
    "google-oauth",
    "project-store",
    "project-store-backend",
    "sethshivam11",
    "sda",
    "razorpay-ui",
  ];
  const images = [
    {
      name: "gadget-store",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524957/portfolio/chzs9wo4zdhekhzxlb6d.png",
      repository: "https://github.com/sethshivam11/gadget-store",
    },
    {
      name: "campus-space",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524945/portfolio/rr97kg4geno54vfoo8od.png",
      repository: "https://github.com/sethshivam11/campus-space",
    },
    {
      name: "lastminprep",
      image: "https://lastminprep.vercel.app/screenshots/home.png",
      repository: "https://github.com/sethshivam11/lastminprep",
    },
    {
      name: "grosery",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744526767/portfolio/d3tyvlbexnmwriyesvxz.png",
      repository: "https://github.com/sethshivam11/grosery",
    },
    {
      name: "2048",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524956/portfolio/h9rvzpva7vck3xv3qlsu.png",
      repository: "https://github.com/sethshivam11/2048",
    },
    {
      name: "workconnect",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524956/portfolio/tcikh1sw5ntbtdah4wem.png",
      repository: "https://github.com/sethshivam11/workconnect",
    },
    {
      name: "weather",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524954/portfolio/yfxb4crtpv9efxsgvz6z.png",
      repository: "https://github.com/sethshivam11/weather",
    },
    {
      name: "moviesandtv",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524954/portfolio/akz8easku4zy45g5llji.png",
      repository: "https://github.com/sethshivam11/moviesandtv",
    },
    {
      name: "audio-player",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524953/portfolio/mtgmy4xpakva7rzmk1qm.png",
      repository: "https://github.com/sethshivam11/audio-player",
    },
    {
      name: "newsapp",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524953/portfolio/z2cuelbgpvelz1kevpxb.png",
      repository: "https://github.com/sethshivam11/newsapp",
    },
    {
      name: "myonline",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524953/portfolio/alchhrpwnp6em3e1kxp4.png",
      repository: "https://github.com/sethshivam11/myonline",
    },
    {
      name: "robospeaker",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524952/portfolio/cvfoj1mjyqewxzjigt3z.png",
      repository: "https://github.com/sethshivam11/robospeaker",
    },
    {
      name: "face-recorder",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524948/portfolio/ash8x5colpokhwizeyxf.png",
      repository: "https://github.com/sethshivam11/face-recorder",
    },
    {
      name: "cloudnotebook",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524946/portfolio/pareilc36ielcwtf4iuc.png",
      repository: "https://github.com/sethshivam11/cloudnotebook",
    },
    {
      name: "chatapp",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524946/portfolio/rpnomvdasptklgboa5cu.png",
      repository: "https://github.com/sethshivam11/chatapp",
    },
    {
      name: "social-media-backend",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524945/portfolio/mu7whyi3poqdfnkqfb30.jpg",
      repository: "https://github.com/sethshivam11/social-media-backend",
    },
    {
      name: "sudoku",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524945/portfolio/zofefvus3aifamouvuqr.png",
      repository: "https://github.com/sethshivam11/sudoku",
    },
    {
      name: "scholarship",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524945/portfolio/zns3kudmtytjyqpzaz3f.png",
      repository: "https://github.com/sethshivam11/scholarship",
    },
    {
      name: "copypaste",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524944/portfolio/elema2l0fr33skfkxwuu.png",
      repository: "https://github.com/sethshivam11/copypaste",
    },
    {
      name: "webrtc-video-chat",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1746718456/portfolio/hj7rc22xuyww2i3ohjzk.avif",
      repository: "https://github.com/sethshivam11/webrtc-video-chat",
    },
    {
      name: "sociial",
      image: "https://sociial.vercel.app/hero-light.png",
      repository: "https://github.com/sethshivam11/sociial",
    },
    {
      name: "todo",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744526839/portfolio/kjvynyx5rkrngx4hvw7w.png",
      repository: "https://github.com/sethshivam11/todo",
    },
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);

        const cacheKey = "projects_cache";
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

        if (cachedData && cacheTimestamp) {
          const now = new Date().getTime();
          const cacheAge = now - parseInt(cacheTimestamp, 10);

          if (cacheAge < 3600000) {
            setProjects(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const response = await fetch(
          "https://api.github.com/users/sethshivam11/repos?sort=updated&per_page=50"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        const filteredProjects = [
          ...pinnedRepos.map((name) =>
            data.find((repo: Repository) => repo.name === name)
          ),
          ...data.filter(
            (repo: Repository) =>
              !pinnedRepos.includes(repo.name) &&
              !excludedRepos.includes(repo.name)
          ),
        ];

        localStorage.setItem(cacheKey, JSON.stringify(filteredProjects));
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          new Date().getTime().toString()
        );

        setProjects(filteredProjects);
        setError(null);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleViewMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projects.length));
  };

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
    <section id="projects" className="py-20 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            My Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Here are some of my recent projects. Check out my GitHub for more!
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link
                href="https://github.com/sethshivam11"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-background">
              {projects.slice(0, visibleProjects).map((project, index) => (
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
                        <Image
                          src={getProjectImage(project.name)}
                          alt={project.name}
                          fill
                          className="object-cover object-top transition-transform hover:scale-105"
                        />
                      </div>
                      <p className="text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex space-between items-center w-full mt-4">
                        <div>
                          {project.topics &&
                            project.topics.slice(0, 2).map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground mr-2"
                              >
                                {topic}
                              </span>
                            ))}
                        </div>

                        {project.language && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mr-2">
                            {project.language}
                          </span>
                        )}
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
              ))}
            </div>

            {visibleProjects < projects.length && (
              <div className="flex justify-center mt-12">
                <Button onClick={handleViewMore} size="lg">
                  View More Projects
                </Button>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/sethshivam11"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View All on GitHub
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
