export class CreateRecipeDto {
  readonly name: string;
  readonly description: string;
  readonly preparationProcess: string;
  readonly ingredients: string;
  readonly dietType: string;
  readonly difficulty: string;
  readonly authorId: string;
}
