import { Injectable } from "@angular/core";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { RecipeDetails } from "../core/components/models/recipe.model";
import { PdfMakeService } from "../core/services/pdf-make.service";

const companyDetails = {
  name: "Twoja firma",
  addres: "Długa 6/12",
  city: "Kraków",
  postCode: "33-333",
  email: "biuro@nicefost.pl",
  tel: "111111111",
};

@Injectable({
  providedIn: "root",
})
export class GenerateRecipePdfService {
  constructor(private pdfMakeService: PdfMakeService) {}
  generateRecipeForCookPdf(recipesToGenerate: RecipeDetails[], recipes: RecipeDetails[]): void {
    const docDefinition = this.createRecipeForCookPdfDocumnet(recipesToGenerate, recipes);
    this.pdfMakeService.createPdf(docDefinition);
  }

  private createChecklistPdfDocument(): TDocumentDefinitions {
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
            [
              { text: "", rowSpan: 5 },
              { rowSpan: 5, text: "Niski IG (18)", style: "tableCell" },
              { text: "(ID: 88) Weganskie smarowidło z bialej faoli", style: "tableCell" },
              { text: "", rowSpan: 5 },
            ],
            [{}, {}, { text: "(ID: 88) Weganskie smarowidło z bialej faoli", style: "tableCell" }, {}],
            [{}, {}, { text: "(ID: 88) Weganskie smarowidło z bialej faoli", style: "tableCell" }, {}],

            [{}, {}, { text: "(ID: 88) Weganskie smarowidło z bialej faoli", style: "tableCell" }, {}],
            [{}, {}, { text: "(ID: 88) Weganskie smarowidło z bialej faoli", style: "tableCell" }, {}],
            [{}, { text: "Wybór (141)", style: "tableCell" }, {}, { text: "", border: [true, true, false, false] }],
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

  private createDishReportPdfDocument(): TDocumentDefinitions {
    const contentHeaderDish: TDocumentDefinitions["content"] = [
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 80,
            h: 20,
            r: 5,
            lineColor: "#FF6633",
            linearGradient: ["#FF6633", "#Ff6633"],
          },
        ],
      },
      {
        columns: [
          { text: " DANIE: 1629", style: "header", alignment: "left", width: 85 },
          { text: "Keto Kolacja", style: "header", alignment: "left" },
          { text: "Power Catering", style: "header", alignment: "right" },
        ],
        absolutePosition: { x: 80 - "danie: 1629".length * 3, y: 90 },

        marginTop: 10,
      },
      {
        columns: [
          {
            text: "Występuje w dietach: Keto(1), KetoMaster (24) ",
            fontSize: 8,
            alignment: "left",
            bold: true,
          },
          { text: "K", fontSize: 8, style: "header", alignment: "right" },
        ],
        marginTop: 10,
      },
    ];

    const contentForDish: TDocumentDefinitions["content"] = [
      this.pdfMakeService.createContentHeaderCompanyDetails(companyDetails),
      { text: "", marginTop: 10 },
      ...contentHeaderDish,
      { text: "", marginTop: 10 },
      this.pdfMakeService.createContentTitle("Kwasnica keto podana ze skwarkami boczku"),
      { text: "Instrukcja przygotowania:", style: "header", marginTop: 10, marginBottom: 10 },
      {
        ol: ["Skwarki boczku i kwasnicę wymieszać."],
      },

      {
        table: {
          headerRows: 2,
          widths: [210, "*", "*", 85, 85, 65],
          body: [
            [
              { text: "", style: "tableHeader", colSpan: 3 },
              {},
              {},
              { text: "45 (81)", style: "tableHeader", alignment: "center" },
              { text: "60 (16)", style: "tableHeader", alignment: "center" },
              { text: "SUMA (97)", style: "tableHeader", alignment: "center" },
            ],
            [
              { text: "SKŁADNIKI I PRZEPISY \\ KOD v2", style: "tableHeader", colSpan: 2 },
              {},
              { text: "JDN", style: "tableHeader", alignment: "center" },
              { text: "1629/KK/45", style: "tableHeader", alignment: "center" },
              { text: "1629/KK/60", style: "tableHeader", alignment: "center" },
              { text: "", style: "tableHeader", alignment: "center" },
            ],
            [
              { text: "Kwasnica na boczku (2251)", rowSpan: 2, style: "tableHeader", marginTop: 8 },
              {
                text: "Ilość",
                style: "tableHeader",
                alignment: "center",
              },
              { text: "Gram", style: "tableCell", alignment: "center" },
              { text: "0", style: "tableCell", alignment: "center" },
              { text: "0.02", style: "tableCell", alignment: "center" },
              { text: "0.32", style: "tableCell", alignment: "center" },
            ],
            [
              {},
              {
                text: "WpO",
                style: "tableHeader",
                alignment: "center",
                rowLineSize: 1,
              },
              { text: "100g", style: "tableCell", alignment: "center" },
              { text: "0", style: "tableCell", alignment: "center" },
              { text: "2g", style: "tableCell", alignment: "center" },
              { text: "32g", style: "tableCell", alignment: "center" },
            ],
            [
              { text: "Waga całkowita po obróbce", style: "tableHeader", colSpan: 2 },
              {},
              { text: "", style: "tableCell", alignment: "center" },
              { text: "375", style: "tableCell", alignment: "center" },
              { text: "532g", style: "tableCell", alignment: "center" },
              { text: "38.89kg", style: "tableCell", alignment: "center" },
            ],
            [
              { text: "Pojemnik", style: "tableHeader", colSpan: 2 },
              {},
              { text: "", style: "tableHeader", alignment: "center" },
              { text: "Zupówka MAŁA H45 (81)", style: "tableCell", alignment: "center" },
              { text: "Zupówka DUŻA (16)", style: "tableCell", alignment: "center" },
              { text: "", style: "tableCell", alignment: "center" },
            ],
            [{ text: "Pojemnik eco", style: "tableHeader", colSpan: 2 }, {}, {}, {}, {}, {}],
          ],
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex === 0 || columnIndex === 0 || rowIndex === 1 || columnIndex === 1 ? "#F0F0F0" : null;
          },
          hLineWidth: function (rowIndex, node) {
            let result = 1;
            if (rowIndex === 0 || rowIndex === 1) return result;
            if (node.table.body.length - 3 < rowIndex) return result;
            const row = node.table.body[rowIndex] as { rowLineSize?: number }[];
            let lineSize: number | undefined = undefined;

            row.forEach((cell) => {
              if (cell?.rowLineSize !== undefined) {
                lineSize = cell.rowLineSize;
              }
            });

            result = lineSize ?? 2;

            return result;
          },
        },
        marginTop: 10,
      },
    ];

    const docDefinition: TDocumentDefinitions = {
      info: this.pdfMakeService.createPageInfo(),
      pageSize: "A4",
      pageMargins: [40, 30, 40, 20],
      header: this.pdfMakeService.createHeader(),
      content: [...contentForDish],
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

  private createRecipeForCookPdfDocumnet(
    recipesToGenerate: RecipeDetails[],
    recipes: RecipeDetails[]
  ): TDocumentDefinitions {
    const contentForCook = recipesToGenerate.map((recipe, index) => {
      const contentHeader: TDocumentDefinitions["content"] = [
        {
          text: [
            { text: " PRZEPIS ", style: "header", background: "yellow" },
            { text: "  " },
            { text: " Na sztukę ", style: "header", bold: true, background: "#7E57C2" },
          ],
          marginTop: 10,
        },
        { text: recipe.mealType, style: "header", marginTop: 2 },
        { text: "Tag:", style: "header", bold: true, marginBottom: 10 },
      ];
      const contentTitle: TDocumentDefinitions["content"] = this.pdfMakeService.createContentTitle(recipe.name);

      const contentUsedIn: TDocumentDefinitions["content"] = [
        [
          { text: "Przepis użyty jest w daniach:", style: "header", marginBottom: 10, marginTop: 10 },
          ...recipe.usedIn.map((u) => {
            return {
              table: {
                heights: [10],
                body: [[{ text: `(ID: ${u.id}) ${u.name} oblicz WPO`, fontSize: 10 }]],
              },
              layout: {
                hLineWidth: function () {
                  return 0;
                },
                vLineWidth: function () {
                  return 2;
                },
              },
            };
          }),
        ],
      ];
      const contentPreparation: TDocumentDefinitions["content"] = [
        { text: "Opis dla kucharza:", style: "header", marginTop: 10, marginBottom: 10 },
        {
          ol: recipe.preparation,
        },
      ];
      const contentIngredients: TDocumentDefinitions["content"] = [
        {
          table: {
            headerRows: 1,
            widths: [210, "*", "*", "*", 65, 65],
            body: [
              [
                { text: "Składnik", style: "tableHeader" },
                { text: "JDN", style: "tableHeader", alignment: "center" },
                { text: "Na jedn.", style: "tableHeader", alignment: "center" },
                { text: "WpO", style: "tableHeader", alignment: "center" },
                { text: `SUMA (${recipe.portions})`, style: "tableHeader", alignment: "center" },
                { text: `SUMA (${recipe.portions}) WpO`, style: "tableHeader", alignment: "center" },
              ],
              ...recipe.ingredients.map((ing) => [
                { text: { text: ing.name, style: "tableCell", alignment: "left" } },
                {
                  stack: [
                    { text: ing.unit, style: "tableCell", alignment: "center" },
                    { text: `( ${this.addUnit(ing.unitWeight)} )`, style: "tableCell", alignment: "center" },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${ing.quantityOnPortion.toFixed(2)}`,
                      alignment: "center",
                    },
                    { text: `( ${this.addUnit(ing.perOne)} )`, style: "tableCell", alignment: "center" },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${ing.quantityOnProcessed.toFixed(2)}`,
                      style: "tableCell",
                      alignment: "center",
                    },
                    { text: `( ${this.addUnit(ing.processed)} )`, style: "tableCell", alignment: "center" },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${ing.totalQuantity.toFixed(2)}`,
                      style: "tableCell",
                      alignment: "center",
                    },
                    {
                      text: `( ${this.addUnit(ing.totalWeight)} )`,
                      style: "tableCell",
                      alignment: "center",
                    },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${ing.totalQuantityProcessed.toFixed(2)}`,
                      style: "tableCell",
                      alignment: "center",
                    },
                    {
                      text: `( ${this.addUnit(ing.totalWeightProccessed)} )`,
                      style: "tableCell",
                      alignment: "center",
                    },
                  ],
                },
              ]),
              [
                "",
                "",
                {
                  text: this.addUnit(recipe.portionWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: this.addUnit(recipe.processedPortionWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: this.addUnit(recipe.totalWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: this.addUnit(recipe.totalPossedWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
              ],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              if (recipe.ingredients.length + 1 === rowIndex && (columnIndex === 0 || columnIndex === 1))
                return "#FFFFFF";
              return rowIndex === 0 || columnIndex === 0 ? "#F0F0F0" : null;
            },
            hLineColor: function (rowIndex, node, columnIndex) {
              if (recipe.ingredients.length + 2 === rowIndex && (columnIndex === 0 || columnIndex === 1))
                return "#FFFFFF";
              return null;
            },
            vLineColor: function (rowIndex, node, columnIndex) {
              if (recipe.ingredients.length + 1 === columnIndex && (rowIndex === 0 || rowIndex === 1)) return "#FFFFFF";
              return null;
            },
          },
          marginTop: 10,
        },
      ];

      return [
        this.pdfMakeService.createContentHeaderCompanyDetails(companyDetails),
        ...contentHeader,
        contentTitle,
        ...(recipe.usedIn.length > 0 ? contentUsedIn : []),
        ...(recipe.preparation.length > 0 ? contentPreparation : []),
        ...contentIngredients,
        ...(recipesToGenerate[index + 1]
          ? ([{ text: "", pageBreak: "before" }] as TDocumentDefinitions["content"][])
          : []),
      ];
    });

    const docDefinition: TDocumentDefinitions = {
      info: this.pdfMakeService.createPageInfo(),
      pageSize: "A4",
      pageMargins: [40, 30, 40, 20],
      header: this.pdfMakeService.createHeader(),
      content: contentForCook,
      footer: (c, p) =>
        this.pdfMakeService.createFooter(c, p, () => ({ text: recipes[c - 1].name, fontSize: 8, alignment: "left" })),
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
  private createDietReportPdfDocument(): TDocumentDefinitions {
    const contentForReportDiet: TDocumentDefinitions["content"] = [
      this.pdfMakeService.createContentHeaderCompanyDetails(companyDetails),
      { text: "", marginTop: 10 },
      {
        table: {
          headerRows: 1,
          widths: ["*", 100, 110],
          body: [
            [
              { text: "Domyślna dieta", style: "tableHeader" },
              { text: "Domyślne warianty", style: "tableHeader" },
              { text: "Domyślna kaloryczność", style: "tableHeader" },
            ],
            // 1 dieta
            [
              { rowSpan: 3, text: "IF - Intermittent Fasting (5)", style: "tableCell" },
              { rowSpan: 3, text: "3 posiłki (5)", style: "tableCell" },
              { text: "1200 (1)", style: "tableCell" },
            ],
            [{}, {}, { text: "1500 (1)", style: "tableCell" }],
            [{}, {}, { text: "1900 (3)", style: "tableCell" }],
            // 2 dieta
            [
              { rowSpan: 9, text: "Slim (44)", style: "tableCell" },
              { rowSpan: 6, text: "6 posiłki (37)", style: "tableCell" },
              { text: "1200 (1)", style: "tableCell" },
            ],
            [{}, {}, { text: "1000 (4)", style: "tableCell" }],
            [{}, {}, { text: "1200 (7)", style: "tableCell" }],
            [{}, {}, { text: "1500 (14)", style: "tableCell" }],
            [{}, {}, { text: "1800 (6)", style: "tableCell" }],
            [{}, {}, { text: "2000 (3)", style: "tableCell" }],
            [{}, { rowSpan: 1, text: "Office (1)", style: "tableCell" }, { text: "1100 (1)", style: "tableCell" }],
            [{}, { rowSpan: 2, text: "Office 2 (2)", style: "tableCell" }, { text: "1560 (1)", style: "tableCell" }],
            [{}, {}, { text: "1850 (1)", style: "tableCell" }],

            // suma
            [
              { text: "SUMA (44x)", style: "tableHeader", alignment: "center" },
              { text: "SUMA (44x)", style: "tableHeader", alignment: "center" },
              { text: "SUMA (44x)", style: "tableHeader", alignment: "center" },
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
      content: contentForReportDiet,
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

  private addUnit(value: number): string {
    if (value < 1000) {
      return `${value}g`;
    }
    return `${(value / 1000).toFixed(2)}kg`;
  }
}
