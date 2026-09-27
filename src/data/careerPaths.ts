import type { CareerRecommendation, RoadmapStage, StudentProfile } from "../types/student";

export interface CareerPathTemplate {
  id: string;
  title: string;
  field: string;
  streams: string[];
  keywords: string[];
  exams: string[];
  courses: string[];
  requiredSkills: string[];
  freeResources: string[];
  paidResources: string[];
  estimatedTime: string;
  difficulty: CareerRecommendation["difficulty"];
  careerScope: string;
  salaryRange: string;
  buildRoadmap: (profile: StudentProfile) => RoadmapStage[];
}

const baseStages = (
  start: string[],
  skills: string[],
  subjects: string[],
  exams: string[],
  projects: string[],
  courses: string[],
  career: string[]
): RoadmapStage[] => [
  { id: "start", title: "Start Here", description: "Your foundation phase", items: start, icon: "flag" },
  { id: "skills", title: "Skills to Learn", description: "Build these competencies", items: skills, icon: "zap" },
  { id: "subjects", title: "Subjects to Focus", description: "Academic priorities", items: subjects, icon: "book" },
  { id: "exams", title: "Exams to Prepare", description: "Target entrances", items: exams, icon: "target" },
  { id: "projects", title: "Projects to Build", description: "Hands-on proof", items: projects, icon: "hammer" },
  { id: "courses", title: "Courses to Complete", description: "Structured learning", items: courses, icon: "graduation" },
  { id: "career", title: "Internship / Job Direction", description: "Where this leads", items: career, icon: "briefcase" },
];

