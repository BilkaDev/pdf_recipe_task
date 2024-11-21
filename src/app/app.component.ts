import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./modules/core/components/header/header.component";
import { SpinnerComponent } from "./modules/core/components/spinner/spinner.component";
import { RecipesComponent } from "./modules/recipes/recipes.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent, RecipesComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "pdf-recipe";
}
