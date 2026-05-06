export type Realization = {
  id: string;
  title: string;
  description: string | null;
  category: "rolety" | "okna" | "drzwi" | "inne";
  image_url: string;
};

export const realizations: Realization[] = [
  // Dodawaj realizacje w tym formacie:
  // {
  //   id: "rolety-zewnetrzne-1",
  //   title: "Rolety zewnetrzne",
  //   description: "Krotki opis realizacji.",
  //   category: "rolety",
  //   image_url: "/realizacje/rolety-zewnetrzne-1.jpg",
  // },
];
