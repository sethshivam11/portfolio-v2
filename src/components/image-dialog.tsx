import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

function ImageDialog({
  src,
  name,
  description,
  topics = [],
  language = "",
}: {
  src: string;
  name: string;
  description: string;
  topics?: string[];
  language?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={name}
          draggable={false}
          fill
          className={`${
            topics?.includes("react-native") ? "object-contain" : "object-cover"
          } select-none object-top transition-transform hover:scale-105 cursor-pointer`}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl sm:w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="font-bold tracking-tighter text-2xl capitalize pb-4 text-center">
            {name.replace("-", " ")}
          </DialogTitle>
          <DialogDescription>
            <Image
              src={src}
              alt={name}
              className="object-contain mx-auto rounded-md max-h-[50vh]"
              width="1024"
              height="1024"
            />
          </DialogDescription>
          <p className="text-muted-foreground text-sm max-sm:text-left">
            {description}
          </p>
          <div className="flex gap-2 flex-wrap">
            {language.length > 0 && <Badge>{language}</Badge>}
            {topics.map((topic, index) => (
              <Badge variant="secondary" key={index}>
                {topic}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">
              <Github /> Code
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>
              <ExternalLink /> Demo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
