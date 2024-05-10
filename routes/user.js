import express from "express";
import Data from "../controller/user-controller.js";

const router = express.Router();

router.get('/', display);
router.post('/login', Data);
router.get('/error', error);

function display(req, res) {
    res.render("login");
}

function error(req, res) {
    res.render("error");
}


export default router;
