// The book's chapters and the exercise each one asks for, in order.
// `href` is set once an exercise has its own page on the site.

export interface Exercise {
  chapter: number;
  title: string;
  exercise?: string;
  href?: string;
}

export const exercises: Exercise[] = [
  { chapter: 1, title: "Start Where You Are", exercise: "Health / Work / Play / Love Dashboard", href: "/start-where-you-are/" },
  { chapter: 2, title: "Building a Compass", exercise: "Workview & Lifeview" },
  { chapter: 3, title: "Wayfinding", exercise: "Good Time Journal" },
  { chapter: 4, title: "Getting Unstuck", exercise: "Mind Mapping" },
  { chapter: 5, title: "Design Your Lives", exercise: "Odyssey Plans" },
  { chapter: 6, title: "Prototyping", exercise: "Prototype conversations & experiences" },
  { chapter: 7, title: "How Not to Get a Job" },
  { chapter: 8, title: "Designing Your Dream Job" },
  { chapter: 9, title: "Choosing Well" },
  { chapter: 10, title: "Choosing Happiness" },
  { chapter: 11, title: "Failure Immunization", exercise: "Failure Reframe" },
  { chapter: 12, title: "Building a Team" },
];
