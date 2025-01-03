import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/shadcn/dialog";
import type { Dispatch, SetStateAction } from "react";
import { EditMealForm } from "./edit-meal-form";
import type { Meal } from "@/shared/types/types";

export const EditMeal = ({
  isOpen,
  setIsOpen,
  children,
  meal,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  meal: Meal;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[54rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edytuj posiłek!</DialogTitle>
        </DialogHeader>
        <EditMealForm meal={meal} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
