import { Express, Router } from "express";
import * as _ from "lodash";

interface ISubroute {
    path: string;
    router: Router;
}

export const applySubroutes = (
    router: Express | Router,
    subRoutes: ISubroute[]
) => {
    _.forEach(subRoutes, ({ path, router: subrouter }) =>
        router.use(path, subrouter)
    );
};
