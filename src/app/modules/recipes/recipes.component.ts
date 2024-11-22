import { Component } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { OnInit } from "@angular/core";
import { RecipesTableComponent } from "./components/recipes-table/recipes-table.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { GenerateRecipePdfService } from "./generate-recipe-pdf.service";

@Component({
  selector: "app-recipes",
  standalone: true,
  imports: [RecipesTableComponent, MatButtonModule, MatIconModule],
  templateUrl: "./recipes.component.html",
  styleUrl: "./recipes.component.scss",
})
export class RecipesComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private generateRecipePdfService: GenerateRecipePdfService
  ) {}

  onDownloadAll() {
    const recipes = this.recipesService.recipesDetails.getValue() ?? [];
    this.generateRecipePdfService.generatePdf(recipes, recipes);
  }

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe();
  }
}
