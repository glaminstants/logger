import winston from "winston";
import dotenv from "dotenv";
import { EventBase } from "./types";
import { CONFIGURATION } from "./config";

dotenv.config();

export type EventFormatterArgs = {
  txId: string;
  txType?: string;
};

export function getEventFormatter({ txId, txType }: EventFormatterArgs) {
  const customFormatter = winston.format((logInfo: EventBase) => {
    logInfo.timestamp = Date.now();
    logInfo.appName = CONFIGURATION.appName;
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
  initialTxId: string;
  initialTxType?: string;
  opts?: winston.LoggerOptions;
};

export function spawnWinston({
  initialTxId,
  initialTxType,
  opts,
}: WinstonLoggerArgs) {
  return winston.createLogger({
    level: "info",
    exitOnError: false,
    format: getEventFormatter({
      txId: initialTxId,
      txType: initialTxType,
    }),
    transports: [new winston.transports.Console()],
    ...opts,
  });
}
