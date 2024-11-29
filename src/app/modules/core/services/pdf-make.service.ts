import { Injectable } from "@angular/core";
import { roboto } from "../../shared/assets/fonts/roboto";
import * as pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { logoImage } from "../../shared/assets/logo-image";
const NICESOFT_WEBSITE = "www.nicesoft.pl";

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

interface CompanyDetails {
  name: string;
  addres: string;
  city: string;
  postCode: string;
  email: string;
  tel: string;
}

@Injectable({
  providedIn: "root",
})
export class PdfMakeService {
  createPdf(docDefinition: TDocumentDefinitions) {
    pdfMake.createPdf(docDefinition, undefined, FontsDefinition, vfs).open();
  }

  createHeader(mark = "X-Marka 1", paramark = "X-Klient 1"): TDocumentDefinitions["content"] {
    return [
      {
        margin: [20, 10, 20, 10],
        columns: [
          [
            {
              text: `${mark} - ${new Date().toLocaleDateString()} - ${paramark} ${new Date().toLocaleDateString()}`,
              fontSize: 10,
              color: "#0E1D2D",
              bold: true,
            },
          ],
        ],
      },
    ];
  }
  createFooter(c: number, p: number, cb: () => TDocumentDefinitions["content"]): TDocumentDefinitions["content"] {
    return {
      columns: [
        {
          image: logoImage,
          fit: [12, 12],
          width: 15,
          marginTop: -2,
        },
        { text: NICESOFT_WEBSITE, fontSize: 8, alignment: "left" },
        cb(),
        { text: `Strona ${c} z ${p}`, fontSize: 8, alignment: "right" },
      ],
      margin: [40, 0, 40, 10],
    };
  }

  createPageInfo(): TDocumentDefinitions["info"] {
    return {
      title: "Przepis",
      author: "Nicesoft",
      subject: "Przepis",
    };
  }

  createContentHeaderCompanyDetails(companyDetails: CompanyDetails): TDocumentDefinitions["content"] {
    return [
      {
        columns: [
          { text: companyDetails.name, alignment: "left", fontSize: 8 },
          {
            text: new Date().toLocaleString(),
            alignment: "right",
            fontSize: 8,
          },
        ],
      },
      { text: companyDetails.addres, alignment: "left", fontSize: 8 },
      { text: `${companyDetails.postCode} ${companyDetails.city}`, alignment: "left", fontSize: 8 },
      { text: companyDetails.email, alignment: "left", fontSize: 8 },
      { text: companyDetails.tel, alignment: "left", fontSize: 8 },
    ];
  }

  ComponentContentTitle(title: string): TDocumentDefinitions["content"] {
    return [
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2 }],
      },
      [{ text: title, alignment: "center", style: "header", margin: [0, 5, 0, 5] }],
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2 }],
      },
    ];
  }
}
