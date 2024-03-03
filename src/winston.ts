import winston from "winston";
import dotenv from "dotenv";
import { EventBase } from "./types";
import { CONFIGURATION } from "./config";

dotenv.config();

export type EventFormatterArgs = {
  txId: string;
  txType?: string;
  appName?: string;
};

export function getEventFormatter({
  txId,
  txType,
  appName,
}: EventFormatterArgs) {
  const customFormatter = winston.format((logInfo: EventBase) => {
    logInfo.timestamp = Date.now();
    logInfo.appName = appName || CONFIGURATION.appName;
    logInfo.appEnvironment = CONFIGURATION.appEnvironment;
    logInfo.txId = txId;
    logInfo.txType = txType;

    return logInfo;
  });

  return winston.format.combine(
    customFormatter(),
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
