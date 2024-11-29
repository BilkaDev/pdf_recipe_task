import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from "rxjs";
import { RecipeDetails } from "../../../core/models/recipe.model";
import { RecipesService } from "../../recipes.service";
import { GenerateRecipePdfService } from "../../generate-recipe-pdf.service";

@Component({
  selector: "app-recipes-table",
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: "./recipes-table.component.html",
  styleUrl: "./recipes-table.component.scss",
})
export class RecipesTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["id", "name", "action"];
  dataSource: RecipeDetails[] | null = null;
  sub!: Subscription;

  constructor(
    private recipesService: RecipesService,
    private generateRecipePdfService: GenerateRecipePdfService
  ) {}

  ngOnInit(): void {
    this.sub = this.recipesService.recipesDetails.subscribe({
      next: (recipes) => {
        this.dataSource = recipes;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onDownload(recipe: RecipeDetails) {
    this.generateRecipePdfService.generateRecipeForCookPdf([recipe], this.dataSource ?? []);
  }
}
