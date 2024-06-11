import dotenv from "dotenv";
import { generateTxId } from "./utils";
import { TxLogger, TxLoggerEventParams, TxLoggerBaseEvent } from "./types";
import { getEventFormatter, spawnWinston } from "./winston";
import { sendEventToDatadog } from "./datadog";
import hash from "object-hash";
import { isDatadogConfigurationValid } from "./config";

dotenv.config();

export type AppLoggerArgs = {
  txId: string;
  txType?: string;
  appName?: string;
};

function createAppLogger({
  txId = generateTxId(),
  txType = undefined,
  appName,
}: AppLoggerArgs): TxLogger {
  const logger = spawnWinston({
    txId,
    txType,
    appName,
  });

  const EVENT_QUEUE = new Map<string, Promise<boolean>>();

  if (isDatadogConfigurationValid()) {
    logger.on("data", (eventData: TxLoggerBaseEvent) => {
      const eventDataHash = hash(eventData);

      EVENT_QUEUE.set(
        eventDataHash,
        sendEventToDatadog(eventData).finally(() => {
          EVENT_QUEUE.delete(eventDataHash);
        })
      );
    });
  } else {
    console.warn("Datadog configuration is invalid!");
  }

  return {
    setTxId: (newTxId: string) => {
      logger.format = getEventFormatter({ txId: newTxId });
    },

    hasLogsInQueue: () => EVENT_QUEUE.size > 0,
    end: async () => {
      logger.end();

      await new Promise((resolve) => {
        const checkQueueSize = setInterval(() => {
          if (EVENT_QUEUE.size === 0) {
            resolve(undefined);
            clearInterval(checkQueueSize);
          }
        }, 250);
      });
    },

    // Producer methods
    info: (eventType, eventParams) => {
      logger.info({
        eventType,
        ...eventParams,
      });
    },
    warn: (eventType, warnMessage, eventParams) => {
      logger.warn({
        eventType,
        ...eventParams,
        warnMessage,
      });
    },
    debug: (eventType, eventParams) => {
      logger.debug({
        eventType,
        ...eventParams,
      });
    },
    error: (eventType, errorMessage, eventParams) => {
      logger.error({
        eventType,
        ...eventParams,
        errorMessage,
      });
    },
  };
}

export { TxLogger, TxLoggerEventParams, createAppLogger, generateTxId };
