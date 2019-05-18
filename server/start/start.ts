import express from "express";
import cp from "child_process";
import { programs } from "./programs";

interface IStartApplicationBody {
    data: string;
}

const router = express.Router();

router.post("/", (req, res) => {
    try {
        if (!req.body.data) throw new Error("No data specified");

        const { data } = req.body as IStartApplicationBody;

        if (typeof data !== "string") throw new Error("Invalid data type");
        const program = data.toLowerCase();
        if (programs[program]) cp.exec(`start ${programs[program].path}`);
        res.send();
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;
