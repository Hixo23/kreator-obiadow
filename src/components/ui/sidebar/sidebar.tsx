"use client";

import {
  Search,
  LogIn,
  PlusCircle,
  Settings,
  Coffee,
  Sun,
  Moon,
  Salad,
} from "lucide-react";

import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/shadcn/sidebar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { SettingsDialog } from "../settings-dialog/settings-dialog";

const mealTypes = [
  {
    name: "Sniadanie",
    icon: Coffee,
    subcategories: ["Szybkie sniadanie", "Zdrowy start"],
  },
  {
    name: "Obiad",
    icon: Sun,
    subcategories: ["Kanapki", "Salatki", "Zupy"],
  },
  {
    name: "Kolacja",
    icon: Moon,
    subcategories: ["Rodzinne posilki", "Nocna randka", "Szybka kolacja"],
  },
  {
    name: "Przekaski",
    icon: Salad,
    subcategories: [
      "Zdrowe przekaski",
      "Imprezowe przekaski",
      "Przekaski dla dzieci",
    ],
  },
];

export const MealSidebar = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { data: session } = useSession();
  const filteredMealTypes = mealTypes.filter(
    (mealType) =>
      mealType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mealType.subcategories.some((subcategory) =>
        subcategory.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <h2 className="text-nowrap text-lg font-semibold">
                Kreator obiadow
              </h2>
            </div>
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image!}
                        alt={session.user.name!}
                      />
                      <AvatarFallback>{session.user.name!}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => signOut()}>
                    Wyloguj sie
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => await signIn("discord")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Zaloguj się
              </Button>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <form onSubmit={(e) => e.preventDefault()} className="px-4 py-2">
              <Label htmlFor="search-meals" className="sr-only">
                Wyszukaj typ posiłku
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-meals"
                  placeholder="Wyszukaj typ posiłku..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </SidebarGroup>
          {filteredMealTypes.map((mealType) => (
            <SidebarGroup key={mealType.name}>
              <SidebarGroupLabel className="flex items-center gap-2">
                <mealType.icon className="h-4 w-4" />
                {mealType.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mealType.subcategories.map((subcategory) => (
                    <SidebarMenuItem key={subcategory}>
                      <SidebarMenuButton asChild>
                        <a
                          href={`#${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {subcategory}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className="border-t">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Dodaj nowy posilek
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SettingsDialog
                  isOpen={isSettingsOpen}
                  setIsOpen={setIsSettingsOpen}
                >
                  <SidebarMenuButton onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Ustawienia
                  </SidebarMenuButton>
                </SettingsDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {session && (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              Zalogowano jako {session.user.email}
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
};
