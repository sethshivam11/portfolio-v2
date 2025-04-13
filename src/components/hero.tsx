"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import HighlightedLine from "./highlighted-line";

export default function Hero() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/sethshivam11",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/sethshivam11",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/sethshivam11",
      icon: <Twitter className="h-5 w-5" />,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[95dvh] flex items-center overflow-hidden"
    >
      <div className="container md:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-2 flex items-center">
                Hello there{" "}
                <motion.span
                  animate={{ rotate: [0, 20, 0, 20, 0] }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.2, 0.4, 0.6, 0.8],
                    repeat: 1,
                    repeatDelay: 3,
                  }}
                  className="inline-block ml-2"
                >
                  👋
                </motion.span>
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                I&apos;m{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Shivam
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-muted-foreground">
                I create engaging, responsive web experiences with modern
                technologies. Passionate about clean code and innovative
                solutions that make a difference.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg">
                <Link
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "projects")}
                >
                  View My Work
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                >
                  Get In Touch
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-4"
            >
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-110"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="hidden md:block"
          >
            <CodeEditorAnimation />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <Link
              href="#skills"
              onClick={(e) => scrollToSection(e, "skills")}
              aria-label="Scroll to Skills section"
            >
              <ArrowDown className="h-8 w-8 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const CodeEditorAnimation = () => {
  const codeLines = [
    "function Portfolio() {",
    "  const skills = ['React', 'Next.js', 'TypeScript'];",
    "  const passion = 'Building amazing web experiences';",
    " ",
    "  return (",
    "    <Developer",
    "      name='Shivam'",
    "      skills={skills}",
    "      passion={passion}",
    "    />",
    "  );",
    "}",
    " ",
  ];

  return (
    <div className="w-full h-[400px] rounded-xl border overflow-hidden bg-[#2d2d2d] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[#292929] border-b border-stone-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs font-medium text-white">portfolio.tsx</div>
        <div className="text-xs text-muted-foreground">React • TypeScript</div>
      </div>

      <div className="p-4 font-mono text-sm overflow-hidden h-[calc(100%-40px)]">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-[0.05rem] border-r-2 border-stone-700 text-muted-foreground select-none">
            {Array.from({ length: codeLines.length }).map((_, index) => (
              <span key={index} className="mr-2">
                {index + 1}
              </span>
            ))}
          </div>
          <div className="relative">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex"
              >
                <TypewriterText text={line} delay={index * 0.5} />
              </motion.div>
            ))}
            <motion.div
              className="absolute bottom-0 w-2 h-4 bg-white"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.2 }}
      className="code-block text-wrap"
      suppressHydrationWarning
    >
      <HighlightedLine line={text} />
    </motion.span>
  );
};
