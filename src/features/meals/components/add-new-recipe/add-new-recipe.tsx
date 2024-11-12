import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog";
import type { Dispatch, SetStateAction } from "react";
import { AddNewRecipeForm } from "./add-new-recipe-form";

export const AddNewRecipe = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dodaj nowy posilek!</DialogTitle>
      </DialogHeader>
      <AddNewRecipeForm />
    </DialogContent>
  </Dialog>
};
