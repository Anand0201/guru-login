import { PDFDocument } from "pdf-lib";
import { rgb } from "pdf-lib";
import  fs  from "fs";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const capitalizeFirstLetter2 = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const runner =  async(name, eventname) => {
    let certificate = "./win.pdf";
    const existing = fs.readFileSync(certificate)
    const pdfDoc = await PDFDocument.load(existing);

    const firstPage = pdfDoc.getPages()[0];;

    firstPage.drawText(capitalizeFirstLetter2(name), {
        x: 340, y: 280, size: 20, color: rgb(0, 0, 0)
      });
    
    firstPage.drawText(capitalizeFirstLetter(eventname), {
        x: 490, y: 240, size: 15, color: rgb(0, 0, 0),
    });
    firstPage.drawText("second", {
        x: 270, y: 240, size: 18, color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    return pdfBytes
};

export default runner;