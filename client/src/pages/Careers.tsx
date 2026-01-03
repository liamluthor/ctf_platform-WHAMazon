import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Careers() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ["/api/jobs", departmentFilter, typeFilter, locationFilter, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (departmentFilter && departmentFilter !== "all") params.append("department", departmentFilter);
      if (typeFilter && typeFilter !== "all") params.append("type", typeFilter);
      if (locationFilter) params.append("location", locationFilter);
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/jobs?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });

  const jobs = jobsData?.jobs || [];

  const formatSalary = (min?: number, max?: number) => {
    if (!min || !max) return "Competitive";

    // Handle hourly rates (for internships)
    if (min < 200) {
      return `$${min}/hr`;
    }

    // Handle annual salaries
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#232f3e] to-[#37475a] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Careers at WHAMazon</h1>
          <p className="text-xl text-gray-300 max-w-[800px]">
            Join our team of innovators, builders, and problem solvers. We're looking for talented individuals who are passionate about creating exceptional customer experiences.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Next Opportunity</CardTitle>
            <CardDescription>Search and filter through our open positions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by job title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            {((departmentFilter && departmentFilter !== "all") || (typeFilter && typeFilter !== "all") || locationFilter || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDepartmentFilter("all");
                  setTypeFilter("all");
                  setLocationFilter("");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Job Listings */}
        {isLoading ? (
          <div className="text-center py-12">Loading job opportunities...</div>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No jobs found matching your criteria. Try adjusting your filters.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Showing {jobs.length} {jobs.length === 1 ? "position" : "positions"}
            </p>

            {jobs.map((job: any) => (
              <Card
                key={job.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setLocation(`/careers/${job.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-[#007185] hover:text-[#C7511F]">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="outline">{job.level}</Badge>
                      </div>
                    </div>
                  </div>

                  <CardDescription className="text-sm line-clamp-2 mt-2">
                    {job.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatSalary(job.compensationMin, job.compensationMax)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Posted {formatDate(job.postedDate)}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
