// Default content for the "Start Where You Are" check-in: what a dashboard shows
// before anyone has edited it. Real answers are saved per person by
// #lib/storage.ts. The owner's original answers are kept in /answers.json.

export type AreaId = "health" | "work" | "play" | "love";

export interface Area {
  id: AreaId;
  name: string;
  score: number;
  note: string;
  /** What to write about, shown in place of the note until there is one. */
  prompt: string;
}

export const checkin: { placeholder: boolean; areas: Area[] } = {
  placeholder: false,
  areas: [
    {
      id: "health",
      name: "Health",
      score: 25,
      note: "",
      prompt: "How full does your health feel right now: body, mind and emotions? Set this tube with Edit gauges, then tap Write to say why. Think sleep, energy, stress, and how you feel day to day.",
    },
    {
      id: "work",
      name: "Work",
      score: 50,
      note: "",
      prompt: "Work is whatever you contribute to the world, paid or not. Set this tube to how engaged and fulfilled it feels, then tap Write to say why. What drains you, and what would you change?",
    },
    {
      id: "play",
      name: "Play",
      score: 75,
      note: "",
      prompt: "Play is anything you do just for the joy of it, not to win or get somewhere. Set this tube to how much of that is in your life, then tap Write: what do you do for fun, and what do you miss?",
    },
    {
      id: "love",
      name: "Love",
      score: 100,
      note: "",
      prompt: "Love is the people in your life: partner, family, friends. Set this tube to how connected you feel, then tap Write: who's filling it, and where would you like more?",
    },
  ],
};
