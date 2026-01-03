import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Code, Trophy, Users, Globe, Lock } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-[#232f3e] to-[#37475a] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About WHAMazon</h1>
          <p className="text-xl text-gray-300 max-w-[800px] mb-4">
            A fully-fledged, feature-complete CTF (Capture The Flag) container meticulously designed to mimic the world's
            largest, most AWSome, and incredibly successful online shopping portal. Experience the thrill of security testing
            in an environment that feels just like the real thing.
          </p>
          <p className="text-lg text-gray-400 max-w-[800px]">
            WHAMazon represents hundreds of hours of development to create an authentic, production-quality e-commerce
            experience with intentional vulnerabilities for educational cybersecurity training. Every feature, from user
            authentication to product search to order management, has been carefully crafted to provide the most realistic
            penetration testing playground possible.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* What is WHAMazon */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">What is WHAMazon?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p className="text-lg">
              WHAMazon is a comprehensive, production-grade educational cybersecurity platform built as an immersive Capture The Flag (CTF)
              environment. Inspired by the world's most AWSome online marketplace, it's meticulously designed to replicate the look, feel,
              and functionality of a real e-commerce website - providing security enthusiasts, penetration testers, students, and
              cybersecurity professionals with a safe, legal, and incredibly realistic environment to practice offensive security techniques.
            </p>
            <p className="text-lg">
              This isn't just another simple CTF challenge. WHAMazon is a fully functional, feature-rich mock-up of a major online shopping
              portal, complete with sophisticated user authentication systems, advanced product search and filtering, real-time shopping cart
              functionality, complete order management workflows, user profile systems, administrative dashboards, and even a careers portal
              with job listings. Every aspect has been carefully engineered to mirror the complexity and scale of enterprise e-commerce platforms
              you'd encounter in the real world.
            </p>
            <p className="text-lg">
              What sets WHAMazon apart is its depth and authenticity. Unlike simple vulnerable web applications that might have a login page
              and a single SQL injection point, WHAMazon provides a multi-layered, complex application with interconnected systems, business
              logic vulnerabilities, and realistic security flaws that mirror what you'd find during actual penetration testing engagements.
              The platform contains intentional vulnerabilities carefully placed throughout the application stack, from client-side issues to
              backend API flaws, authentication bypasses to authorization failures, and everything in between.
            </p>
            <p className="text-lg">
              Whether you're preparing for OSWE, practicing for bug bounties, training a security team, running a cybersecurity competition,
              or simply wanting to understand how modern web applications can be exploited, WHAMazon provides an unparalleled training ground.
              The application uses modern technologies including React, TypeScript, Node.js, PostgreSQL, and Docker - giving you experience
              with the same tech stack used by major corporations worldwide.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
              <p className="text-sm font-semibold text-blue-900">
                <strong>Important:</strong> WHAMazon is a cybersecurity training platform created for educational purposes. It is not affiliated
                with, endorsed by, or connected to any real e-commerce company - especially not the AWSome one that inspired it. All products,
                prices, orders, user data, and transactions are completely fictional and exist solely for educational and training purposes.
                This platform is designed to teach security concepts, not to replicate or infringe upon any real business.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#007185]" />
                <CardTitle>Security Challenges</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Discover and exploit real-world vulnerabilities in a safe, legal, and fully isolated environment. WHAMazon contains
                carefully crafted security challenges covering the OWASP Top 10, including authentication bypasses, SQL injection
                vulnerabilities, cross-site scripting (XSS), insecure direct object references (IDOR), business logic flaws,
                session management issues, and authorization vulnerabilities. Each challenge is designed to teach you not just how
                to exploit vulnerabilities, but to understand why they exist and how they can be prevented in production systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8 text-[#007185]" />
                <CardTitle>Realistic Environment</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Built with modern, enterprise-grade web technologies including React with TypeScript for the frontend, Node.js and
                Express for the backend API, PostgreSQL for the database layer, and Docker for containerization. WHAMazon uses the
                same technology stack, architectural patterns, and development practices you'd find at major tech companies. Experience
                security challenges in a production-like application architecture that mirrors real-world e-commerce platforms, complete
                with RESTful APIs, session-based authentication, ORM patterns, and microservices-style organization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-[#007185]" />
                <CardTitle>Educational Focus</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Perfect for cybersecurity students learning offensive security techniques, penetration testers honing their skills,
                security professionals preparing for certifications like OSWE or OSCP, developers wanting to understand security from
                an attacker's perspective, and anyone interested in learning web application security through hands-on, practical experience.
                WHAMazon provides real-world scenarios that go beyond theoretical knowledge, letting you practice the same techniques used
                in actual penetration testing engagements and bug bounty programs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-[#007185]" />
                <CardTitle>Full User Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                WHAMazon features a complete, production-grade user management system including user registration and login workflows,
                persistent session management using Passport.js, role-based access control (RBAC) with regular users and administrators,
                user profile management, password hashing with bcrypt, and comprehensive admin functionality for managing users, products,
                orders, and the entire platform. The authentication system mirrors what you'd find in enterprise applications, providing
                realistic targets for testing authentication bypasses, session hijacking, privilege escalation, and authorization flaws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-[#007185]" />
                <CardTitle>E-Commerce Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Experience the full suite of e-commerce functionality you'd expect from a world-class online marketplace: browse thousands
                of products with advanced search and filtering, manage a persistent shopping cart with quantity adjustments, process complete
                checkout workflows with shipping address validation, view detailed order history with tracking, explore product categories,
                read product descriptions and reviews, and interact with a fully functional careers portal featuring real job listings with
                search and filtering capabilities. Every feature is interconnected through a complex web of APIs, database relationships, and
                business logic - creating countless opportunities to discover and exploit vulnerabilities in realistic scenarios.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="w-8 h-8 text-[#007185]" />
                <CardTitle>Safe Learning</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Practice offensive security techniques legally, ethically, and safely in a completely isolated Docker container environment.
                WHAMazon is specifically designed for security testing - there's absolutely no risk to real systems, real users, or real data.
                Unlike testing on actual websites (which could be illegal), WHAMazon provides a legitimate, purpose-built platform where you
                can explore vulnerabilities, practice exploitation techniques, develop custom tools, and learn offensive security without any
                legal or ethical concerns. It's your own personal, legal hacking playground that resets easily and never causes real harm.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-[#007185]">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    React with TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    Wouter for routing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    TanStack Query for data fetching
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    shadcn/ui component library
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 text-[#007185]">Backend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    Node.js with Express
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    PostgreSQL database
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    Drizzle ORM
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    Passport.js authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007185] rounded-full"></span>
                    Docker containerization
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purpose & Goals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Purpose & Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              WHAMazon was created to bridge the gap between simple, unrealistic CTF challenges and the complexity of real-world
              web applications. Drawing inspiration from the world's most AWSome e-commerce platform, it provides a comprehensive,
              realistic web application specifically designed for security training, penetration testing practice, and Capture The
              Flag competitions. The platform serves multiple critical purposes in the cybersecurity education ecosystem:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#007185] rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Educational Training:</strong> Teach comprehensive web application security concepts through practical,
                  hands-on exercises in a realistic environment that mirrors production systems. WHAMazon goes far beyond simple
                  demonstrations, offering complex, interconnected vulnerabilities that require real penetration testing methodology
                  to discover and exploit. Students learn not just individual techniques, but how to chain vulnerabilities together,
                  understand business context, and think like real attackers targeting enterprise applications.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#007185] rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>CTF Competitions:</strong> Host engaging, challenging security competitions where participants can test
                  their skills against a fully functional, feature-rich web application rather than artificial challenges. WHAMazon
                  provides the depth and realism needed for advanced CTF events, with multiple paths to exploitation, varying difficulty
                  levels, and realistic scenarios that require creativity, persistence, and deep technical knowledge to solve.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#007185] rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Security Research:</strong> Provide a safe, legal platform for security researchers to explore vulnerabilities,
                  develop exploitation techniques, test security tools, and experiment with attack methodologies without legal or ethical
                  concerns. Researchers can use WHAMazon to validate new vulnerability classes, develop proof-of-concept exploits, test
                  automated scanning tools, or practice manual penetration testing techniques in a consequence-free environment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#007185] rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Skill Development:</strong> Help developers and security professionals understand common security pitfalls,
                  recognize vulnerable code patterns, and learn how to build more secure applications by seeing firsthand how systems
                  can be exploited. By understanding the attacker's perspective and experiencing how vulnerabilities manifest in realistic
                  applications, developers gain invaluable insights that lead to writing more secure code and implementing proper security
                  controls from the ground up.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#007185] rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Certification Preparation:</strong> Practice the exact types of scenarios you'll encounter in professional
                  certifications like OSWE, OSCP, or GWAPT. WHAMazon provides a training ground that closely mirrors certification
                  exam challenges, helping you prepare for the real thing with hands-on experience in a realistic web application
                  environment.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-orange-500 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600">Legal Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p className="font-semibold text-lg">
              WHAMazon is a completely fictional e-commerce platform created solely for educational cybersecurity purposes,
              security research, and CTF training competitions.
            </p>
            <p>
              While WHAMazon is designed to look and feel remarkably similar to the world's most AWSome online marketplace,
              it is an independent creation with absolutely no affiliation, endorsement, sponsorship, or connection to any
              real e-commerce company, cloud services provider, or technology corporation. This platform exists purely as
              an educational tool to teach web application security in a realistic setting.
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>No Corporate Affiliation:</strong> This platform is NOT affiliated with, endorsed by, sponsored by,
                  or connected to any real company - especially not the incredibly successful, AWSome one that inspired its design.
                  WHAMazon is an independent educational project.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Fictional Content:</strong> All products, prices, product descriptions, reviews, ratings, orders,
                  job listings, user accounts, transactions, and any other data within WHAMazon are completely fictional,
                  randomly generated, or created for demonstration purposes only.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>No Real Commerce:</strong> No real goods, services, or products are sold, purchased, shipped, or
                  delivered through this platform. All checkout processes, payment pages, and order confirmations are simulated
                  for training purposes only.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Do Not Enter Real Data:</strong> NEVER enter real payment information, real credit card numbers,
                  real banking details, real social security numbers, or any other genuine personal or financial information.
                  This is a security testing platform - treat all data as public and potentially compromised.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Intentional Vulnerabilities:</strong> This platform contains intentional security vulnerabilities,
                  misconfigurations, and flaws designed specifically for educational and training purposes. These vulnerabilities
                  exist to teach security concepts - they are not mistakes or oversights.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Authorized Testing Only:</strong> Only perform security testing, vulnerability exploitation, or
                  penetration testing within authorized CTF events, training environments, or personal instances. Do not use
                  techniques learned here on real websites or applications without explicit written authorization.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Educational Use Only:</strong> WHAMazon is designed for learning, education, research, and authorized
                  security competitions. It is not intended for any commercial use, trademark infringement, or to confuse users
                  into thinking it represents a real e-commerce platform.
                </span>
              </li>
            </ul>
            <p className="text-sm italic mt-4 text-gray-600 border-t pt-4">
              © 1996-2024, WHAMazon.com, Inc. or its affiliates (Not really - this is entirely a fictional CTF security training
              platform with no connection to any real company, especially not the AWSome one)
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
