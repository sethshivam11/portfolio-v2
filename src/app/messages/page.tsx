"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  LogOut,
  Inbox,
  Clock,
  Filter,
  SortDesc,
  SortAsc,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const cacheKey = "messages_cache";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cacheTimestamp) {
      const now = new Date().getTime();
      const cacheAge = now - parseInt(cacheTimestamp, 10);

      if (cacheAge < 3600000) {
        setMessages(JSON.parse(cachedData));
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
    }

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/messages", {
          body: JSON.stringify({ username, password }),
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const { data } = (await response.json()) || [];

        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          new Date().getTime().toString()
        );

        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        console.error("Error loading messages:", error);
        toast.error("Failed to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsAuthenticated(true);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem(cacheKey);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setMessages([]);
    setFilteredMessages([]);
  };

  useEffect(() => {
    let filtered = [...messages];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(query) ||
          msg.email.toLowerCase().includes(query) ||
          msg.message.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredMessages(filtered);
  }, [messages, searchQuery, sortOrder]);

  const openDeleteDialog = (id: string) => {
    setMessageToDelete(id);
    setDeletePassword("");
    setDeleteError("");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    if (!deletePassword.trim()) {
      setDeleteError("Please enter your password");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/delete?messageId=${messageToDelete}&password=${deletePassword}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== messageToDelete)
        );
        setIsDeleteDialogOpen(false);
        setMessageToDelete(null);
        setDeletePassword("");

        const cacheKey = "messages_cache";
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

        if (cachedData && cacheTimestamp) {
          localStorage.setItem(
            cacheKey,
            JSON.stringify(
              messages.filter((msg) => msg._id !== messageToDelete)
            )
          );
          localStorage.setItem(
            `${cacheKey}_timestamp`,
            new Date().getTime().toString()
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message, Please try again later!");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold">Message Dashboard</h1>
          <AlertDialog>
            <AlertDialogTrigger>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Log Out</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to log out? You will need to log in again
                to access your messages.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
          <Loader2 className="animate-spin" size="40" />
        </div>
      ) : (
        <main className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="search"
                placeholder="Search messages..."
                className="pl-8 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Sort Messages
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                    <SortDesc className="h-4 w-4 mr-2" />
                    Newest first
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                    <SortAsc className="h-4 w-4 mr-2" />
                    Oldest first
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Messages
              <Badge variant="secondary" className="ml-1">
                {messages.length}
              </Badge>
            </h2>
          </div>

          <MessageList
            messages={filteredMessages}
            formatDate={formatDate}
            onDelete={openDeleteDialog}
          />

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Please enter your password to confirm message deletion. This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="delete-password">Password</Label>
                  <Input
                    id="delete-password"
                    type="password"
                    name="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  {deleteError && (
                    <p className="text-sm text-red-500">{deleteError}</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Deleting
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      )}
    </div>
  );
}

interface MessageListProps {
  messages: Message[];
  formatDate: (dateString: string) => string;
  onDelete: (id: string) => void;
}

function MessageList({ messages, formatDate, onDelete }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No messages found</h3>
        <p className="text-muted-foreground">
          There are no messages matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="font-medium capitalize">
                        {message.name}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm">
                      <Link
                        href={`mailto:${message.email}`}
                        className="text-blue-500 underline text-sm"
                      >
                        {message.email}
                      </Link>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(message._id)}
                      className="text-destructive hover:text-destructive/90"
                      title="Delete message"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line wrap-break-word">
                  {message.message}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(message.createdAt)}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
