import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Badge } from "@/shared/components/ui/shadcn/badge";
import { CommentsSection } from "./comments";

export interface MealProps {
  id: string
  name: string;
  description: string;
  image: string;
  preparationTime: number;
  portions: number;
  ingredients: string[];
  preparationProcess: string | undefined;
}

export const Meal = ({
  id,
  name,
  description,
  image,
  preparationTime,
  portions,
  ingredients,
  preparationProcess,
}: MealProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Image
          src={image ?? ""}
          alt={name ?? "Zdjecie posilku"}
          width={800}
          height={400}
          className="mb-8 h-[400px] w-full rounded-lg object-cover shadow-lg"
        />
        <div className="mb-8">
          <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="mb-2 text-4xl font-bold sm:mb-0">{name}</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {preparationTime} min
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {portions} porcje
              </Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Składniki</h2>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className="mr-2 h-2 w-2 rounded-full bg-primary"
                    aria-hidden="true"
                  ></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">
              Proces przygotowania
            </h2>
            <p className="whitespace-pre-line">{preparationProcess}</p>
          </div>
        </div>
      </div>
      <CommentsSection postId={id} />
    </div>
  );
};
