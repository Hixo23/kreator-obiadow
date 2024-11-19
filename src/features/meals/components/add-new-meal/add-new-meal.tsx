import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/shadcn/dialog";
import type { Dispatch, SetStateAction } from "react";
import { AddNewMealForm } from "./add-new-meal-form";

export const AddNewMeal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[54rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dodaj nowy posilek!</DialogTitle>
        </DialogHeader>
        <AddNewMealForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
