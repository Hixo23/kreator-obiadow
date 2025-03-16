import { IRecipe } from "@/shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/shadcn/card.tsx";
import { Clock, Users } from "lucide-react";
import { useNavigate } from "react-router";

export const SingleRecipe = ({ recipe }: { recipe: IRecipe }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="w-96 cursor-pointer"
      key={recipe.id}
    >
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          width={300}
          height={300}
          className="rounded-md object-cover w-full"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{recipe.preparationTime}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-sm">{recipe.servings}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
