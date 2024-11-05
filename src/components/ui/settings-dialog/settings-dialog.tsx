"use client";

import { type Dispatch, type SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "../shadcn/dialog"
import { Label } from "../shadcn/label"
import { Switch } from "../shadcn/switch"
import { useTheme } from "next-themes";
import { Separator } from "../shadcn/separator";

export const SettingsDialog = ({ isOpen, setIsOpen, children }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ustawienia</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex gap-4">
          <Label>Tryb ciemny</Label>
          <Switch checked={theme == "dark" ? true : false} onCheckedChange={() => setTheme(theme == "dark" ? "light" : "dark")} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
