import { PDFDocument } from "pdf-lib";
import { rgb } from "pdf-lib";
import  fs  from "fs";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const capitalizeFirstLetter2 = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const maincordinates =  async(name, eventname) => {
    let certificate = "./cordi.pdf";
    const existing = fs.readFileSync(certificate)
    const pdfDoc = await PDFDocument.load(existing);

    const firstPage = pdfDoc.getPages()[0];;

    firstPage.drawText(capitalizeFirstLetter2(name), {
        x: 340, y: 265, size: 20, color: rgb(0, 0, 0)
    });
    
    firstPage.drawText("---------------", {
        x: 380, y: 227, size: 20, color: rgb(0, 0, 0)
    });

    firstPage.drawText("-------------", {
        x: 492, y: 227, size: 20, color: rgb(0, 0, 0)
    });

    firstPage.drawText("----------------", {
        x: 190, y: 194, size: 20, color: rgb(0, 0, 0)
    });
    
    firstPage.drawText(capitalizeFirstLetter(eventname), {
        x: 595, y: 227, size: 15, color: rgb(0, 0, 0),
    });
    const pdfBytes = await pdfDoc.save();

    return pdfBytes
};

export default maincordinates;