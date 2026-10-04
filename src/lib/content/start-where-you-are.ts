// Content for the "Start Where You Are" check-in.
// This is the only file that changes when answers change: scores are 0–100,
// notes are a few sentences.

export type AreaId = "health" | "work" | "play" | "love";

export interface Area {
  id: AreaId;
  name: string;
  score: number;
  note: string;
}

export const checkin: { placeholder: boolean; areas: Area[] } = {
  placeholder: true,
  areas: [
    {
      id: "health",
      name: "Health",
      score: 58,
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      id: "work",
      name: "Work",
      score: 81,
      note: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    },
    {
      id: "play",
      name: "Play",
      score: 27,
      note: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
    },
    {
      id: "love",
      name: "Love",
      score: 66,
      note: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
    },
  ],
};
