import { PDFDocument } from "pdf-lib";
import { rgb } from "pdf-lib";
import  fs  from "fs";

const cordinates =  async(name, eventname) => {
    let certificate = "./cordi.pdf";
    const existing = fs.readFileSync(certificate)
    const pdfDoc = await PDFDocument.load(existing);

    const firstPage = pdfDoc.getPages()[0];;

    firstPage.drawText(name, {
        x: 340, y: 280, size: 20, color: rgb(0, 0, 0)
      });
    
    firstPage.drawText(eventname, {
        x: 340, y: 250, size: 18, color: rgb(0, 0, 0),
    });
    const pdfBytes = await pdfDoc.save();

    return pdfBytes
};

export default cordinates;