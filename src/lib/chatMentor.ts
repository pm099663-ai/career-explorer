import type { StudentProfile } from "../types/student";
import { generateRecommendations } from "../data/careerPaths";

interface ChatContext {
  profile: StudentProfile | null;
}

const GREETING =
  "Hi! I'm your AI career mentor at FutureRoute AI. Ask me about careers, streams, exams, or roadmaps — I'll give practical, personalized guidance.";

const DISCLAIM =
  "\n\n*Remember: AI guidance is a starting point. Discuss big decisions with parents, teachers, or a certified career counselor.*";

function includesAny(text: string, phrases: string[]): boolean {
  const t = text.toLowerCase();
  return phrases.some((p) => t.includes(p));
}

export function getMentorReply(userMessage: string, ctx: ChatContext): string {
  const msg = userMessage.trim();
  if (!msg) return "Please type a question — I'm here to help!";

  const lower = msg.toLowerCase();

  if (includesAny(lower, ["hello", "hi", "hey", "start"])) {
    return GREETING + DISCLAIM;
  }

  if (includesAny(lower, ["engineering or design", "design or engineering", "eng vs design"])) {
    return (
      "**Engineering** suits you if you enjoy logic, math, building systems, and long-term tech careers (software, core, AI).\n\n" +
      "**Design** fits if you're visual, user-focused, love creativity + tools like Figma, and want UI/UX, product, or communication design.\n\n" +
      "**Hybrid path:** UI/UX + basic coding is popular in tech companies.\n\n" +
      "Fill your profile form for top 3 matches tailored to you." +
      DISCLAIM
    );
  }

  if (includesAny(lower, ["after commerce", "commerce student", "what can i do after commerce"])) {
    return (
      "After **Commerce**, strong paths include:\n" +
      "1. **CA / Finance** — accounting, audit, corporate finance\n" +
      "2. **BBA/MBA Marketing** — brands, digital marketing\n" +
      "3. **Law (B.Com LLB)** — corporate law\n" +
      "4. **Banking (IBPS PO)** — stable government-linked role\n" +
      "5. **Data Analytics** — if you like numbers + Excel\n" +
      "6. **Entrepreneurship** — D2C, services, family business\n\n" +
      "Pick based on whether you prefer numbers, people, or creativity." +
      DISCLAIM
    );
  }

  if (includesAny(lower, ["data scientist", "become a data scientist", "data science"])) {
    return (
      "**Roadmap to Data Scientist:**\n" +
      "1. Class 12: Math strong; any stream with Math works; PCM/Commerce with stats helps\n" +
      "2. Degree: B.Tech CS, B.Sc Statistics, or B.Com + online certs\n" +
      "3. Skills: Python, SQL, Statistics, Machine Learning basics\n" +
      "4. Projects: 2 Kaggle portfolios with Indian datasets\n" +
      "5. Role: Data Analyst intern → Junior Data Scientist (1–3 years)\n\n" +
      "Timeline: ~4–6 years from Class 12 with consistent projects." +
      DISCLAIM
    );
  }

  if (includesAny(lower, ["stream after 10", "after 10th", "which stream", "choose stream"])) {
    return (
      "**Choosing stream after Class 10:**\n\n" +
      "**Science PCM** → Engineering, IT, Architecture, Design (with exams)\n" +
      "**Science PCB** → Medicine, Pharmacy, Biotech, Psychology\n" +
      "**Commerce** → CA, BBA, Banking, MBA path\n" +
      "**Arts/Humanities** → Law, Journalism, Psychology, UPSC, Design\n" +
      "**Vocational/Diploma** → Skill-first jobs + lateral degree options\n\n" +
      "Ask: Which subjects do I enjoy? What work style do I want (lab, desk, creative, people)?\n" +
      "Don't choose stream only because friends did — match *your* strengths." +
      DISCLAIM
    );
  }

  if (includesAny(lower, ["best career", "career for me", "which career"])) {
    if (ctx.profile) {
      const recs = generateRecommendations(ctx.profile);
      const list = recs
        .map((r, i) => `${i + 1}. **${r.title}** (${r.matchScore}% match) — ${r.matchReasons[0]}`)
        .join("\n");
      return `Based on your saved profile, your top matches are:\n\n${list}\n\nOpen your **Dashboard** for full roadmaps, exams, and resources.` + DISCLAIM;
    }
    return (
      "Complete the **Student Profile** first — I'll analyze your stream, interests, skills, and goals to show your **top 3 career matches** with roadmaps." +
      DISCLAIM
    );
  }

  if (includesAny(lower, ["jee", "neet", "cuet", "upsc", "clat", "nift"])) {
    return (
      "Entrance exam quick guide:\n" +
      "• **JEE** → B.Tech/BE (PCM)\n" +
      "• **NEET** → MBBS/BDS/AYUSH (PCB)\n" +
      "• **CUET** → Central university UG programs\n" +
      "• **CLAT** → Law colleges\n" +
      "• **UPSC** → Civil services (after graduation)\n" +
      "• **NIFT/NID/UCEED** → Design & fashion\n\n" +
      "Tell me your class and stream for a sharper plan." +
      DISCLAIM
    );
  }

  if (includesAny(lower, ["salary", "scope", "future"])) {
    return (
      "Career scope depends on **skills + portfolio + college tier**, not degree name alone.\n" +
      "• IT/Data: High growth, skill-heavy\n" +
      "• Medicine/Law/CA: Regulated, exam-heavy, stable prestige\n" +
      "• Government: Competitive exams, long prep, stability\n" +
      "• Creative fields: Portfolio matters more than marks\n\n" +
      "Use Career Explorer pages for field-specific salary notes." +
      DISCLAIM
    );
  }

  return (
    "I'm your career counselor AI. Try asking:\n" +
    "• Which career is best for me?\n" +
    "• Engineering or design?\n" +
    "• What after Commerce?\n" +
    "• How to become a data scientist?\n" +
    "• Which stream after 10th?\n\n" +
    "Or complete your profile for personalized top-3 recommendations." +
    DISCLAIM
  );
}

export const mentorWelcome = GREETING;
