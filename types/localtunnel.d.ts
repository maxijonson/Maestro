// Type definitions for localtunnel 1.9
// Project: https://github.com/localtunnel/localtunnel
// Definitions by: Vladyslav Khrapov <https://github.com/vladhrapov>
// Updated 2019-05-18 by: Tristan Chin <https://github.com/maxijonson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare function localtunnel(
    port: number,
    opt: localtunnel.TunnelConfig,
    callback: localtunnel.TunnelCallback
): localtunnel.Tunnel;

declare function localtunnel(
    port: number,
    callback: localtunnel.TunnelCallback
): localtunnel.Tunnel;

declare namespace localtunnel {
    type TunnelCallback = (err: string, tunnel?: Tunnel) => void;
    type TunnelErrorCallback = (err: string) => void;
    type TunnelOpenCallback = (tunnel: Tunnel) => void;
    type TunnelDeadCallback = () => void;
    type TunnelCloseCallback = () => void;
    type TunnelRequestCallback = (info: {
        method: string;
        path: string;
    }) => void;

    interface TunnelConfig {
        host?: string;
        subdomain?: string;
        port?: number;
        local_host?: string;
    }

    interface Tunnel {
        url: string;
        tunnel_cluster: TunnelCluster;
        open(err: string, tunnel?: Tunnel): void;
        close(): void;
        on(evt: "error", callback: TunnelErrorCallback): void;
        on(evt: "open", callback: TunnelOpenCallback): void;
        on(evt: "dead", callback: TunnelDeadCallback): void;
        on(evt: "request", callback: TunnelRequestCallback): void;
        on(evt: "close", callback: TunnelCloseCallback): void;
    }

    interface TunnelCluster {
        domain: string;
    }
}

export = localtunnel;
