import { Component } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { OnInit } from "@angular/core";
import { RecipesTableComponent } from "./components/recipes-table/recipes-table.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { GenerateRecipePdfService } from "./generate-recipe-pdf.service";
import { ChecklistDietReportService } from "../reports/checklist-diet-report.service";
import { ChecklistDiet } from "../core/models/diet.model";

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
    private generateRecipePdfService: GenerateRecipePdfService,
    private checklistDietReportService: ChecklistDietReportService
  ) {}

  onDownloadAll() {
    const recipes = this.recipesService.recipesDetails.getValue() ?? [];
    this.generateRecipePdfService.generateRecipeForCookPdf(recipes, recipes);
  }

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe();
  }

  onDownloadReportDishes() {
    this.generateRecipePdfService.generateReportDishesPdf();
  }
  onDownloadChecklistDiet() {
    const checklistDiet: ChecklistDiet[] = [
      {
        id: 1,
        dietName: "Niski IG",
        dishes: [
          { id: 1, name: "Weganskie smarowidło z bialej faoli" },
          { id: 2, name: "Danie 2" },
          { id: 3, name: "Danie 3" },
          { id: 4, name: "Danie 4" },
        ],
        count: 18,
      },
      {
        id: 2,
        dietName: "Dieta 2",
        dishes: [
          { id: 5, name: "Danie 1" },
          { id: 6, name: "Danie 2" },
        ],
        count: 2,
      },
    ];
    this.checklistDietReportService.generateChecklistDietPdf(checklistDiet);
  }
}
