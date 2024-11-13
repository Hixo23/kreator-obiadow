import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { type Meal } from "@/types/types"
import { Clock, Users } from "lucide-react"

export const SingleMeal = ({ meal }: { meal: Meal }) => {
  return <Card key={meal.id} className="overflow-hidden">
    <div className="flex flex-col h-full">
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-32 object-cover"
      />
      <CardHeader className="p-3">
        <CardTitle className="text-sm">{meal.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-2">{meal.description}</p>
        <div className="mt-auto flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{meal.preparationTime}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            <span>{meal.portions}</span>
          </div>
        </div>
      </CardContent>
    </div>
  </Card>
}


