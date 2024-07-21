import fetch from "isomorphic-fetch";
import { TxLoggerBaseEvent } from "./types";
import { Configuration } from "./config";

const INGEST_URL = `${Configuration.datadogApiHost}/api/v2/logs?dd-api-key=${Configuration.datadogApiKey}&ddsource=nodejs`;

export async function sendEventToDatadog<Event extends TxLoggerBaseEvent>(
  eventData: Event,
  appName: string
) {
  return fetch(`${INGEST_URL}&service=${appName}`, {
    method: "POST",
    body: JSON.stringify(eventData),
  })
    .then((res) => {
      if ([200, 202, 204].includes(res.status)) {
        return true;
      }

      throw new Error("Result is unknown");
    })
    .catch((ex) => {
      console.error(`Logger exception: ${ex}`);
      return false;
    });
}
