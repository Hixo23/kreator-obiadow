"use client";

import { Button } from "@/shared/components/ui/shadcn/button";
import { TableCell } from "@/shared/components/ui/shadcn/table";
import type { Meal } from "@/shared/types/types";
import { Pencil, Trash2 } from "lucide-react";
import { deleteRecipe } from "../../actions/deleteRecipe";

export const MealControl = ({ meal }: { meal: Meal }) => {
  const handleDelete = async () => {
    await deleteRecipe({ id: meal.id });
  };
  return (
    <TableCell className="text-right">
      <Button variant="ghost" size="icon" aria-label={`Edit ${meal.name}`}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        onClick={handleDelete}
        variant="ghost"
        size="icon"
        aria-label={`Delete ${meal.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TableCell>
  );
};