export const careerPathTemplates: CareerPathTemplate[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    field: "it-coding",
    streams: ["science-pcm", "diploma", "other"],
    keywords: ["coding", "programming", "computer", "tech", "software", "app", "developer", "it", "logic", "math"],
    exams: ["JEE Main", "BITSAT", "State CET", "Direct B.Tech/BCA admission"],
    courses: ["B.Tech Computer Science", "BCA", "B.Sc Computer Science", "Diploma in CS"],
    requiredSkills: ["Programming (Python/Java)", "Data Structures", "Git", "Problem solving"],
    freeResources: ["freeCodeCamp", "CS50 Harvard", "NPTEL Programming courses", "The Odin Project"],
    paidResources: ["Scaler Academy", "Coding Ninjas", "Udemy full-stack courses"],
    estimatedTime: "4–5 years (degree) + 6–12 months skill depth",
    difficulty: "Moderate",
    careerScope: "High demand in India and globally; remote work possible",
    salaryRange: "₹4–25 LPA (fresher to 3 years); FAANG/product higher",
    buildRoadmap: (p) =>
      baseStages(
        ["Pick Python or JavaScript as first language", "Understand how the internet works"],
        ["HTML/CSS basics", "DSA fundamentals", "One framework (React/Node)"],
        p.favoriteSubjects.length ? p.favoriteSubjects : ["Mathematics", "Computer Science"],
        ["JEE or university entrance", "Optional: coding certifications"],
        ["Calculator app", "Todo full-stack app", "Open-source contribution"],
        ["B.Tech/BCA + NPTEL DSA", "System design basics (Year 3–4)"],
        ["Intern at startup", "Campus placement", "Remote junior developer roles"]
      ),
  },
  {
    id: "data-scientist",
    title: "Data Scientist / Analyst",
    field: "it-coding",
    streams: ["science-pcm", "commerce", "diploma"],
    keywords: ["data", "analytics", "statistics", "ai", "machine learning", "python", "research", "numbers"],
    exams: ["JEE", "CUET for B.Sc Statistics/CS", "CAT for MBA Analytics"],
    courses: ["B.Tech CS", "B.Sc Statistics", "B.Com + analytics certifications", "M.Sc Data Science"],
    requiredSkills: ["Python", "Statistics", "SQL", "Visualization", "ML basics"],
    freeResources: ["Kaggle Learn", "Google Data Analytics Certificate", "StatQuest YouTube", "NPTEL ML"],
    paidResources: ["upGrad Data Science", "Coursera IBM Data Science", "IIIT-B PG Diploma"],
    estimatedTime: "3–5 years education + 1 year portfolio",
    difficulty: "Challenging",
    careerScope: "Growing in finance, e-commerce, healthcare, and SaaS",
    salaryRange: "₹5–18 LPA entry; senior roles ₹20–40 LPA",
    buildRoadmap: (p) =>
      baseStages(
        ["Learn Python + Pandas", "Basic statistics from Class 11–12 level"],
        ["SQL", "Tableau/Power BI", "Scikit-learn intro"],
        ["Math", "Statistics", ...(p.favoriteSubjects.slice(0, 2))],
        p.examPreferences.length ? p.examPreferences : ["CUET / JEE per your degree path"],
        ["EDA on Indian dataset (Kaggle)", "Sales prediction mini-project"],
        ["Bachelor's + 2–3 online specializations"],
        ["Data analyst intern", "Business analyst", "Junior data scientist"]
      ),
  },
  {
    id: "doctor",
    title: "Medical Doctor (MBBS)",
    field: "medical",
    streams: ["science-pcb"],
    keywords: ["doctor", "medical", "medicine", "health", "biology", "neet", "hospital", "patient"],
    exams: ["NEET UG"],
    courses: ["MBBS", "BDS (dentistry alternative)", "BAMS/BHMS (AYUSH paths)"],
    requiredSkills: ["Biology mastery", "Chemistry", "Physics basics", "Empathy", "Stamina for long study"],
    freeResources: ["NCERT Biology PDFs", "Physics Wallah NEET", "Khan Academy Biology"],
    paidResources: ["Aakash/Allen test series", "Darwin NEET app", "Marrow/PrepLadder"],
    estimatedTime: "2 years Class 11–12 prep + 5.5 years MBBS + internship",
    difficulty: "Challenging",
    careerScope: "Always in demand; specialization increases scope",
    salaryRange: "₹6–15 LPA starting; specialists much higher",
    buildRoadmap: () =>
      baseStages(
        ["Lock NEET as primary goal", "NCERT-only strategy first"],
        ["Diagram-based Biology", "Organic Chemistry mechanisms"],
        ["Biology", "Chemistry", "Physics (NEET weightage)"],
        ["NEET UG"],
        ["Volunteer at clinic/hospital", "First aid certification"],
        ["MBBS at recognized college", "USMLE/PLAB only if abroad goal"],
        ["Internship", "PG NEET specialization", "Hospital residency"]
      ),
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant (CA)",
    field: "finance",
    streams: ["commerce", "arts"],
    keywords: ["ca", "accounting", "finance", "commerce", "tax", "audit", "numbers", "business"],
    exams: ["CA Foundation", "CA Intermediate", "CA Final"],
    courses: ["CA course + B.Com (recommended parallel)"],
    requiredSkills: ["Accountancy", "Taxation", "Law basics", "Excel", "Discipline"],
    freeResources: ["ICAI study material", "Unacademy CA Foundation free batch", "YouTube: CA Rachana Ranade"],
    paidResources: ["VSI", "JK Shah", "Suphala CA classes"],
    estimatedTime: "4–5 years after Class 12 (with articleship)",
    difficulty: "Challenging",
    careerScope: "Audit firms, corporates, own practice, consulting",
    salaryRange: "₹7–20 LPA post qualification; own practice unlimited",
    buildRoadmap: () =>
      baseStages(
        ["Register CA Foundation after Class 12", "Strong Accountancy in school"],
        ["Law modules", "Taxation", "Advanced Excel"],
        ["Accountancy", "Economics", "Business Studies"],
        ["CA Foundation → Intermediate → Final"],
        ["Mock audit case studies", "GST filing practice project"],
        ["Articleship 3 years", "B.Com side by side"],
        ["Big 4 articleship", "CFO track in corporates", "Own firm"]
      ),
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    field: "design",
    streams: ["science-pcm", "commerce", "arts", "other"],
    keywords: ["design", "ui", "ux", "creative", "figma", "art", "visual", "user experience"],
    exams: ["UCEED", "NID", "NIFT (fashion branch)", "Direct design college admission"],
    courses: ["B.Des Interaction Design", "BFA", "Diploma + portfolio route"],
    requiredSkills: ["Figma", "User research", "Visual hierarchy", "Prototyping"],
    freeResources: ["Google UX Design Certificate (audit free)", "Figma Learn", "Interaction Design Foundation articles"],
    paidResources: ["Designboat", "IDC IIT Bombay short courses", "Coursera CalArts Graphic Design"],
    estimatedTime: "3–4 years degree or 1–2 years intensive portfolio path",
    difficulty: "Moderate",
    careerScope: "Tech companies, agencies, freelancing, product startups",
    salaryRange: "₹4–14 LPA; senior product designers higher",
    buildRoadmap: (p) =>
      baseStages(
        ["Learn Figma basics in 2 weeks", "Study apps you use daily — what works?"],
        ["Wireframing", "Design systems", "Basic HTML/CSS for handoff"],
        p.favoriteSubjects.length ? p.favoriteSubjects : ["Fine Arts", "Computer", "Psychology"],
        ["UCEED/NID if targeting top colleges"],
        ["Redesign 2 real apps", "Case study on Behance"],
        ["B.Des or certified UX bootcamp"],
        ["Design intern", "Agency junior", "In-house product designer"]
      ),
  },
  {
    id: "civil-services",
    title: "Civil Services (IAS/IPS/IFS)",
    field: "government",
    streams: ["science-pcm", "science-pcb", "commerce", "arts"],
    keywords: ["upsc", "ias", "government", "civil service", "administration", "public service", "ips"],
    exams: ["UPSC CSE", "State PSC"],
    courses: ["Any bachelor's degree (3 years minimum)"],
    requiredSkills: ["General studies", "Answer writing", "Optional subject depth", "Current affairs"],
    freeResources: ["NCERT books", "PIB", "Rajya Sabha TV", "Unacademy free UPSC snippets"],
    paidResources: ["Vision IAS", "Drishti IAS", "Vajiram & Ravi notes"],
    estimatedTime: "3 years degree + 2–4 years focused prep typical",
    difficulty: "Challenging",
    careerScope: "Policy, administration, leadership roles nationally",
    salaryRange: "Government pay scales + allowances; high prestige",
    buildRoadmap: () =>
      baseStages(
        ["Choose bachelor's with strong optional (History, PSIR, etc.)", "Daily newspaper habit"],
        ["Answer writing", "Essay practice", "Map work for Geography"],
        ["History", "Polity", "Economy basics"],
        ["UPSC Prelims → Mains → Interview"],
        ["Mock test analysis notebook", "Essay portfolio"],
        ["Bachelor's + parallel GS foundation"],
        ["Training at LBSNAA", "Field postings", "Policy roles"]
      ),
  },
  {
    id: "mba-marketing",
    title: "Marketing & Brand Manager",
    field: "business",
    streams: ["commerce", "arts", "science-pcm"],
    keywords: ["marketing", "brand", "business", "sales", "commerce", "advertising", "communication"],
    exams: ["CUET", "IPMAT", "NPAT", "CAT/XAT (later)"],
    courses: ["BBA Marketing", "B.Com + MBA", "BBM"],
    requiredSkills: ["Communication", "Analytics", "Creativity", "Consumer psychology"],
    freeResources: ["Google Digital Garage", "HubSpot Academy", "YouTube: Marketing fundamentals"],
    paidResources: ["MICA certificates", "ISB MOOCs", "MBA programs"],
    estimatedTime: "3 years UG + optional 2 years MBA",
    difficulty: "Beginner-friendly",
    careerScope: "FMCG, D2C brands, agencies, tech product marketing",
    salaryRange: "₹4–12 LPA UG roles; MBA top tier ₹15–30 LPA",
    buildRoadmap: () =>
      baseStages(
        ["Follow 5 brands on social media — analyze campaigns", "Learn Canva for content"],
        ["SEO basics", "Meta Ads intro", "Excel for marketing metrics"],
        ["Business Studies", "Economics", "English"],
        ["CUET for BBA colleges", "CAT after graduation if MBA goal"],
        ["Run school fest social media", "Small business marketing volunteer"],
        ["BBA + summer internships each year"],
        ["Brand intern", "Digital marketing executive", "Product marketing"]
      ),
  },
  {
    id: "lawyer",
    title: "Lawyer / Legal Professional",
    field: "law",
    streams: ["commerce", "arts", "science-pcm"],
    keywords: ["law", "legal", "advocate", "court", "clat", "justice", "debate"],
    exams: ["CLAT", "AILET", "LSAT India"],
    courses: ["BA LLB", "BBA LLB", "B.Com LLB"],
    requiredSkills: ["Reading", "Argumentation", "Research", "Writing"],
    freeResources: ["CLAT free mocks (Career Launcher samples)", "Live Law articles", "Constitution of India overview"],
    paidResources: ["CLAT coaching (LegalEdge, etc.)", "Law school internships network"],
    estimatedTime: "5 years integrated LLB + 2–3 years practice building",
    difficulty: "Moderate",
    careerScope: "Litigation, corporate law firms, in-house counsel, judiciary",
    salaryRange: "₹4–20 LPA; corporate tier-1 firms higher",
    buildRoadmap: () =>
      baseStages(
        ["Join debate club", "Read simplified case stories"],
        ["Legal reasoning", "GK", "English comprehension"],
        ["Political Science", "History", "English"],
        ["CLAT UG"],
        ["Moot court participation", "Intern at district court/legal aid"],
        ["5-year LLB from NLU or reputed college"],
        ["Law firm associate", "Judiciary prep", "Corporate legal team"]
      ),
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    field: "engineering",
    streams: ["science-pcm", "diploma"],
    keywords: ["mechanical", "engineering", "machines", "automobile", "manufacturing", "physics"],
    exams: ["JEE Main", "MHT-CET", "State engineering entrances"],
    courses: ["B.Tech Mechanical", "Diploma Mechanical → lateral B.Tech"],
    requiredSkills: ["Physics", "CAD (SolidWorks/AutoCAD)", "Thermodynamics basics", "Manufacturing awareness"],
    freeResources: ["NPTEL Mechanical courses", "SolidWorks student license tutorials"],
    paidResources: ["Autodesk certifications", "Industry workshops"],
    estimatedTime: "4 years B.Tech + projects/internships",
    difficulty: "Moderate",
    careerScope: "Automotive, aerospace, energy, robotics, core manufacturing",
    salaryRange: "₹3.5–10 LPA core; higher with specialization/MS",
    buildRoadmap: () =>
      baseStages(
        ["Strengthen PCM", "Visit local workshop/maker lab if possible"],
        ["CAD modeling", "MATLAB basics", "Technical drawing"],
        ["Physics", "Mathematics", "Chemistry"],
        ["JEE / State CET"],
        ["Mini CAD project", "Robotics club project"],
        ["B.Tech Mech + workshop training"],
        ["Core industry trainee", "Design engineer", "Higher studies (MS/GATE)"]
      ),
  },
  {
    id: "psychologist",
    title: "Psychologist / Counselor",
    field: "arts-media",
    streams: ["science-pcb", "arts", "commerce"],
    keywords: ["psychology", "mental health", "counseling", "therapy", "human behavior", "empathy"],
    exams: ["CUET", "University-specific entrances"],
    courses: ["BA/B.Sc Psychology", "MA Psychology", "M.Phil/PhD for clinical"],
    requiredSkills: ["Active listening", "Research methods", "Statistics", "Ethics"],
    freeResources: ["Crash Course Psychology", "NPTEL Psychology", "APA student resources"],
    paidResources: ["Supervised clinical training programs", "RCI recognized courses for clinical practice"],
    estimatedTime: "3 years UG + 2 years MA + supervised practice",
    difficulty: "Moderate",
    careerScope: "Schools, hospitals, corporate wellness, private practice, research",
    salaryRange: "₹3–12 LPA; private practice scales with reputation",
    buildRoadmap: () =>
      baseStages(
        ["Read intro psychology books", "Volunteer peer counseling if available"],
        ["Research methods", "Developmental psychology basics"],
        ["Biology (for clinical)", "Statistics", "English"],
        ["CUET for top psychology departments"],
        ["Research paper summary project", "Volunteer at NGO helpline"],
        ["BA Psychology → MA → RCI path if clinical"],
        ["School counselor", "HR wellness", "Clinical psychologist (licensed)"]
      ),
  },
  {
    id: "journalist",
    title: "Journalist / Media Professional",
    field: "arts-media",
    streams: ["arts", "commerce", "science-pcm"],
    keywords: ["writing", "journalism", "media", "news", "content", "reporter", "communication"],
    exams: ["IIMC entrance", "CUET", "IPU CET", "FTII for film"],
    courses: ["BA Journalism", "BMM", "MA Mass Communication"],
    requiredSkills: ["Writing", "Research", "Video editing basics", "Ethics"],
    freeResources: ["Reuters journalism course", "YouTube: Reporting basics", "Google News Initiative"],
    paidResources: ["Asian College of Journalism", "IIMC programs"],
    estimatedTime: "3 years UG + internships throughout",
    difficulty: "Beginner-friendly",
    careerScope: "Newsrooms, digital media, PR, content agencies",
    salaryRange: "₹3–10 LPA starting; senior editors higher",
    buildRoadmap: () =>
      baseStages(
        ["Start school magazine/blog", "Follow 3 news sources daily"],
        ["Mobile journalism", "Canva", "Fact-checking"],
        ["English", "History", "Political Science"],
        ["IIMC / university journalism entrances"],
        ["5 published articles", "Short documentary 3–5 min"],
        ["BA Journalism + newsroom internship each year"],
        ["Reporter", "Digital content producer", "Editor track"]
      ),
  },
  {
    id: "entrepreneur",
    title: "Startup Founder / Entrepreneur",
    field: "entrepreneurship",
    streams: ["science-pcm", "commerce", "arts", "vocational", "other"],
    keywords: ["startup", "business", "entrepreneur", "founder", "venture", "sell", "innovation"],
    exams: ["No mandatory exam — pitch competitions, incubators"],
    courses: ["BBA", "B.Tech + entrepreneurship minor", "Online startup programs"],
    requiredSkills: ["Problem identification", "Sales", "Basic finance", "Persistence"],
    freeResources: ["Y Combinator Startup School", "Steve Blank videos", "Indian startup podcasts"],
    paidResources: ["NSRCEL", "CIIE IIM Ahmedabad programs", "Local incubators"],
    estimatedTime: "Ongoing — first viable venture often 2–5 years of learning",
    difficulty: "Challenging",
    careerScope: "Unlimited upside; high failure rate — build skills first",
    salaryRange: "Variable; funding/equity based",
    buildRoadmap: (p) =>
      baseStages(
        ["List 10 problems you see daily", "Talk to 5 potential customers"],
        ["Business model canvas", "Digital marketing", "Financial literacy"],
        p.interests.length ? p.interests.slice(0, 3) : ["Business Studies", "Economics", "Any passion subject"],
        ["Optional: BBA/incubator programs"],
        ["MVP in 30 days", "Revenue or 100-user milestone"],
        ["Lean Startup methodology", "Accounting basics course"],
        ["Accelerator", "Angel funding", "Bootstrap profitable business"]
      ),
  },
  {
    id: "teacher",
    title: "School Teacher / Educator",
    field: "teaching",
    streams: ["science-pcm", "science-pcb", "commerce", "arts"],
    keywords: ["teaching", "teacher", "education", "tutor", "mentor", "explain"],
    exams: ["CTET", "TET", "University B.Ed"],
    courses: ["B.Ed after bachelor's", "Integrated B.Sc B.Ed"],
    requiredSkills: ["Subject mastery", "Communication", "Patience", "Lesson planning"],
    freeResources: ["NCERT teacher training resources", "Khan Academy teaching tools", "DIKSHA platform"],
    paidResources: ["Regional B.Ed colleges", "NCERT-approved programs"],
    estimatedTime: "3–4 years degree + 2 years B.Ed",
    difficulty: "Beginner-friendly",
    careerScope: "Government and private schools, EdTech, coaching",
    salaryRange: "₹3–8 LPA government scales grow with experience",
    buildRoadmap: (p) =>
      baseStages(
        ["Tutor juniors in your best subject", "Observe great teachers' styles"],
        ["Lesson planning", "Classroom management basics"],
        p.favoriteSubjects.length ? p.favoriteSubjects : ["Your strongest subject"],
        ["CTET after graduation", "TET for state jobs"],
        ["Teaching demo video portfolio", "Worksheet design project"],
        ["Bachelor's in subject + B.Ed"],
        ["School teacher", "EdTech content", "Coaching faculty"]
      ),
  },
  {
    id: "architect",
    title: "Architect",
    field: "design",
    streams: ["science-pcm", "arts"],
    keywords: ["architecture", "building", "design", "drawing", "space", "nata"],
    exams: ["NATA", "JEE Paper 2", "Architecture college entrances"],
    courses: ["B.Arch (5 years)"],
    requiredSkills: ["Drawing", "Spatial thinking", "Physics basics", "CAD"],
    freeResources: ["NATA previous papers", "Architecture sketching YouTube"],
    paidResources: ["NATA coaching", "Material study workshops"],
    estimatedTime: "5 years B.Arch + internship",
    difficulty: "Moderate",
    careerScope: "Studios, real estate, urban planning, sustainable design",
    salaryRange: "₹4–12 LPA fresher; own practice later",
    buildRoadmap: () =>
      baseStages(
        ["Sketch daily objects", "Visit notable buildings in your city"],
        ["AutoCAD basics", "Model making", "Design theory"],
        ["Mathematics", "Physics", "Art/Drawing"],
        ["NATA + JEE Paper 2"],
        ["Portfolio of sketches + 1 model"],
        ["B.Arch program"],
        ["Architectural firm intern", "Junior architect", "Licensed practitioner"]
      ),
  },
  {
    id: "bank-po",
    title: "Bank Probationary Officer (PO)",
    field: "government",
    streams: ["commerce", "arts", "science-pcm"],
    keywords: ["bank", "banking", "government job", "stable", "ibps", "po"],
    exams: ["IBPS PO", "SBI PO", "RRB PO"],
    courses: ["Any bachelor's degree"],
    requiredSkills: ["Quantitative aptitude", "Reasoning", "English", "Banking awareness"],
    freeResources: ["Oliveboard free mocks", "Banking awareness PDFs", "YouTube: Study IQ banking"],
    paidResources: ["Banking exam test series", "Coaching for weak sections"],
    estimatedTime: "3 years degree + 6–12 months exam prep",
    difficulty: "Moderate",
    careerScope: "Public sector banks, growth to manager levels",
    salaryRange: "₹8–14 LPA including allowances (varies by bank)",
    buildRoadmap: () =>
      baseStages(
        ["Complete bachelor's with 60%+ aggregate", "Follow RBI basic notifications"],
        ["Aptitude speed", "Banking terms", "Computer awareness"],
        ["Quant", "Reasoning", "English"],
        ["IBPS PO / SBI PO"],
        ["Daily mock + error log", "Group discussion practice"],
        ["Any bachelor's degree"],
        ["PO probation", "Branch posting", "Manager track"]
      ),
  },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,;/]+/)
    .filter((t) => t.length > 2);
}

