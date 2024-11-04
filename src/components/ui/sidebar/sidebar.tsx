'use client'

import { Search, ChevronDown, UtensilsCrossed, LogIn, PlusCircle, Settings, Coffee, Sun, Moon, Salad } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

// This is sample data. Replace with your actual meal types and subcategories.
const mealTypes = [
  {
    name: 'Breakfast',
    icon: Coffee,
    subcategories: ['Quick Breakfasts', 'Brunch', 'Healthy Starts']
  },
  {
    name: 'Lunch',
    icon: Sun,
    subcategories: ['Sandwiches', 'Salads', 'Soups']
  },
  {
    name: 'Dinner',
    icon: Moon,
    subcategories: ['Family Meals', 'Date Night', 'Quick Dinners']
  },
  {
    name: 'Snacks',
    icon: Salad,
    subcategories: ['Healthy Snacks', 'Party Appetizers', 'Kids Snacks']
  }
]

// Mock session data. Replace this with your actual authentication logic.

export default function MealTypeSidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: session } = useSession();
  const filteredMealTypes = mealTypes.filter(mealType =>
    mealType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mealType.subcategories.some(subcategory =>
      subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleSignIn = () => {
    // Replace this with your actual sign-in logic
    console.log('Sign in clicked')
  }

  const handleSignOut = await() => {
    signOut()
  }

  const handleAddMeal = () => {
    // Replace this with your actual add meal logic
    console.log('Add meal clicked')
  }

  const handleOpenSettings = () => {
    // Replace this with your actual settings logic
    console.log('Settings clicked')
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6" />
              <h2 className="text-lg font-semibold">Meal Planner</h2>
            </div>
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image!} alt={session.user.name!} />
                      <AvatarFallback>{session.user.name!}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleSignIn}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
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
                        <a href={`#${subcategory.toLowerCase().replace(/\s+/g, '-')}`}>
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
                <SidebarMenuButton onClick={handleAddMeal}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Meal
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleOpenSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {session && (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              Signed in as {session.user.email}
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-8">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Meal Planner</h1>
        <p>Select a meal type from the sidebar to view available recipes.</p>
      </div>
    </SidebarProvider>
  )
}
