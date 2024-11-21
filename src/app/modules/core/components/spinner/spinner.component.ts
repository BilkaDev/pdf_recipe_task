import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AsyncPipe, NgIf } from "@angular/common";

import { SpinnerService } from "../../services/spinner.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf, AsyncPipe],
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.scss",
})
export class SpinnerComponent {
  isLoading: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.isLoading;
  }
}
