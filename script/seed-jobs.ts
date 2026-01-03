import { db } from "../server/db";
import { jobs } from "../shared/schema";

const sampleJobs = [
  {
    title: "Software Development Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    level: "Mid Level",
    description: "We're looking for talented Software Development Engineers to join our core platform team. You'll work on building scalable, distributed systems that power millions of customer transactions daily. This role offers the opportunity to work with cutting-edge cloud technologies and solve complex technical challenges.",
    responsibilities: JSON.stringify([
      "Design and implement scalable microservices architecture",
      "Collaborate with cross-functional teams to define and ship new features",
      "Write clean, maintainable code with comprehensive test coverage",
      "Participate in code reviews and mentor junior engineers",
      "Troubleshoot production issues and implement monitoring solutions",
      "Contribute to technical design discussions and architecture decisions"
    ]),
    basicQualifications: JSON.stringify([
      "Bachelor's degree in Computer Science or related field",
      "3+ years of professional software development experience",
      "Strong proficiency in at least one programming language (Java, Python, C++, or Go)",
      "Experience with data structures, algorithms, and object-oriented design",
      "Familiarity with RESTful APIs and microservices architecture"
    ]),
    preferredQualifications: JSON.stringify([
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Knowledge of containerization technologies (Docker, Kubernetes)",
      "Familiarity with CI/CD pipelines and DevOps practices",
      "Contributions to open-source projects",
      "Experience with distributed systems and databases",
      "Strong communication and collaboration skills"
    ]),
    compensationMin: 130000,
    compensationMax: 200000,
  },
  {
    title: "Senior Software Engineer - AI/ML",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior",
    description: "Join our AI/ML team to build next-generation recommendation systems and personalization features. You'll work at the intersection of machine learning and large-scale distributed systems, impacting millions of users worldwide.",
    responsibilities: JSON.stringify([
      "Design and implement machine learning models for product recommendations",
      "Build scalable data pipelines for training and inference",
      "Optimize model performance and reduce latency",
      "Collaborate with data scientists to productionize ML models",
      "Monitor model performance and implement A/B testing frameworks",
      "Research and apply state-of-the-art ML techniques"
    ]),
    basicQualifications: JSON.stringify([
      "5+ years of software engineering experience",
      "3+ years of experience with machine learning frameworks (TensorFlow, PyTorch, scikit-learn)",
      "Strong background in algorithms and data structures",
      "Experience deploying ML models to production",
      "Proficiency in Python and one other language (Java, C++, or Scala)"
    ]),
    preferredQualifications: JSON.stringify([
      "Master's or PhD in Computer Science, Machine Learning, or related field",
      "Experience with recommendation systems or personalization",
      "Knowledge of distributed computing frameworks (Spark, Hadoop)",
      "Publications in top-tier ML conferences",
      "Experience with real-time ML serving systems",
      "Familiarity with MLOps best practices"
    ]),
    compensationMin: 180000,
    compensationMax: 280000,
  },
  {
    title: "Frontend Software Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    level: "Mid Level",
    description: "We're seeking a passionate Frontend Engineer to craft beautiful, responsive user experiences. You'll work closely with designers and product managers to build intuitive interfaces that delight our customers.",
    responsibilities: JSON.stringify([
      "Build responsive web applications using modern JavaScript frameworks",
      "Implement pixel-perfect UI designs with attention to detail",
      "Optimize application performance and page load times",
      "Write comprehensive unit and integration tests",
      "Collaborate with backend engineers to design APIs",
      "Ensure cross-browser compatibility and accessibility standards"
    ]),
    basicQualifications: JSON.stringify([
      "3+ years of professional frontend development experience",
      "Expert knowledge of JavaScript/TypeScript, HTML5, and CSS3",
      "Experience with React, Vue, or Angular",
      "Understanding of RESTful APIs and asynchronous programming",
      "Familiarity with build tools (Webpack, Vite) and version control (Git)"
    ]),
    preferredQualifications: JSON.stringify([
      "Experience with Next.js or other SSR frameworks",
      "Knowledge of state management libraries (Redux, MobX, Zustand)",
      "Familiarity with design systems and component libraries",
      "Experience with performance optimization and web vitals",
      "Understanding of accessibility (WCAG) standards",
      "Experience with testing frameworks (Jest, Cypress, Playwright)"
    ]),
    compensationMin: 120000,
    compensationMax: 180000,
  },
  {
    title: "DevOps Engineer",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    description: "Join our DevOps team to build and maintain the infrastructure that powers our platform. You'll work on automation, monitoring, and reliability engineering to ensure 99.99% uptime.",
    responsibilities: JSON.stringify([
      "Design and maintain CI/CD pipelines for automated deployments",
      "Implement infrastructure as code using Terraform or CloudFormation",
      "Monitor system health and respond to incidents",
      "Optimize cloud infrastructure costs and performance",
      "Automate operational tasks and improve deployment processes",
      "Collaborate with development teams on reliability best practices"
    ]),
    basicQualifications: JSON.stringify([
      "5+ years of experience in DevOps or SRE roles",
      "Strong experience with cloud platforms (AWS, Azure, or GCP)",
      "Proficiency in scripting languages (Python, Bash, or Go)",
      "Experience with container orchestration (Kubernetes, ECS)",
      "Knowledge of monitoring and logging tools (Prometheus, Grafana, ELK)"
    ]),
    preferredQualifications: JSON.stringify([
      "Experience with infrastructure as code (Terraform, Pulumi)",
      "Knowledge of service mesh technologies (Istio, Linkerd)",
      "Familiarity with GitOps practices (ArgoCD, Flux)",
      "Experience with chaos engineering and disaster recovery",
      "Certifications in cloud platforms",
      "Understanding of security best practices and compliance"
    ]),
    compensationMin: 150000,
    compensationMax: 220000,
  },
  {
    title: "Product Manager - Technical",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior",
    description: "We're looking for a Technical Product Manager to drive our platform strategy and roadmap. You'll work with engineering, design, and business stakeholders to deliver products that customers love.",
    responsibilities: JSON.stringify([
      "Define product vision and strategy for platform features",
      "Create and maintain product roadmaps aligned with business goals",
      "Gather and analyze customer feedback and usage data",
      "Write detailed product requirements and user stories",
      "Coordinate with engineering teams on technical feasibility",
      "Track product metrics and KPIs to measure success"
    ]),
    basicQualifications: JSON.stringify([
      "5+ years of product management experience",
      "Strong technical background with engineering experience preferred",
      "Proven track record of shipping successful products",
      "Excellent communication and stakeholder management skills",
      "Data-driven approach to decision making"
    ]),
    preferredQualifications: JSON.stringify([
      "Experience in e-commerce or marketplace platforms",
      "Technical degree in Computer Science or related field",
      "Understanding of agile development methodologies",
      "Experience with A/B testing and experimentation",
      "Knowledge of SQL and analytics tools",
      "MBA or equivalent business experience"
    ]),
    compensationMin: 160000,
    compensationMax: 240000,
  },
  {
    title: "Software Development Engineer Internship - Summer 2026",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Internship",
    level: "Entry Level",
    description: "Join our 12-week summer internship program to work on real projects that impact millions of customers. You'll be paired with a mentor and work alongside experienced engineers on challenging problems.",
    responsibilities: JSON.stringify([
      "Design and implement features for production systems",
      "Participate in code reviews and team meetings",
      "Write clean, well-tested code following best practices",
      "Collaborate with cross-functional teams on projects",
      "Present your work to senior leadership at end of internship",
      "Learn about distributed systems and cloud architecture"
    ]),
    basicQualifications: JSON.stringify([
      "Currently enrolled in Bachelor's or Master's degree program",
      "Expected graduation between October 2026 and September 2029",
      "Experience with at least one programming language (Java, Python, C++, JavaScript)",
      "Knowledge of data structures and algorithms",
      "Ability to work full-time (40 hours/week) for 12 weeks",
      "18 years of age or older"
    ]),
    preferredQualifications: JSON.stringify([
      "Previous internship experience in software development",
      "Coursework in distributed systems or databases",
      "Experience with web development frameworks",
      "Contributions to open-source projects or personal projects",
      "Strong problem-solving skills",
      "Excellent communication and teamwork abilities"
    ]),
    compensationMin: 53,
    compensationMax: 53,
  },
  {
    title: "Security Engineer",
    department: "Security",
    location: "Arlington, VA",
    type: "Full-time",
    level: "Senior",
    description: "Join our Security team to protect our platform and customer data. You'll work on threat detection, incident response, and security architecture to ensure the highest level of security.",
    responsibilities: JSON.stringify([
      "Design and implement security controls and monitoring systems",
      "Conduct security assessments and penetration testing",
      "Respond to security incidents and coordinate remediation",
      "Develop security automation and tooling",
      "Review code for security vulnerabilities",
      "Educate engineering teams on security best practices"
    ]),
    basicQualifications: JSON.stringify([
      "5+ years of experience in information security",
      "Strong understanding of network security and cryptography",
      "Experience with security tools (SIEM, IDS/IPS, vulnerability scanners)",
      "Knowledge of OWASP Top 10 and common attack vectors",
      "Proficiency in at least one programming language"
    ]),
    preferredQualifications: JSON.stringify([
      "Security certifications (CISSP, CEH, OSCP)",
      "Experience with cloud security (AWS, Azure, GCP)",
      "Knowledge of compliance frameworks (SOC 2, PCI-DSS, HIPAA)",
      "Experience with threat modeling and risk assessment",
      "Familiarity with container and Kubernetes security",
      "Background in penetration testing or red teaming"
    ]),
    compensationMin: 170000,
    compensationMax: 250000,
  },
  {
    title: "Data Engineer",
    department: "Data",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Mid Level",
    description: "Build and maintain the data infrastructure that powers our analytics and machine learning platforms. You'll work with petabyte-scale datasets and cutting-edge data technologies.",
    responsibilities: JSON.stringify([
      "Design and build scalable data pipelines and ETL processes",
      "Optimize data warehouse performance and query efficiency",
      "Implement data quality monitoring and validation",
      "Collaborate with data scientists on ML feature engineering",
      "Build real-time streaming data pipelines",
      "Create and maintain data documentation and lineage"
    ]),
    basicQualifications: JSON.stringify([
      "3+ years of experience in data engineering",
      "Strong SQL skills and database knowledge",
      "Experience with big data technologies (Spark, Hadoop, Kafka)",
      "Proficiency in Python or Scala",
      "Understanding of data warehousing concepts"
    ]),
    preferredQualifications: JSON.stringify([
      "Experience with cloud data platforms (Snowflake, Redshift, BigQuery)",
      "Knowledge of data orchestration tools (Airflow, Dagster)",
      "Familiarity with data modeling and schema design",
      "Experience with streaming technologies (Kafka, Kinesis, Flink)",
      "Understanding of data governance and compliance",
      "Experience with dbt or other data transformation tools"
    ]),
    compensationMin: 140000,
    compensationMax: 210000,
  },
];

async function seedJobs() {
  console.log("Seeding jobs...");

  try {
    for (const job of sampleJobs) {
      await db.insert(jobs).values(job);
      console.log(`✓ Created job: ${job.title}`);
    }

    console.log(`\n✅ Successfully seeded ${sampleJobs.length} jobs!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding jobs:", error);
    process.exit(1);
  }
}

seedJobs();
