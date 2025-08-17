"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./project-card";

export interface Repository {
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
    "todo-list",
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
      image:
        "https://github.com/sethshivam11/lastminprep/raw/main/public/screenshots/home.png",
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
      image:
        "https://github.com/sethshivam11/sociial/raw/main/public/hero-light.png",
      repository: "https://github.com/sethshivam11/sociial",
    },
    {
      name: "todo",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744526839/portfolio/kjvynyx5rkrngx4hvw7w.png",
      repository: "https://github.com/sethshivam11/todo",
    },
    {
      name: "camera",
      image:
        "https://github.com/sethshivam11/camera/raw/main/src/assets/images/camera.jpg",
      repository: "https://github.com/sethshivam11/camera",
    },
    {
      name: "tasks",
      image:
        "https://github.com/sethshivam11/tasks/raw/main/src/assets/images/home-page.jpg",
      repository: "https://github.com/sethshivam11/tasks",
    },
    {
      name: "calculator",
      image:
        "https://github.com/sethshivam11/calculator/raw/main/assets/images/calculator.jpg",
      repository: "https://github.com/sethshivam11/calculator",
    },
    {
      name: "abcd-pro",
      image:
        "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1755412745/Screenshot_2025-08-17_120716_ne0xi9.png",
      repository: "https://github.com/sethshivam11/abcd-pro",
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
                <ProjectCard
                  project={project}
                  images={images}
                  index={index}
                  key={index}
                />
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
