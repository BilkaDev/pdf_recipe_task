import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from "rxjs";
import { Recipe } from "../../../core/components/models/recipe.model";
import { RecipesService } from "../../recipes.service";

@Component({
  selector: "app-recipes-table",
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: "./recipes-table.component.html",
  styleUrl: "./recipes-table.component.scss",
})
export class RecipesTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["id", "name", "action"];
  dataSource: Recipe[] | null = null;
  sub!: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.sub = this.recipesService.recipes.subscribe({
      next: (recipes) => {
        this.dataSource = recipes;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onDownload(recipe: Recipe) {
    console.log(recipe);
  }
}
