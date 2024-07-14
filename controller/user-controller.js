import participate from "../utils/certificate.js";
import winner from "../utils/winner.js";
import database from "../models/user-model.js";
import volunteer from "../models/volunteer.js";
import runner from "../utils/runner.js";
import cordinates from "../utils/cordinate.js";
import maincordinates from "../utils/main-cordinate.js";
import eventcordinates from "../utils/event-coordinator.js";
import JSZip from "jszip";

async function Data(req, res) {
    try {
        const { name: username, phone: userphone, event: eventname, winner: winners } = req.body;
        console.log(username, userphone, eventname, winners);

        const userData = await database.find({ name: username, phone: userphone });
        const vol = await volunteer.find({ name: username, phone: userphone, categories: winners });
        console.log(userData);
        console.log(vol);

        if ((userData && userData.length > 0) || (vol && vol.length > 0)) {
            let name, eventName, category;
            if (userData && userData.length > 0) {
                name = userData[0].name;
                eventName = userData[0].technicalevent;
                category = userData[0].categories;
            } else if (vol && vol.length > 0) {
                name = vol[0].name;
                eventName = vol[0].technicalevent;
                category = vol[0].categories;
            }

            switch (category) {
                case "Winner":
                    console.log(name, eventName);

                    const winnerPdfBytes = await winner(name, eventName);
                    const participatePdfBytes = await participate(name, eventName);

                    const zipWinner = new JSZip();
                    zipWinner.file(`${name}-winner-certificate.pdf`, winnerPdfBytes);
                    zipWinner.file(`${name}-certificate.pdf`, participatePdfBytes);

                    const zipWinnerBytes = await zipWinner.generateAsync({ type: "nodebuffer" });

                    res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificates.zip"`,
                        'Content-Type': 'application/zip',
                        'Content-Length': zipWinnerBytes.length
                    });
                    res.end(zipWinnerBytes);
                    break;

                case "participate":
                    console.log(name, eventName);
                    const participateOnlyPdfBytes = await participate(name, eventName);
                    res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificate.pdf"`,
                        'Content-Type': 'application/pdf',
                        'Content-Length': participateOnlyPdfBytes.length
                    });
                    res.end(participateOnlyPdfBytes);
                    break;

                case "Runner up":
                    console.log(name, eventName);

                    const runnerPdfBytes = await runner(name, eventName);
                    const participateRunnerPdfBytes = await participate(name, eventName);

                    const zipRunner = new JSZip();
                    zipRunner.file(`${name}-runner-up-certificate.pdf`, runnerPdfBytes);
                    zipRunner.file(`${name}-certificate.pdf`, participateRunnerPdfBytes);

                    const zipRunnerBytes = await zipRunner.generateAsync({ type: "nodebuffer" });

                    res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificates.zip"`,
                        'Content-Type': 'application/zip',
                        'Content-Length': zipRunnerBytes.length
                    });
                    res.end(zipRunnerBytes);
                    break;

                case "coordinator":
                    console.log(name, eventName);
                    const coordinatorPdfBytes = await cordinates(name, eventName);
                    res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificate.pdf"`,
                        'Content-Type': 'application/pdf',
                        'Content-Length': coordinatorPdfBytes.length
                    });
                    res.end(coordinatorPdfBytes);
                    break;

                case "event coordinator":
                    console.log(name, eventName);
                    const eventCoordinatorPdfBytes = await eventcordinates(name, eventName);
                    res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificate.pdf"`,
                        'Content-Type': 'application/pdf',
                        'Content-Length': eventCoordinatorPdfBytes.length
                    });
                    res.end(eventCoordinatorPdfBytes);
                    break;

                case "main coordinator":
                    console.log(name, eventName);
                    const mainCoordinatorPdfBytes = await maincordinates(name, eventName);
                    res.writeHead(200, {
                        'Content-Disposition': `attachment; filename="${name}-certificate.pdf"`,
                        'Content-Type': 'application/pdf',
                        'Content-Length': mainCoordinatorPdfBytes.length
                    });
                    res.end(mainCoordinatorPdfBytes);
                    break;

                default:
                    return res.redirect("/error");
            }
        } else {
            return res.redirect("/error");
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.toString() });
    }
}

export default Data;
