import express from "express";
import * as _ from "lodash";
import helmet from "helmet";
import bodyParser from "body-parser";
import localtunnel from "localtunnel";
import moment from "moment";
import { config } from "./config";
import { applySubroutes } from "./utils";
import { startRouter } from "./start";
import { LOCALTUNNEL_SUBDOMAIN } from "./config/auth.json";

const { port } = config;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use((req, _res, next) => {
    console.info(`${moment().format("H:mm:ss")}: ${req.method} ${req.url}`);
    next();
});

app.get("/", (_req, res) => {
    res.status(200).send({
        status: res.statusCode,
    });
});

applySubroutes(app, [
    {
        path: "/start",
        router: startRouter,
    },
]);

const tunnel = localtunnel(
    port,
    { subdomain: LOCALTUNNEL_SUBDOMAIN },
    (err, t) => {
        if (err) throw new Error(err);
        if (!t) throw new Error("Tunnel was undefined");
        if (!_.includes(t.url, LOCALTUNNEL_SUBDOMAIN)) {
            tunnel.close();
            console.error(
                `${LOCALTUNNEL_SUBDOMAIN} is not available. You should change it. This can also occur if you closed the node process inproperly, preventing the cleanup process to happen. If so, try again later...`
            );
            process.exit();
        }
        console.info(`Tunnel available at ${t.url}`);
    }
);

app.listen(port, async () => {
    console.info(`Maestro listening on port ${port}`);
});

const tunnelClosed = () => {
    console.info("Tunnel closed");
};
const tunnelCleanup = () => {
    if (tunnel) {
        tunnel.close();
        tunnelClosed();
    }
    process.exit();
};

tunnel.on("close", tunnelClosed);
process.on("SIGTERM", () => {
    console.info("SIGTERM");
    tunnelCleanup();
});
process.on("SIGINT", () => {
    console.info("SIGINT");
    tunnelCleanup();
});
process.on("uncaughtException", () => {
    console.info("uncaughtException");
    tunnelCleanup();
});
process.on("unhandledRejection", () => {
    console.info("unhandledRejection");
    tunnelCleanup();
});
