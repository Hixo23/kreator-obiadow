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

import { Input } from "@/shared/components/ui/shadcn/input";
import { Label } from "@/shared/components/ui/shadcn/label";
import { Button } from "@/shared/components/ui/shadcn/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/shadcn/dropdown-menu";
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
} from "@/shared/components/ui/shadcn/sidebar";
import { useState } from "react";
import { useUser } from "@/shared/contexts/userContext";
import { useSignout } from "@/shared/hooks/use-signout";
import { NavLink, useNavigate } from "react-router";
import { SettingsModal } from "../../modals/settings-modal/settings-modal";

const mealTypes = [
  {
    name: "Breakfast",
    icon: Coffee,
    subcategories: ["Quick Breakfasts", "Brunch", "Healthy Starts"],
  },
  {
    name: "Lunch",
    icon: Sun,
    subcategories: ["Sandwiches", "Salads", "Soups"],
  },
  {
    name: "Dinner",
    icon: Moon,
    subcategories: ["Family Meals", "Date Night", "Quick Dinners"],
  },
  {
    name: "Snacks",
    icon: Salad,
    subcategories: ["Healthy Snacks", "Party Appetizers", "Kids Snacks"],
  },
];

export default function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { signout } = useSignout();
  const navigate = useNavigate();
  const user = useUser();
  const filteredMealTypes = mealTypes.filter(
    (mealType) =>
      mealType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mealType.subcategories.some((subcategory) =>
        subcategory.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const handleSignIn = () => {
    navigate("/auth/sign-in");
  };

  const handleSignOut = () => {
    signout.mutate();
  };

  return (
    <Sidebar className="border-r fixed h-full">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="text-lg font-semibold text-nowrap">
              Kreator obiadów
            </NavLink>
          </div>
          {user?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.user.username}
                      alt={user.user.username}
                    />
                    <AvatarFallback>
                      {user.user.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Wyloguj się
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              <LogIn className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <form onSubmit={(e) => e.preventDefault()} className="px-4 py-2">
            <Label htmlFor="search-meals" className="sr-only">
              Search meal types
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-meals"
                placeholder="Search meal types..."
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
              <SidebarMenuButton className="cursor-pointer" asChild>
                <NavLink to="/recipe/add">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Dodaj nowy posiłek
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SettingsModal>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="mr-2 h-4 w-4" />
                  Ustawienia
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SettingsModal>
          </SidebarMenu>
        </SidebarGroup>
        {user?.user && (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            Signed in as {user.user.email}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
