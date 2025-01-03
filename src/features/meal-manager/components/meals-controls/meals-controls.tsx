"use client";

import { Button } from "@/shared/components/ui/shadcn/button";
import { TableCell } from "@/shared/components/ui/shadcn/table";
import type { Meal } from "@/shared/types/types";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMeal } from "../../actions/deleteMeal";
import { useState } from "react";
import { EditMeal } from "../edit-meal/edit-meal";

export const MealControl = ({ meal }: { meal: Meal }) => {
  const [editOpen, setEditOpen] = useState(false);
  const handleDelete = async () => {
    await deleteMeal({ id: meal.id });
  };
  return (
    <TableCell className="text-right">
      <EditMeal
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        meal={meal}
        key={meal.id}
      >
        <Button variant="ghost" size="icon" aria-label={`Edit ${meal.name}`}>
          <Pencil className="h-4 w-4" />
        </Button>
      </EditMeal>
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
