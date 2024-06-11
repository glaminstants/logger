import winston from "winston";
import { Configuration } from "./config";
import { TxLoggerBaseEvent } from "./types";

export type EventFormatterParameters = {
  txId: string;
  txType?: string;
  appName?: string;
};

export function getEventFormatter({
  txId,
  txType,
  appName,
}: EventFormatterParameters) {
  const metadataInjector = winston.format((logInfo): TxLoggerBaseEvent => {
    return {
      ...logInfo,
      timestamp: Date.now(),
      appName: appName || Configuration.appName,
      appEnvironment: Configuration.appEnvironment,
      txId: txId,
      txType: txType,
    };
  });

  return winston.format.combine(
    metadataInjector(),
    winston.format.prettyPrint()
  );
}

export type WinstonLoggerArgs = {
  txId: string;
  txType?: string;
  appName?: string;
  opts?: winston.LoggerOptions;
};

export function spawnWinston({
  txId,
  txType,
  appName,
  opts,
}: WinstonLoggerArgs) {
  return winston.createLogger({
    level: "info",
    exitOnError: false,
    format: getEventFormatter({
      txId,
      txType,
      appName,
    }),
    transports: [new winston.transports.Console()],
    ...opts,
  });
}
