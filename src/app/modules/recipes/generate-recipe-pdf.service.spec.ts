import { TestBed } from "@angular/core/testing";

import { GenerateRecipePdfService } from "./generate-recipe-pdf.service";

describe("GenerateRecipePdfService", () => {
  let service: GenerateRecipePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateRecipePdfService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
