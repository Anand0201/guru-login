import participate from "../utils/certificate.js";
import winner from "../utils/winner.js";
import database from "../models/user-model.js";
import runner from "../utils/runner.js";
import cordinates from "../utils/cordinate.js";
import JSZip from "jszip";

async function Data(req, res) {
    try {
        const username = req.body.name;
        const userphone = req.body.phone;
        const eventname = req.body.event;
        const winners = req.body.winner;
        console.log(username, userphone, eventname, winners);

        const userData = await database.find({ name: username, phone: userphone, technicalevent: eventname, categories: winners });
        console.log(userData)

        if(userData && userData.length > 0) {
            const name = userData[0].name;
            const eventName = userData[0].technicalevent;
            
            if(userData[0].categories == "Winner"){
                console.log(name, eventName);
                
                winner(name, eventName);
                const winnerPdfBytes = await winner(name, eventname);
                
                participate(name, eventName);
                const participatePdfBytes = await participate(name, eventname);
                
                
                const zip = new JSZip();
                zip.file(`${name}-winner-certificate.pdf`, winnerPdfBytes);
                zip.file(`${name}-certificate.pdf`, participatePdfBytes);

                const zipBytes = await zip.generateAsync({ type: "nodebuffer" });

                res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificates.zip"`,
                        'Content-Type': 'application/zip',
                        'Content-Length': zipBytes.length
                });
                res.end(zipBytes);

            }
            else if(userData[0].categories == "Participate"){
                const name = userData[0].name;
                const eventName = userData[0].technicalevent;
                console.log(name, eventName);
                runner(name, eventName);
                const pdfBytes = await runner(name, eventname);
                console.log(pdfBytes)
                res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificate.pdf"`,
                        'Content-Type': 'application/pdf',
                        'Content-Length': pdfBytes.length
                })
                res.end(pdfBytes);
            }
            else if(userData[0].categories == "Runner up"){
                console.log(name, eventName);
                
                runner(name, eventName);
                const winnerPdfBytes = await runner(name, eventname);
                
                participate(name, eventName);
                const participatePdfBytes = await participate(name, eventname);
                
                
                const zip = new JSZip();
                zip.file(`${name}-winner-certificate.pdf`, winnerPdfBytes);
                zip.file(`${name}-certificate.pdf`, participatePdfBytes);

                const zipBytes = await zip.generateAsync({ type: "nodebuffer" });

                res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificates.zip"`,
                        'Content-Type': 'application/zip',
                        'Content-Length': zipBytes.length
                });
                res.end(zipBytes);
            }
            
        } else {
            return res.send("User not found");
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.toString() });
    }
}

export default Data;