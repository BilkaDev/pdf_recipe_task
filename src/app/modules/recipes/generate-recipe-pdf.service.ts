import { Injectable } from "@angular/core";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { RecipeDetails } from "../core/models/recipe.model";
import { PdfMakeService } from "../core/services/pdf-make.service";

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
export class GenerateRecipePdfService {
  constructor(private pdfMakeService: PdfMakeService) {}
  generateRecipeForCookPdf(recipesToGenerate: RecipeDetails[], recipes: RecipeDetails[]): void {
    const docDefinition = this.createRecipeForCookPdfDocumnet(recipesToGenerate, recipes);
    this.pdfMakeService.createPdf(docDefinition);
  }

  generateReportDishesPdf(): void {
    const docDefinition = this.createDishesReportPdfDocument(this.dish);
    this.pdfMakeService.createPdf(docDefinition);
  }

  dish = {
    id: 1629,
    marks: ["Power Catering"],
    paramarks: ["X-SANEPID, X-FOODSI, X-BIUROWCE"],
    tag: "X-K",
    name: "Kwasnica keto podana ze skwarkami boczku",
    containerName: "Zupówka MAŁA H45",
    mealTypes: [
      {
        id: 1,
        name: "Keto",
        size: 45,
        calories: 1629,
        containerName: "Zupówka MAŁA H45",
        ecoContainerName: "",
        count: 81,
        items: [
          {
            id: 100,
            recipeId: 1,
            name: "Kwaśnica na boczku",
            unit: "szt.",
            wpo: 4980,
            wpoPerPortion: 350,
            quantityPerPortion: 0.07,
          },
          {
            id: 101,
            recipeId: 2,
            name: "Oliwa z oliwek do podbicia keto",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 0.1,
            quantityPerPortion: 1,
          },
          {
            id: 102,
            recipeId: 3,
            name: "Test",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 2,
            quantityPerPortion: 2,
          },
        ],
      },
      {
        id: 2,
        name: "KetoMaster",
        size: 60,
        calories: 1629,
        count: 16,
        containerName: "Zupówka DUŻA H60",
        ecoContainerName: "",
        items: [
          {
            id: 200,
            recipeId: 1,
            name: "Kwaśnica na boczku",
            unit: "szt.",
            wpo: 4980,
            wpoPerPortion: 500,
            quantityPerPortion: 0.1,
          },
          {
            id: 201,
            recipeId: 2,
            name: "Oliwa z oliwek do podbicia keto",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 200,
            quantityPerPortion: 2,
          },
          {
            id: 202,
            recipeId: 3,
            name: "Test",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 2,
            quantityPerPortion: 2,
          },
        ],
      },
      {
        id: 3,
        name: "KetoMaster 1",
        size: 67,
        calories: 1629,
        count: 30,
        containerName: "Zupówka DUŻA H67",
        ecoContainerName: "",
        items: [
          {
            id: 300,
            recipeId: 1,
            name: "Kwaśnica na boczku",
            unit: "szt.",
            wpo: 4980,
            wpoPerPortion: 500,
            quantityPerPortion: 0.3,
          },
          {
            id: 301,
            recipeId: 2,
            name: "Oliwa z oliwek do podbicia keto",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 300,
            quantityPerPortion: 3,
          },
          {
            id: 302,
            recipeId: 3,
            name: "Test",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 2,
            quantityPerPortion: 2,
          },
        ],
      },
      {
        id: 4,
        name: "KetoMaster 5",
        size: 67,
        calories: 1629,
        count: 30,
        containerName: "Zupówka DUŻA H67S",
        ecoContainerName: "",
        items: [
          {
            id: 400,
            recipeId: 1,
            name: "Kwaśnica na boczku",
            unit: "szt.",
            wpo: 4980,
            wpoPerPortion: 500,
            quantityPerPortion: 0.3,
          },
          {
            id: 401,
            recipeId: 2,
            name: "Oliwa z oliwek do podbicia keto",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 300,
            quantityPerPortion: 3,
          },
          {
            id: 402,
            recipeId: 3,
            name: "Test",
            unit: "Gram",
            wpo: 100,
            wpoPerPortion: 2,
            quantityPerPortion: 2,
          },
        ],
      },
      // {
      //   id: 5,
      //   name: "KetoMaster 5",
      //   size: 67,
      //   calories: 1629,
      //   count: 30,
      //   containerName: "Zupówka DUŻA H67S",
      //   ecoContainerName: "",
      //   items: [
      //     {
      //       id: 500,
      //       recipeId: 1,
      //       name: "Kwaśnica na boczku",
      //       unit: "szt.",
      //       wpo: 4980,
      //       wpoPerPortion: 500,
      //       quantityPerPortion: 0.3,
      //     },
      //     {
      //       id: 501,
      //       recipeId: 2,
      //       name: "Oliwa z oliwek do podbicia keto",
      //       unit: "Gram",
      //       wpo: 100,
      //       wpoPerPortion: 300,
      //       quantityPerPortion: 3,
      //     },
      //     {
      //       id: 502,
      //       recipeId: 3,
      //       name: "Test",
      //       unit: "Gram",
      //       wpo: 100,
      //       wpoPerPortion: 2,
      //       quantityPerPortion: 2,
      //     },
      //   ],
      // },
      // {
      //   id: 6,
      //   name: "KetoMaster 5",
      //   size: 67,
      //   calories: 1629,
      //   count: 30,
      //   containerName: "Zupówka DUŻA H67S",
      //   ecoContainerName: "",
      //   items: [
      //     {
      //       id: 600,
      //       recipeId: 1,
      //       name: "Kwaśnica na boczku",
      //       unit: "szt.",
      //       wpo: 4980,
      //       wpoPerPortion: 500,
      //       quantityPerPortion: 0.3,
      //     },
      //     {
      //       id: 601,
      //       recipeId: 2,
      //       name: "Oliwa z oliwek do podbicia keto",
      //       unit: "Gram",
      //       wpo: 100,
      //       wpoPerPortion: 300,
      //       quantityPerPortion: 3,
      //     },
      //     {
      //       id: 602,
      //       recipeId: 3,
      //       name: "Test",
      //       unit: "Gram",
      //       wpo: 100,
      //       wpoPerPortion: 2,
      //       quantityPerPortion: 2,
      //     },
      //   ],
      // },
    ],
    preparation:
      "Na dno cukinia w plastrach na to reszta składników. Jajko sadzone na samą górę i posypac orzeszkami.\r\nVinegret do dipówki.".split(
        "\r\n"
      ),
    usedIn: [
      { id: 1, name: "Keto" },
      { id: 24, name: "KetoMaster" },
    ],
  };

