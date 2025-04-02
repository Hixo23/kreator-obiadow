import { useUser } from "@/shared/contexts/userContext"
import { ProfileHeader } from "../components/profile-header/profile-header"
import { RecipeList } from "@/features/recipes/components/recipe-list/recipe-list";
import { useRecipes } from "@/features/recipes/hooks/use-recipes";

export const UserProfile = () => {
  const user = useUser()
  const { data: recipes, isLoading } = useRecipes(user?.user?.profile.id);
  if (!user || !user?.user) return null;


  if (isLoading) return <h1>Loading</h1>

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6">
      <ProfileHeader user={user.user} />

      <div className="flex flex-col gap-2 sm:gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold px-2 sm:px-0">Twoje przepisy</h2>
        <RecipeList recipes={recipes ?? []} />
      </div>
    </div>
  )
}