function overlapScore(tokens: string[], keywords: string[]): number {
  const kw = new Set(keywords.map((k) => k.toLowerCase()));
  let score = 0;
  for (const t of tokens) {
    for (const k of kw) {
      if (t.includes(k) || k.includes(t)) score += 1;
    }
  }
  return score;
}

export function generateRecommendations(profile: StudentProfile): CareerRecommendation[] {
  const tokens = [
    ...tokenize(profile.careerGoals),
    ...profile.interests.flatMap(tokenize),
    ...profile.skills.flatMap(tokenize),
    ...profile.favoriteSubjects.flatMap(tokenize),
    ...profile.examPreferences.flatMap(tokenize),
  ];

  const scored = careerPathTemplates.map((template) => {
    let score = 0;

    if (template.streams.includes(profile.stream)) score += 25;

    score += overlapScore(tokens, template.keywords) * 8;

    for (const exam of profile.examPreferences) {
      if (template.exams.some((e) => e.toLowerCase().includes(exam.toLowerCase()))) score += 12;
    }

    if (profile.educationLevel === "class-10" && ["teacher", "entrepreneur", "journalist"].includes(template.id)) {
      score += 5;
    }
    if (profile.educationLevel === "class-12" && template.exams.length) score += 5;

    if (profile.budget === "free") score += template.freeResources.length > 2 ? 5 : 0;
    if (profile.learningStyle === "online-only" && template.field === "it-coding") score += 8;
    if (profile.learningStyle === "hands-on" && ["design", "engineering", "entrepreneurship"].includes(template.field)) {
      score += 6;
    }

    const matchReasons: string[] = [];
    if (template.streams.includes(profile.stream)) {
      matchReasons.push(`Aligns with your ${profile.stream.replace(/-/g, " ")} stream`);
    }
    const kwHits = template.keywords.filter((k) =>
      tokens.some((t) => t.includes(k) || k.includes(t))
    );
    if (kwHits.length) matchReasons.push(`Matches your interests/skills: ${kwHits.slice(0, 3).join(", ")}`);
    if (profile.examPreferences.some((e) => template.exams.join(" ").toLowerCase().includes(e.toLowerCase()))) {
      matchReasons.push("Connects to your preferred entrance exams");
    }
    if (profile.careerGoals && overlapScore(tokenize(profile.careerGoals), template.keywords) > 0) {
      matchReasons.push("Fits your stated career goals");
    }
    if (matchReasons.length === 0) {
      matchReasons.push("Strong option for students with your profile and growth potential");
    }

    return {
      id: template.id,
      title: template.title,
      matchScore: Math.min(98, Math.max(55, score + 50)),
      matchReasons,
      courses: template.courses,
      requiredSkills: template.requiredSkills,
      entranceExams: template.exams,
      roadmap: template.buildRoadmap(profile),
      freeResources: template.freeResources,
      paidResources: template.paidResources,
      estimatedTime: template.estimatedTime,
      difficulty: template.difficulty,
      careerScope: template.careerScope,
      salaryRange: template.salaryRange,
      field: template.field,
    } satisfies CareerRecommendation;
  });

  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
    .map((r, i) => ({ ...r, matchScore: Math.min(98, r.matchScore - i * 3) }));
}
