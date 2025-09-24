"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Layout, Server, Cog } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend & Languages",
      icon: <Layout className="h-10 w-10 mb-3 text-primary" />,
      skills: [
        {
          name: "HTML",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "ReactJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "React Native",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnative/reactnative-original.svg",
        },
        {
          name: "React Router",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg",
        },
        {
          name: "Expo",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
        },
        {
          name: "Next JS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "Tailwind",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
      ],
    },
    {
      title: "Backend & Deployment",
      icon: <Server className="h-10 w-10 mb-3 text-primary" />,
      skills: [
        {
          name: "NodeJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "ExpressJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Cloudinary",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cloudinary.svg",
        },
        {
          name: "Socket.IO",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/socketdotio.svg",
        },
        {
          name: "Render",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/render.svg",
        },
        {
          name: "Vercel",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg",
        },
      ],
    },
    {
      title: "Tools & Libraries",
      icon: <Cog className="h-10 w-10 mb-3 text-primary" />,
      skills: [
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "GitHub",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        },
        {
          name: "ShadCN",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/shadcnui.svg",
        },
        {
          name: "React Hook Form",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reacthookform.svg",
        },
        {
          name: "Zod",
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zod.svg",
        },
        {
          name: "Redux Toolkit",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            My Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            I&apos;ve worked with a variety of technologies and frameworks to
            create robust and scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 shadow-sm border"
            >
              <div className="flex flex-col items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-6 h-6 relative flex-shrink-0">
                      <Image
                        src={skill.icon || "/placeholder.svg"}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className={`object-contain ${
                          skill.name === "Framer Motion" ||
                          skill.name === "REST API" ||
                          skill.name === "JWT" ||
                          skill.name === "Prisma" ||
                          skill.name === "Mongoose"
                            ? "dark:invert"
                            : ""
                        }`}
                      />
                    </div>
                    <span className="font-medium truncate">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
