export type CreditGroup = {
  role: string;
  names: string[];
};

export type Film = {
  slug: string;
  title: string;
  youtubeId: string;
  poster?: string;
  year?: number;
  synopsis?: string;
  crew?: CreditGroup[];
  cast?: CreditGroup[];
};

export const FILMS: Film[] = [
  {
    slug: "bring-it-home",
    title: "Bring It Home",
    youtubeId: "3GvdTXXN-yo",
    poster: "film/bring-it-home.jpg",
    crew: [
      { role: "Directed By", names: ["Georgia Cohen"] },
      { role: "Cinematography By", names: ["Ryan Goldberg", "Georgia Cohen"] },
      { role: "Production Sound By", names: ["Jackson Boomer", "Georgia Cohen"] },
      { role: "Edited and Colored By", names: ["Kamya Agarwal"] },
      { role: "Sound Editing and Re-Recording Mix By", names: ["Riel Lewis"] },
      {
        role: "Special Thanks To",
        names: [
          "NYU Varsity Track and Cross Country Team and Coaching Staff",
          "Ashley Henegan",
          "Josh Molinari",
          "Emir Lewis",
          "Ronnie Kay",
        ],
      },
    ],
    cast: [
      { role: "Starring", names: ["Grace Richardson"] },
      { role: "Featuring", names: ["Tyler Deck Shipley", "Holly Crane", "Josephine Dziedzic", "Kate Cochran", "Janie Cooper"] },
    ],
  },
  {
    slug: "chitrakar",
    title: "Chitrakar",
    youtubeId: "n7qGHqPOa5w",
    poster: "film/chitrakar.jpg",
    year: 2025,
    synopsis:
      "Chitrakar is a visual journey into the heart of Jaipur's City Palace, uncovering the timeless tradition of Indian Miniature art. Through the faded yet vibrant walls, intricate murals, and delicate detailing, the documentary pays homage not just to the art—but to the unnamed chitrakars, master painters, and artisans who breathed life into the palace's grandeur.",
    crew: [
      { role: "Directed By", names: ["Kamya Agarwal"] },
      { role: "Produced By", names: ["Kamya Agarwal"] },
      { role: "Director of Photography", names: ["Kamya Agarwal"] },
      { role: "Assistant Cameraman", names: ["Arjun Joshi"] },
    ],
    cast: [{ role: "Starring", names: ["Prateek Ramdev", "Shyamu Ramdev"] }],
  },
  {
    slug: "mission-not-yet-written",
    title: "Mission Not Yet Written",
    youtubeId: "THE9RFTEFFI",
    poster: "film/mission-not-yet-written.png",
    year: 2025,
    synopsis:
      "Mission: Not Yet Written centers around a writer struggling with a relentless case of writer's block—until one day, a LEGO figurine on his desk suddenly springs to life.",
    crew: [
      { role: "Written and Directed By", names: ["Kamya Agarwal"] },
      { role: "Produced By", names: ["Kamya Agarwal"] },
      { role: "Assistant Cameraman", names: ["Hiya Gandhi"] },
    ],
    cast: [{ role: "Starring", names: ["Arihant Goja", "Akhil Chava"] }],
  },
  {
    slug: "fusion-film-festival",
    title: "Fusion Film Festival Reel",
    youtubeId: "TOQt54I1vnY",
    poster: "film/fusion-film-festival.png",
    year: 2024,
    synopsis:
      "The Fusion Film Festival is New York University's Film and Television Festival dedicated to celebrating women in film, television, and new media. Our mission is to encourage, promote, and inspire women filmmakers and the collaboration between the sexes. Every spring, Fusion mounts a multi-day film festival with multiple screenings, industry panels, pitch meetings, master-classes, retrospectives, and student showcases.",
  },
  {
    slug: "early-in-bed",
    title: "Early in Bed",
    youtubeId: "FiJSYecmWwc",
    poster: "film/early-in-bed.png",
    year: 2024,
    crew: [
      { role: "Directed By", names: ["Devansh Saraf"] },
      { role: "Produced By", names: ["Devansh Saraf"] },
      { role: "Director of Photography", names: ["Cody Jacobs"] },
      { role: "Assistant Director", names: ["Kamya Agarwal"] },
      { role: "Boom Op", names: ["Zach Eaker"] },
      { role: "On Set ADR", names: ["Sean Rubin"] },
    ],
    cast: [{ role: "Starring", names: ["Amaya Makhni", "Dhruv Bhatla", "Devansh Saraf"] }],
  },
];

export const getYoutubeThumbnail = (youtubeId: string): string => `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

export const getFilmPoster = (film: Film): string => film.poster ?? getYoutubeThumbnail(film.youtubeId);
