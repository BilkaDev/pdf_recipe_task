interface Ingredient {
  name: string;
  unit: string;
  perOne: number;
  processed: number;
}

export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public ingredients: Ingredient[],
    public portions: number,
    public preparation: string[]
  ) {}
}

export type RecipesResponse = Recipe[];
