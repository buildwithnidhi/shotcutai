"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Linkedin,
  Search,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

// Type for LinkedIn search results
type LinkedInResult = {
  id: string;
  title: string;
  url: string;
  publishedDate: string;
  author: string;
  image?: string;
  favicon?: string;
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });

  const {
    mutateAsync,
    data: searchResults,
    isPending,
    error,
  } = api.services.searchLinkedin.useMutation();

  // Process search on page load if query exists
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      void mutateAsync({ query: searchQuery });
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim() !== "") {
      void mutateAsync({ query: searchQuery });
    }
  };

  // Filter and process LinkedIn results
  const linkedInResults: LinkedInResult[] =
    searchResults?.results?.filter((result: any) =>
      result.url.includes("linkedin.com/in/"),
    ) || [];

  return (
    <div className="relative flex items-center gap-2 px-4 py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Search Section */}
        <AnimatePresence mode="sync">
          <div className="space-y-6">
            <div className="mx-auto max-w-2xl space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-white">
                  Discover External Talent
                </h1>
                <p className="text-xl text-white/80">
                  Search LinkedIn profiles and external talent sources
                </p>
              </div>

              <div className="relative">
                <form onSubmit={handleSearch} className="relative w-full">
                  <div className="relative flex items-center">
                    <div className="absolute left-5 z-20">
                      <Search className="h-6 w-6 text-blue-600" />
                    </div>
                    <Input
                      id="search-input"
                      spellCheck={false}
                      placeholder="Software Engineer in San Francisco"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-full bg-white py-7 pr-24 pl-14 text-lg shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                      disabled={isPending}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-3 z-20 rounded-full bg-blue-600 p-3 hover:bg-blue-700"
                      disabled={
                        isPending || !searchQuery || searchQuery.length < 2
                      }
                    >
                      <ArrowRight className="h-5 w-5" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </form>

                {error && (
                  <div className="mt-2 text-sm text-red-400">
                    Error searching external sources. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          {isPending && (
            <motion.div
              key="loading-animation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              <div className="mx-auto max-w-xl rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 backdrop-blur-sm">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        External Search
                      </div>
                      <div className="text-sm text-white/60">
                        Searching LinkedIn and external sources
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="h-8 w-8 rounded-full border-2 border-blue-500/30 border-t-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                  <span>Searching external talent sources...</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                    <span>Please wait</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Section - LinkedIn Profiles */}
          {linkedInResults.length > 0 && !isPending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="mb-2 text-2xl font-bold text-white">
                  LinkedIn Profiles Found
                </h2>
                <p className="text-white/70">
                  Found {linkedInResults.length} LinkedIn profiles
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {linkedInResults.map((profile, index) => {
                  // Extract name and title from the profile title
                  const titleParts = profile.title.split(" - ");
                  const name =
                    titleParts[0]?.replace(profile.author, "").trim() ||
                    profile.author;
                  const jobTitle =
                    titleParts[1]?.replace("| Linkedin", "").trim() ||
                    "Professional";

                  // Generate initials from name
                  const initials = name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <Card
                      key={profile.id}
                      className="group cursor-pointer overflow-hidden border bg-white py-0 shadow-md transition-all duration-200 hover:shadow-lg"
                      onClick={() => window.open(profile.url, "_blank")}
                    >
                      <CardContent className="p-0">
                        {/* Card Header */}
                        <div className="group relative flex h-9 items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-1">
                          <div className="absolute left-2 flex items-center gap-2">
                            <Badge className="rounded-md bg-gradient-to-tr from-blue-500 to-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                              <Linkedin className="mr-1 h-3 w-3" />
                              LinkedIn
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 h-7 w-7 rounded-full p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(profile.url, "_blank");
                            }}
                          >
                            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
                          </Button>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-col p-4">
                          {/* Avatar and Header */}
                          <div className="mb-4 flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                              <Avatar className="h-14 w-14 shadow-sm">
                                {profile.image ? (
                                  <AvatarImage src={profile.image} alt={name} />
                                ) : null}
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-base font-bold text-white">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              {/* LinkedIn indicator */}
                              <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-500">
                                <Linkedin className="h-2 w-2 text-white" />
                              </div>
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="mb-1 text-lg leading-tight font-semibold text-gray-900">
                                {name}
                              </h3>
                              <p className="text-sm leading-tight text-gray-600">
                                {jobTitle}
                              </p>
                            </div>
                          </div>

                          {/* Profile URL */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span className="truncate">
                                {profile.url.replace(
                                  "https://www.linkedin.com/in/",
                                  "",
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Published Date */}
                          {profile.publishedDate && (
                            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                {new Date(
                                  profile.publishedDate,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-auto flex items-center gap-2">
                            <Button
                              className="flex-1 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(profile.url, "_blank");
                              }}
                            >
                              <Linkedin className="mr-2 h-4 w-4" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Export Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    const dataStr = JSON.stringify(linkedInResults, null, 2);
                    const blob = new Blob([dataStr], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "linkedin-profiles.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-md"
                >
                  Export LinkedIn Profiles
                </Button>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {searchResults && linkedInResults.length === 0 && !isPending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="py-12 text-center"
            >
              <div className="mx-auto max-w-md">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-white/10 p-4">
                    <Linkedin className="h-8 w-8 text-white/60" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  No LinkedIn Profiles Found
                </h3>
                <p className="text-white/70">
                  Try different search terms or check if LinkedIn profiles exist
                  for your query.
                </p>
              </div>
            </motion.div>
          )}

          {/* Suggested Searches */}
          {!searchQuery && !isPending && (
            <motion.div className="flex flex-wrap justify-center gap-2">
              {[
                "Software Engineer",
                "Product Manager",
                "Data Scientist",
                "UX Designer",
                "DevOps Engineer",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(suggestion)}
                  className="rounded-full"
                >
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
