// What a Building a Compass page shows before anyone has written anything: the
// writing prompts and the three questions (worded from the book, from memory).
// Real answers are saved per person by #lib/storage.ts.

export type Lead = "work" | "life" | "neither";

export type TextField = "northStar" | "workview" | "lifeview" | "complement" | "clash" | "drives";

export interface CompassAnswers {
  northStar: string;
  workview: string;
  lifeview: string;
  complement: string;
  clash: string;
  drives: string;
  lead: Lead | null;
  /** Degrees from the North Star, clockwise, -180 to 180. Null until set. */
  work: number | null;
  life: number | null;
}

export const empty: CompassAnswers = {
  northStar: "",
  workview: "",
  lifeview: "",
  complement: "",
  clash: "",
  drives: "",
  lead: null,
  work: null,
  life: null,
};

/** Where the needles rest until someone sets them, shown faintly. */
export const restingNeedles = { work: -34, life: 48 };

export const prompts: Record<TextField, string> = {
  northStar:
    "One line that sums up both essays: where you'd like your work and your life to point.",
  workview:
    "What is work for? Why do it, and what does it mean? How does it connect you to other people and to society? What makes work good or worthwhile, and where do money, experience, growth and fulfillment come in? This isn't a description of your job. Aim for about 250 words.",
  lifeview:
    "What is life for? Why are we here, and what gives it meaning? How do you relate to other people, and where do family, country and the wider world fit? What is good, and what is evil? Is there something bigger than us, and what does it change? Where do joy, sorrow, justice and love come in? Aim for about 250 words.",
  complement:
    "Read your two essays side by side. Where do they agree, and back each other up?",
  clash:
    "Where do they pull in different directions? When do you feel that in a real choice?",
  drives:
    "Does one of them usually win, or shape the other? How?",
};

export const questions: { id: "complement" | "clash" | "drives"; text: string }[] = [
  { id: "complement", text: "Where do your workview and lifeview complement each other?" },
  { id: "clash", text: "Where do they clash?" },
  { id: "drives", text: "Does one drive the other? How?" },
];

export const leadNames: Record<Lead, string> = {
  work: "Work leads",
  life: "Life leads",
  neither: "Neither leads",
};
