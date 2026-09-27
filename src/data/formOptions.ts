export const educationLevels = [
  { value: "class-10", label: "Class 10" },
  { value: "class-12", label: "Class 12" },
  { value: "diploma", label: "Diploma" },
  { value: "college-ug", label: "College (Undergraduate)" },
  { value: "college-pg", label: "College (Postgraduate)" },
  { value: "graduate", label: "Graduate / Working" },
] as const;

export const streams = [
  { value: "science-pcm", label: "Science — PCM" },
  { value: "science-pcb", label: "Science — PCB" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts / Humanities" },
  { value: "vocational", label: "Vocational" },
  { value: "diploma", label: "Diploma (Technical)" },
  { value: "other", label: "Other" },
] as const;

export const learningStyles = [
  { value: "visual", label: "Visual (videos, diagrams)" },
  { value: "hands-on", label: "Hands-on (projects, labs)" },
  { value: "reading", label: "Reading & notes" },
  { value: "mixed", label: "Mixed" },
  { value: "online-only", label: "Online only" },
] as const;

export const budgetOptions = [
  { value: "free", label: "Free resources only" },
  { value: "low", label: "Low (under ₹10k/year)" },
  { value: "medium", label: "Medium (₹10k–50k/year)" },
  { value: "high", label: "High (₹50k+/year)" },
  { value: "any", label: "Flexible" },
] as const;

export const locationOptions = [
  { value: "india", label: "India" },
  { value: "abroad", label: "Abroad" },
  { value: "both", label: "India or abroad" },
  { value: "online", label: "Online / remote" },
] as const;

export const examSuggestions = [
  "JEE",
  "NEET",
  "CUET",
  "CA Foundation",
  "UPSC",
  "CLAT",
  "NIFT",
  "NID",
  "UCEED",
  "NATA",
  "CAT",
  "IBPS",
  "SSC",
  "Design",
  "Coding bootcamps",
  "IPMAT",
  "None yet",
];

export const subjectSuggestions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Economics",
  "Accountancy",
  "Business Studies",
  "History",
  "Political Science",
  "Psychology",
  "Fine Arts",
];

export const interestSuggestions = [
  "Technology",
  "Medicine",
  "Business",
  "Design",
  "Law",
  "Teaching",
  "Sports",
  "Writing",
  "Research",
  "Social impact",
  "Government jobs",
  "Finance",
  "Media",
  "Entrepreneurship",
];

export const skillSuggestions = [
  "Communication",
  "Leadership",
  "Coding",
  "Drawing",
  "Public speaking",
  "Excel",
  "Writing",
  "Problem solving",
  "Teamwork",
  "Analytics",
];
