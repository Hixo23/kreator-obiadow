import { httpClient } from "@/shared/lib/httpClient.ts";
import { IRecipe } from "@/shared/types";

export const editRecipe = async ({
  id,
  name,
  description,
  preparationProcess,
  ingredients,
  dietType,
  difficulty,
  preparationTime,
  servings,
  image,
}: IRecipe & { image?: File | null }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("ingredients", ingredients);
  formData.append("preparationProcess", preparationProcess);
  formData.append("preparationTime", preparationTime.toString());
  formData.append("difficulty", difficulty);
  formData.append("dietType", dietType);
  formData.append("servings", servings.toString());
  console.log(formData);
  if (image instanceof File) {
    formData.append("file", image);
  }

  const response = await httpClient.patch(`/recipe/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};
