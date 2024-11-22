import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError, tap } from "rxjs";
import { Ingredient, Recipe, RecipesResponse } from "../core/components/models/recipe.model";
import { environment } from "../../../environments/environment.development";
import { SnackbarService } from "../core/services/snackbar.service";
import { RecipeDetails } from "../core/components/models/recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  recipesDetails = new BehaviorSubject<RecipeDetails[] | null>(null);
  private recipesEP = environment.apiUrl + "/recipes";
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipesResponse>(this.recipesEP).pipe(
      catchError((err) => {
        this.snackbarService.openSnackBar("Something went wrong!", true);
        return throwError(err);
      }),
      tap((v) => {
        this.recipesDetails.next(this.calculateDetails(v));
      }),
      map((v) => {
        const recipes = v;
        return recipes.map(
          (recipe) =>
            new Recipe(
              recipe.id,
              recipe.name,
              recipe.mealType,
              recipe.description,
              recipe.ingredients,
              recipe.portions,
              recipe.preparation,
              recipe.usedIn
            )
        );
      })
    );
  }

  calculateDetails(recipes: Recipe[]): RecipeDetails[] {
    const details = recipes.map((r) => {
      return {
        ...r,
        portionWeight: this.calculateTotalWeightForIngredients(r.ingredients, "perOne"),
        processedPortionWeight: this.calculateTotalWeightForIngredients(r.ingredients, "processed"),
        totalWeight: this.calculateTotalWeight(r, "perOne"),
        totalPossedWeight: this.calculateTotalWeight(r, "processed"),
        usedIn: r.usedIn.map((id) => {
          const recipe = recipes.find((r) => r.id == id);
          return { id: id, name: recipe?.name ?? "" };
        }),
        ingredients: r.ingredients.map((i) => {
          return {
            ...i,
            quantityOnPortion: this.calculateIngredientQuantityPerPortion(i.perOne, i.unitWeight),
            quantityOnProcessed: this.calculateIngredientQuantityPerPortion(i.processed, i.unitWeight),
            totalWeight: this.calculateTotalIngredient(i.perOne, r.portions),
            totalWeightProccessed: this.calculateTotalIngredient(i.processed, r.portions),
            totalQuantity: this.calculateTotalIngredientQuantity(i.perOne, r.portions, i.unitWeight),
            totalQuantityProcessed: this.calculateTotalIngredientQuantity(i.processed, r.portions, i.unitWeight),
          };
        }),
      };
    });
    return details;
  }
  private calculateIngredientQuantityPerPortion(weight: number, unitWeight: number): number {
    return Math.ceil((weight / unitWeight) * 100) / 100;
  }
  private calculateTotalIngredient(perOne: number, portions: number): number {
    return Math.ceil(perOne * portions * 100) / 100;
  }
  private calculateTotalIngredientQuantity(perOne: number, portions: number, unitWeight: number): number {
    const total = this.calculateTotalIngredient(perOne, portions);
    return this.calculateIngredientQuantityPerPortion(total, unitWeight);
  }
  private calculateTotalWeightForIngredients(ingredients: Ingredient[], key: "perOne" | "processed"): number {
    return ingredients.reduce((acc, ing) => acc + ing[key], 0);
  }
  private calculateTotalWeight(recipe: Recipe, key: "perOne" | "processed"): number {
    return this.calculateTotalWeightForIngredients(recipe.ingredients, key) * recipe.portions;
  }
}
