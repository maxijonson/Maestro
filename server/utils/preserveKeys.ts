export const preserveKeysCreator = <O>() => <T extends { [key: string]: O }>(
    arg: T
) => arg;
