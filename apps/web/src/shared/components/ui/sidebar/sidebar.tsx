import { Search, ChevronDown, UtensilsCrossed, LogIn, PlusCircle, Settings, Coffee, Sun, Moon, Salad } from 'lucide-react'

import { Input } from "@/shared/components/ui/shadcn/input"
import { Label } from "@/shared/components/ui/shadcn/label"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/shadcn/dropdown-menu"
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
} from '@/shared/components/ui/shadcn/sidebar'
import { useEffect, useState } from 'react'

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

const mockSession = {
  user: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    image: 'https://i.pravatar.cc/150?img=5'
  }
}

export default function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [session, setSession] = useState<{ user: { name: string, email: string, image: string } } | null>(null)

  useEffect(() => {
    setTimeout(() => setSession(mockSession), 1000)
  }, [])

  const filteredMealTypes = mealTypes.filter(mealType =>
    mealType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mealType.subcategories.some(subcategory =>
      subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleSignIn = () => {
    console.log('Sign in clicked')
  }

  const handleSignOut = () => {
    setSession(null)
  }

  const handleAddMeal = () => {
    console.log('Add meal clicked')
  }

  const handleOpenSettings = () => {
    console.log('Settings clicked')
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-nowrap">Kreator obiadów</h2>
          </div>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image} alt={session.user.name} />
                    <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
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
                Dodaj nowy posiłek
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleOpenSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Ustawienia
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

  )
}
