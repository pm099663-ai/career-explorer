import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Code2,
  GraduationCap,
  Landmark,
  Palette,
  Scale,
  Stethoscope,
  Wrench,
  Clapperboard,
  Rocket,
  IndianRupee,
} from "lucide-react";

export interface CareerField {
  slug: string;
  name: string;
  icon: LucideIcon;
  color: string;
  tagline: string;
  overview: string;
  popularRoles: string[];
  topExams: string[];
  skillsNeeded: string[];
  degrees: string[];
  salaryNote: string;
  roadmapTips: string[];
}

export const careerFields: CareerField[] = [
  {
    slug: "engineering",
    name: "Engineering",
    icon: Wrench,
    color: "bg-blue-100 text-blue-700",
    tagline: "Build technology that shapes the world",
    overview:
      "Engineering covers software, mechanical, civil, electrical, aerospace, and more. Ideal for students strong in Physics, Math, and problem-solving.",
    popularRoles: [
      "Software Engineer",
      "Mechanical Engineer",
      "Civil Engineer",
      "AI/ML Engineer",
      "Robotics Engineer",
    ],
    topExams: ["JEE Main", "JEE Advanced", "BITSAT", "MHT-CET", "State CETs"],
    skillsNeeded: ["Mathematics", "Physics", "Logical thinking", "Coding basics"],
    degrees: ["B.Tech", "B.E.", "Integrated M.Tech", "Diploma → B.Tech lateral"],
    salaryNote: "₹4–25 LPA (entry to mid); top product roles higher",
    roadmapTips: [
      "Strengthen PCM in Class 11–12",
      "Start coding early (Python/Java)",
      "Build 2–3 portfolio projects before campus placements",
    ],
  },
  {
    slug: "medical",
    name: "Medical & Healthcare",
    icon: Stethoscope,
    color: "bg-rose-100 text-rose-700",
    tagline: "Serve society through science and care",
    overview:
      "Doctors, dentists, nurses, pharmacists, physiotherapists, and public health professionals. Requires dedication and strong Biology foundation.",
    popularRoles: [
      "MBBS Doctor",
      "Dentist (BDS)",
      "Physiotherapist",
      "Pharmacist",
      "Biomedical Researcher",
    ],
    topExams: ["NEET UG", "NEET PG", "AIIMS (merged with NEET)", "State medical CETs"],
    skillsNeeded: ["Biology", "Chemistry", "Empathy", "Discipline", "Communication"],
    degrees: ["MBBS", "BDS", "BPT", "B.Pharm", "B.Sc Nursing"],
    salaryNote: "₹6–20+ LPA depending on specialization and hospital",
    roadmapTips: [
      "Master NCERT Biology & Chemistry",
      "Consistent NEET mock tests from Class 11",
      "Explore allied health if NEET rank is limited",
    ],
  },
  {
    slug: "business",
    name: "Business & Management",
    icon: Briefcase,
    color: "bg-amber-100 text-amber-800",
    tagline: "Lead teams, brands, and ventures",
    overview:
      "Marketing, HR, operations, consulting, and entrepreneurship. Commerce and Arts students can excel with communication and analytical skills.",
    popularRoles: [
      "Marketing Manager",
      "HR Specialist",
      "Business Analyst",
      "Product Manager",
      "Consultant",
    ],
    topExams: ["CUET", "IPMAT", "NPAT", "SET", "CAT (after graduation)"],
    skillsNeeded: ["Communication", "Excel/analytics", "Presentation", "Teamwork"],
    degrees: ["BBA", "B.Com", "BBM", "MBA", "Integrated BBA+MBA"],
    salaryNote: "₹3–18 LPA; MBA from top institutes significantly higher",
    roadmapTips: [
      "Join school commerce/business clubs",
      "Learn Excel and basic finance",
      "Internships in Class 12 or college summers",
    ],
  },
  {
    slug: "law",
    name: "Law",
    icon: Scale,
    color: "bg-slate-200 text-slate-800",
    tagline: "Advocate, advise, and uphold justice",
    overview:
      "Corporate law, litigation, cyber law, and civil services overlap. Strong reading, argumentation, and ethics matter.",
    popularRoles: [
      "Corporate Lawyer",
      "Litigation Advocate",
      "Legal Consultant",
      "Judicial Services",
      "Compliance Officer",
    ],
    topExams: ["CLAT", "AILET", "LSAT India", "State law entrances"],
    skillsNeeded: ["Reading comprehension", "Debate", "Research", "Writing"],
    degrees: ["BA LLB", "BBA LLB", "B.Com LLB", "LLB after graduation"],
    salaryNote: "₹4–30+ LPA; corporate and top firms pay more",
    roadmapTips: [
      "Read newspapers and legal awareness content",
      "Practice CLAT logical reasoning",
      "Moot courts and debates in school/college",
    ],
  },
  {
    slug: "design",
    name: "Design & Creative",
    icon: Palette,
    color: "bg-purple-100 text-purple-700",
    tagline: "Design experiences, products, and stories",
    overview:
      "UI/UX, graphic design, fashion, animation, and architecture blend creativity with tools like Figma, Adobe Suite, and 3D software.",
    popularRoles: [
      "UI/UX Designer",
      "Graphic Designer",
      "Fashion Designer",
      "Animator",
      "Architect",
    ],
    topExams: ["NIFT", "NID", "UCEED", "NATA", "CEED"],
    skillsNeeded: ["Visual sense", "Portfolio", "Tools (Figma)", "User empathy"],
    degrees: ["B.Des", "B.Arch", "BFA", "Diploma in Design"],
    salaryNote: "₹3–15 LPA; product design at tech firms higher",
    roadmapTips: [
      "Build a Behance/Dribbble portfolio early",
      "Take free UI/UX courses (Google, Coursera)",
      "Participate in design challenges",
    ],
  },
  {
    slug: "government",
    name: "Government Jobs",
    icon: Landmark,
    color: "bg-emerald-100 text-emerald-800",
    tagline: "Stable careers in public service",
    overview:
      "IAS, IPS, banking, railways, SSC, defence, and state PSC roles offer stability and impact. Requires structured exam preparation.",
    popularRoles: [
      "IAS/IPS Officer",
      "Bank PO",
      "SSC CGL Officer",
      "Defence Officer",
      "State PSC Officer",
    ],
    topExams: ["UPSC CSE", "SSC CGL", "IBPS PO", "CDS", "State PSC"],
    skillsNeeded: ["General knowledge", "Aptitude", "Optional subject depth", "Discipline"],
    degrees: ["Any bachelor's degree (UPSC); specific for technical posts"],
    salaryNote: "Pay scales with allowances; strong job security",
    roadmapTips: [
      "Start NCERT + current affairs habit early",
      "Choose optional subject wisely in college",
      "Join test series 12–18 months before target exam",
    ],
  },
  {
    slug: "it-coding",
    name: "IT & Coding",
    icon: Code2,
    color: "bg-cyan-100 text-cyan-800",
    tagline: "Code the future — apps, AI, and cloud",
    overview:
      "Developers, data scientists, DevOps, and cybersecurity experts. Degrees help but portfolios and skills often matter more.",
    popularRoles: [
      "Full-Stack Developer",
      "Data Scientist",
      "DevOps Engineer",
      "Cybersecurity Analyst",
      "Mobile App Developer",
    ],
    topExams: ["JEE (for B.Tech)", "Direct admission", "Bootcamp certifications"],
    skillsNeeded: ["Programming", "Data structures", "Git", "Problem solving"],
    degrees: ["B.Tech CS/IT", "BCA", "B.Sc CS", "Self-taught + certifications"],
    salaryNote: "₹4–40+ LPA based on skills and company",
    roadmapTips: [
      "Learn one language deeply (Python/JavaScript)",
      "LeetCode/HackerRank practice",
      "Open-source contributions and GitHub profile",
    ],
  },
  {
    slug: "finance",
    name: "Finance & Accounting",
    icon: IndianRupee,
    color: "bg-green-100 text-green-800",
    tagline: "Numbers, markets, and financial strategy",
    overview:
      "Chartered Accountancy, CFA, investment banking, and fintech. Commerce students have a natural path; others can transition with certifications.",
    popularRoles: [
      "Chartered Accountant",
      "Financial Analyst",
      "Investment Banker",
      "Actuary",
      "Fintech Analyst",
    ],
    topExams: ["CA Foundation", "CFA", "CUET", "Actuarial exams"],
    skillsNeeded: ["Accounting", "Excel", "Analytical thinking", "Attention to detail"],
    degrees: ["B.Com", "BBA Finance", "CA", "MBA Finance"],
    salaryNote: "₹5–25+ LPA; CA and CFA roles premium",
    roadmapTips: [
      "Register for CA Foundation after Class 12",
      "Understand stock markets via paper trading",
      "Strong Class 11–12 Accountancy base",
    ],
  },
  {
    slug: "arts-media",
    name: "Arts & Media",
    icon: Clapperboard,
    color: "bg-orange-100 text-orange-800",
    tagline: "Tell stories through content and culture",
    overview:
      "Journalism, filmmaking, psychology, literature, and digital content creation. Growing demand in OTT, YouTube, and social media.",
    popularRoles: [
      "Journalist",
      "Content Creator",
      "Psychologist",
      "Filmmaker",
      "Social Media Manager",
    ],
    topExams: ["CUET", "IIMC entrance", "FTII", "University-specific"],
    skillsNeeded: ["Writing", "Creativity", "Research", "On-camera confidence"],
    degrees: ["BA Journalism", "BA Psychology", "BMM", "MA specializations"],
    salaryNote: "₹3–12 LPA; top creators and specialists earn more",
    roadmapTips: [
      "Start a blog, podcast, or YouTube channel",
      "Intern with media houses",
      "Build writing portfolio",
    ],
  },
  {
    slug: "teaching",
    name: "Teaching & Education",
    icon: GraduationCap,
    color: "bg-indigo-100 text-indigo-700",
    tagline: "Inspire the next generation",
    overview:
      "School teachers, professors, EdTech creators, and curriculum designers. Requires subject mastery and communication.",
    popularRoles: [
      "School Teacher",
      "Professor",
      "EdTech Content Creator",
      "Corporate Trainer",
      "Counselor",
    ],
    topExams: ["CTET", "TET", "NET/JRF", "B.Ed entrance"],
    skillsNeeded: ["Subject expertise", "Patience", "Communication", "Lesson planning"],
    degrees: ["B.Ed", "M.Ed", "MA/M.Sc + B.Ed", "PhD for higher education"],
    salaryNote: "₹3–12 LPA; government scales with experience",
    roadmapTips: [
      "Volunteer tutoring in school",
      "Pursue B.Ed after bachelor's",
      "Explore online teaching platforms",
    ],
  },
  {
    slug: "entrepreneurship",
    name: "Entrepreneurship",
    icon: Rocket,
    color: "bg-violet-100 text-violet-700",
    tagline: "Build your own path and venture",
    overview:
      "Startups in tech, D2C, services, and social impact. Combines problem-solving, sales, and resilience — any stream can succeed.",
    popularRoles: [
      "Startup Founder",
      "E-commerce Owner",
      "Freelance Consultant",
      "Social Entrepreneur",
      "Family Business Leader",
    ],
    topExams: ["No single exam — incubators, pitch competitions"],
    skillsNeeded: ["Sales", "Product thinking", "Finance basics", "Networking"],
    degrees: ["Any degree + real-world learning", "MBA optional"],
    salaryNote: "Variable — equity upside vs. risk",
    roadmapTips: [
      "Solve a real problem around you",
      "Join entrepreneurship cells and hackathons",
      "Learn digital marketing and unit economics",
    ],
  },
];

export const careerFieldBySlug = Object.fromEntries(
  careerFields.map((f) => [f.slug, f])
) as Record<string, CareerField>;
