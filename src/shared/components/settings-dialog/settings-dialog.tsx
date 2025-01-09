"use client";

import { type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/shared/components/ui/shadcn/dialog";
import { Label } from "@/shared/components/ui/shadcn/label";
import { Switch } from "@/shared/components/ui/shadcn/switch";
import { useTheme } from "next-themes";
import { Separator } from "@/shared/components/ui/shadcn/separator";
export const SettingsDialog = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ustawienia</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex gap-4">
          <Label>Tryb ciemny</Label>
          <Switch
            checked={resolvedTheme == "dark" ? true : false}
            onCheckedChange={() =>
              setTheme(resolvedTheme == "dark" ? "light" : "dark")
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
