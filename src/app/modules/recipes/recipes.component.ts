import { Component } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { OnInit } from "@angular/core";
import { RecipesTableComponent } from "./components/recipes-table/recipes-table.component";

@Component({
  selector: "app-recipes",
  standalone: true,
  imports: [RecipesTableComponent],
  templateUrl: "./recipes.component.html",
  styleUrl: "./recipes.component.scss",
})
export class RecipesComponent implements OnInit {
  constructor(private recipesService: RecipesService) {
    this.recipesService.getRecipes().subscribe();
  }

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe();
  }
}
