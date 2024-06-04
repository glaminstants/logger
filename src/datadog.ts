import fetch from "isomorphic-fetch";
import { EventBase } from "./types";
import { CONFIGURATION } from "./config";

const INGEST_URL = `${CONFIGURATION.datadogApiHost}/api/v2/logs?dd-api-key=${CONFIGURATION.datadogApiKey}&ddsource=nodejs&service=${CONFIGURATION.appName}`;

export async function sendEventToDatadog<Event extends EventBase>(
  eventData: Event
) {
  return fetch(INGEST_URL, {
    method: "POST",
    body: JSON.stringify(eventData),
  })
    .then((res) => {
      if ([200, 202, 204].includes(res.status)) {
        return true;
      }

      throw new Error("Result is unknown");
    })
    .catch(() => {
      return false;
    });
}
