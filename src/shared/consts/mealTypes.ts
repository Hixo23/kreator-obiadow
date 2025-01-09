import { Coffee, Moon, Salad, Sun } from "lucide-react";

export const mealTypes = [
  {
    name: "Sniadanie",
    icon: Coffee,
    subcategories: ["Szybkie sniadanie", "Zdrowy start"],
  },
  {
    name: "Obiad",
    icon: Sun,
    subcategories: ["Kanapki", "Salatki", "Zupy", "Klasyczne"],
  },
  {
    name: "Kolacja",
    icon: Moon,
    subcategories: ["Rodzinne posilki", "Nocna randka", "Szybka kolacja"],
  },
  {
    name: "Przekaski",
    icon: Salad,
    subcategories: [
      "Zdrowe przekaski",
      "Imprezowe przekaski",
      "Przekaski dla dzieci",
    ],
  },
];
