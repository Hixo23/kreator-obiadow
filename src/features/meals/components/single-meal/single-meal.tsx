import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { type Meal } from "@/types/types";
import { Clock, Users } from "lucide-react";

export const SingleMeal = ({ meal }: { meal: Meal }) => {
  return (
    <Card key={meal.id} className="overflow-hidden">
      <div className="flex h-full flex-col">
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
          <p className="mb-2 text-xs text-gray-500">{meal.description}</p>
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