  private geneateDishContainerSummary = (mealTypes: (typeof this.dish)["mealTypes"], showSumInFirstTable: boolean) => [
    [
      { text: "Waga całkowita po obróbce", style: "tableHeader", colSpan: 2 },
      {},
      { text: "", style: "tableCell", alignment: "center" },
      ...mealTypes.map((mt) => ({
        text: `${this.pdfMakeService.addUnit(this.calculateTotalProcessedWeight(mt))}`,
        style: "tableCell",
        alignment: "center",
      })),
      ...(mealTypes.length < 5 && showSumInFirstTable
        ? [
            {
              text: `${this.pdfMakeService.addUnit(
                mealTypes.reduce((sum, mt) => sum + this.calculateTotalProcessedWeightWithCount(mt), 0)
              )}`,
              style: "tableCell",
              alignment: "center",
            },
          ]
        : []),
    ],
    [
      { text: "Pojemnik", style: "tableHeader", colSpan: 2 },
      {},
      { text: "", style: "tableCell", alignment: "center" },
      ...mealTypes.map((mt) => ({
        text: `${mt.containerName} (${mt.size})`,
        style: "tableCell",
        alignment: "center",
      })),
      ...(mealTypes.length < 5 && showSumInFirstTable ? [{}] : []),
    ],
    [
      { text: "Pojemnik eco", style: "tableHeader", colSpan: 2 },
      {},
      {},
      ...mealTypes.map((mt) => ({
        text: `${mt.ecoContainerName} (${mt.count})`,
        style: "tableCell",
        alignment: "center",
      })),
      ...(mealTypes.length < 5 && showSumInFirstTable ? [{}] : []),
    ],
  ];

