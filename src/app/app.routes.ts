import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./modules/recipes/recipes.component").then((m) => m.RecipesComponent),
  },
];
