import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/shadcn/card";
import { type Meal } from "@/shared/types/types";
import { Clock, Users } from "lucide-react";
import Link from "next/link";

export const SingleMeal = ({ meal }: { meal: Meal }) => {
  return (
    <Card key={meal.id} className="w-56 overflow-hidden">
      <div className="relative flex h-full flex-col">
        <Link href={`/meal/${meal.id}`} className="absolute h-56 w-full"></Link>
        <img
          src={meal.image!}
          alt={meal.name}
          loading="lazy"
          className="h-32 w-full object-cover"
        />
        <CardHeader className="p-3">
          <CardTitle className="text-sm">{meal.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col p-3 pt-0">
          <p className="mb-2 h-16 overflow-hidden text-ellipsis text-xs text-gray-500">
            {meal.description}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>{meal.preparationTime}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-3 w-3" />
              <span>{meal.portions}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
