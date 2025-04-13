"use client";

import type React from "react";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMobile();
  const [activeSection, setActiveSection] = useState("hero");
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  useEffect(() => {
    const sections = ["hero", "skills", "experience", "projects", "contact"];
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (isClickScrolling) return;

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    const handleScrollWithDebounce = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", handleScrollWithDebounce);

    return () => {
      window.removeEventListener("scroll", handleScrollWithDebounce);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(sectionId);
    if (element) {
      setIsClickScrolling(true);

      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });

      setActiveSection(sectionId);

      setTimeout(() => {
        setIsClickScrolling(false);
      }, 800);
    }
  };

  const navItems = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-input bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="sm:container max-sm:px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src="https://github.com/sethshivam11.png"
              alt="GitHub Avatar"
              draggable={false}
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <Link href="/" className="font-bold text-xl tracking-tighter">
            Shivam
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ModeToggle />
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "py-2 text-sm font-medium transition-colors hover:text-primary",
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="ml-2 inline-block w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
