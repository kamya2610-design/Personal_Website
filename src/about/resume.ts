// Edit this file to update About page content — layout code lives in index.tsx / style.module.css.

export const SHOW_HEADSHOT = true;
export const HEADSHOT_SRC = "about/headshot.jpg";
export const RESUME_PDF_SRC = "about/resume.pdf";

export const BIO =
  "Kamya Agarwal is a filmmaker and photographer based in New York, pursuing a Bachelor of Science in Media, Culture, and Communication at NYU with a triple minor in Film and Television Production, Creative Writing, and Business of Entertainment, Media and Technology. Her journey as a filmmaker began with her first Bollywood film on the big screen — instead of focusing on the actors, she was captivated by the minds behind the story. She aims to infuse Desi cultural elements into her creative work.";

export type SkillGroup = {
  label: string;
  items: string[];
};

// Grouped from the resume's Skills section — adjust freely.
export const SKILLS: SkillGroup[] = [
  {
    label: "CAMERA & EDIT",
    items: ["Adobe Creative Suite", "Final Cut Pro", "Audacity (Audio Editor)"],
  },
  {
    label: "DESIGN",
    items: ["Canva"],
  },
  {
    label: "PRODUCTION",
    items: ["Google Docs", "Google Sheets", "Microsoft Word", "PowerPoint"],
  },
  {
    label: "LANGUAGE",
    items: ["Hindi (fluent)"],
  },
];

export type ResumeEntry = {
  organization: string;
  role: string;
  dateStart: string;
  dateEnd: string;
  setting: "INT" | "EXT";
  description?: string;
};

// Merged from the resume's Experiences + Leadership & Activities sections, reverse chronological by start date.
export const RESUME_ENTRIES: ResumeEntry[] = [
  {
    organization: "NYU Delta Kappa Alpha",
    role: "Professional Cinematic Society, Screenwriters Circle",
    dateStart: "March 2025",
    dateEnd: "Present",
    setting: "INT",
    description:
      "Selected as a member of DKA after completing a rigorous rush process and entrance exam, demonstrating commitment, collaboration, and industry knowledge.",
  },
  {
    organization: "MCC MediaLab, NYU",
    role: "Lab Assistant",
    dateStart: "February 2025",
    dateEnd: "Present",
    setting: "INT",
    description:
      "Assists professors with technical and administrative work, and has conducted 15+ workshops on filmmaking equipment, audio and video handling, and Adobe Creative Suite software.",
  },
  {
    organization: "NYU Center for the Humanities",
    role: "Events and Design Assistant",
    dateStart: "January 2025",
    dateEnd: "Present",
    setting: "INT",
    description:
      "Photographs and records events for promotional materials, archival purposes, and social media outreach, while helping coordinate interdisciplinary humanities initiatives.",
  },
  {
    organization: "Fusion Film Festival, NYU",
    role: "Photo/Video Team",
    dateStart: "November 2024",
    dateEnd: "Present",
    setting: "INT",
    description:
      "Captures dynamic photos and videos of festival panels, screenings, and award ceremonies, and edits the festival's promotional sizzle reel.",
  },
  {
    organization: "NYU Tisch Student Producer's Association",
    role: "Mentorship Program",
    dateStart: "September 2024",
    dateEnd: "Present",
    setting: "INT",
    description:
      "Selected for an exclusive mentorship program, gaining hands-on experience in film production through on-set work and collaborating with professionals to develop and pitch original concepts.",
  },
  {
    organization: "Washington Square News, NYU",
    role: "Staff Photographer",
    dateStart: "August 2024",
    dateEnd: "December 2024",
    setting: "INT",
    description:
      "Captured high-quality images under tight deadlines for news stories, collaborating with reporters and editors to create compelling visuals.",
  },
  {
    organization: "Zee Institute of Media Arts",
    role: "Cinematography Intern",
    dateStart: "June 2023",
    dateEnd: "January 2024",
    setting: "EXT",
    description:
      "Scripted, directed, and produced documentaries, interviews, music videos, and narrative fiction projects, and photographed a play for Parishkar College with 1500+ student participation, curating a behind-the-scenes video.",
  },
  {
    organization: "YouTube Channel",
    role: "Content Creator",
    dateStart: "May 2023",
    dateEnd: "Present",
    setting: "EXT",
    description: "Scripts, shoots, and edits videos using Premiere Pro, enhancing storytelling with transitions, music, and visual effects.",
  },
  {
    organization: "Maharaja Sawai Man Singh Vidyalaya",
    role: "Media Team Head",
    dateStart: "April 2021",
    dateEnd: "March 2023",
    setting: "EXT",
    description:
      "Led a team of 10 media members producing video content for major school events, directing the filming and editing of highlights, interviews, and promotional videos.",
  },
];