  // showSumInFirstTable is true when we want to show the sum in the last column of the table less than 5 meal types else we want to show the sum in new table
  private createTableForDish(
    dish: typeof this.dish,
    toRenderMealTypes: (typeof this.dish)["mealTypes"],
    showSumInFirstTable: boolean
  ): TDocumentDefinitions["content"] {
    const sumMealTypesCount = dish.mealTypes.reduce((acc, mt) => acc + mt.count, 0);
    const length = toRenderMealTypes.length;
    const isMoreThanFour = length > 4;

    let mealTypes = [...toRenderMealTypes];
    const restMealTypes = toRenderMealTypes.slice(5);

    if (isMoreThanFour) {
      mealTypes = mealTypes.slice(0, 5);
    }
    const widths = [90, 30, 25, ...mealTypes.map(() => 60)];
    if (showSumInFirstTable) {
      widths.push(40);
    }

    const generateIngredientRows = (item: (typeof dish.mealTypes)[number]["items"][number]) => {
      return [
        [
          { text: `${item.name} (${item.id})`, rowSpan: 2, style: "tableHeader", marginTop: 8 },
          {
            text: "Ilość",
            style: "tableHeader",
            alignment: "center",
          },
          { text: item.unit, style: "tableCell", alignment: "center" },
          ...mealTypes.map((mt) => {
            return {
              text: mt.items.find((i) => i.recipeId === item.recipeId)?.quantityPerPortion.toFixed(2),
              style: "tableCell",
              alignment: "center",
            };
          }),
          ...(showSumInFirstTable
            ? [
                {
                  text: dish.mealTypes
                    .reduce((sum, mt) => {
                      const matchingItem = mt.items.find((i) => i.recipeId === item.recipeId);
                      return sum + (matchingItem ? matchingItem.quantityPerPortion * mt.count : 0);
                    }, 0)
                    .toFixed(2),
                  style: "tableCell",
                  alignment: "center",
                },
              ]
            : []),
        ],
        [
          {},
          {
            text: "WpO",
            style: "tableHeader",
            alignment: "center",
            rowLineSize: 1,
          },
          { text: `${item.wpo}g`, style: "tableCell", alignment: "center" },
          ...mealTypes.map((mt) => {
            return {
              text: this.pdfMakeService.addUnit(mt.items.find((i) => i.recipeId === item.recipeId)?.wpoPerPortion ?? 0),
              style: "tableCell",
              alignment: "center",
            };
          }),
          ...(showSumInFirstTable
            ? [
                {
                  text: `${this.pdfMakeService.addUnit(
                    dish.mealTypes.reduce((sum, mt) => {
                      const matchingItem = mt.items.find((i) => i.recipeId === item.recipeId);
                      return sum + (matchingItem ? matchingItem.wpoPerPortion * mt.count : 0);
                    }, 0)
                  )}`,
                  style: "tableCell",
                  alignment: "center",
                },
              ]
            : []),
        ],
      ];
    };

    return [
      {
        table: {
          headerRows: 1,
          widths: widths,
          body: [
            [
              { text: "", style: "tableHeader", colSpan: 3 },
              {},
              {},
              ...mealTypes.map((mt) => ({
                text: `${mt.size} (${mt.count})`,
                style: "tableHeader",
                alignment: "center",
              })),
              ...(!isMoreThanFour && showSumInFirstTable
                ? [{ text: `SUMA (${sumMealTypesCount})`, style: "tableHeader", alignment: "center" }]
                : []),
            ],
            [
              { text: "SKŁADNIKI I PRZEPISY \\ KOD v2", style: "tableHeader", colSpan: 2 },
              {},
              { text: "JDN", style: "tableHeader", alignment: "center" },
              ...mealTypes.map((mt) => ({
                text: `${mt.calories}/KK/(${mt.size})`,
                style: "tableHeader",
                alignment: "center",
              })),
              ...(!isMoreThanFour && showSumInFirstTable
                ? [{ text: "", style: "tableHeader", alignment: "center" }]
                : []),
            ],

            ...dish.mealTypes[0].items.flatMap((item) => generateIngredientRows(item)),
            ...this.geneateDishContainerSummary(
              mealTypes.length === 0
                ? [{ ...dish.mealTypes[0], count: 0, size: 0, containerName: "", ecoContainerName: "" }]
                : mealTypes,
              mealTypes.length === 0 ? false : showSumInFirstTable
            ),
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
      restMealTypes.length > 0 && !showSumInFirstTable ? this.createTableForDish(dish, restMealTypes, false) : [], // if there is more than 1 meal type and showSumInFirstTable is false then we want to create new table for rest of meal types
      restMealTypes.length === 0 && !showSumInFirstTable ? this.createTableForDish(dish, restMealTypes, true) : [], // if there is 0 meal type and showSumInFirstTable is true then we want to create new table with sumary
    ];
  }
  private createDishesReportPdfDocument(dish: typeof this.dish): TDocumentDefinitions {
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
          { text: ` DANIE: ${dish.id}`, style: "header", alignment: "left", width: 85 },
          {
            text: dish.mealTypes.map((mt) => `${mt.name}`).join(", "),
            style: "header",
            alignment: "left",
            width: 300,
            marginTop: dish.mealTypes.length < 4 ? 0 : -5,
          },
          {
            text: dish.marks.join(", "),
            style: "header",
            alignment: "right",
          },
        ],
        absolutePosition: { x: 80 - ` DANIE: ${dish.id}`.length * 3, y: 90 },
        marginTop: 10,
      },
      {
        columns: [
          {
            text: `Występuje w dietach: ${dish.usedIn.map((u) => `${u.name}(${u.id})`).join(", ")} `,
            fontSize: 8,
            alignment: "left",
            bold: true,
          },
          { text: dish.tag, fontSize: 8, style: "header", alignment: "right" },
        ],
        marginTop: dish.mealTypes.length < 4 ? 10 : 20,
      },
    ];

    const contentForDish: TDocumentDefinitions["content"] = [
      this.pdfMakeService.createContentHeaderCompanyDetails(companyDetails),
      { text: "", marginTop: 10 },
      ...contentHeaderDish,
      { text: "", marginTop: 10 },
      this.pdfMakeService.ComponentContentTitle(dish.name),
      { text: "Instrukcja przygotowania:", style: "header", marginTop: 10, marginBottom: 10 },
      {
        ol: dish.preparation,
      },
      this.createTableForDish(dish, dish.mealTypes, dish.mealTypes.length <= 4),
    ];

    const docDefinition: TDocumentDefinitions = {
      info: this.pdfMakeService.createPageInfo(),
      pageSize: "A4",
      pageMargins: [40, 30, 40, 20],
      header: this.pdfMakeService.createHeader(dish.marks.join(", "), dish.paramarks.join(", ")),
      content: [...contentForDish],
      footer: (c, p) =>
        this.pdfMakeService.createFooter(c, p, () => ({
          text: dish.name,
          fontSize: 8,
          alignment: "left",
        })),
      styles: {
        header: {
          bold: true,
          fontSize: 12,
          color: "black",
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: "black",
        },
        tableCell: {
          fontSize: 8,
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
      const contentTitle: TDocumentDefinitions["content"] = this.pdfMakeService.ComponentContentTitle(recipe.name);

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
                    {
                      text: `( ${this.pdfMakeService.addUnit(ing.unitWeight)} )`,
                      style: "tableCell",
                      alignment: "center",
                    },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${ing.quantityOnPortion.toFixed(2)}`,
                      alignment: "center",
                    },
                    {
                      text: `( ${this.pdfMakeService.addUnit(ing.perOne)} )`,
                      style: "tableCell",
                      alignment: "center",
                    },
                  ],
                },
                {
                  stack: [
                    {
                      text: `${ing.quantityOnProcessed.toFixed(2)}`,
                      style: "tableCell",
                      alignment: "center",
                    },
                    {
                      text: `( ${this.pdfMakeService.addUnit(ing.processed)} )`,
                      style: "tableCell",
                      alignment: "center",
                    },
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
                      text: `( ${this.pdfMakeService.addUnit(ing.totalWeight)} )`,
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
                      text: `( ${this.pdfMakeService.addUnit(ing.totalWeightProccessed)} )`,
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
                  text: this.pdfMakeService.addUnit(recipe.portionWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: this.pdfMakeService.addUnit(recipe.processedPortionWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: this.pdfMakeService.addUnit(recipe.totalWeight),
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: this.pdfMakeService.addUnit(recipe.totalPossedWeight),
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
  private createDietsReportPdfDocument(): TDocumentDefinitions {
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

  private calculateTotalProcessedWeight(mealType: (typeof this.dish.mealTypes)[number]): number {
    return mealType.items.reduce((sum, item) => sum + item.wpoPerPortion, 0);
  }

  private calculateTotalProcessedWeightWithCount(mealType: (typeof this.dish.mealTypes)[number]): number {
    return this.calculateTotalProcessedWeight(mealType) * mealType.count;
  }
}
