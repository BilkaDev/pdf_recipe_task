import { TestBed } from "@angular/core/testing";

import { ChecklistDietReportService } from "./checklist-diet-report.service";

describe("ChecklistDietReportService", () => {
  let service: ChecklistDietReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistDietReportService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
