import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { roboto } from "../shared/assets/fonts/roboto";
import { RecipeDetails } from "../core/components/models/recipe.model";

type Vfs = Record<string, string>;
const vfs = roboto as unknown as Vfs;
const FontsDefinition = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Bold.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-BoldItalic.ttf",
  },
};

@Injectable({
  providedIn: "root",
})
export class GenerateRecipePdfService {
  generatePdf(recipesToGenerate: RecipeDetails[], recipes: RecipeDetails[]): void {
    const docDefinition = this.createPdfDocument(recipesToGenerate, recipes);
    pdfMake.createPdf(docDefinition, undefined, FontsDefinition, vfs).download();
  }

  private createPdfDocument(recipesToGenrate: RecipeDetails[], recipes: RecipeDetails[]): TDocumentDefinitions {
    const pageInfo: TDocumentDefinitions["info"] = {
      title: "Przepis",
      author: "Marcin B",
      subject: "Przepis",
    };
    const header: TDocumentDefinitions["header"] = [
      {
        margin: [20, 10, 20, 10],
        columns: [
          [
            {
              text: `Marka 1 - ${new Date().toLocaleDateString()} - Klient 1`,
              fontSize: 10,
              color: "#0E1D2D",
              bold: true,
            },
          ],
        ],
      },
    ];

    const content = recipesToGenrate.map((recipe, index) => {
      const contentHeader: TDocumentDefinitions["content"] = [
        {
          text: [
            { text: " PRZEPIS ", style: "header", background: "yellow" },
            { text: "  " },
            { text: " Na sztukę ", style: "header", bold: true, background: "#7E57C2" },
          ],
        },
        { text: recipe.mealType, style: "header", marginTop: 2 },
        { text: "Tag:", style: "header", bold: true, marginBottom: 10 },
      ];
      const contentTitle: TDocumentDefinitions["content"] = [
        {
          canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2 }],
        },
        [{ text: recipe.name, alignment: "center", style: "header", margin: [0, 5, 0, 5] }],
        {
          canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2 }],
        },
      ];

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
        ...contentHeader,
        ...contentTitle,
        ...(recipe.usedIn.length > 0 ? contentUsedIn : []),
        ...(recipe.preparation.length > 0 ? contentPreparation : []),
        ...contentIngredients,
        ...(recipesToGenrate[index + 1]
          ? ([{ text: "", pageBreak: "before" }] as TDocumentDefinitions["content"][])
          : []),
      ];
    });

    const docDefinition: TDocumentDefinitions = {
      info: pageInfo,
      pageSize: "A4",
      pageMargins: [40, 40, 40, 20],
      header: header,
      content: content,
      footer: function (c, p) {
        return {
          columns: [
            { text: recipes[c - 1].name, fontSize: 8, alignment: "left" },
            { text: `Strona ${c} z ${p}`, fontSize: 8, alignment: "right" },
          ],
          margin: [40, 0, 40, 10],
        };
      },
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
