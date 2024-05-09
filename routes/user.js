import express from "express";
import Data from "../controller/user-controller.js";

const router = express.Router();

router.get('/', display);
router.post('/login', Data);

function display(req, res) {
    res.render("login");
}


export default router;
