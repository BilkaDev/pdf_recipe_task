import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError, tap } from "rxjs";
import { Recipe, RecipesResponse } from "../core/components/models/recipe.model";
import { environment } from "../../../environments/environment.development";
import { SnackbarService } from "../core/services/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  recipes = new BehaviorSubject<Recipe[] | null>(null);
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
        this.recipes.next(v);
      }),
      map((v) => {
        const recipes = v;
        return recipes.map(
          (recipe) =>
            new Recipe(
              recipe.id,
              recipe.name,
              recipe.description,
              recipe.ingredients,
              recipe.portions,
              recipe.preparation
            )
        );
      })
    );
  }
}
