export class CreateCommentDto {
  readonly content: string;
  readonly rating: number;
  readonly authorId: string;
  readonly recipeId: string;
}
