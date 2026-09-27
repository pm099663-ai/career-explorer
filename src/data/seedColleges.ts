import type { BranchOffering, College } from "../types/college";
import { SOURCES, unavailable } from "./sources";

function branch(
  partial: Omit<BranchOffering, "fee"> & {
    fee?: Partial<BranchOffering["fee"]>;
  }
): BranchOffering {
  const src = partial.seats.source;
  return {
    ...partial,
    fee: {
      annualTuition:
        partial.fee?.annualTuition ?? unavailable(src),
      totalFourYear:
        partial.fee?.totalFourYear ?? unavailable(src),
      hostel: partial.fee?.hostel,
      examFee: partial.fee?.examFee,
      cautionMoney: partial.fee?.cautionMoney,
      developmentFee: partial.fee?.developmentFee,
      semesterWise: partial.fee?.semesterWise,
      otherCharges: partial.fee?.otherCharges,
    },
  };
}

/** Seed colleges — fees/seats only when tied to an official source; otherwise null. */
export const SEED_COLLEGES: College[] = [
  {
    id: "iit-indore",
    name: "Indian Institute of Technology Indore",
    shortName: "IIT Indore",
    city: "Indore",
    district: "Indore",
    state: "Madhya Pradesh",
    type: "IIT",
    aicteApproved: true,
    website: "https://www.iiti.ac.in/",
    overview:
      "IIT Indore is an Institute of National Importance offering B.Tech programmes through JoSAA counselling based on JEE Advanced ranks.",
    admissionProcess:
      "Admission through JoSAA/CSAB after JEE Advanced. Seat matrix and fees are published on the JoSAA portal and IIT Indore website each counselling round.",
    officialSources: [SOURCES.josaa, SOURCES.aicte],
    scholarships: [
      "Institute merit-cum-means and national scholarships as per IIT norms — verify on the official scholarships page.",
    ],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
        cutoffs: [
          {
            year: 2024,
            exam: "JEE Advanced",
            category: "General",
            openingRank: null,
            closingRank: null,
            source: SOURCES.josaa,
          },
        ],
      }),
      branch({
        branchCode: "EE",
        branchName: "Electrical Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "META",
        branchName: "Metallurgical Engineering & Materials Science",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
    ],
    placement: {
      notes:
        "Placement statistics are published in the institute’s annual placement report — link from the official training & placement cell.",
    },
  },
  {
    id: "manit-bhopal",
    name: "Maulana Azad National Institute of Technology Bhopal",
    shortName: "MANIT / NIT Bhopal",
    city: "Bhopal",
    district: "Bhopal",
    state: "Madhya Pradesh",
    type: "NIT",
    aicteApproved: true,
    website: "https://www.manit.ac.in/",
    overview:
      "MANIT Bhopal is a National Institute of Technology (NIT) participating in JoSAA counselling for B.Tech admissions.",
    admissionProcess:
      "B.Tech through JoSAA based on JEE Main ranks. State quota and other modes are not applicable for standard NIT UG seats.",
    officialSources: [SOURCES.josaa, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "EE",
        branchName: "Electrical Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "CE",
        branchName: "Civil Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
    ],
  },
  {
    id: "iiitdm-jabalpur",
    name: "Indian Institute of Information Technology Design and Manufacturing Jabalpur",
    shortName: "IIITDM Jabalpur",
    city: "Jabalpur",
    district: "Jabalpur",
    state: "Madhya Pradesh",
    type: "IIIT",
    aicteApproved: true,
    website: "https://www.iiitdmj.ac.in/",
    overview:
      "IIITDM Jabalpur is a centrally funded technical institute offering B.Tech programmes; participates in JoSAA.",
    admissionProcess: "JoSAA counselling after JEE Main for participating IIITs.",
    officialSources: [SOURCES.josaa, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "DS",
        branchName: "Smart Manufacturing (check official brochure for exact title)",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
    ],
  },
  {
    id: "iiitm-gwalior",
    name: "Atal Bihari Vajpayee Indian Institute of Information Technology and Management Gwalior",
    shortName: "ABV-IIITM Gwalior",
    city: "Gwalior",
    district: "Gwalior",
    state: "Madhya Pradesh",
    type: "IIIT",
    aicteApproved: true,
    website: "https://www.iiitm.ac.in/",
    overview:
      "ABV-IIITM Gwalior offers B.Tech/integrated programmes; verify current UG B.Tech seat matrix on JoSAA and the institute website.",
    admissionProcess: "JoSAA (JEE Main) for applicable programmes — confirm programme list each year.",
    officialSources: [SOURCES.josaa, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
      branch({
        branchCode: "IT",
        branchName: "Information Technology",
        seats: unavailable(SOURCES.josaa),
        admissionMode: "JoSAA",
      }),
    ],
  },
  {
    id: "uit-rgpv-bhopal",
    name: "University Institute of Technology, RGPV Bhopal",
    shortName: "UIT RGPV",
    city: "Bhopal",
    district: "Bhopal",
    state: "Madhya Pradesh",
    type: "Government",
    aicteApproved: true,
    website: "https://uitrgpv.ac.in/",
    overview:
      "UIT is the constituent engineering institute of Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal.",
    admissionProcess:
      "MP DTE online counselling for state quota seats; also verify RGPV admission notifications.",
    officialSources: [SOURCES.mpDte, SOURCES.rgpv, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "IT",
        branchName: "Information Technology",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "EE",
        branchName: "Electrical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "sgsits-indore",
    name: "Shri Govindram Seksaria Institute of Technology and Science",
    shortName: "SGSITS Indore",
    city: "Indore",
    district: "Indore",
    state: "Madhya Pradesh",
    type: "Government",
    aicteApproved: true,
    website: "https://www.sgsitsindore.in/",
    overview:
      "SGSITS is a government engineering college in Indore, historically affiliated with RGPV; admissions via MP DTE counselling.",
    admissionProcess: "MP DTE counselling (JEE Main / state merit — verify current year rules on dte.mponline.gov.in).",
    officialSources: [SOURCES.mpDte, SOURCES.rgpv, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "IT",
        branchName: "Information Technology",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "EE",
        branchName: "Electrical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "CE",
        branchName: "Civil Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "iips-davv-indore",
    name: "Institute of Engineering and Technology (IET-DAVV)",
    shortName: "IET DAVV",
    city: "Indore",
    district: "Indore",
    state: "Madhya Pradesh",
    type: "Government",
    aicteApproved: true,
    website: "https://www.ietdavv.edu.in/",
    overview:
      "IET is the engineering institute of Devi Ahilya Vishwavidyalaya (DAVV), Indore — state counselling for UG engineering.",
    admissionProcess: "MP DTE counselling; confirm category-wise rules on the official MP DTE portal.",
    officialSources: [SOURCES.mpDte, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "lnct-bhopal",
    name: "Lakshmi Narain College of Technology",
    shortName: "LNCT Bhopal",
    city: "Bhopal",
    district: "Bhopal",
    state: "Madhya Pradesh",
    type: "Private",
    aicteApproved: true,
    website: "https://www.lnct.ac.in/",
    overview:
      "LNCT is a private engineering college in Bhopal affiliated with RGPV; fee and seat data must be taken from MP DTE allotment and the college fee notification.",
    admissionProcess:
      "MP DTE counselling for state quota; management quota as per MP private college rules — verify on MP DTE.",
    officialSources: [SOURCES.mpDte, SOURCES.rgpv, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "AIML",
        branchName: "Artificial Intelligence & Machine Learning",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "DS",
        branchName: "Data Science",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "srit-jabalpur",
    name: "Shri Ram Institute of Technology",
    shortName: "SRIT Jabalpur",
    city: "Jabalpur",
    district: "Jabalpur",
    state: "Madhya Pradesh",
    type: "Private",
    aicteApproved: true,
    website: "https://www.sritgroup.net/",
    overview:
      "Private engineering institute in Jabalpur — confirm AICTE approval status and intake branch-wise on the AICTE portal each academic year.",
    admissionProcess: "MP DTE counselling.",
    officialSources: [SOURCES.mpDte, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ME",
        branchName: "Mechanical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "oriental-bhopal",
    name: "Oriental Institute of Science and Technology",
    shortName: "OIST Bhopal",
    city: "Bhopal",
    district: "Bhopal",
    state: "Madhya Pradesh",
    type: "Private",
    aicteApproved: true,
    website: "https://www.oriental.ac.in/",
    overview: "Private engineering college in Bhopal under RGPV affiliation.",
    admissionProcess: "MP DTE counselling.",
    officialSources: [SOURCES.mpDte, SOURCES.rgpv, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "CYBER",
        branchName: "Cyber Security",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "CE",
        branchName: "Civil Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "mits-gwalior",
    name: "Madhav Institute of Technology and Science",
    shortName: "MITS Gwalior",
    city: "Gwalior",
    district: "Gwalior",
    state: "Madhya Pradesh",
    type: "Government",
    aicteApproved: true,
    website: "https://www.mitsgwalior.in/",
    overview:
      "MITS Gwalior is an autonomous government-aided institute with B.Tech programmes; verify current affiliation and counselling mode on MP DTE.",
    admissionProcess: "MP DTE counselling.",
    officialSources: [SOURCES.mpDte, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "ECE",
        branchName: "Electronics & Communication Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "EE",
        branchName: "Electrical Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "AUTO",
        branchName: "Automobile Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
  {
    id: "ips-academy-indore",
    name: "IPS Academy, Institute of Engineering and Science",
    shortName: "IPS Academy",
    city: "Indore",
    district: "Indore",
    state: "Madhya Pradesh",
    type: "Private",
    aicteApproved: true,
    website: "https://www.ipsacademy.org/",
    overview: "Private technical institute in Indore offering engineering programmes.",
    admissionProcess: "MP DTE counselling.",
    officialSources: [SOURCES.mpDte, SOURCES.aicte],
    branches: [
      branch({
        branchCode: "CSE",
        branchName: "Computer Science & Engineering",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
      branch({
        branchCode: "IT",
        branchName: "Information Technology",
        seats: unavailable(SOURCES.mpDte),
        admissionMode: "MP DTE",
      }),
    ],
  },
];
