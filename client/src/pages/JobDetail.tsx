import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";

export default function JobDetail() {
  const [, params] = useRoute("/careers/:id");
  const [, setLocation] = useLocation();
  const jobId = params?.id;

  const { data: jobData, isLoading } = useQuery({
    queryKey: [`/api/jobs/${jobId}`],
    queryFn: async () => {
      const res = await fetch(`/api/jobs/${jobId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch job");
      return res.json();
    },
    enabled: !!jobId,
  });

  const job = jobData?.job;

  const formatSalary = (min?: number, max?: number) => {
    if (!min || !max) return "Competitive salary";

    // Handle hourly rates (for internships)
    if (min < 200) {
      return `$${min}/hour`;
    }

    // Handle annual salaries
    const minFormatted = min.toLocaleString();
    const maxFormatted = max.toLocaleString();
    return `$${minFormatted} - $${maxFormatted} per year`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-[900px] mx-auto px-4 py-12 text-center">
          Loading job details...
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="max-w-[900px] mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <Button onClick={() => setLocation("/careers")}>
            Back to Careers
          </Button>
        </div>
      </Layout>
    );
  }

  const responsibilities = JSON.parse(job.responsibilities);
  const basicQualifications = JSON.parse(job.basicQualifications);
  const preferredQualifications = JSON.parse(job.preferredQualifications);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#232f3e] to-[#37475a] text-white py-8">
        <div className="max-w-[900px] mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => setLocation("/careers")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Jobs
          </Button>

          <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-white text-[#232f3e] hover:bg-gray-100">{job.department}</Badge>
            <Badge className="bg-white/20 hover:bg-white/30">{job.type}</Badge>
            <Badge className="bg-white/20 hover:bg-white/30">{job.level}</Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
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
              <span>Posted on {formatDate(job.postedDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007185] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Basic Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {basicQualifications.map((qualification: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#007185] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Preferred Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Preferred Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {preferredQualifications.map((qualification: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ready to Apply?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full bg-accent hover:bg-orange-400 text-black font-semibold"
                  size="lg"
                  onClick={() => window.alert("Application feature coming soon! This is a CTF demo environment.")}
                >
                  Apply Now
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold mb-1">Department</div>
                    <div className="text-gray-600">{job.department}</div>
                  </div>

                  <div>
                    <div className="font-semibold mb-1">Job Type</div>
                    <div className="text-gray-600">{job.type}</div>
                  </div>

                  <div>
                    <div className="font-semibold mb-1">Experience Level</div>
                    <div className="text-gray-600">{job.level}</div>
                  </div>

                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <div className="text-gray-600">{job.location}</div>
                  </div>

                  <div>
                    <div className="font-semibold mb-1">Compensation</div>
                    <div className="text-gray-600">{formatSalary(job.compensationMin, job.compensationMax)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Why Join Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#007185] flex-shrink-0 mt-0.5" />
                  <span>Competitive compensation and equity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#007185] flex-shrink-0 mt-0.5" />
                  <span>Comprehensive health benefits</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#007185] flex-shrink-0 mt-0.5" />
                  <span>Work with cutting-edge technology</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#007185] flex-shrink-0 mt-0.5" />
                  <span>Career growth opportunities</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#007185] flex-shrink-0 mt-0.5" />
                  <span>Collaborative team environment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
