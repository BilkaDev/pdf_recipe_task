import { Injectable } from "@angular/core";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { PdfMakeService } from "../core/services/pdf-make.service";
import { ChecklistDiet, DishDetails } from "../core/models/diet.model";

const companyDetails = {
  name: "X_Twoja firma",
  addres: "X_Długa 6/12",
  city: "X_Kraków",
  postCode: "X_33-333",
  email: "X_biuro@nicefost.pl",
  tel: "X_111111111",
};

@Injectable({
  providedIn: "root",
})
export class ChecklistDietReportService {
  constructor(private pdfMakeService: PdfMakeService) {}

  generateChecklistDietPdf(checklistDiet: ChecklistDiet[]) {
    const docDefinition = this.createChecklistPdfDocument(checklistDiet);
    this.pdfMakeService.createPdf(docDefinition);
  }

  private createChecklistPdfDocument(checklistDiet: ChecklistDiet[]): TDocumentDefinitions {
    const contentForChecklist: TDocumentDefinitions["content"] = [
      this.pdfMakeService.createContentHeaderCompanyDetails(companyDetails),
      {
        table: {
          headerRows: 1,
          widths: [50, 60, "*", 50],
          body: [
            [
              { text: "Wykonano", style: "tableHeader", fillColor: "#F0F0F0" },
              { text: "Dieta", style: "tableHeader", fillColor: "#F0F0F0" },
              { text: "Danie", style: "tableHeader", fillColor: "#F0F0F0" },
              { text: "Wykonano", style: "tableHeader", fillColor: "#F0F0F0" },
            ],
            ...checklistDiet.flatMap((diet) => [
              [
                { text: "", rowSpan: diet.dishes.length },
                { text: `${diet.dietName} (${diet.count})`, rowSpan: diet.dishes.length, style: "tableCell" },
                { text: diet.dishes.length > 0 ? this.displayDishName(diet.dishes[0]) : "", style: "tableCell" },
                { text: "", rowSpan: diet.dishes.length },
              ],
              ...diet.dishes
                .slice(1)
                .map((dish) => [{}, {}, { text: this.displayDishName(dish), style: "tableCell" }, {}]),
            ]),
            [
              {},
              { text: `Wybór (${this.totalDishesCount(checklistDiet)})`, style: "tableCell" },
              {},
              { text: "", border: [true, true, false, false] },
            ],
          ],
        },
        marginTop: 10,
      },
    ];

    const docDefinition: TDocumentDefinitions = {
      info: this.pdfMakeService.createPageInfo(),
      pageSize: "A4",
      pageMargins: [40, 30, 40, 20],
      header: this.pdfMakeService.createHeader(),
      content: contentForChecklist,
      footer: (c, p) => this.pdfMakeService.createFooter(c, p, () => ({ text: "", fontSize: 8, alignment: "left" })),
      styles: {
        header: {
          bold: true,
          fontSize: 12,
          color: "black",
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: "black",
        },
        tableCell: {
          fontSize: 10,
          color: "black",
        },
      },
    };
    return docDefinition;
  }

  private totalDishesCount(checklistDiet: ChecklistDiet[]) {
    return checklistDiet.reduce((sum, acc) => sum + acc.count, 0);
  }
  private displayDishName(dish: DishDetails) {
    return `(ID: ${dish.id}) ${dish.name}`;
  }
}
