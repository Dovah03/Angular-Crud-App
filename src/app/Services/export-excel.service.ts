import { Injectable } from "@angular/core";
declare const ExcelJS: any;
import * as fs from "file-saver";
import { BCService } from "./BC.service.js";
import * as logo from "./myLogo.js";

@Injectable({
  providedIn: "root",
})
export class ExportExcelService {
  constructor() {}
  exportBCExcel(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const BC = excelData.data;

    //Create a workbook with a worksheet
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("BC Data");

    //Add Row and formatting
    worksheet.mergeCells("A6", "E10");
    let titleRow = worksheet.getCell("A6");
    titleRow.value = "BON DE COMMANDE N° : " + BC.numoffre;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    // Date
    worksheet.mergeCells("G6:H10");
    let d = new Date();
    let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    let dateCell = worksheet.getCell("G6");
    dateCell.value = "Salé le : " + date;
    dateCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    dateCell.alignment = { vertical: "middle", horizontal: "center" };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.logoImage,
      extension: "png",
    });
    worksheet.mergeCells("A1:D5");
    worksheet.addImage(myLogoImage, "A1:D5");

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
    //date cell
    let datecell = worksheet.getCell("A12");
    datecell.value = "Date";
    datecell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    datecell.alignment = { vertical: "middle", horizontal: "center" };
    datecell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //reference Cell
    worksheet.mergeCells("B12:E12");
    let RefCell = worksheet.getCell("B12");
    RefCell.value = "Vos Références";
    RefCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    RefCell.alignment = { vertical: "middle", horizontal: "center" };
    RefCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //Terme de paiement cell
    worksheet.mergeCells("F12:H12");
    let TermesCell = worksheet.getCell("F12");
    TermesCell.value = "Terme de paiement";
    TermesCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    TermesCell.alignment = { vertical: "middle", horizontal: "center" };
    TermesCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //date insert
    let datefillCell = worksheet.getCell("A13");
    datefillCell.value = date;
    datefillCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    datefillCell.alignment = { vertical: "middle", horizontal: "center" };
    datefillCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //ref fill cell
    worksheet.mergeCells("B13:E13");
    worksheet.getCell('B13').border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //terme de paiment fill cell
    worksheet.mergeCells("F13:H13");
    worksheet.getCell('F13').border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add empty row
    worksheet.addRow([]);

    //add rowref cell
    let RefRowCell = worksheet.getCell("A15");
    RefRowCell.value = "Référence";
    RefRowCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    RefRowCell.alignment = { vertical: "middle", horizontal: "center" };
    RefRowCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Désignation cell
    worksheet.mergeCells("B15:E15");
    let DesiCell = worksheet.getCell("B15");
    DesiCell.value = "Désignation";
    DesiCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    DesiCell.alignment = { vertical: "middle", horizontal: "center" };
    DesiCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Quantity cell
    let QtyCell = worksheet.getCell("F15");
    QtyCell.value = "Qté";
    QtyCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    QtyCell.alignment = { vertical: "middle", horizontal: "center" };
    QtyCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Prix Unitaire cell
    let PUCell = worksheet.getCell("G15");
    PUCell.value = "P.U.HT";
    PUCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    PUCell.alignment = { vertical: "middle", horizontal: "center" };
    PUCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Montant total cell
    let MCell = worksheet.getCell("H15");
    MCell.value = "Montant HT";
    MCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    MCell.alignment = { vertical: "middle", horizontal: "center" };
    MCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Empty Cells
    let EmptyRefCell1 = worksheet.getCell("A16");
    EmptyRefCell1.value = BC.ref;
    EmptyRefCell1.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell1.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell1.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.mergeCells("B16:E16");
    let EmptyRefCell2 = worksheet.getCell("B16");
    EmptyRefCell2.value = BC.desi;
    EmptyRefCell2.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell2.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell2.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let EmptyRefCell3 = worksheet.getCell("F16");
    EmptyRefCell3.value = BC.qty;
    EmptyRefCell3.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell3.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell3.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let EmptyRefCell4 = worksheet.getCell("G16");
    EmptyRefCell4.value = BC.p_u_ht;
    EmptyRefCell4.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell4.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell4.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let EmptyRefCell5 = worksheet.getCell("H16");
    EmptyRefCell5.value = BC.m_ht;
    EmptyRefCell5.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell5.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell5.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Total Ht Cell
    worksheet.mergeCells("F17:G17");
    let TotalCell = worksheet.getCell("F17");
    TotalCell.value = 'Total HT EUR';
    TotalCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    TotalCell.alignment = { vertical: "middle", horizontal: "center" };
    TotalCell.value = "Total HT EUR";
    TotalCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add last Cell
    let lastCell = worksheet.getCell("H17");
    lastCell.value = BC.Total;
    lastCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    lastCell.alignment = { vertical: "middle", horizontal: "center" };
    lastCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;

    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow([
      "Bon de commande générer a partir de IsoqualtechApp le : " + date,
    ]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFB050" },
    };

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
  excelDevisExport(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const devis = excelData.devis;
    console.log("devis : " + excelData.devis )

    //Create a workbook with a worksheet
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Table Devis");

    //Add Row and formatting
    worksheet.mergeCells("A6", "E10");
    let titleRow = worksheet.getCell("A6");
    titleRow.value = "DEVIS N° : " + devis.numOffre ;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    // Date
    worksheet.mergeCells("G6:H10");
    let d = new Date();
    let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    let dateCell = worksheet.getCell("G6");
    dateCell.value = "Salé le : " + date;
    dateCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    dateCell.alignment = { vertical: "middle", horizontal: "center" };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.logoImage,
      extension: "png",
    });
    worksheet.mergeCells("A1:D5");
    worksheet.addImage(myLogoImage, "A1:D5");

    //Add Offre N° row
    worksheet.mergeCells("A12:E12");
    let OfferCell = worksheet.getCell("A12");
    OfferCell.value = "Offre N° : ";
    OfferCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    OfferCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //addRowtable
    let ArtCell = worksheet.getCell("A13");
    ArtCell.value = "Art.Nr";
    ArtCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    ArtCell.alignment = { vertical: "middle", horizontal: "center" };
    ArtCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.mergeCells("B13:E13");
    let DesCell = worksheet.getCell("B13");
    DesCell.value = "Description";
    DesCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    DesCell.alignment = { vertical: "middle", horizontal: "center" };
    DesCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let QtyCell = worksheet.getCell("F13");
    QtyCell.value = "Qty";
    QtyCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    QtyCell.alignment = { vertical: "middle", horizontal: "center" };
    QtyCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let PUCell = worksheet.getCell("G13");
    PUCell.value = "P.U.HT";
    PUCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    PUCell.alignment = { vertical: "middle", horizontal: "center" };
    PUCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let TotalCell = worksheet.getCell("H13");
    TotalCell.value = "Total HT";
    TotalCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    TotalCell.alignment = { vertical: "middle", horizontal: "center" };
    TotalCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    //add Empty Cells
    let EmptyRefCell1 = worksheet.getCell("A14");
    EmptyRefCell1.value = devis.num_Article;
    EmptyRefCell1.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell1.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell1.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.mergeCells("B14:E14");
    let EmptyRefCell2 = worksheet.getCell("B14");
    EmptyRefCell2.value = devis.description;
    EmptyRefCell2.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell2.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell2.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let EmptyRefCell3 = worksheet.getCell("F14");
    EmptyRefCell3.value = devis.qty;
    EmptyRefCell3.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell3.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell3.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let EmptyRefCell4 = worksheet.getCell("G14");
    EmptyRefCell4.value = devis.p_U_HT;
    EmptyRefCell4.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell4.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell4.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let EmptyRefCell5 = worksheet.getCell("H14");
    EmptyRefCell5.value = devis.p_T_HT;
    EmptyRefCell5.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyRefCell5.alignment = { vertical: "middle", horizontal: "center" };
    EmptyRefCell5.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.mergeCells("F15:G15");
    let TCell = worksheet.getCell("F15");
    TCell.value = "Total HT MAD";
    TCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    TCell.alignment = { vertical: "middle", horizontal: "center" };
    TCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let FinalCell = worksheet.getCell("H15");
    FinalCell.value = devis.p_T_HT;
    FinalCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    FinalCell.alignment = { vertical: "middle", horizontal: "center" };
    FinalCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    FinalCell.alignment = { vertical: "middle", horizontal: "center" };
    FinalCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;

    worksheet.getRow(14).height = 130;

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
  excelBLExport(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const BL = excelData.data;

    //Create a workbook with a worksheet
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("BL Data");

    //Add Row and formatting
    worksheet.mergeCells("A6", "E10");
    let titleRow = worksheet.getCell("A6");
    titleRow.value = "BON DE LIVRAISON N° : "+BL.numoffre;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    // Date
    worksheet.mergeCells("G6:H10");
    let d = new Date();
    let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    let dateCell = worksheet.getCell("G6");
    dateCell.value = "Salé le : " + date;
    dateCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    dateCell.alignment = { vertical: "middle", horizontal: "center" };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.logoImage,
      extension: "png",
    });
    worksheet.mergeCells("A1:C5");
    worksheet.addImage(myLogoImage, "A1:C5");

    //Add Offre N° row
    worksheet.mergeCells("A12:E12");
    let OfferCell = worksheet.getCell("A12");
    OfferCell.value = "Bon de livraison N° : "+BL.numoffre;
    OfferCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    OfferCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let datecell = worksheet.getCell("A13");
    datecell.value = "Date";
    datecell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    datecell.alignment = { vertical: "middle", horizontal: "center" };
    datecell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.mergeCells('B13:C13')
    let DevisCell = worksheet.getCell("B13");
    DevisCell.value = "Devis N°";
    DevisCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    DevisCell.alignment = { vertical: "middle", horizontal: "center" };
    DevisCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let RefCell = worksheet.getCell("D13");
    RefCell.value = "Vos Réf.";
    RefCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    RefCell.alignment = { vertical: "middle", horizontal: "center" };
    RefCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let DateCell = worksheet.getCell("A14");
    DateCell.value = date;
    DateCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    DateCell.alignment = { vertical: "middle", horizontal: "center" };
    DateCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.mergeCells('B14:C14')
    let DeviCell = worksheet.getCell("B14");
    DeviCell.value = '';
    DeviCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    DeviCell.alignment = { vertical: "middle", horizontal: "center" };
    DeviCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let POCell = worksheet.getCell("D14");
    POCell.value = 'PO N° : '+BL.po;
    POCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    POCell.alignment = { vertical: "middle", horizontal: "center" };
    POCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.addRow([]);

    let ItemCell = worksheet.getCell('A16');
    ItemCell.value = 'Poste / Item';
    ItemCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    ItemCell.alignment = { vertical: "middle", horizontal: "center" };
    ItemCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.mergeCells('B16:D16');
    let DesiCell = worksheet.getCell('B16');
    DesiCell.value = 'Désignation';
    DesiCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    DesiCell.alignment = { vertical: "middle", horizontal: "center" };
    DesiCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let QtyCell = worksheet.getCell('E16');
    QtyCell.value = 'Qty';
    QtyCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    QtyCell.alignment = { vertical: "middle", horizontal: "center" };
    QtyCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let EmpyuCell = worksheet.getCell('A17');
    EmpyuCell.value = BL.item;
    EmpyuCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmpyuCell.alignment = { vertical: "middle", horizontal: "center" };
    EmpyuCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.mergeCells('B17:D17')
    let EmptyCell2 = worksheet.getCell('B17');
    EmptyCell2.value = BL.desi;
    EmptyCell2.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyCell2.alignment = { vertical: "middle", horizontal: "center" };
    EmptyCell2.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    let EmptyCell3 = worksheet.getCell('E17');
    EmptyCell3.value = BL.qty;
    EmptyCell3.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    EmptyCell3.alignment = { vertical: "middle", horizontal: "center" };
    EmptyCell3.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;

    worksheet.getRow(17).height = 130;

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
}
