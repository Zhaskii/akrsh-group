// Job About Interface
export interface JobAbout {
  company: string;
  role: string;
}

// Job Type & Status (stricter typing)
export type JobType = "Full-time" | "Part-time" | "Contract";
export type JobStatus = "Active" | "Closed";

// Main Job Interface
export interface Job {
  id: number;
  title: string;
  location: string;
  type: JobType;
  positions: string;
  posted: string;
  province: string;
  deadline: string;
  status: JobStatus;
  requirements: string[];
  about?: JobAbout; // optional
}

// Jobs Data
export const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: "Automotive engineer",
    location: "Durbar marg, Lazimpat",
    type: "Full-time",
    positions: "1 Position(s)",
    posted: "8 months ago",
    province: "Province not specified",
    deadline: "No deadline specified",
    status: "Active",
    requirements: [
      "Degree in Mechanical/Automotive Engineering",
      "Experience in vehicle diagnostics",
    ],
    about: {
      company:
        "Arksh Group, established in 1978, is a diversified Nepalese conglomerate operating across multiple industries.",
      role: "This is a full-time on-site role for a Social Media Specialist responsible for managing campaigns, creating content, and analyzing performance metrics.",
    },
  },
  {
    id: 2,
    title: "Service Technician",
    location: "Durbar marg, Lazimpat",
    type: "Full-time",
    positions: "1 Position(s)",
    posted: "8 months ago",
    province: "Province not specified",
    deadline: "No deadline specified",
    status: "Active",
    requirements: ["Technical certification", "Strong problem-solving skills"],
    about: {
      company:
        "Arksh Group, established in 1978, is a diversified Nepalese conglomerate operating across multiple industries.",
      role: "This is a full-time on-site role for a Social Media Specialist responsible for managing campaigns, creating content, and analyzing performance metrics.",
    },
  },

  {
    id: 3,
    title: "Office Runner",
    location: "Durbarmarg",
    type: "Full-time",
    positions: "2 Position(s)",
    posted: "8 months ago",
    province: "Province not specified",
    deadline: "No deadline specified",
    status: "Active",
    requirements: [
      "Basic communication skills",
      "Valid license",
      "Punctual and reliable",
    ],
    about: {
      company:
        "Arksh Group, established in 1978, is a diversified Nepalese conglomerate operating across multiple industries.",
      role: "This is a full-time on-site role for a Social Media Specialist responsible for managing campaigns, creating content, and analyzing performance metrics.",
    },
  },
  {
    id: 4,
    title: "Social Media Strategist",
    location: "152 Rani Devi Marg, Lazimpat",
    type: "Full-time",
    positions: "1 Position(s)",
    posted: "8 months ago",
    province: "Province not specified",
    deadline: "No deadline specified",
    status: "Active",
    requirements: [
      "Social media campaign planning",
      "Content strategy knowledge",
      "Analytics & reporting skills",
    ],
    about: {
      company:
        "Arksh Group, established in 1978, is a diversified Nepalese conglomerate operating across multiple industries.",
      role: "This is a full-time on-site role for a Social Media Specialist responsible for managing campaigns, creating content, and analyzing performance metrics.",
    },
  },
];
