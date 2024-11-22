export interface Ingredient {
  name: string;
  unit: string;
  perOne: number;
  processed: number;
  unitWeight: number;
}

export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public mealType: string,
    public description: string,
    public ingredients: Ingredient[],
    public portions: number,
    public preparation: string[],
    public usedIn: number[]
  ) {}
}

export type RecipesResponse = Recipe[];

export interface RecipeDetails
  extends Pick<Recipe, "id" | "name" | "mealType" | "description" | "portions" | "preparation"> {
  ingredients: IngredientDetails[];
  portionWeight: number;
  processedPortionWeight: number;
  totalWeight: number;
  totalPossedWeight: number;
  usedIn: {
    id: number;
    name: string;
  }[];
}

export interface IngredientDetails extends Pick<Ingredient, "name" | "unit" | "perOne" | "processed" | "unitWeight"> {
  quantityOnPortion: number;
  quantityOnProcessed: number;
  totalQuantity: number;
  totalQuantityProcessed: number;
  totalWeight: number;
  totalWeightProccessed: number;
}
