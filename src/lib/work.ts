import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudy } from "@/types/project";

export type Discipline = "AI and ML" | "Full-stack" | "Security" | "Research";
export type Status = "In development" | "Completed" | "Status to confirm";

export interface Work {
  slug: string;
  name: string;
  /** What it is, in a few words. Taken from the second half of the title. */
  kind: string;
  description: string;
  long?: string;
  stack: string[];
  year: string;
  status: Status;
  disciplines: Discipline[];
  repo?: string;
  live?: string;
  note?: string;
  todos: string[];
  figures?: { value: string; label: string }[];
  study?: CaseStudy;
}

const disciplines: Record<string, Discipline[]> = {
  eventra: ["Full-stack", "AI and ML"],
  "tycoon-2fa-detection": ["Security", "Research"],
  "skin-ai-bot": ["AI and ML", "Full-stack"],
  zeroproof: ["Security", "Full-stack"],
  "gnn-credit-card-fraud-detection": ["AI and ML"],
  "tomato-freshness-xai": ["AI and ML"],
  "spotify-music-recommendation-system": ["Full-stack", "AI and ML"],
  "ieee-student-branch-erp": ["Full-stack"],
  "health-assist": ["AI and ML"],
  "support-desk": ["Full-stack"],
  "email-ai-classifier": ["AI and ML"],
  "email-form-collector": ["Full-stack"],
  learnsmart: ["Full-stack", "AI and ML"],
  "nasa-seismic-noise-filtering-system": ["Research"],
  "hrm-research-repository": ["Research", "AI and ML"],
  "stock-price-prediction": ["AI and ML"],
  "ai-chatbot": ["AI and ML"],
};

const todos: Record<string, string[]> = {
  eventra: ["John's role on this project. The repository belongs to another account."],
  "ieee-student-branch-erp": [
    "Repository link.",
    "Exact dates. Site data says May 2026, the résumé says June to July 2026.",
  ],
  "ai-chatbot": ["Description. The repository is still a default scaffold."],
};

const figures: Record<string, Work["figures"]> = {
  "gnn-credit-card-fraud-detection": [
    { value: "97.6%", label: "accuracy on held-out data" },
    { value: "0.97", label: "ROC-AUC" },
    { value: "85%", label: "fraud recall" },
  ],
  "tomato-freshness-xai": [
    { value: "99.1%", label: "accuracy and F1 on the test set" },
    { value: "26", label: "features per sample" },
  ],
};

/** Shorter display names for the two titles that are a full sentence. */
const renamed: Record<string, [string, string]> = {
  "tomato-freshness-xai": ["Tomato Freshness", "Classification with Explainable AI"],
  "nasa-seismic-noise-filtering-system": ["Seismic Noise Filter", "NASA Seismic Noise Filtering System"],
};

const fromSite: Work[] = projects.map((p) => {
  const [name, kind = ""] = renamed[p.slug] ?? p.title.split(" — ");
  const profileOnly = p.githubUrl === "https://github.com/JohnJomi";
  return {
    slug: p.slug,
    name,
    kind,
    description: p.description,
    long: p.longDescription,
    stack: p.tags,
    year: p.publishedAt.slice(0, 4),
    status: p.status === "completed" ? "Completed" : "In development",
    disciplines: disciplines[p.slug] ?? [],
    repo: profileOnly ? undefined : p.githubUrl,
    live: p.liveUrl || undefined,
    note: caseStudies[p.slug]?.note,
    todos: todos[p.slug] ?? [],
    figures: figures[p.slug],
    study: caseStudies[p.slug],
  };
});

/** Listed on résumé v3 only. No status is given there, so it is not guessed. */
const ps7: Work = {
  slug: "ai-assisted-quality-inspection",
  name: "AI-Assisted Quality Inspection (PS-7)",
  kind: "",
  description:
    "The recommended model reached 0.768 mAP@50 on the held-out test set.",
  stack: ["Python", "YOLO11", "FastAPI", "SQLite", "Next.js", "WebSockets"],
  year: "2026",
  status: "Status to confirm",
  disciplines: ["AI and ML", "Full-stack"],
  todos: ["One-line description.", "Repository link.", "Status.", "Case study."],
  figures: [{ value: "0.768", label: "mAP@50 on the held-out test set" }],
};

export const works: Work[] = [...fromSite, ps7].sort(
  (a, b) => Number(b.year) - Number(a.year) || a.name.localeCompare(b.name),
);

export const selectedSlugs = [
  "gnn-credit-card-fraud-detection",
  "tycoon-2fa-detection",
  "zeroproof",
  "eventra",
  "tomato-freshness-xai",
  "nasa-seismic-noise-filtering-system",
];

export const selected = selectedSlugs.map((s) => works.find((w) => w.slug === s)!);
export const getWork = (slug: string) => works.find((w) => w.slug === slug);

/** A work as a row in the big list. */
export const toRow = (w: Work) => ({
  href: `/projects/${w.slug}`,
  title: w.name,
  side: [w.kind || w.disciplines.join(", "), `${w.status}, ${w.year}`],
  note: w.description,
  fields: w.disciplines,
});
